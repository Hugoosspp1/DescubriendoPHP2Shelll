import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({selector:'dps-home',standalone:true,imports:[RouterLink],template:`
<div class="home-page">
  <section class="landing-hero">
    <img class="landing-photo" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="Arquitectura contemporánea junto al mar, con luz cálida de atardecer">
    <div class="landing-shade"></div>
    <div class="hero-meta"><span>INVESTIGACIÓN DE SEGURIDAD · INFORME 01</span><span>2026</span></div>
    <div class="landing-copy">
      <h1>Comprender<br>el riesgo.<br><span>Proteger<br>lo esencial.</span></h1>
      <p>Un análisis técnico sobre PHP2Shell, las versiones que deben revisarse y las medidas para proteger tu infraestructura PHP.</p>
      <div class="landing-actions">
        <a class="landing-primary" routerLink="/incidente">Leer el informe completo <span>⟶</span></a>
        <a class="landing-secondary" routerLink="/soluciones"><span class="play-icon">▶</span> Resumen en 2 minutos</a>
      </div>
    </div>
    <div class="handwritten-note">Seguridad y<br>conocimiento</div>
    <div class="hero-side-note">LA SEGURIDAD<br>TAMBIÉN ES<br>CONSTRUIR UN<br>ENTORNO MEJOR.</div>
    <div class="hero-bottom-fade"></div>
  </section>
  <section class="landing-metrics" aria-label="Resumen del informe">
    <a class="landing-metric" routerLink="/incidente"><span class="landing-metric-icon">▤</span><span class="landing-metric-copy"><strong>Revisión CVE</strong><small>Identificadores por verificar</small><em>Ver detalles <b>→</b></em></span></a>
    <a class="landing-metric" routerLink="/versiones"><span class="landing-metric-icon">◇</span><span class="landing-metric-copy"><strong>Versiones PHP</strong><small>Comprobar alcance y soporte</small><em>Ver versiones <b>→</b></em></span></a>
    <a class="landing-metric" routerLink="/verificacion"><span class="landing-metric-icon">♧</span><span class="landing-metric-copy"><strong>Alcance técnico</strong><small>Revisar instalaciones expuestas</small><em>Más información <b>→</b></em></span></a>
    <a class="landing-metric" routerLink="/incidente"><span class="landing-metric-icon">▦</span><span class="landing-metric-copy"><strong>Estado del análisis</strong><small>Investigación documental</small><em>Ver metodología <b>→</b></em></span></a>
    <a class="landing-metric" routerLink="/fuentes"><span class="landing-metric-icon">♧</span><span class="landing-metric-copy"><strong>Informe actualizado</strong><small>28 oct 2026 · v1.0</small><em>Ver fuentes <b>→</b></em></span></a>
  </section>
  <section class="home-below">
    <div class="section-title-row"><div><h2>Explora el informe</h2><p>Una ruta práctica desde el contexto hasta la verificación.</p></div><a class="text-link" routerLink="/fuentes">Consultar fuentes ↗</a></div>
    <section class="feature-grid">
      <article class="feature-card"><div class="feature-icon">◈</div><h3>El incidente</h3><p>Contexto, terminología y preguntas que deben responderse con fuentes de confianza.</p><a routerLink="/incidente">Leer análisis →</a></article>
      <article class="feature-card"><div class="feature-icon">◷</div><h3>Versiones y alcance</h3><p>Organiza la revisión del entorno sin asumir versiones afectadas sin evidencia.</p><a routerLink="/versiones">Revisar alcance →</a></article>
      <article class="feature-card"><div class="feature-icon">✓</div><h3>Soluciones y mitigación</h3><p>Lista interactiva para organizar tareas de protección, validación y seguimiento.</p><a routerLink="/soluciones">Abrir checklist →</a></article>
      <article class="feature-card"><div class="feature-icon">⌕</div><h3>Verificación técnica</h3><p>Pasos de comprobación y registro de resultados sin alterar el sistema.</p><a routerLink="/verificacion">Ver procedimiento →</a></article>
      <article class="feature-card"><div class="feature-icon">▤</div><h3>Análisis forense</h3><p>Plantilla local para apuntar observaciones y evidencias por investigar.</p><a routerLink="/forense">Abrir cuaderno →</a></article>
      <article class="feature-card"><div class="feature-icon">↗</div><h3>Fuentes oficiales</h3><p>Documentación de PHP, bases de vulnerabilidades y guías de seguridad.</p><a routerLink="/fuentes">Consultar referencias →</a></article>
    </section>
    <div class="content-grid"><section class="panel"><h2>Una investigación basada en evidencias</h2><p class="panel-intro">Contrasta la información, registra las fuentes y separa los hechos confirmados de las hipótesis.</p><div class="timeline"><div class="timeline-item"><span class="timeline-marker">01</span><div><strong>Reunir fuentes primarias</strong><p>Comprueba avisos oficiales y registros públicos de vulnerabilidades.</p></div></div><div class="timeline-item"><span class="timeline-marker">02</span><div><strong>Definir el entorno real</strong><p>Inventaría versiones instaladas, dependencias, exposición y controles existentes.</p></div></div><div class="timeline-item"><span class="timeline-marker">03</span><div><strong>Verificar y documentar</strong><p>Conserva evidencias, anota fechas y registra las limitaciones de cada comprobación.</p></div></div></div></section><section class="panel"><h2>Nota metodológica</h2><p class="panel-intro">No se presentan identificadores CVE, fechas ni rangos de versiones como confirmados sin una fuente primaria verificable.</p><div class="notice"><strong>Investiga con criterio</strong>La ausencia de un indicador conocido no demuestra que un sistema esté limpio ni que no sea vulnerable.</div><a class="text-link" routerLink="/fuentes">Consultar referencias oficiales →</a></section></div>
  </section>
</div>
`}) export class HomePageComponent {}
