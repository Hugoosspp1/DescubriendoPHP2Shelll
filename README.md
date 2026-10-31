# Descubriendo PHP2Shell

Sitio editorial y guía técnica independiente para investigar el tema PHP2Shell. Interfaz creada exclusivamente con Angular standalone components, Angular Router y CSS nativo; no utiliza React, Vue ni frameworks de interfaz externos.

## Diseño

- Paleta clara y profesional en azul, blanco y grises, con modo oscuro.
- Navegación lateral, barra superior de búsqueda, tarjetas de métricas, fotografía editorial y paneles adaptables.
- Diseño responsive para escritorio, tablet y móvil.

## Funcionalidades

- Navegación entre portada, incidente, versiones/alcance, mitigación, verificación, análisis forense y fuentes.
- Búsqueda que dirige a las secciones relevantes.
- Tema claro/oscuro con preferencia guardada en el navegador.
- Inventario editable de componentes, con estado, persistencia local y exportación CSV.
- Checklists interactivas para mitigación y verificación.
- Descarga local de planes de mitigación, resultados de verificación y notas forenses.
- Referencias directas a PHP.net, CVE, NVD, CISA, Wiz, AWS y organismos nacionales de ciberseguridad.
- Cronología del descubrimiento y divulgación responsable, con fuentes y fechas atribuidas.
- Guía específica para separar Angular estático/SSR del backend PHP Laravel y comprobar sus workers.
- Orientación forense que distingue actividad observada, reportes de terceros y evidencia del host.

El inventario y la preferencia de tema se guardan en el navegador. Los formularios forenses y las checklists no se envían a ningún servidor; las notas se exportan como archivos locales. La búsqueda navega por secciones y no realiza búsqueda de texto completo.

## Requisitos

- Node.js 22 o compatible con Angular 21.
- npm.

## Ejecutar en local

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Compilar para producción

```bash
npm run build
```

Un workflow de GitHub Actions compila la aplicación en cada push a `main` y en las pull requests. La compilación de producción se verificó localmente con `npm.cmd run build` el 31 de octubre de 2026.

## Criterio de verificación

El sitio documenta PHP2Shell, nombre colectivo de CVE-2026-109618 y CVE-2026-109619, publicadas por el proyecto PHP el 21 de octubre de 2026. Las versiones upstream corregidas que se muestran son PHP 8.5.12, 8.4.27, 8.3.36 y 8.2.35. Para ramas antiguas y paquetes de distribuciones, hosting, contenedores o appliances, comprueba los backports con el proveedor correspondiente.

La sección de versiones también recoge el alcance histórico publicado por Wiz (desde PHP 5.4, al menos una de las vulnerabilidades) y los límites de soporte de ramas anteriores. La guía de TwinTeach explica que Angular en el navegador no ejecuta PHP, pero que hay que revisar el runtime que sirve la API Laravel y cualquier servicio que procese PHP.

También se explica por separado el aviso informativo de CVE-2026-115560 sobre progreso de carga de sesiones, publicado el 23 de octubre. El informe enlaza fuentes primarias y distingue entre intentos observados, reportes de explotación y compromiso confirmado. La información se revisó el 31 de octubre de 2026; consulta las fuentes enlazadas para novedades posteriores.

La guía es documental, no un escáner ni asesoramiento específico para un sistema. Instalar una actualización del proveedor es la única solución completa para las dos vulnerabilidades PHP2Shell. Las mitigaciones temporales limitan rutas concretas y no sustituyen la instalación de un paquete corregido. Verifica versiones, configuración y procedimientos con fuentes oficiales antes de aplicarlos en producción.
