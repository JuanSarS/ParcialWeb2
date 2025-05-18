/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Proyecto } from 'src/proyecto/entities/proyecto.entity';
export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [Estudiante, Profesor, Evaluacion, Proyecto],
        synchronize: true,
    }),
    TypeOrmModule.forFeature([Estudiante, Profesor, Evaluacion, Proyecto]),
];
