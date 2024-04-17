# Guía de inicio rápido para la aplicación Taskpy

Esta guía te ayudará a configurar y ejecutar la aplicacion.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) - Descargar e instalar Node.js
- [Yarn](https://yarnpkg.com/) - Instalar Yarn

## Configuración de entorno

1. Copia el archivo `.env.template` y pégalo en el mismo directorio con el nombre `.env`.
2. Edita el archivo `.env` según sea necesario.

## Instalación de dependencias

Ejecuta el siguiente comando en tu terminal para instalar las dependencias:

```bash
yarn install
```

## Ejecutar la aplicación en modo de desarrollo

Para iniciar la aplicación en un entorno de desarrollo, ejecuta el siguiente comando:

```bash
yarn dev
```

## Compilar la aplicación

Para compilar la aplicación en producción, ejecuta el siguiente comando:

```bash
yarn build
```

## Despliegue automático

El despliegue automático está configurado para ejecutarse cuando haces push a la rama `main`. Utiliza el archivo `nixpacks.toml` en la plataforma Railway para configurar tus opciones de CI/CD.


## Dependencias

### UI
- [@nextui-org/react](https://nextui.org/docs) - Framework de UI para React.
- [framer-motion](https://www.framer.com/motion/) - Biblioteca de animaciones para React.
- [tailwindcss](https://tailwindcss.com/) - Framework de CSS de utilidad.
- [react-icons](https://react-icons.github.io/react-icons/) - Iconos personalizables para React.

### Gestor de destado
- [zustand](https://zustand.surge.sh/) - Biblioteca de gestión de estado ligera para React.
- [immer](https://immerjs.github.io/immer/) - Una forma más sencilla de trabajar con el estado inmutable en JavaScript.

### HTTP y Formularios
- [axios](https://axios-http.com/docs/intro) - Cliente HTTP basado en Promesas para el navegador y Node.js.
- [react-hook-form](https://react-hook-form.com/get-started) - Biblioteca para manejar formularios en React.

### Router
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) - Enrutamiento declarativo para React.