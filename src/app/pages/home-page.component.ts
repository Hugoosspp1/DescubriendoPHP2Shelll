import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dps-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-page">
      <section class="landing-hero">
        <img class="landing-photo" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="Arquitectura contemporánea junto al mar, con luz cálida de atardecer">
        <div class="landing-shade"></div>
        <div class="hero-meta"><span>INFORME DE SEGURIDAD · PHP2SHELL</span><span>REVISADO 31 OCT 2026</span></div>
        <div class="landing-copy">
          <h1>Comprender<br>el riesgo.<br><span>Proteger<br>lo esencial.</span></h1>
          <p>En octubre de 2026 se descubrieron dos fallos graves en PHP, el programa que muchos servidores usan para responder a las visitas de una web. Una petición preparada para aprovecharlos podría permitir a alguien ejecutar acciones en el servidor. Aquí se explica qué pasó, qué versiones corregir y cómo revisar un sistema.</p>
          <div class="landing-actions">
            <a class="landing-primary" routerLink="/incidente">Leer el informe <span>⟶</span></a>
            <a class="landing-secondary" routerLink="/soluciones"><span class="play-icon">▶</span> Ir al plan de respuesta</a>
          </div>
        </div>
        <div class="hero-side-note">ACTUALIZA PHP<br>Y REVISA LOS<br>REGISTROS DE<br>LOS MESES PREVIOS.</div>
        <div class="hero-bottom-fade"></div>
      </section>

      <section class="landing-metrics" aria-label="Datos principales">
        <a class="landing-metric" routerLink="/incidente"><span class="landing-metric-icon">2</span><span class="landing-metric-copy"><strong>Fallos críticos</strong><small>CVE-2026-109618 / 109619</small><em>Ver análisis <b>→</b></em></span></a>
        <a class="landing-metric" routerLink="/incidente"><span class="landing-metric-icon">9.2</span><span class="landing-metric-copy"><strong>Gravedad: 9,2 de 10</strong><small>Escala internacional de seguridad</small><em>Ver impacto <b>→</b></em></span></a>
        <a class="landing-metric" routerLink="/versiones"><span class="landing-metric-icon">21</span><span class="landing-metric-copy"><strong>Octubre de 2026</strong><small>Publicación y parches oficiales</small><em>Ver versiones <b>→</b></em></span></a>
        <a class="landing-metric" routerLink="/versiones"><span class="landing-metric-icon">8.x</span><span class="landing-metric-copy"><strong>Series corregidas</strong><small>8.2, 8.3, 8.4 y 8.5</small><em>Consultar tabla <b>→</b></em></span></a>
        <a class="landing-metric" routerLink="/verificacion"><span class="landing-metric-icon">!</span><span class="landing-metric-copy"><strong>Prioridad urgente</strong><small>Hay avisos públicos de ataques</small><em>Comprobar ahora <b>→</b></em></span></a>
      </section>

      <section class="home-below">
        <div class="notice">
          <strong>Acción recomendada</strong>
          Actualiza PHP en todos los servidores que atienden la web o su API. La actualización oficial es la única forma completa de corregir el fallo; los ajustes temporales solo reducen parte del riesgo.
          <a class="text-link" routerLink="/soluciones">Consultar prioridad y mitigaciones temporales →</a>
        </div>

        <div class="section-title-row"><div><h2>Resumen ejecutivo</h2><p>Hechos confirmados por PHP y avisos gubernamentales consultados el 31 de octubre de 2026.</p></div><a class="text-link" routerLink="/fuentes">Abrir fuentes ↗</a></div>
        <div class="content-grid" style="margin-top:0">
          <section class="panel">
            <h2>Qué ha ocurrido</h2>
            <div class="article-body">
              <p>El 21 de octubre de 2026, el equipo que mantiene PHP publicó dos fallos graves: <strong>CVE-2026-109618</strong> y <strong>CVE-2026-109619</strong>. «CVE» es el número público que permite identificar cada fallo. Ambos tienen una gravedad de 9,2 sobre 10.</p>
              <p>En ciertas instalaciones, una persona sin cuenta puede enviar una petición a la web y hacer que PHP la procese de forma insegura. Si lo consigue, podría ejecutar acciones con los permisos del servicio web. Esto puede afectar a las distintas formas de instalar PHP en servidores web; el equipo de PHP considera especialmente arriesgado Apache con PHP integrado.</p>
              <p>El 26 de octubre, la agencia de ciberseguridad de Estados Unidos añadió los fallos a su lista de problemas usados en ataques. Al día siguiente, el Centro Canadiense recogió informes públicos de ataques en curso. AWS había visto intentos contra sus servidores señuelo desde el 17 de octubre; esos intentos no prueban que un servidor real fuera atacado.</p>
            </div>
            <div class="inline-actions"><a class="text-link" href="https://www.php.net/archive/2026.php#2026-10-21-5" target="_blank" rel="noopener">Aviso del proyecto PHP ↗</a><a class="text-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener">Aviso del Centro Canadiense ↗</a></div>
          </section>
          <section class="panel">
            <h2>Qué hacer primero</h2>
            <div class="timeline">
              <div class="timeline-item"><span class="timeline-marker">01</span><div><strong>Busca cada lugar donde se ejecuta PHP</strong><p>Incluye el servidor de la web, la API, los contenedores, el alojamiento contratado y los entornos de prueba.</p></div></div>
              <div class="timeline-item"><span class="timeline-marker">02</span><div><strong>Instala la corrección del proveedor</strong><p>Comprueba que sea el paquete corregido y reinicia los servicios para que dejen de usar el programa antiguo.</p></div></div>
              <div class="timeline-item"><span class="timeline-marker">03</span><div><strong>Busca señales de intrusión</strong><p>Revisa peticiones, programas ejecutados y archivos nuevos. AWS vio el primer intento en su señuelo el 17 de octubre.</p></div></div>
            </div>
            <a class="text-link" routerLink="/verificacion">Abrir lista de verificación →</a>
          </section>
        </div>

        <section class="panel" style="margin-top:18px">
          <h2>Palabras del informe, explicadas</h2>
          <div class="content-grid" style="margin-top:0">
            <div class="article-body"><p><strong>PHP:</strong> programa que ejecuta parte del sitio en el servidor y prepara respuestas para las visitas.</p><p><strong>Angular:</strong> parte visual que normalmente se descarga y funciona en el navegador.</p><p><strong>API:</strong> la puerta de datos que usa la página para pedir información al servidor.</p></div>
            <div class="article-body"><p><strong>Laravel:</strong> herramientas con las que se construye el servidor de la aplicación usando PHP.</p><p><strong>CVE:</strong> número público para identificar un fallo de seguridad.</p><p><strong>Arreglo o parche:</strong> actualización del fabricante que corrige un fallo del programa.</p></div>
          </div>
          <p class="panel-intro">En TwinTeach, que use Angular no evita revisar el PHP del servidor Laravel. Son partes diferentes y se comprueban por separado.</p>
        </section>

        <div class="section-title-row" style="margin-top:27px"><div><h2>Explora el informe</h2><p>De la descripción técnica a la comprobación y preservación de evidencias.</p></div></div>
        <section class="feature-grid">
          <article class="feature-card"><div class="feature-icon">◈</div><h3>El incidente</h3><p>Qué falló en PHP, cómo se descubrió y qué podría pasar si alguien lo aprovecha.</p><a routerLink="/incidente">Leer explicación →</a></article>
          <article class="feature-card"><div class="feature-icon">◷</div><h3>Versiones</h3><p>Qué versiones actualizar y cómo llevar un registro sencillo de los equipos revisados.</p><a routerLink="/versiones">Ver tabla →</a></article>
          <article class="feature-card"><div class="feature-icon">✓</div><h3>Cómo protegerse</h3><p>Qué hacer primero y qué ajustes temporales existen mientras se instala el arreglo.</p><a routerLink="/soluciones">Ver los pasos →</a></article>
          <article class="feature-card"><div class="feature-icon">⌕</div><h3>Comprobar TwinTeach</h3><p>Cómo revisar por separado la web Angular y el servidor Laravel que ejecuta PHP.</p><a routerLink="/verificacion">Ver guía →</a></article>
          <article class="feature-card"><div class="feature-icon">▤</div><h3>Buscar señales</h3><p>Qué registros y cambios revisar, y qué hacer si aparece algo sospechoso.</p><a routerLink="/forense">Ver guía de revisión →</a></article>
          <article class="feature-card"><div class="feature-icon">↗</div><h3>Fuentes</h3><p>Avisos del equipo que mantiene PHP, de centros oficiales y de equipos que observaron ataques.</p><a routerLink="/fuentes">Consultar referencias →</a></article>
        </section>

        <section class="panel" style="margin-top:18px">
          <h2>Alcance y cautelas</h2>
          <div class="article-body">
            <p>El 9,2 sobre 10 indica que el fallo merece atención urgente. No quiere decir que todos los sitios hayan sido atacados ni que un ataque vaya a funcionar siempre: depende de cómo esté instalado PHP y de las protecciones del servidor.</p>
            <p>El proveedor que administra el servidor puede poner el arreglo sin cambiar el número visible de PHP. Por eso hay que revisar su aviso y el paquete instalado. El PHP de una ventana de comandos puede ser distinto del que atiende las visitas a la web.</p>
            <p>El 23 de octubre PHP informó de otro caso distinto, con el código CVE-2026-115560. Solo afecta a una combinación poco habitual de ajustes y programa; se explica en las páginas de protección y verificación.</p>
          </div>
          <div class="tag-row"><span class="tag">Última revisión: 31 oct 2026</span><span class="tag">Fuentes primarias enlazadas</span><span class="tag">Sin pruebas intrusivas</span></div>
        </section>
      </section>
    </div>
  `,
})
export class HomePageComponent {}
