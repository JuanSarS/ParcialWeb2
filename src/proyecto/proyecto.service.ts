/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>
  ) { }

  async crearProyecto(createProyectoDto: CreateProyectoDto) {
    const presupuesto = createProyectoDto.presupuesto
    const titulo = createProyectoDto.titulo
    const { liderId, mentorId, ...proyectoData } = createProyectoDto;
    if (presupuesto <= 0 || titulo.length <= 15) {
      throw new BadRequestException("No se puede crear el proyecto por su presupuesto o titulo")
    }
    const newProyecto = this.proyectoRepository.create(proyectoData)

    if (liderId) {
      const estudiante = await this.estudianteRepository.findOne({ where: { id: liderId } })
      if (estudiante) {
        newProyecto.lider = estudiante;
      }
    }

    if (mentorId) {
      const profesor = await this.profesorRepository.findOne({ where: { id: mentorId } })
      if (profesor) {
        newProyecto.mentor = profesor;
      }
    }

    return await this.proyectoRepository.save(newProyecto)
  }

  async avanzarProyecto(id: number) {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: id } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto with id ${id} not found`);
    }
    if (proyecto.estado >= 4) {
      throw new BadRequestException("Ya está completo el proyecto");
    }
    else {
      proyecto.estado++;
    }
    return await this.proyectoRepository.save(proyecto);

  }

  async findAllEstudiantes(id: number) {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: id },
      relations: ['lider'],
    });
    if (!proyecto) {
      throw new NotFoundException('Proyect not found');
    }
    return [proyecto.lider]
  }

}
