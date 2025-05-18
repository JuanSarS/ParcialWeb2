/* eslint-disable prettier/prettier */

import { Evaluacion } from "src/evaluacion/entities/evaluacion.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Profesor {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        cedula: number;

        @Column()
        nombre: string;

        @Column()
        departamento: string;

        @Column()
        extencion: number;

        @Column()
        esParEvaluado: boolean;

        @OneToMany(() => Proyecto, (proyecto) => proyecto.mentor)
        mentorias!: Proyecto[];

        @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
        evaluaciones!: Evaluacion[];
}
