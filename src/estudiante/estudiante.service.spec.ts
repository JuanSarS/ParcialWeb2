/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: Repository<Estudiante>;
  let proyectoRepository: Repository<Proyecto>;
  let estudiantesList: Estudiante[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante))
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto))
    await seedDatabase();
  });


  const seedDatabase = async () => {
    await proyectoRepository.clear();
    await estudianteRepository.clear();

    estudiantesList = [];

    for (let i = 0; i < 5; i++) {
      const estudiante = await estudianteRepository.save({
        cedula: parseInt(faker.string.numeric(10)),
        nombre: faker.person.fullName(),
        semestre: faker.number.int({ min: 1, max: 10 }),
        programa: faker.word.words(2),
        promedio: parseFloat(faker.number.float({ min: 2.5, max: 5.0, fractionDigits: 1 }).toString()),
      });
      estudiantesList.push(estudiante);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("crearEstudiante should Create Student", async () => {
    const estudiante = {
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      semestre: faker.number.int({ min: 5, max: 10 }),
      programa: faker.word.words(2),
      promedio: parseFloat(faker.number.float({ min: 3.3, max: 5.0, fractionDigits: 1 }).toString()),
    };
    const newEstudiante: Estudiante = await service.crearEstudiante(estudiante)
    expect(newEstudiante).toBeDefined();
    expect(newEstudiante.id).toBeDefined();
    expect(newEstudiante.nombre).toEqual(estudiante.nombre);
    expect(newEstudiante.semestre).toEqual(estudiante.semestre);
    expect(newEstudiante.programa).toEqual(estudiante.programa);
    expect(newEstudiante.promedio).toEqual(estudiante.promedio);
  });

  it('crearEstudiante should throw error if promedio < 3.2', async () => {
    const estudiante = {
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      semestre: 6,
      programa: faker.word.words(2),
      promedio: 3.0, // < 3.2
    };

    await expect(service.crearEstudiante(estudiante)).rejects.toThrow(
      "No se puede crear el estudiante por su semestre y/o promedio",
    );
  });

  it('crearEstudiante should throw error if semestre < 4', async () => {
    const estudiante = {
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      semestre: 2, // < 4
      programa: faker.word.words(2),
      promedio: 3.5,
    };

    await expect(service.crearEstudiante(estudiante)).rejects.toThrow(
      "No se puede crear el estudiante por su semestre y/o promedio",
    );

  });

  it('eliminarEstudiante should delete a student without projects', async () => {
    const estudiante = await estudianteRepository.save({
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      semestre: 6,
      programa: faker.word.words(2),
      promedio: 3.5,
      proyectos: [],
    });

    await service.eliminarEstudiante(estudiante.id);
    const deleted = await estudianteRepository.findOne({ where: { id: estudiante.id } });
    expect(deleted).toBeNull();
  });

  it('eliminarEstudiante should throw error if student has active projects', async () => {
    const estudiante = await estudianteRepository.save({
      cedula: parseInt(faker.string.numeric(10)),
      nombre: faker.person.fullName(),
      semestre: 6,
      programa: faker.word.words(2),
      promedio: 3.5,
    });

    await proyectoRepository.save({
      presupuesto: 10000,
      titulo: faker.word.words(3),
      area: 'IA',
      notafinal: 4.5,
      estado: 1,
      fechaini: '2024-01-01',
      fechafin: '2024-06-01',
      lider: estudiante,
    });

    await expect(service.eliminarEstudiante(estudiante.id)).rejects.toThrow(
      'No se puede eleminar el estudiante por que tiene proyectos activos',
    );
  });

});

