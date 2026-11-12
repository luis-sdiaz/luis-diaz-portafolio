# Portafolio Personal

Portafolio web desarrollado por **Luis Sebastián Diaz**, estudiante de Ingeniería de Software de la Universidad Cooperativa de Colombia.

**Sitio web:** https://www.luis-diaz.dev/

## Descripción

Este proyecto es mi portafolio personal, desarrollado como parte de mi formación en Ingeniería de Software. Su objetivo es presentar mi perfil, los conocimientos que he adquirido y algunos de los proyectos en los que he trabajado durante mi proceso académico y de aprendizaje.

Durante su desarrollo me enfoqué en construir una interfaz organizada, adaptable a diferentes dispositivos y fácil de utilizar. También busqué aplicar buenas prácticas de desarrollo frontend, reutilización de componentes, accesibilidad e internacionalización.

El portafolio incluye información sobre mi formación, habilidades técnicas, proyectos, experiencia, recomendaciones y medios de contacto.

## Tecnologías utilizadas

El proyecto está desarrollado con las siguientes tecnologías:

- **Next.js 16:** framework principal y estructura de la aplicación.
- **React 19:** construcción de componentes e interfaces.
- **TypeScript:** tipado estático y organización del código.
- **Tailwind CSS 4:** estilos y diseño adaptable.
- **Framer Motion:** animaciones y transiciones.
- **next-intl:** soporte para español e inglés.
- **next-themes:** administración de los temas claro y oscuro.
- **Lucide React:** iconografía de la interfaz.
- **Formspree:** recepción de mensajes desde el formulario de contacto.
- **Vercel:** despliegue y alojamiento del portafolio.

## Características principales

- Diseño responsive para dispositivos móviles, tabletas y computadores.
- Internacionalización en español e inglés.
- Modo claro y oscuro.
- Navegación entre secciones.
- Presentación interactiva de proyectos mediante un carrusel 3D.
- Fichas individuales con descripciones, tecnologías y enlaces.
- Descarga de aplicaciones desde GitHub Releases.
- Galería de fotografías en la sección Sobre mí.
- Secciones de formación académica y experiencia.
- Testimonios y recomendaciones.
- Formulario de contacto con validación de datos.
- Descarga del currículum en formato PDF.
- Consideraciones de accesibilidad y movimiento reducido.

## Proyectos incluidos

El portafolio presenta seis proyectos relacionados con diferentes áreas del desarrollo de software.

### 1. EcoPlaza Smart Waste & IoT Platform

Aplicación de escritorio para la gestión de residuos aprovechables y la integración de información procedente de dispositivos IoT.

Utiliza tecnologías como React, TypeScript, Tauri, Rust, PostgreSQL y ESP32.

Cuenta con instaladores para Windows, macOS y Linux.

- [Repositorio de EcoPlaza](https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform)
- [Descargar EcoPlaza v1.0.0](https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform/releases/tag/v1.0.0)

### 2. VisualTrace Mobile

Aplicación móvil desarrollada para documentar y comparar el estado de espacios u objetos mediante fotografías de antes y después.

Fue construida con React Native, Expo, TypeScript y Supabase.

Dispone de una versión APK para dispositivos Android compatibles.

- [Repositorio de VisualTrace](https://github.com/luis-sdiaz/visual-trace-mobile)
- [Descargar VisualTrace para Android](https://github.com/luis-sdiaz/visual-trace-mobile/releases/tag/v1.0.0)

### 3. RideWake AI

Aplicación orientada a dispositivos inteligentes que permite seleccionar destinos, visualizar recorridos simulados y generar alertas de proximidad.

La versión desarrollada para Xiaomi Smart Band 7 utiliza Zepp OS y un modelo de Machine Learning para estimar el tiempo de llegada durante recorridos de demostración.

También cuenta con una versión para Wear OS y una demostración interactiva para navegador.

- [Versión Zepp OS](https://github.com/luis-sdiaz/ridewake-zeppos)
- [Versión Wear OS](https://github.com/luis-sdiaz/ridewake-ai-wearos)
- [Demostración web de RideWake](https://ridewake-web.vercel.app)

### 4. Lullaby 3D

Videojuego tridimensional de terror psicológico desarrollado de manera colaborativa con Godot.

El proyecto incluye escenarios, personajes y mecánicas de juego orientadas a crear una experiencia de exploración y supervivencia.

- [Repositorio de Lullaby](https://github.com/AlePython-byte/LULLABY)

### 5. Legado de Valientes

Proyecto de videojuego RPG por turnos con una arquitectura que separa el frontend y el backend.

Utiliza React, TypeScript y Phaser para la interfaz y las mecánicas de combate, junto con Java, Spring Boot y MongoDB para los servicios y la persistencia de datos.

- [Repositorio frontend](https://github.com/luis-sdiaz/Legado_de_valientes_frontend)
- [Repositorio backend](https://github.com/luis-sdiaz/Legado_de_valientes_backend)
- [Ver aplicación](https://legado-de-valientes-frontend.vercel.app)

### 6. Reproductor de Música

Aplicación web para reproducir archivos de audio y administrar canciones mediante una interfaz adaptable.

Incluye funciones de reproducción, búsqueda, visualización de álbumes y listas de reproducción, además de temas claro y oscuro.

- [Repositorio del reproductor](https://github.com/luis-sdiaz/Reproductor-de-musica)
- [Ver reproductor](https://musica.luis-diaz.dev)

## Estructura del proyecto

El código está organizado principalmente en los siguientes directorios:

```text
portafolio/
├── app/             # Rutas, estilos globales y configuración de la aplicación
├── components/      # Componentes reutilizables de la interfaz
├── data/            # Información de los proyectos
├── i18n/            # Configuración de internacionalización
├── lib/             # Funciones y utilidades
├── messages/        # Traducciones en español e inglés
├── public/          # Imágenes, avatares, capturas y CV
├── package.json     # Dependencias y comandos
└── next.config.ts   # Configuración de Next.js
```

## Instalación y ejecución local

Para ejecutar el proyecto se necesita tener instalado Node.js y npm.

**1. Clonar el repositorio**

```bash
git clone https://github.com/luis-sdiaz/luis-diaz-portafolio.git
```

**2. Ingresar al directorio**

```bash
cd luis-diaz-portafolio
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

Una vez iniciado, abrir en el navegador:

http://localhost:3000

El idioma español está disponible en la ruta principal y la versión en inglés en `/en`.

## Configuración del formulario de contacto

El formulario utiliza Formspree para recibir los mensajes enviados desde el portafolio.

Para configurar esta funcionalidad en un entorno propio, se debe crear un archivo `.env.local` en la raíz del proyecto y agregar el identificador del formulario:

```env
NEXT_PUBLIC_FORMSPREE_FORM_ID=identificador_del_formulario
```

El identificador debe corresponder a un formulario configurado en Formspree.

El archivo `.env.local` no debe publicarse en el repositorio. En el entorno de producción, la variable se configura desde el panel de Vercel.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la compilación de producción |
| `npm run start` | Ejecuta la aplicación compilada |
| `npm run lint` | Analiza el código con ESLint |
| `npx tsc --noEmit` | Comprueba los tipos de TypeScript |

## Despliegue

El portafolio está desplegado en Vercel y conectado al repositorio de GitHub.

La aplicación utiliza un dominio personalizado:

**https://www.luis-diaz.dev/**

Los cambios publicados en la rama principal pueden desplegarse automáticamente mediante la integración entre GitHub y Vercel.

## Autor

**Luis Sebastián Diaz**

Estudiante de Ingeniería de Software  
Universidad Cooperativa de Colombia  
Pasto, Nariño, Colombia

Este portafolio forma parte de mi proceso de formación y reúne proyectos que me han permitido practicar diferentes tecnologías, fortalecer mis conocimientos y adquirir experiencia en el desarrollo de software.
