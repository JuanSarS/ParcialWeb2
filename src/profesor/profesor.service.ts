/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorController } from './profesor.controller';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {
  constructor(
  @InjectRepository (ProfesorController)
  private readonly profesorRepository: Repository<Profesor>,
  ){}

  async crearProfesor(createProfesorDto: CreateProfesorDto) {
    const ext = createProfesorDto.extencion;
    if(ext.toString().length !== 5){
      throw new BadRequestException("La extansión debe tener 5 digitos")
    }
    const newProf = this.profesorRepository.create(createProfesorDto)
    return await this.profesorRepository.save(newProf)
  }

  async asignarEvaluador(id:string , idEval:string){

  }
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
}
