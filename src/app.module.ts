/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { Evaluacion } from './evaluacion/entities/evaluacion.entity';
import { Profesor } from './profesor/entities/profesor.entity';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Proyecto } from './proyecto/entities/proyecto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'name',
      entities: [Evaluacion,Profesor,Estudiante,Proyecto],
      synchronize: true,
    }),
    ProfesorModule,
    EstudianteModule,
    ProyectoModule,
    EvaluacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
