# CV Online

Portafolio personal de Roberto Pérez Flores, desarrollado con React y Vite. Presenta información profesional, habilidades, formación y proyectos en una interfaz adaptable a dispositivos móviles.

## Características

- Secciones de presentación, sobre mí, habilidades, proyectos, formación y contacto.
- Filtros para explorar los proyectos por categoría.
- Enlaces a perfiles sociales y repositorios.
- Accesos de contacto por correo mediante Gmail y por WhatsApp.
- Mapa de ubicación integrado con OpenStreetMap.
- Control opcional de música ambiental generado con Web Audio.
- Diseño adaptable para escritorio y dispositivos móviles.

## Tecnologías

- React
- Vite
- Tailwind CSS
- Lucide React

## Requisitos

- Node.js y npm instalados.

## Instalación y desarrollo

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir el sitio en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Ejecuta ESLint. |

## Personalización

Los datos personales, enlaces, habilidades y proyectos se configuran en [`src/data/CVData.js`](src/data/CVData.js). Las imágenes y logos del portafolio están en [`src/assets/`](src/assets/).

La ruta base de despliegue está configurada en [`vite.config.js`](vite.config.js) como `/CV-Online/`, para publicar el sitio bajo esa ruta.
