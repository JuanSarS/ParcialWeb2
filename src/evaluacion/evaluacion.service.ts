/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>
  ) { };

  async crearEvaluacion(createEvaluacionDto: CreateEvaluacionDto) {
    const { proyectId, evaluadorId } = createEvaluacionDto;
    let evaluationData: { evaluador?: Profesor, proyecto?: Proyecto };
    const proyect = await this.proyectoRepository.findOne(
      {
        where: { id: proyectId },
        relations: ['proyectos'],
      });
    if (!proyect) throw new NotFoundException("Proyect not found");
    if (evaluadorId) {
      const profesor = await this.profesorRepository.findOne(
        {
          where: { id: evaluadorId },
          relations: ['proyectos'],
        });
      if (!profesor) throw new NotFoundException("Profesor not found");
      const yaEsMentor = profesor.mentorias.some(
        (proy: Proyecto) => proy.id === proyectId
      );
      if (yaEsMentor) {
        throw new BadRequestException("El profesor no puede evaluar un proyecto del que ya es mentor");
      };
      evaluationData = { evaluador: profesor };
    }
    else {
      evaluationData = {}
    }

    evaluationData = { ...evaluationData, proyecto: proyect };
    const newEvaluaccion = this.evaluacionRepository.create(evaluationData);
    return await this.evaluacionRepository.save(newEvaluaccion);
  }
  /*
  findAll() {
    return `This action returns all evaluacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluacion`;
  }

  update(id: number, updateEvaluacionDto: UpdateEvaluacionDto) {
    return `This action updates a #${id} evaluacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluacion`;
  }
    */
}
