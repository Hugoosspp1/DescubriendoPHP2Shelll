import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dps-sources',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-heading">
      <div class="eyebrow">DE DÓNDE SALE LA INFORMACIÓN</div>
      <h1>Fuentes y cómo leerlas</h1>
      <p>Estos enlaces permiten revisar los datos por ti mismo. Primero consulta a quienes mantienen PHP y después al proveedor que instaló PHP en tu servidor.</p>
    </div>

    <div class="notice"><strong>Información revisada el 31 de octubre de 2026</strong>Los avisos pueden cambiar. Para proteger un servidor real, comprueba también lo que dice la empresa que lo aloja o mantiene.</div>

    <section class="panel" style="margin-top:0">
      <h2>1. Qué dice el equipo de PHP</h2>
      <p class="panel-intro">PHP es quien creó y mantiene el programa afectado. Sus avisos explican qué falló y qué actualizaciones lo corrigen.</p>
      <div class="source-list">
        <a class="source-link" href="https://www.php.net/archive/2026.php#2026-10-21-5" target="_blank" rel="noopener"><span class="source-mark">PHP</span><span class="source-info"><strong>Aviso de PHP · 21 oct 2026</strong><small>Qué falló, qué tipos de servidores tienen que actualizar y qué versiones incluyen el arreglo.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w" target="_blank" rel="noopener"><span class="source-mark">618</span><span class="source-info"><strong>Detalle de CVE-2026-109618</strong><small>Explicación ampliada del primer fallo y los límites de la medida temporal.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp" target="_blank" rel="noopener"><span class="source-mark">619</span><span class="source-info"><strong>Detalle de CVE-2026-109619</strong><small>Explicación ampliada del segundo fallo y sus medidas temporales.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.php.net/supported-versions.php" target="_blank" rel="noopener"><span class="source-mark">LTS</span><span class="source-info"><strong>Versiones de PHP que siguen recibiendo mantenimiento</strong><small>Indica qué series reciben actualizaciones del proyecto.</small></span><span class="source-arrow">↗</span></a>
      </div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>2. Números para localizar cada fallo</h2>
      <p class="panel-intro">CVE es un número único que se asigna a un problema de seguridad. Sirve para buscar el mismo fallo en avisos de distintos países y proveedores. NVD es una base pública que reúne información sobre esos fallos.</p>
      <div class="source-list">
        <a class="source-link" href="https://www.cve.org/CVERecord?id=CVE-2026-109618" target="_blank" rel="noopener"><span class="source-mark">CVE</span><span class="source-info"><strong>CVE-2026-109618</strong><small>Ficha pública del primer fallo, publicada por el equipo de PHP.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.cve.org/CVERecord?id=CVE-2026-109619" target="_blank" rel="noopener"><span class="source-mark">CVE</span><span class="source-info"><strong>CVE-2026-109619</strong><small>Ficha pública del segundo fallo, publicada por el equipo de PHP.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://nvd.nist.gov/vuln/detail/CVE-2026-109618" target="_blank" rel="noopener"><span class="source-mark">NVD</span><span class="source-info"><strong>Base NVD · CVE-2026-109618</strong><small>Otra ficha pública con descripción y enlaces al aviso del fabricante.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://nvd.nist.gov/vuln/detail/CVE-2026-109619" target="_blank" rel="noopener"><span class="source-mark">NVD</span><span class="source-info"><strong>Base NVD · CVE-2026-109619</strong><small>Ficha pública con más información y enlaces al fabricante.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noopener"><span class="source-mark">CISA</span><span class="source-info"><strong>Lista estadounidense de fallos usados en ataques</strong><small>Incluyó estos dos números el 26 de octubre de 2026.</small></span><span class="source-arrow">↗</span></a>
      </div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>3. Avisos de centros de ciberseguridad</h2>
      <div class="source-list">
        <a class="source-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener"><span class="source-mark">CA</span><span class="source-info"><strong>Centro Canadiense · actualización 27 oct</strong><small>Versiones corregidas y avisos públicos sobre ataques.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php" target="_blank" rel="noopener"><span class="source-mark">UK</span><span class="source-info"><strong>Centro del Reino Unido · 21 oct</strong><small>Qué equipos actualizar y qué señales buscar.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://advisories.ncsc.nl/2026/ncsc-2026-0443.html" target="_blank" rel="noopener"><span class="source-mark">NL</span><span class="source-info"><strong>Centro de Países Bajos</strong><small>Resumen del riesgo y recomendaciones de actualización.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://github.com/NCSC-NL/php2shell" target="_blank" rel="noopener"><span class="source-mark">NL</span><span class="source-info"><strong>Herramientas de Países Bajos</strong><small>Recursos para revisar sistemas; lee sus instrucciones antes de usarlos.</small></span><span class="source-arrow">↗</span></a>
      </div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>4. Quién descubrió el fallo y cómo comprobar Laravel</h2>
      <div class="source-list">
        <a class="source-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener"><span class="source-mark">WIZ</span><span class="source-info"><strong>Wiz · descubrimiento y fechas</strong><small>El equipo que encontró los fallos cuenta cómo los investigó y cuándo avisó a PHP.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.wiz.io/blog/php2shell-exploitation-so-far" target="_blank" rel="noopener"><span class="source-mark">WIZ</span><span class="source-info"><strong>Wiz · qué actividad observó, 27 oct</strong><small>Qué vio el equipo en sus propios sistemas; no representa todos los servidores de Internet.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://laravel.com/framework/docs/deployment" target="_blank" rel="noopener"><span class="source-mark">LAR</span><span class="source-info"><strong>Laravel · después de actualizar</strong><small>Explica por qué también hay que reiniciar tareas y procesos del servidor que siguen abiertos.</small></span><span class="source-arrow">↗</span></a>
      </div>
      <p class="panel-intro">La guía de TwinTeach explica qué debe comprobar su equipo. Esta web no se conecta a la instalación ni verifica sus servidores.</p>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>5. Qué observaron AWS y otros equipos</h2>
      <div class="source-list">
        <a class="source-link" href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener"><span class="source-mark">AWS</span><span class="source-info"><strong>AWS · intentos contra servidores señuelo</strong><small>Cuenta cuándo vio intentos y advierte que no sabía si habrían funcionado en sitios reales.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://aws.amazon.com/blogs/security/using-aws-waf-to-apply-mitigations-for-php2shell-rce-vulnerabilities-cve-2026-109618-and-cve-2026-109619/" target="_blank" rel="noopener"><span class="source-mark">AWS</span><span class="source-info"><strong>AWS · filtro web como ayuda temporal</strong><small>Opciones para revisar y limitar envíos a servidores PHP; no sustituyen la actualización.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener"><span class="source-mark">PHP</span><span class="source-info"><strong>Avisos posteriores del proyecto PHP</strong><small>Incluye el aviso de sesiones del 23 de octubre y los paquetes de Windows rehechos el 26 de octubre.</small></span><span class="source-arrow">↗</span></a>
        <a class="source-link" href="https://www.cve.org/CVERecord?id=CVE-2026-115560" target="_blank" rel="noopener"><span class="source-mark">CVE</span><span class="source-info"><strong>CVE-2026-115560</strong><small>Ficha pública del otro problema, relacionado con una función para subir archivos.</small></span><span class="source-arrow">↗</span></a>
      </div>
      <div class="notice"><strong>No tomes una dirección como prueba</strong>Algunas direcciones publicadas pueden ser compartidas por muchas personas. Comprueba qué pasó en el servidor antes de bloquearlas o afirmar que hubo una intrusión.</div>
    </section>

    <section class="panel source-context" style="margin-top:17px" aria-labelledby="source-context-title">
      <h2 id="source-context-title">Por qué los informes de ataques pueden parecer distintos</h2>
      <div class="article-body">
        <p>AWS observó intentos en sus servidores señuelo; eso no prueba que el intento funcionara contra una web real. La actualización del Centro Canadiense del 27 de octubre citó informes públicos de explotación y señaló que CISA había añadido los fallos a su lista de vulnerabilidades usadas en ataques. Wiz, en cambio, dijo que no había observado ataques completos exitosos en sus propios datos hasta el 27 de octubre.</p>
        <p>Estas afirmaciones describen fuentes y sistemas de observación diferentes: un intento, un informe público y un ataque completo confirmado no significan lo mismo. Ninguna permite saber por sí sola si TwinTeach fue atacado; para eso hay que revisar los registros y los cambios de sus propios servidores.</p>
      </div>
      <div class="inline-actions">
        <a class="text-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener">Actualización canadiense →</a>
        <a class="text-link" href="https://www.wiz.io/blog/php2shell-exploitation-so-far" target="_blank" rel="noopener">Observaciones de Wiz →</a>
        <a class="text-link" href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener">Intentos observados por AWS →</a>
      </div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Cómo se preparó este informe</h2>
      <div class="article-body">
        <ul>
          <li>Para saber qué falló y qué actualización lo corrige, usamos los avisos del equipo de PHP.</li>
          <li>Para saber qué paquete tiene instalado un servidor, hay que consultar a la empresa que lo mantiene; puede usar números propios.</li>
          <li>Separamos un intento de ataque, una prueba de los investigadores, un informe de ataques y una intrusión confirmada. Son cosas distintas.</li>
          <li>Los datos se revisaron el 31 de octubre de 2026. Consulta los enlaces por si hubiera novedades después de esa fecha.</li>
        </ul>
      </div>
      <div class="inline-actions"><a class="text-link" routerLink="/incidente">Volver al informe →</a><a class="text-link" routerLink="/verificacion">Abrir comprobaciones →</a></div>
    </section>
  `,
})
export class SourcesPageComponent {}
