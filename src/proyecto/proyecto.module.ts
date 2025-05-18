/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante])],
})
export class ProyectoModule { }
