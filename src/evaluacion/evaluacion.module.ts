/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';

@Module({
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Evaluacion])],
})
export class EvaluacionModule {}
