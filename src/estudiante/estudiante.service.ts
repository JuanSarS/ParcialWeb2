/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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


  async crearEstudiante(createEstudianteDto: CreateEstudianteDto) {
     const {semestre , ...dataEstudiante, promedio}=createEstudianteDto;
     if (semestre< 4 || promedio < 3.2){
      throw new BadRequestException("No se puede crear el estudiante por su semestr y/o promedio")
     }
     const newEstudiante = this.estudianteRepository.create(createEstudianteDto)
     return await this.estudianteRepository.save(newEstudiante)
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

 async  eliminarEstudiante(id: number) {
    const user = await this.estudianteRepository.findOne({
            where: { id:id },
            relations: ['proyectos'], 
        });
    if (!user) throw new NotFoundException("User not found");
    if (user.proyectos) throw new BadRequestException("No se puede eleminar el estudiante por que tiene proyectos")    
    return `This action removes a #${id} estudiante`;
  }
}
