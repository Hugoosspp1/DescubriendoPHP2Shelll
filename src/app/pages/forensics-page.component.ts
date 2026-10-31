import { Component, signal } from '@angular/core';
import { downloadFile } from '../download-file';

@Component({
  selector: 'dps-forensics',
  standalone: true,
  template: `
    <div class="page-heading">
      <div class="eyebrow">REVISAR SI ALGUIEN ENTRÓ</div>
      <h1>Buscar señales de un ataque</h1>
      <p>Esta página ayuda a anotar lo que se encontró y cuándo. El formulario no se manda a Internet: permanece abierto en esta página y puedes descargar una nota para compartirla con el equipo responsable.</p>
    </div>

    <div class="notice"><strong>Actualiza, pero guarda primero los datos importantes</strong>Si aparecen señales de un posible ataque, avisa al equipo técnico. Guarda los registros y coordina la actualización: no dejes el servidor vulnerable expuesto, pero tampoco borres las pruebas antes de revisarlas.</div>

    <div class="content-grid" style="margin-top:0">
      <section class="panel">
        <h2>Apuntar lo que se encontró</h2>
        <p class="panel-intro">La información no se envía al sitio ni se conserva al cerrar esta página. No escribas contraseñas o datos personales que no hagan falta.</p>
        <div class="form-field"><label for="case-id">Referencia del caso</label><input id="case-id" [value]="caseId()" (input)="caseId.set($any($event.target).value)" placeholder="Ej. IR-2026-001"></div>
        <div class="form-field"><label for="evidence-date">Fecha y hora de observación (hora local)</label><input id="evidence-date" type="datetime-local" [value]="observedAt()" (input)="observedAt.set($any($event.target).value)"></div>
        <div class="form-field"><label for="source">Servidor o registro donde apareció</label><input id="source" [value]="source()" (input)="source.set($any($event.target).value)" placeholder="Nombre del servidor, archivo de registro o herramienta…"></div>
        <div class="form-field"><label for="notes">Qué viste y a qué hora</label><textarea id="notes" [value]="notes()" (input)="notes.set($any($event.target).value)" placeholder="Escribe lo que viste, sin cambiarlo; anota la hora y zona horaria, quién lo obtuvo y qué falta comprobar…"></textarea></div>
        <div class="form-field"><label for="confidence">¿Qué tan seguro estás de lo que significa?</label><select id="confidence" [value]="confidence()" (change)="confidence.set($any($event.target).value)"><option>Sin evaluar</option><option>Bajo</option><option>Medio</option><option>Alto</option></select></div>
        <div class="inline-actions"><button class="btn-primary" (click)="download()">Descargar nota (.txt) ↓</button><button class="btn-secondary" (click)="clear()">Vaciar formulario</button><span class="copy-feedback" aria-live="polite">{{feedback()}}</span></div>
      </section>
      <aside class="panel">
        <h2>Qué información guardar</h2>
        <div class="article-body">
          <ul>
            <li>Registros de quién visitó la web y qué pidió. Incluye los del servidor web y PHP, si existen.</li>
            <li>Registros de inicio de sesión, aplicación, equipo de seguridad, cortafuegos y conexiones a Internet.</li>
            <li>La versión de PHP y del servidor, la fecha de actualización y los ajustes activos en ese momento.</li>
            <li>Programas que se ejecutaron, archivos que aparecieron o cambiaron, nuevas cuentas y tareas automáticas desconocidas.</li>
            <li>Guarda una copia original sin modificar. Anota quién la copió, cuándo, de qué equipo y con qué herramienta.</li>
          </ul>
          <h3>¿Desde qué fecha buscar?</h3>
          <p>AWS dijo que vio un intento contra uno de sus servidores señuelo el 17 de octubre, antes del anuncio público. Empieza a revisar desde esa fecha si tienes registros, y continúa hasta el día en que instalaste el arreglo. El intento fue contra el señuelo de AWS: no significa que atacaran tu servidor ese día.</p>
        </div>
        <div class="notice"><strong>Guarda el original</strong>Apunta primero lo que muestra el registro. Después escribe lo que crees que significa. No cambies ni borres la única copia.</div>
      </aside>
    </div>

    <section class="panel" style="margin-top:17px">
      <h2>Direcciones que AWS vio en sus servidores señuelo</h2>
      <p class="panel-intro">AWS publicó estas direcciones de Internet asociadas a intentos del 17 y el 21 de octubre de 2026. Una dirección puede ser compartida o usada por otras personas; encontrarla en un registro no demuestra por sí solo que el ataque funcionó.</p>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Dirección de Internet</th><th>Fecha que indicó AWS</th><th>Qué hacer con el dato</th></tr></thead><tbody>
        <tr><td><code>103.216.220.92</code></td><td>17 oct 2026</td><td>Busca esa dirección y la hora en los registros; no basta con encontrarla para afirmar que hubo una entrada.</td></tr>
        <tr><td><code>31.223.184.166</code></td><td>21 oct 2026</td><td>Comprueba qué página visitó y qué pasó después; no la bloquees sin revisar.</td></tr>
        <tr><td><code>37.19.200.5</code></td><td>21 oct 2026</td><td>Puede ser una dirección compartida; busca otras señales también.</td></tr>
        <tr><td><code>134.209.159.64</code></td><td>21 oct 2026</td><td>Puede ser una dirección compartida; busca otras señales también.</td></tr>
        <tr><td><code>103.114.163.188</code></td><td>21 oct 2026</td><td>Puede ser una dirección compartida; busca otras señales también.</td></tr>
        <tr><td><code>95.217.98.37</code></td><td>21 oct 2026</td><td>Puede ser una dirección compartida; busca otras señales también.</td></tr>
      </tbody></table></div>
      <div class="notice"><strong>No las bloquees ni las señales como culpables sin revisar</strong>Compara la dirección con la hora, la página solicitada y lo que hizo el servidor después. AWS dijo que no podía confirmar si aquellos intentos habrían funcionado en sitios reales.</div>
      <a class="text-link" href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener">Leer lo que observó AWS ↗</a>
    </section>

    <div class="content-grid">
      <section class="panel">
        <h2>Señales que conviene mirar juntas</h2>
        <div class="article-body">
          <ul>
            <li>Visitas que envían formularios o archivos raros, sobre todo si repiten el mismo patrón.</li>
            <li>Errores de memoria o muchas páginas de “error del servidor” (500), sobre todo después de enviar formularios o archivos.</li>
            <li>Cookies de sesión del sitio inusualmente grandes o con contenido extraño después de recibir archivos. Wiz destacó el nombre <code>PHPSESSID</code> en sus pruebas.</li>
            <li>Programas y archivos nuevos que el equipo no instaló, o cambios en la página que nadie hizo.</li>
            <li>El servidor PHP que se cierra y vuelve a arrancar muchas veces, o conexiones nuevas hacia otros equipos o sitios de Internet.</li>
          </ul>
          <p>Los registros de la aplicación pueden no mostrar todo. Compara los del servidor web, PHP, equipo de seguridad y red. Una señal aislada puede ser un error normal; varias señales relacionadas merecen una investigación.</p>
        </div>
        <div class="notice"><strong>Ejemplo sencillo</strong>Una página de error aislada puede deberse a un fallo normal. Si a la misma hora aparecen muchos envíos de archivos extraños, errores de memoria y después un programa o archivo que el equipo no reconoce, guarda los registros y avisa de inmediato al equipo técnico. Esa combinación merece investigación; por sí sola tampoco es una conclusión final.</div>
        <details>
          <summary>Dato concreto para quien revisa los registros</summary>
          <p>AWS recomienda buscar visitas que envían formularios con archivos (método POST y tipo <code>multipart/form-data</code>) y el texto <code>PHP_SESSION_UPLOAD_PROGRESS</code>. Comprueba si después hubo errores de memoria, errores 500, cookies <code>PHPSESSID</code> inusualmente grandes o programas nuevos. Estas señales ayudan a buscar; no prueban por sí solas que el ataque funcionó.</p>
        </details>
      </section>
      <aside class="panel">
        <h2>Qué dicen otros organismos</h2>
        <div class="source-list">
          <a class="source-link" href="https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php" target="_blank" rel="noopener"><span class="source-mark">UK</span><span class="source-info"><strong>Centro de ciberseguridad del Reino Unido</strong><small>Actualizar los equipos y buscar cambios desconocidos</small></span><span class="source-arrow">↗</span></a>
          <a class="source-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener"><span class="source-mark">CA</span><span class="source-info"><strong>Centro Canadiense</strong><small>Versiones que corregir y señales que revisar</small></span><span class="source-arrow">↗</span></a>
          <a class="source-link" href="https://github.com/NCSC-NL/php2shell" target="_blank" rel="noopener"><span class="source-mark">NL</span><span class="source-info"><strong>Centro de ciberseguridad de Países Bajos</strong><small>Herramientas comunitarias; revisa sus instrucciones antes de usarlas</small></span><span class="source-arrow">↗</span></a>
        </div>
      </aside>
    </div>

    <section class="panel" style="margin-top:17px">
      <h2>Qué hacer si encuentras algo sospechoso</h2>
      <div class="timeline">
        <div class="timeline-item"><span class="timeline-marker">1</span><div><strong>Guarda una copia de los registros</strong><p>No borres ni edites el original. Anota de qué equipo salió, la fecha, la hora y la zona horaria.</p></div></div>
        <div class="timeline-item"><span class="timeline-marker">2</span><div><strong>Avisa a quien administra el sistema</strong><p>Comparte la hora de la señal y el nombre del servidor. Pide que compruebe qué visita ocurrió justo antes y después.</p></div></div>
        <div class="timeline-item"><span class="timeline-marker">3</span><div><strong>Limita el acceso y revisa el equipo</strong><p>El equipo técnico puede retirar temporalmente el servidor de Internet mientras conserva una copia para investigar. Debe buscar programas, cuentas y archivos que no reconozca.</p></div></div>
        <div class="timeline-item"><span class="timeline-marker">4</span><div><strong>Corrige y protege las claves</strong><p>Instala PHP corregido. Si hay señales de que se leyeron contraseñas o claves, cámbialas después de contener la entrada. Si el servidor fue alterado, el equipo debe restaurarlo desde una copia fiable.</p></div></div>
      </div>
      <div class="notice"><strong>No concluyas por una señal sola</strong>Una visita rara o un error puede ser inocente. La hora y la relación entre varias señales ayudan a saber si hay un problema real.</div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>¿Se sabe si alguien consiguió entrar?</h2>
      <div class="article-body">
        <p><strong>Hay informes de actividad, pero no una prueba de que entraran en TwinTeach.</strong> AWS observó intentos contra sus propios servidores señuelo antes y después del anuncio. El Centro Canadiense recogió informes públicos de ataques en curso. Wiz dijo el 27 de octubre que no había visto un ataque completo exitoso en sus propios datos, aunque mencionó información pública de terceros que sugería un caso bajo ciertas condiciones.</p>
        <p>Esas fuentes miran equipos distintos y, por eso, pueden describir cosas distintas. Para saber qué pasó en TwinTeach hay que revisar sus registros desde antes del parche: quién visitó el servidor, qué pidió, qué errores aparecieron y si después se ejecutaron programas o cambiaron archivos. Una dirección de Internet sospechosa por sí sola no basta para confirmar ni descartar una intrusión.</p>
        <p>Si varias señales apuntan a una entrada, avisa al equipo de seguridad, guarda copias de los registros y busca archivos o cuentas que no deberían existir. Si hay motivos para pensar que se leyeron claves o contraseñas, cámbialas después de contener el problema. Instalar el arreglo detiene este fallo, pero no elimina automáticamente un programa malicioso que alguien pudiera haber dejado antes.</p>
      </div>
      <div class="inline-actions">
        <a class="text-link" href="https://www.wiz.io/blog/php2shell-exploitation-so-far" target="_blank" rel="noopener">Qué actividad registró Wiz ↗</a>
        <a class="text-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener">Actualización del Centro Canadiense ↗</a>
        <a class="text-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener">Qué señales detalló Wiz ↗</a>
      </div>
    </section>
  `,
})
export class ForensicsPageComponent {
  readonly caseId = signal('');
  readonly observedAt = signal(this.currentLocalDateTime());
  readonly source = signal('');
  readonly notes = signal('');
  readonly confidence = signal('Sin evaluar');
  readonly feedback = signal('');

  download(): void {
    const content = 'NOTA DE REVISIÓN · PHP2SHELL\n'
      + `Caso: ${this.caseId() || 'Sin asignar'}\n`
      + `Fecha y hora: ${this.observedAt() || 'No indicada'} (anota también la zona horaria)\n`
      + `Servidor o registro: ${this.source() || 'No indicado'}\n`
      + `Seguridad de la interpretación: ${this.confidence()}\n\n`
      + `QUÉ SE OBSERVÓ\n${this.notes() || 'Sin observaciones anotadas'}\n\n`
      + 'Guarda una copia original de los registros y anota quién la obtuvo y cuándo.\n';
    const filename = `${this.caseId().replace(/[^a-z0-9-_]/gi, '-') || 'nota-forense'}-php2shell.txt`;
    downloadFile(filename, content);
    this.feedback.set('Nota descargada.');
  }

  clear(): void {
    this.caseId.set('');
    this.observedAt.set(this.currentLocalDateTime());
    this.source.set('');
    this.notes.set('');
    this.confidence.set('Sin evaluar');
    this.feedback.set('Formulario vacío.');
  }

  private currentLocalDateTime(): string {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }
}
