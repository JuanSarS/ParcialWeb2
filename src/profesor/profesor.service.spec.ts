/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Profesor } from './entities/profesor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let evaluacionRepository: Repository<Evaluacion>;
  let profesorRepository: Repository<Profesor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    evaluacionRepository = module.get<Repository<Evaluacion>>(getRepositoryToken(Evaluacion))
    profesorRepository = module.get<Repository<Profesor>>(getRepositoryToken(Profesor))
    await seedDatabase();
  });
  const seedDatabase = async () => {
    await evaluacionRepository.clear();
    await profesorRepository.clear();
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProfesor should create a professor where extension.lenght = 5', async () => {
    const mockProfesor = {
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.fullName(),
      departamento: faker.word.words(2),
      extencion: faker.number.int({ min: 10000, max: 99999 }),
      esParEvaluado: faker.datatype.boolean(),
    } as unknown as Profesor;

    jest.spyOn(profesorRepository, 'create').mockReturnValue(mockProfesor);
    jest.spyOn(profesorRepository, 'save').mockResolvedValue(mockProfesor);

    const result = await service.crearProfesor(mockProfesor);
    expect(result).toEqual(mockProfesor);
  });

  it('crearProfesor should throw a error when a professor has extension.lenght != 5', async () => {
    const mockProfesor = {
      cedula: faker.number.int({ min: 10000000, max: 99999999 }),
      nombre: faker.person.fullName(),
      departamento: faker.word.words(2),
      extencion: faker.number.int({ min: 100000, max: 999999 }),
      esParEvaluado: faker.datatype.boolean(),
    } as unknown as Profesor;

    jest.spyOn(profesorRepository, 'create').mockReturnValue(mockProfesor);
    const saveSpy = jest.spyOn(profesorRepository, 'save');
    await expect(service.crearProfesor(mockProfesor)).rejects.toThrow(
      "La extensión debe tener 5 digitos",
    );
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('asignarEvaluador should assing evaluador if profesor.evaluaciones < 3', async () => {
    const evalu = { id: 1, evaluador: null } as unknown as Evaluacion;
    const prof = { id: 1, evaluaciones: [] } as unknown as Profesor;

    jest.spyOn(evaluacionRepository, 'findOne').mockResolvedValue(evalu);
    jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(prof);
    jest.spyOn(evaluacionRepository, 'save').mockResolvedValue({ ...evalu, evaluador: prof });
    jest.spyOn(profesorRepository, 'save').mockResolvedValue({ ...prof, evaluaciones: [evalu] });

    const result = await service.asignarEvaluador(prof.id, evalu.id);
    expect(result.evaluacionId).toBe(evalu.id);
    expect(result.profesorId).toBe(prof.id);
    expect(result.evaluacionesIds).toContain(evalu.id);
  });


  it('asignarEvluador should throw error if profesor.evaluaciones>=3', async () => {
    const evalu = { id: 1, evaluador: null } as unknown as Evaluacion;
    const prof = { id: 1, evaluaciones: [{}, {}, {}] } as Profesor;

    jest.spyOn(evaluacionRepository, 'findOne').mockResolvedValue(evalu);
    jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(prof);

    await expect(service.asignarEvaluador(prof.id, evalu.id)).rejects.toThrow(
      'El profesor no puede tener más de 2 evaluaciones activas'
    );
  });

  it('asignarEvaluador should throw error if exist evaluacion.evluador', async () => {
    const evalu = { id: 1, evaluador: {} as Profesor } as Evaluacion;
    const prof = { id: 1, evaluaciones: [] } as unknown as Profesor;

    jest.spyOn(evaluacionRepository, 'findOne').mockResolvedValue(evalu);
    jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(prof);

    await expect(service.asignarEvaluador(prof.id, evalu.id)).rejects.toThrow(
      "Esta evaluación ya tiene un evaluador asignado"
    );
  });
});
