/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante, Profesor])],
})
export class ProyectoModule { }
