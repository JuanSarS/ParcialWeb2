/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let evaluacionRepository: Repository<Evaluacion>;
  let profesorRepository: Repository<Profesor>;
  let proyectoRepository: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto))
    evaluacionRepository = module.get<Repository<Evaluacion>>(getRepositoryToken(Evaluacion))
    profesorRepository = module.get<Repository<Profesor>>(getRepositoryToken(Profesor))
    await seedDatabase();
  });
  const seedDatabase = async () => {
    await proyectoRepository.clear();
    await evaluacionRepository.clear();
    await profesorRepository.clear();
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("crearEvaluacion should create a evaluation where mentor != evaluador", async () => {
    const proyectoMock = { id: 10 } as Proyecto;
    const profesorMock = { id: 1, mentorias: [] } as unknown as Profesor;
    const evaluacionMock = { id: 100, evaluador: profesorMock, proyecto: proyectoMock } as Evaluacion;

    jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesorMock);
    jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(proyectoMock);
    jest.spyOn(evaluacionRepository, 'create').mockReturnValue(evaluacionMock);
    jest.spyOn(evaluacionRepository, 'save').mockResolvedValue(evaluacionMock);

    const result = await service.crearEvaluacion({ evaluadorId: 1, proyectId: 10 });

    expect(result).toEqual(evaluacionMock);
  })

  it("crearEvaluacion should throw an in a evaluation where mentor = evaluador", async () => {
    const proyectoMock = { id: 10 } as Proyecto;
    const profesorMock = { id: 1, mentorias: [proyectoMock] } as unknown as Profesor;
    const evaluacionMock = { id: 100, evaluador: profesorMock, proyecto: proyectoMock } as Evaluacion;

    jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesorMock);
    jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(proyectoMock);
    jest.spyOn(evaluacionRepository, 'create').mockReturnValue(evaluacionMock);
    jest.spyOn(evaluacionRepository, 'save').mockResolvedValue(evaluacionMock);

    const evaluacion = { evaluadorId: 1, proyectId: 10 };

    await expect(service.crearEvaluacion(evaluacion)).rejects.toThrow(
      "El profesor no puede evaluar un proyecto del que ya es mentor",
    );
  })

});
