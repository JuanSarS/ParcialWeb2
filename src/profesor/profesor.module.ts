/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';

@Module({
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Profesor,Evaluacion])],
})
export class ProfesorModule {}
