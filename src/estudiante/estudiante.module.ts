import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  controllers: [EstudianteController],
  providers: [EstudianteService],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Estudiante])],
})
export class EstudianteModule {}
