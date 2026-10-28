# DescubriendoPHP2Shelll

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
- Referencias directas a PHP.net, CVE, NVD, OWASP y CISA.

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

Se ha añadido un workflow de GitHub Actions para intentar compilar la aplicación en cada push a `main` y en las pull requests. La compilación local de desarrollo no ha podido verificarse en el entorno de creación porque la instalación de dependencias agotó el tiempo disponible.

## Criterio de verificación

No se dan por confirmados identificadores CVE, fechas ni rangos de versiones específicos sin una fuente primaria verificable. Esta guía es informativa; valida los detalles y los procedimientos con fuentes oficiales antes de utilizarlos en decisiones operativas.
