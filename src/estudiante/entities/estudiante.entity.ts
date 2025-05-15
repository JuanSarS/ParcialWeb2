/* eslint-disable prettier/prettier */
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export class Estudiante {
    @PrimaryGeneratedColumn ()
    id: number;

    @Column()
    cedula:number;

    @Column()
    nombre:string;

    @Column()
    semestre:number;

    @Column()
    programa:number;

    @Column()
    promedio:number;

    @OneToMany(()=> Proyecto ,(proyecto)=>proyecto.lider)
    proyectos!: string[];

}
