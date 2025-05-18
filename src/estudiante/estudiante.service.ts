/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
//import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }


  async crearEstudiante(createEstudianteDto: CreateEstudianteDto) {
    const { semestre, promedio } = createEstudianteDto;
    if (semestre < 4 || promedio < 3.2) {
      throw new BadRequestException("No se puede crear el estudiante por su semestre y/o promedio")
    }
    const newEstudiante = this.estudianteRepository.create(createEstudianteDto)
    return await this.estudianteRepository.save(newEstudiante)
  }
  /*
    findAll() {
      return `This action returns all estudiante`;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} estudiante`;
    }
  
    update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
      return `This action updates a #${id} estudiante`;
    }
  */
  async eliminarEstudiante(id: number) {
    const user = await this.estudianteRepository.findOne({
      where: { id: id },
      relations: ['proyectos'],
    });
    if (!user) throw new NotFoundException("User not found");
    if (user.proyectos?.some((proy: Proyecto) => proy.estado !== 0)) throw new BadRequestException("No se puede eleminar el estudiante por que tiene proyectos activos")

    return this.estudianteRepository.remove(user);
  }
}
