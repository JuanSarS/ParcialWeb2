# Juan Diego Sarmiento Sánchez Parcial WEB 2

# Descripción de las pruebas realizadas

Este documento describe las pruebas realizadas con **Jest** y **Postman** para los distintos servicios del sistema. Las pruebas incluyen validaciones funcionales, de reglas de negocio y de manejo de errores, acompañadas por ejemplos de solicitudes y respuestas para una vista completa de los endpoints.

---

## Estudiantes

### Crear Estudiante
- **@POST** `/estudiante`
- **Pruebas realizadas:**
  - Se verifica que se pueda crear un estudiante con datos válidos, asegurando que la operación básica funcione correctamente.
  - **Promedio menor a 3.2:** Valida que el sistema detecte y maneje correctamente un promedio académico inferior al mínimo permitido, evitando así la creación de estudiantes que violen las reglas del negocio.
  - **Semestre menor a 4:** Asegura que no se permitan registros de estudiantes con menos de cuatro semestres, según las reglas de negocio.

### Eliminar Estudiante
- **@DELETE** `/estudiante/:id`
- **Pruebas realizadas:**
  - Comprueba que se puede eliminar un estudiante de forma normal cuando no existen restricciones.
  - **Estudiante con proyectos activos:** Verifica que el sistema impida eliminar estudiantes que aún están asignados a proyectos activos, protegiendo la integridad de los datos.

---

## Evaluaciones

### Crear Evaluación
- **@POST** `/evaluacion`
- **Pruebas realizadas:**
  - Verifica que el sistema permita crear correctamente una evaluación con todos los datos válidos, incluyendo un evaluador asignado.
  - **Evaluación sin evaluador:** Valida que el sistema pueda aceptar una evaluación sin evaluador definido al momento de la creación, permitiendo su asignación posterior.
  - **Evaluador es mentor:** Asegura que el sistema rechace la creación de una evaluación si el evaluador asignado también es mentor del proyecto, lo cual no está permitido por las reglas del negocio.

---

## Profesores

### Crear Profesor
- **@POST** `/profesor`
- **Pruebas realizadas:**
  - Verifica que el sistema permita crear correctamente un profesor con todos los datos válidos, incluyendo la extensión telefónica.
  - **Extensión menor a 5 dígitos:** Evalúa que el sistema rechace la creación de un profesor si la extensión telefónica no cumple con el formato requerido (5 dígitos), asegurando integridad en los datos.

### Asignar Evaluador
- **@PATCH** `/profesor/:id/evaluacion/:evalId`
- **Pruebas realizadas:**
  - Valida que se pueda asignar correctamente un profesor como evaluador a una evaluación, cuando se cumplen todas las condiciones necesarias.
  - **Más de 2 evaluaciones:** Verifica que el sistema impida asignar un evaluador que ya tenga más de dos evaluaciones activas, cumpliendo con la regla de límite de carga evaluativa.
  - **Evaluador ya asignado:** Asegura que el sistema no permita reasignar una evaluación a un evaluador que ya está asignado a ella, evitando duplicidades.

---

## Proyectos

### Crear Proyecto
- **@POST** `/proyecto`
- **Pruebas realizadas:**
  - Confirma que el sistema permita crear proyectos correctamente cuando todos los datos ingresados son válidos.
  - **Con mentor:** Evalúa que el sistema acepte la creación de un proyecto con un mentor asignado desde el inicio, para verificar la funcionalidad de asociaciones.
  - **Presupuesto menor a 0:** Valida que el sistema rechace la creación de proyectos con presupuesto negativo, asegurando la coherencia financiera.
  - **Título ≤ 15 caracteres:** Verifica que el sistema rechace títulos de proyecto con 15 caracteres o menos, cumpliendo con la validación de longitud mínima.

### Avanzar Proyecto
- **@PATCH** `/proyecto/:id`
- **Pruebas realizadas:**
  - Confirma que un proyecto puede avanzar correctamente de estado, según lo permitido por su flujo de trabajo.
  - **Proyecto completado:** Valida que un proyecto no pueda ser avanzado si ya se encuentra en estado completo (estado ≥ 4).

### Obtener Estudiantes por Proyecto
- **@GET** `/proyecto/:id`
- **Pruebas realizadas:**
  - Verifica que el sistema devuelva correctamente la lista de estudiantes asociados a un proyecto válido (específicamente el líder del proyecto).
  - **Proyecto inexistente:** Asegura que el sistema responda adecuadamente cuando se consulta un proyecto que no existe, probando el manejo de errores.



