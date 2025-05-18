/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) { }

  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    return await this.proyectoService.crearProyecto(createProyectoDto);
  }

  @Get(":id")
  findAllEstudiante(@Param('id') id: string) {
    return this.proyectoService.findAllEstudiantes(+id);
  }

  @Patch(':id')
  async avanzarProyecto(@Param('id') id: string) {
    return await this.proyectoService.avanzarProyecto(+id);
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.proyectoService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
      return this.proyectoService.update(+id, updateProyectoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.proyectoService.remove(+id);
    }*/
}
