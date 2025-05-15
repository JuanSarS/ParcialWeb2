/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Proyecto])],
})
export class ProyectoModule {}
