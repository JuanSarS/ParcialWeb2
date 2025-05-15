/* eslint-disable prettier/prettier */
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Evaluacion {
    @PrimaryGeneratedColumn ()
    id: number;
    
    @ManyToOne(()=>Proyecto,proyecto => proyecto.evaluaciones)
    proyecto!:string;
    
    @ManyToOne(()=>Profesor,profesor => profesor.evaluaciones)
    evaluador!:string;
}
