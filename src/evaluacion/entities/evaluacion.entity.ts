/* eslint-disable prettier/prettier */
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Evaluacion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Proyecto, proyecto => proyecto.evaluaciones)
    proyecto!: Proyecto;

    @ManyToOne(() => Profesor, profesor => profesor.evaluaciones)
    evaluador!: Profesor;
}
