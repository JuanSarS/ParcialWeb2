/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
        @InjectRepository (Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
        ){}


  crearEstudiante(createEstudianteDto: CreateEstudianteDto) {
    return 'This action adds a new estudiante';
  }

  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
