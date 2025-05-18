/* eslint-disable prettier/prettier */
export class CreateProyectoDto {
    presupuesto: number;
    titulo: string;
    area: string;
    notafinal: number;
    estado: number;
    fechaini: string;
    fechafin: string;
    liderId?: number;
    mentorId?: number;
}
