/* eslint-disable prettier/prettier */
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    semestre: number;

    @Column()
    programa: string;

    @Column()
    promedio: number;

    @OneToMany(() => Proyecto, (proyecto) => proyecto.lider)
    proyectos: Proyecto[];

}
