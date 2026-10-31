import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { downloadFile } from '../download-file';
import { restoreChecklistProgress, saveChecklistProgress } from '../checklist-storage';

@Component({
  selector: 'dps-verification',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-heading">
      <div class="eyebrow">PASOS PARA COMPROBAR LA PROTECCIÓN</div>
      <h1>¿Está protegido el servidor?</h1>
      <p>Esta guía explica qué debe revisar la persona que administra TwinTeach. No se conecta a ningún servidor ni comprueba la instalación por sí sola: sirve para seguir los pasos y anotar lo que se confirmó.</p>
    </div>

    <div class="notice"><strong>La idea principal</strong>Angular muestra las pantallas de TwinTeach. Laravel recibe las peticiones de datos de esas pantallas y usa PHP para contestar. El fallo está en PHP: hay que revisar el servidor Laravel, no solo la página Angular.</div>

    <section class="panel" style="margin-top:17px">
      <h2>Pasos concretos para TwinTeach</h2>
      <div class="article-body">
        <p><strong>Primero, entiende qué parte hace cada cosa.</strong> Angular normalmente entrega los archivos de la pantalla al navegador. Cuando la persona pide datos, Laravel los busca y responde desde el servidor usando PHP. El problema PHP2Shell afecta a ese programa PHP, no al aspecto de la página que ve el usuario.</p>
        <ol>
          <li><strong>Pregunta cómo está publicada la web.</strong> Pide un dibujo sencillo del recorrido: navegador → pantallas Angular → servidor de datos Laravel/PHP. Si parte de la página se prepara en otro servidor con Node, pregunta también por él; ese programa es diferente de PHP.</li>
          <li><strong>Haz una lista de todos los sitios donde hay PHP.</strong> Incluye la web principal y de prueba, cada copia del servidor, contenedores, tareas automáticas, correos, colas de trabajo y cualquier herramienta de administración. Un contenedor es una caja de software que lleva dentro sus propios programas y puede tener su propia copia de PHP.</li>
          <li><strong>Pregunta al proveedor o a quien administra el sistema.</strong> Solicita la versión de PHP que atiende las peticiones de Laravel, qué actualización instalaron, cuándo reiniciaron el servicio y cómo comprobaron cada servidor. No basta con que digan “hemos actualizado Laravel”.</li>
          <li><strong>Si tienes acceso a una terminal, consulta la versión como pista.</strong> Dentro del servidor o contenedor que ejecuta Laravel, <code>php -v</code> muestra la versión de PHP disponible allí y <code>php --ini</code> muestra sus archivos de ajustes. Los otros comandos de la sección inferior muestran la versión de Laravel y datos de la aplicación. Estas órdenes no demuestran por sí solas qué versión atiende las visitas.</li>
          <li><strong>Comprueba el servidor que recibe las visitas.</strong> Pide al proveedor que confirme el PHP de Apache o PHP-FPM y el paquete instalado en cada servidor. Apache y PHP-FPM son dos maneras habituales de ejecutar PHP. Si el PHP de la terminal difiere del PHP que atiende la web, manda el que atiende la web.</li>
          <li><strong>Instala la versión corregida.</strong> En las versiones de PHP que aún reciben actualizaciones, los mínimos publicados son 8.2.35, 8.3.36, 8.4.27 y 8.5.12. Si el proveedor entrega números propios, pídele el aviso que confirme que ya incluyó el arreglo. Actualizar Angular o Laravel no arregla por sí solo el programa PHP.</li>
          <li><strong>Reinicia y comprueba todas las copias.</strong> Al actualizar, reemplaza las cajas/servidores antiguos y reinicia el servicio web. Reinicia también las tareas y colas de Laravel que siguen funcionando durante mucho tiempo. Pide la lista final de cada máquina o contenedor, su versión y la hora del reinicio.</li>
          <li><strong>Revisa el periodo anterior a la actualización.</strong> Guarda los registros y busca visitas extrañas, errores repetidos, programas o archivos nuevos y conexiones desconocidas. Si hay indicios de intrusión, el equipo técnico debe investigarlo antes de dar el asunto por cerrado.</li>
        </ol>
        <details>
          <summary>Opcional: detalle del aviso CVE-2026-115560</summary>
          <p>PHP describe una combinación muy concreta: la aplicación empieza usando una forma de guardar sesiones llamada <code>php_binary</code> o <code>php_serialize</code>, luego la cambia a <code>php</code> desde el código antes de iniciar la sesión y mantiene activa la barra de avance de archivos. Pide a quien desarrolla TwinTeach que busque cambios al ajuste <code>session.serialize_handler</code> en el código y al administrador que confirme el valor de <code>session.upload_progress.enabled</code>. Si el programa no cambia la forma de guardar sesiones mientras funciona, PHP indica que esta ruta concreta no le afecta.</p>
        </details>
        <details>
          <summary>Opcional: comandos para el equipo técnico</summary>
          <p>Estas órdenes se escriben en la terminal del servidor. Sirven como pista; el proveedor debe confirmar además el programa que realmente atiende las visitas:</p>
          <pre class="code-block">php -v
php --ini
composer show laravel/framework
php artisan about</pre>
        </details>
      </div>
      <div class="notice"><strong>Resumen para TwinTeach</strong>Si Angular solo sirve los archivos de la pantalla, esa parte no usa PHP. Hay que actualizar y comprobar cada servidor PHP que usa Laravel para atender la API. Una página Angular actualizada no protege por sí sola al servidor Laravel.</div>
      <div class="article-body">
        <p><strong>Texto que puedes enviar al equipo de TwinTeach:</strong> «Por favor, confirmad qué servidores y tareas de TwinTeach usan PHP; qué versión usa el servicio que atiende las visitas; qué actualización del proveedor corrige PHP2Shell; cuándo reiniciasteis todos los servidores y trabajos de Laravel; si queda alguna copia antigua encendida; y qué registros revisasteis desde el 17 de octubre de 2026. Indicad también si el código cambia los ajustes de sesiones mencionados en el aviso adicional CVE-2026-115560».</p>
        <p>La respuesta debería decir qué se comprobó en producción y en las copias de prueba, no solo indicar que «la aplicación está actualizada».</p>
      </div>
      <div class="inline-actions">
        <a class="text-link" href="https://laravel.com/framework/docs/deployment" target="_blank" rel="noopener">Guía de despliegue de Laravel ↗</a>
        <a class="text-link" routerLink="/versiones">Ver la tabla de versiones corregidas →</a>
      </div>
    </section>

    <div class="content-grid" style="margin-top:0">
      <section class="panel">
        <h2>Lista de comprobación</h2>
        <p class="panel-intro">Marca los pasos que ya se comprobaron. Esta lista solo se guarda en este navegador y se puede descargar.</p>
        <div class="checklist">
          @for (step of steps(); track step.id) {
            <label class="check-item"><input type="checkbox" [checked]="step.done" (change)="toggle(step.id,$any($event.target).checked)"><span>{{step.title}}<small>{{step.description}}</small></span></label>
          }
        </div>
        <div class="progress-bar"><span [style.width.%]="progress()"></span></div>
        <div class="progress-label"><span>Pasos completados</span><strong>{{completed()}} / {{steps().length}} · {{progress()}}%</strong></div>
        <div class="inline-actions" style="margin-top:14px"><button class="btn-secondary" (click)="reset()">Reiniciar</button><button class="btn-secondary" (click)="printChecklist()">Imprimir / guardar como PDF</button><button class="btn-primary" (click)="download()">Exportar resultados ↓</button><span class="copy-feedback" aria-live="polite">{{feedback()}}</span></div>
      </section>

      <aside class="panel">
        <h2>¿Qué revisar primero?</h2>
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-marker">1</span><div><strong>Servidores que cualquiera puede visitar</strong><p>Empieza por TwinTeach en producción y los servicios que reciben formularios o archivos enviados por visitantes.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">2</span><div><strong>Procesos PHP que siguen encendidos</strong><p>El servidor puede mantener procesos abiertos para contestar más rápido. Todos deben reiniciarse después de la actualización.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">3</span><div><strong>Pruebas y tareas automáticas</strong><p>Revisa también la copia de prueba, los trabajos en segundo plano y los servidores internos, no solo la página principal.</p></div></div>
        </div>
        <div class="notice"><strong>Dato importante</strong>PHP señala que el modo de Apache con PHP integrado es especialmente arriesgado. También pide actualizar PHP-FPM, otra forma común de ejecutar PHP, y cualquier otra instalación que atienda visitas web.</div>
      </aside>
    </div>

    @if (printSummary()) {
      <section class="print-checklist-summary" aria-label="Resumen imprimible de la revisión">
        <p class="print-brand">Descubriendo PHP2Shell · Revisión de TwinTeach</p>
        <h1>Resumen de comprobación</h1>
        <p>Fecha del informe: 31 de octubre de 2026</p>
        <p class="print-progress"><strong>Progreso: {{completed()}} de {{steps().length}} pasos ({{progress()}}%)</strong></p>
        <ol class="print-checklist-list">
          @for (step of steps(); track step.id) {
            <li><strong>{{step.done ? 'Comprobado' : 'Pendiente'}}:</strong> {{step.title}}<p>{{step.description}}</p></li>
          }
        </ol>
        <p class="print-caution">Este resumen muestra únicamente lo que se marcó en la lista. No verifica los servidores ni demuestra por sí solo que estén protegidos.</p>
      </section>
    }

    <section class="panel" style="margin-top:17px">
      <h2>Cómo saber si el trabajo quedó bien hecho</h2>
      <div class="content-grid" style="margin-top:0">
        <div class="article-body">
          <h3>1. Haz una lista completa</h3>
          <p>Anota cada servidor, copia de prueba, contenedor y servicio que use PHP. Incluye dónde está, quién lo administra y si es accesible desde Internet.</p>
          <h3>2. Confirma el arreglo</h3>
          <p>Compara con las versiones corregidas de la tabla. Si el proveedor usa números distintos, pide el enlace a su aviso oficial y confirma cuál es el paquete instalado.</p>
          <h3>3. Asegúrate de que se reinició</h3>
          <p>Después de actualizar, el servicio debe dejar de usar los procesos antiguos. Comprueba el servidor web, los procesos de PHP, cada contenedor y cada copia detrás del balanceador.</p>
        </div>
        <div class="article-body">
          <h3>4. Lee también el aviso del 23 de octubre</h3>
          <p>PHP avisó de otro caso, CVE-2026-115560. Comprueba si TwinTeach usa la combinación poco habitual descrita y sigue la recomendación actual del fabricante.</p>
          <h3>5. Busca señales de actividad extraña</h3>
          <p>Guarda los registros antes de que se borren. Revisa desde el 17 de octubre como mínimo y busca visitas inusuales, errores, programas nuevos y conexiones que no reconozcas.</p>
          <h3>6. Deja por escrito el resultado</h3>
          <p>Anota qué comprobaste, cuándo, qué versión encontró cada servidor y qué cosas no pudiste revisar. Si algo parece una intrusión, avisa al equipo responsable y conserva una copia de los datos antes de limpiarlos.</p>
        </div>
      </div>
      <div class="inline-actions"><a class="text-link" routerLink="/versiones">Ver versiones →</a><a class="text-link" routerLink="/forense">Ver qué registros guardar →</a></div>
    </section>

    <div class="content-grid">
      <section class="panel">
        <h2>Qué cosas raras conviene buscar</h2>
        <div class="article-body">
          <ul>
            <li>Muchas peticiones con archivos o formularios extraños, especialmente si se repiten o provocan errores.</li>
            <li>Mensajes de que el servidor se quedó sin memoria, páginas de error repetidas o servicios PHP que se cierran y vuelven a arrancar.</li>
            <li>Programas que nadie reconoce, archivos nuevos o modificados, cuentas nuevas o tareas automáticas que el equipo no creó.</li>
            <li>Conexiones del servidor hacia direcciones o servicios que normalmente no usa.</li>
          </ul>
          <p>Una dirección, un mensaje o un filtro no detecta todos los ataques. Y una señal extraña no demuestra por sí sola que alguien haya entrado: hay que comprobar varias pistas juntas.</p>
        </div>
      </section>
      <aside class="panel">
        <h2>Cómo marcar el resultado</h2>
        <div class="source-list">
          <div class="source-link"><span class="source-mark">OK</span><span class="source-info"><strong>Actualizado</strong><small>El proveedor confirmó el arreglo y reiniciaste todos los servidores.</small></span></div>
          <div class="source-link"><span class="source-mark">!</span><span class="source-info"><strong>Aún por revisar</strong><small>No sabes qué versión usa el servidor web o puede quedar algún proceso antiguo.</small></span></div>
          <div class="source-link"><span class="source-mark">?</span><span class="source-info"><strong>Hay una señal sospechosa</strong><small>El equipo está reuniendo información para entender qué pasó.</small></span></div>
        </div>
        <p class="panel-intro" style="margin-top:12px">Actualizar corrige el fallo, pero no borra un programa malicioso que quizá se instaló antes ni cambia automáticamente las contraseñas.</p>
      </aside>
    </div>

    <section class="panel" style="margin-top:17px">
      <h2>Guías oficiales para seguir leyendo</h2>
      <div class="article-body"><p>Las guías de Reino Unido y Canadá recomiendan encontrar todos los equipos con PHP, actualizar primero los que están abiertos a Internet y revisar registros, programas, archivos, cuentas y conexiones. Si la organización usa un proveedor de alojamiento, pide que confirme la versión que atiende las visitas.</p></div>
      <div class="inline-actions"><a class="text-link" href="https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php" target="_blank" rel="noopener">Guía del NCSC británico ↗</a><a class="text-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener">Alerta del Centro Canadiense ↗</a><a class="text-link" href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener">Observaciones de AWS ↗</a></div>
    </section>
  `,
})
export class VerificationPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly feedback = signal('');
  readonly printSummary = signal(false);
  readonly steps = signal([
    { id: 1, title: 'Separar la página Angular del servidor Laravel', description: 'Anotar dónde se muestran las pantallas y dónde funciona PHP.', done: false },
    { id: 2, title: 'Hacer la lista de todos los equipos con PHP', description: 'Incluir web principal, prueba, contenedores y trabajos automáticos.', done: false },
    { id: 3, title: 'Empezar por los equipos que cualquiera puede visitar', description: 'Preguntar cuáles reciben visitas o archivos desde Internet.', done: false },
    { id: 4, title: 'Confirmar que el proveedor instaló el arreglo', description: 'Guardar el enlace del aviso y el número del paquete instalado.', done: false },
    { id: 5, title: 'Comprobar que el servidor web usa la versión nueva', description: 'No basta con revisar PHP en una terminal; preguntar qué versión atiende las visitas.', done: false },
    { id: 6, title: 'Reiniciar todos los servicios y tareas', description: 'Incluir PHP del sitio, copias del servidor y trabajos de Laravel que siguen activos.', done: false },
    { id: 7, title: 'Leer el aviso adicional del 23 de octubre', description: 'Comprobar también el caso CVE-2026-115560 y la recomendación actual de PHP.', done: false },
    { id: 8, title: 'Guardar y revisar los registros', description: 'Buscar errores, visitas extrañas, archivos nuevos y conexiones desconocidas.', done: false },
    { id: 9, title: 'Anotar qué se comprobó y qué falta revisar', description: 'Guardar fechas, versiones, resultados y dudas para el equipo responsable.', done: false },
  ]);
  readonly completed = computed(() => this.steps().filter(step => step.done).length);
  readonly progress = computed(() => this.steps().length
    ? Math.round(this.completed() / this.steps().length * 100)
    : 0);

  constructor() {
    this.steps.update(steps => restoreChecklistProgress('dps-verification-checklist', steps));
    const closePrintSummary = () => this.printSummary.set(false);
    window.addEventListener('afterprint', closePrintSummary);
    this.destroyRef.onDestroy(() => window.removeEventListener('afterprint', closePrintSummary));
  }

  toggle(id: number, done: boolean): void {
    this.steps.update(steps => steps.map(step => step.id === id ? { ...step, done } : step));
    this.feedback.set(saveChecklistProgress('dps-verification-checklist', this.steps())
      ? 'Resultado actualizado y guardado en este navegador.'
      : 'Resultado actualizado en esta sesión; el navegador no permitió guardarlo.');
  }

  reset(): void {
    this.steps.update(steps => steps.map(step => ({ ...step, done: false })));
    this.feedback.set(saveChecklistProgress('dps-verification-checklist', this.steps())
      ? 'Lista reiniciada.'
      : 'Lista reiniciada en esta sesión; el navegador no permitió guardarla.');
  }

  download(): void {
    const content = 'PHP2SHELL — VERIFICACIÓN TÉCNICA\n\n'
      + this.steps().map(step => `${step.done ? '[x]' : '[ ]'} ${step.title}\n${step.description}`).join('\n\n')
      + '\n';
    downloadFile('verificacion-php2shell.txt', content);
    this.feedback.set('Archivo descargado.');
  }

  printChecklist(): void {
    this.printSummary.set(true);
    requestAnimationFrame(() => window.print());
  }
}
