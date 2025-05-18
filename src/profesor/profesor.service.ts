/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,

    @InjectRepository(Evaluacion)
    private readonly evalRepository: Repository<Evaluacion>,
  ) { }

  async crearProfesor(createProfesorDto: CreateProfesorDto) {
    const ext = createProfesorDto.extencion;
    if (ext.toString().length !== 5) {
      throw new BadRequestException("La extensión debe tener 5 digitos")
    }
    const newProf = this.profesorRepository.create(createProfesorDto)
    return await this.profesorRepository.save(newProf)
  }

  async asignarEvaluador(id: number, idEval: number) {
    const evalu = await this.evalRepository.findOne({
      where: { id: idEval },
      relations: ["evaluador"]
    })
    if (!evalu) throw new NotFoundException("Evaluation not found");

    const prof = await this.profesorRepository.findOne({
      where: { id: id },
      relations: ["evaluaciones"]
    })
    if (!prof) throw new NotFoundException("Profesor not found");

    if ((prof.evaluaciones.length || 0) >= 3) {
      throw new BadRequestException("El profesor no puede tener más de 2 evaluaciones activas")
    }
    if (evalu.evaluador) {
      throw new BadRequestException("Esta evaluación ya tiene un evaluador asignado");
    }
    evalu.evaluador = prof
    prof.evaluaciones.push(evalu)
    await this.evalRepository.save(evalu)
    return await this.profesorRepository.save(prof)
  }

  /*
    findAll() {
      return `This action returns all profesor`;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} profesor`;
    }
  
    update(id: number, updateProfesorDto: UpdateProfesorDto) {
      return `This action updates a #${id} profesor`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} profesor`;
    }
    */
}
