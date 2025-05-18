/* eslint-disable prettier/prettier */
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Evaluacion } from "src/evaluacion/entities/evaluacion.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Proyecto {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        presupuesto: number;

        @Column()
        titulo: string;

        @Column()
        area: string;

        @Column()
        notafinal: number;

        @Column()
        estado: number;

        @Column()
        fechaini: string;

        @Column()
        fechafin: string;

        @ManyToOne(() => Estudiante, (estudiante) => estudiante.proyectos)
        lider!: Estudiante;

        @ManyToOne(() => Profesor, (profesor) => profesor.mentorias)
        mentor!: Profesor;

        @OneToMany(() => Evaluacion, evaluacion => evaluacion.proyecto)
        evaluaciones!: Evaluacion[]

}
