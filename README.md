# RegistroEstudiantesPrueba – Frontend

Este proyecto corresponde al frontend de una aplicación web desarrollada como prueba técnica de ascenso.

## Descripción

Es una aplicación web en Angular que permite a los estudiantes interactuar con el sistema académico mediante el consumo de la API del backend.

El frontend está construido utilizando Angular y Tailwind CSS, siguiendo métricas y buenas prácticas de desarrollo.

## Alcance funcional

La aplicación permite a los estudiantes:

- Registrarse en la plataforma.
- Acceder a la funcionalidad de crédito académico.
- Inscribir materias respetando las reglas definidas por el backend.
- Consultar los registros de otros estudiantes en línea.
- Visualizar únicamente el nombre de los compañeros con quienes comparten clases.

El frontend es responsable de consumir los servicios del backend y presentar la información de forma clara y estructurada.

## Instalación y manejo de la app

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (viene con Node.js)

### Descarga del proyecto

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/usuario/RegistroEstudiantesPruebaFront.git
cd RegistroEstudiantesPruebaFront
```

### Instalación de dependencias

```bash
npm install
```

### Ejecutar la aplicación en modo desarrollo

```bash
npm start
```

```bash
ng s

``

La aplicación estará disponible en `http://localhost:4200`.

### Construir la aplicación para producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

## Implementación

El proyecto utiliza Angular como framework principal, con Tailwind CSS para el estilado. La estructura del código está organizada en módulos, componentes y servicios. Los servicios API consumen el backend mediante HTTP requests. Los componentes incluyen formularios reactivos para registro e inscripción, listas dinámicas y manejo de estados de carga y errores.
