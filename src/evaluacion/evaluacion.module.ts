/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';

@Module({
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Evaluacion, Profesor, Proyecto])],
})
export class EvaluacionModule { }
