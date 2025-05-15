/* eslint-disable prettier/prettier */

import { Evaluacion } from "src/evaluacion/entities/evaluacion.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export class Profesor {
        @PrimaryGeneratedColumn()
        id: number;
    
        @Column()
        cedula:number;
    
        @Column()
        nombre:string;
    
        @Column()
        departamento:string;
    
        @Column()
        extencion:number;

        @Column()
        esParEvaluado:boolean;

        @OneToMany(()=> Proyecto ,(proyecto)=>proyecto.mentor)
        mentorias!: string[];

        @OneToMany(()=> Evaluacion ,(evaluacion)=>evaluacion.evaluador)
        evaluaciones!: string[];
}
