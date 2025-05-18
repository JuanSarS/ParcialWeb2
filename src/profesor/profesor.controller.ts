/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) { }

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.crearProfesor(createProfesorDto);
  }

  @Patch(':id/evaluacion/:evalId')
  asignarEvaluador(@Param('id') id: string, @Param('evalId') evalId: string) {
    return this.profesorService.asignarEvaluador(+id, +evalId);
  }
  /*
    @Get()
    findAll() {
      return this.profesorService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.profesorService.findOne(+id);
    }
  
    
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.profesorService.remove(+id);
    }
  */
}