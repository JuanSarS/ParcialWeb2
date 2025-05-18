/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoService],
      imports: [...TypeOrmTestingConfig()]
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto))
    await seedDatabase();
  });

  async function seedDatabase() {
    await proyectoRepository.clear();
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProyecto should create a proyect where presupuesto>0 and |titulo|>15', async () => {
    const mockProyecto = {
      presupuesto: faker.number.int({ max: 40000, min: 1 }),
      titulo: faker.lorem.sentence(4).repeat(2),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: faker.number.int({ max: 4, min: 0 }),
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future()
    } as unknown as Proyecto;
    const newProyecto = await service.crearProyecto(mockProyecto);
    expect(newProyecto).toBeDefined();
    expect(newProyecto.id).toBeDefined();
    expect(newProyecto.presupuesto).toEqual(mockProyecto.presupuesto);
    expect(newProyecto.titulo).toEqual(mockProyecto.titulo);
    expect(newProyecto.area).toEqual(mockProyecto.area);
    expect(newProyecto.notafinal).toEqual(mockProyecto.notafinal);
    expect(newProyecto.estado).toEqual(mockProyecto.estado);
    expect(newProyecto.fechafin).toEqual(mockProyecto.fechafin);
  });

  it('crearProyecto should throw an error when presupuesto =<0 ', async () => {
    const mockProyecto = {
      presupuesto: 0,
      titulo: faker.lorem.sentence(4).repeat(2),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: faker.number.int({ max: 4, min: 0 }),
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future()
    } as unknown as Proyecto;

    await expect(service.crearProyecto(mockProyecto)).rejects.toThrow(
      "No se puede crear el proyecto por su presupuesto o titulo",
    );
  });

  it('crearProyecto should throw an error when |titulo| =<15 ', async () => {
    const mockProyecto = {
      presupuesto: faker.number.int({ min: 1, max: 30000 }),
      titulo: faker.string.alpha(),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: faker.number.int({ max: 4, min: 0 }),
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future()
    } as unknown as Proyecto;

    await expect(service.crearProyecto(mockProyecto)).rejects.toThrow(
      "No se puede crear el proyecto por su presupuesto o titulo",
    );
  });

  it('avanzarProyecto should advance the proyect by one if estado <4', async () => {
    const mockProyecto = {
      id: 1,
      presupuesto: faker.number.int({ max: 40000, min: 1 }),
      titulo: faker.lorem.sentence(4).repeat(2),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: faker.number.int({ max: 3, min: 0 }),
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future()
    } as unknown as Proyecto;
    const inicial = mockProyecto.estado;
    jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(mockProyecto);
    jest.spyOn(proyectoRepository, 'save').mockResolvedValue(mockProyecto);

    const result = await service.avanzarProyecto(mockProyecto.id);
    expect(result.estado).toBe(inicial + 1);
  });

  it('avanzarProyecto should throw error when  estado>=4', async () => {
    const mockProyecto = {
      id: 1,
      presupuesto: faker.number.int({ max: 40000, min: 1 }),
      titulo: faker.lorem.sentence(4).repeat(2),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: 4,
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future()
    } as unknown as Proyecto;

    jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(mockProyecto);
    jest.spyOn(proyectoRepository, 'save').mockResolvedValue(mockProyecto);

    await expect(service.avanzarProyecto(mockProyecto.id)).rejects.toThrow(
      'Ya está completo el proyecto'
    );
  });

  it('findAllEstudiante should give all students asociated with it , el lider', async () => {
    const mockEstudiante = {
      id: 1,
      cedula: faker.number.int({ min: 10000000, max: 99999999 }),
      nombre: faker.person.fullName(),
      semestre: faker.number.int({ min: 5, max: 10 }),
      programa: faker.word.words(2),
      promedio: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 })
    } as unknown as Estudiante;

    const mockProyecto = {
      id: 1,
      presupuesto: faker.number.int({ max: 40000, min: 1 }),
      titulo: faker.lorem.sentence(4).repeat(2),
      area: faker.word.words(20),
      notafinal: faker.number.float({ max: 5, min: 0, fractionDigits: 2 }),
      estado: 4,
      fechaini: faker.date.anytime(),
      fechafin: faker.date.future(),
      lider: mockEstudiante
    } as unknown as Proyecto;

    jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(mockProyecto);

    const result = await service.findAllEstudiantes(mockProyecto.id);
    expect(result).toEqual([mockEstudiante]);
  });

  it('findAllEstudiante should throw error when the id doenst exists', async () => {
    await expect(service.findAllEstudiantes(0)).rejects.toThrow(
      'Proyect not found'
    );
  });

});
