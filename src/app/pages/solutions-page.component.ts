import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { downloadFile } from '../download-file';
import { restoreChecklistProgress, saveChecklistProgress } from '../checklist-storage';

@Component({
  selector: 'dps-solutions',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-heading">
      <div class="eyebrow">PLAN PARA PROTEGER EL SERVIDOR</div>
      <h1>Plan de protección</h1>
      <p>Empieza por actualizar PHP en los servidores de la web. Después reinicia los servicios y comprueba que todos usan la versión nueva. Los cambios temporales de esta página solo reducen algunos riesgos; no sustituyen la actualización.</p>
    </div>

    <div class="notice"><strong>La solución completa es instalar el PHP corregido</strong>Un filtro de Internet o cambiar un ajuste no arregla el fallo de PHP. Instala la actualización oficial o la versión que tu proveedor confirme que ya incluye el arreglo. Si no puedes hacerlo enseguida, limita el acceso público al servidor mientras lo corriges.</div>

    <div class="content-grid" style="margin-top:0">
      <section class="panel">
        <h2>Orden recomendado de respuesta</h2>
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-marker">01</span><div><strong>Empieza por los servidores públicos</strong><p>Localiza las webs y servicios que cualquiera puede visitar. Incluye el servidor de la página, la API, contenedores, alojamiento contratado y equipos de prueba.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">02</span><div><strong>Comprueba qué PHP tienes</strong><p>Apunta quién lo proporciona y cuál es la versión instalada. Algunos proveedores entregan el arreglo manteniendo un número de versión distinto; pide el boletín que lo confirme.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">03</span><div><strong>Instala el arreglo y reinicia</strong><p>Actualiza desde una fuente oficial. Reinicia el servidor web y todos los procesos que trabajan continuamente, para que no sigan usando una copia antigua.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">04</span><div><strong>Revisa si hubo actividad extraña</strong><p>Guarda los registros antes de que se borren y busca programas, archivos, cuentas o conexiones que nadie del equipo reconozca. AWS vio intentos en sus equipos señuelo desde el 17 de octubre.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">05</span><div><strong>Deja constancia</strong><p>Anota qué versión instalaste, cuándo reiniciaste cada servidor y qué pruebas hiciste. Revisa también el aviso separado CVE-2026-115560.</p></div></div>
        </div>
      </section>
      <aside class="panel">
        <h2>Versiones que incluyen el arreglo</h2>
        <div class="source-list">
          <div class="source-link"><span class="source-mark">8.5</span><span class="source-info"><strong>8.5.12 o posterior</strong><small>Paquete del proveedor confirmado</small></span></div>
          <div class="source-link"><span class="source-mark">8.4</span><span class="source-info"><strong>8.4.27 o posterior</strong><small>Paquete del proveedor confirmado</small></span></div>
          <div class="source-link"><span class="source-mark">8.3</span><span class="source-info"><strong>8.3.36 o posterior</strong><small>Paquete del proveedor confirmado</small></span></div>
          <div class="source-link"><span class="source-mark">8.2</span><span class="source-info"><strong>8.2.35 o posterior</strong><small>Planifica la migración; soporte acaba el 31 dic</small></span></div>
        </div>
        <p class="panel-intro" style="margin-top:13px">Si tienes PHP 8.1 o anterior, pregunta al proveedor si preparó un arreglo para esa versión. No des el servidor por protegido solo porque el número parezca alto.</p>
        <a class="text-link" routerLink="/versiones">Ver la tabla y las notas →</a>
      </aside>
    </div>

    <section class="panel post-update" style="margin-top:17px" aria-labelledby="post-update-title">
      <h2 id="post-update-title">Después de actualizar, comprueba que TwinTeach sigue funcionando</h2>
      <p class="panel-intro">El arreglo de PHP y la comprobación de la web son dos tareas distintas. El equipo puede revisar las funciones normales del servicio sin probar a explotar el fallo.</p>
      <div class="post-update-grid">
        <article><span>01</span><h3>Prueba las pantallas y la API</h3><p>Abre la web, inicia sesión y comprueba las funciones principales que envían o reciben datos.</p></article>
        <article><span>02</span><h3>Comprueba formularios y archivos</h3><p>Si TwinTeach permite adjuntar archivos, confirma con archivos de prueba normales que la función sigue trabajando.</p></article>
        <article><span>03</span><h3>Revisa tareas que siguen activas</h3><p>Confirma que las colas de trabajo, tareas automáticas y copias de prueba también usan el PHP corregido.</p></article>
        <article><span>04</span><h3>Guarda el resultado</h3><p>Anota las versiones, los servidores reiniciados, la hora y cualquier error que aparezca después del cambio.</p></article>
      </div>
      <div class="notice"><strong>No es necesario probar el exploit en la web real</strong>Una prueba de ataque puede afectar a la disponibilidad y no demuestra que el sistema esté protegido. Confirma la versión y el paquete con el proveedor y revisa los registros.</div>
      <a class="text-link" routerLink="/verificacion">Abrir la lista completa de comprobación →</a>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Medidas temporales mientras llega la actualización</h2>
      <p class="panel-intro">PHP publicó estos cambios para reducir algunas formas de provocar el fallo. Debe aplicarlos quien administra el servidor, y comprobarlos allí mismo. No convierten una versión vulnerable en una versión corregida.</p>
      <div class="content-grid" style="margin-top:0">
        <section class="article-body">
          <h3>Para reducir el riesgo del primer fallo</h3>
          <ul>
          <li><code>memory_limit=-1</code> quita el límite de memoria que PHP impone a cada visita. PHP recomienda este ajuste para evitar el caso de fallo estudiado, pero puede dejar que una petición consuma mucha memoria. Solo debe configurarlo quien administra el servidor y mantener otro límite general de seguridad. No lo cambies por tu cuenta.</li>
            <li><code>post_max_size</code> limita el tamaño total de lo que una persona puede enviar en un formulario. PHP propone 8M si la web no recibe archivos y 32M si sí los necesita. <code>upload_max_filesize</code> limita cada archivo y debe ser menor que el límite total. Ajusta estos valores a lo que realmente necesita tu web.</li>
            <li>El servidor web o el filtro que está delante también debe limitar el tamaño total de cada envío, cuántos campos y archivos acepta y la cantidad de texto de cada parte. Así se frena una petición desmesurada antes de que llegue a PHP.</li>
          <li>Los límites deben funcionar aunque la petición no indique claramente cuánto ocupa. No pidas que se sustituyan por ciertos límites de memoria del sistema operativo (<code>RLIMIT_AS</code> o <code>RLIMIT_DATA</code>): PHP advierte que podrían provocar el tipo de fallo que se intenta evitar.</li>
          </ul>
        </section>
        <section class="article-body">
          <h3>Para reducir el riesgo del segundo fallo</h3>
          <ul>
            <li><code>session.upload_progress.enabled=0</code> apaga un indicador que muestra el avance de archivos que se están subiendo. PHP recomienda desactivarlo desde la configuración del servidor, antes de que PHP empiece a leer la petición, y reiniciar todos los procesos.</li>
            <li>Cambiar ese ajuste después, desde el programa de la web, llega demasiado tarde para algunas formas del fallo. Por eso debe hacerlo quien administra PHP en el servidor.</li>
            <li>En PHP 8.5 existe además <code>fatal_error_backtraces=0</code>, que apaga información detallada que PHP conserva cuando ocurre un error grave. Solo reduce una de las formas conocidas; no reemplaza la actualización.</li>
            <li>Corrige los ajustes inválidos que hagan que PHP muestre avisos al empezar a atender una visita. Esconder esos avisos no evita el fallo.</li>
            <li>Revisa las funciones de la web que reciben archivos o datos de personas y pueden provocar errores inesperados. El objetivo es evitar que una petición anónima lleve a PHP a una situación de error.</li>
          </ul>
        </section>
      </div>
      <div class="notice"><strong>Pide ayuda antes de cambiar memoria en producción</strong>Quitar el límite de memoria de PHP puede aumentar el consumo del servidor. Estas indicaciones son temporales y deben revisarse con quien administra el sistema.</div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Una barrera extra antes de PHP</h2>
      <div class="article-body">
        <p>Algunas webs tienen un filtro de seguridad delante del servidor. Puede ayudar a reconocer envíos raros, limitar el tamaño de los formularios y reducir el número de intentos repetidos. Si TwinTeach no espera que la gente suba archivos, el equipo técnico puede valorar bloquear ese tipo de envío temporalmente. Si sí necesita subir archivos, bloquearlos podría romper una función de la web.</p>
        <p>Un filtro solo ayuda con algunas peticiones. El fallo sigue dentro de PHP hasta que se instala la actualización. Mantén el arreglo como prioridad.</p>
        <details>
          <summary>Si TwinTeach usa el filtro AWS WAF</summary>
          <p>AWS publicó reglas para buscar peticiones relacionadas con PHP2Shell. Su guía recomienda revisar primero las peticiones que marcaría la regla, comprobar que las subidas y formularios normales siguen funcionando y solo después activar el bloqueo. El equipo debe revisar la versión actual de sus reglas y seguir la guía de AWS; estos pasos solo sirven para sistemas que ya usan AWS WAF.</p>
        </details>
      </div>
      <a class="text-link" href="https://aws.amazon.com/blogs/security/using-aws-waf-to-apply-mitigations-for-php2shell-rce-vulnerabilities-cve-2026-109618-and-cve-2026-109619/" target="_blank" rel="noopener">Guía de AWS para su filtro web ↗</a>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Otro aviso relacionado, pero distinto</h2>
      <div class="article-body">
        <p>El 23 de octubre, PHP publicó una nota sobre <strong>CVE-2026-115560</strong>. No es uno de los dos fallos PHP2Shell. Solo afecta a programas que cambian de forma muy concreta cómo guardan las sesiones antes de empezar una sesión de usuario, y que además dejan activa la función de progreso de archivos.</p>
        <p>La medida temporal recomendada por PHP es desactivar <code>session.upload_progress.enabled</code>. Comprueba el aviso oficial para saber si ya existe una actualización que corrija también este caso.</p>
      </div>
      <a class="text-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener">Seguir avisos del proyecto PHP ↗</a>
    </section>

    <div class="content-grid" style="margin-top:17px">
      <section class="panel">
        <h2>Lista de tareas para protegerse</h2>
        <p class="panel-intro">Marca cada tarea solo después de comprobarla. La lista se guarda en este navegador; no se envía a ningún servidor.</p>
        <div class="progress-label"><span>Progreso del plan</span><strong>{{completed()}} de {{tasks().length}} tareas</strong></div>
        <div class="progress-bar"><span [style.width.%]="progress()"></span></div>
        <div class="progress-label"><span>{{progress()}} % completado</span><span>{{tasks().length-completed()}} pendientes</span></div>
        <div class="checklist" style="margin-top:15px">
          @for (task of tasks(); track task.id) {
            <label class="check-item"><input type="checkbox" [checked]="task.done" (change)="toggle(task.id,$any($event.target).checked)"><span>{{task.title}}<small>{{task.description}}</small></span></label>
          }
        </div>
        <div class="inline-actions" style="margin-top:16px"><button class="btn-secondary" (click)="reset()">Empezar de nuevo</button><button class="btn-primary" (click)="download()">Descargar plan (.txt) ↓</button><span class="copy-feedback" aria-live="polite">{{feedback()}}</span></div>
      </section>
      <aside class="panel">
        <h2>Reglas sencillas</h2>
        <p class="panel-intro">Instala el arreglo, comprueba el resultado y anota lo que hiciste.</p>
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-marker">1</span><div><strong>Mientras tanto, limita el acceso</strong><p>Si aún no puedes actualizar, pide al administrador que cierre temporalmente el acceso público o limite quién puede llegar al servidor.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">2</span><div><strong>Instala una actualización oficial</strong><p>Descárgala del proveedor del sistema y guarda el número de versión y la fecha.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">3</span><div><strong>Comprueba todos los servidores</strong><p>Asegúrate de que ninguno sigue atendiendo visitas con la versión antigua.</p></div></div>
        </div>
        <div class="notice"><strong>Un filtro de Internet no sustituye la actualización</strong>Puede bloquear algunas peticiones conocidas, pero no todas las maneras posibles de provocar el fallo.</div>
        <a class="text-link" routerLink="/verificacion">Abrir los pasos de comprobación →</a>
      </aside>
    </div>
  `,
})
export class SolutionsPageComponent {
  readonly feedback = signal('');
  readonly tasks = signal([
    { id: 1, title: 'Hacer una lista de los servidores que usan PHP', description: 'Anotar la web, la API, las copias de prueba y quién administra cada una.', done: false },
    { id: 2, title: 'Confirmar con el proveedor qué arreglo entregó', description: 'Guardar el enlace a su aviso y el número exacto del paquete instalado.', done: false },
    { id: 3, title: 'Limitar el acceso mientras se actualiza', description: 'Si el arreglo tarda, pedir al equipo técnico que reduzca el acceso público.', done: false },
    { id: 4, title: 'Instalar el PHP corregido', description: 'Actualizar todos los servidores y guardar la fecha del cambio.', done: false },
    { id: 5, title: 'Reiniciar y comprobar todos los servicios', description: 'Incluir la web, cada copia del servidor y las tareas de Laravel que siguen abiertas.', done: false },
    { id: 6, title: 'Buscar señales de actividad extraña', description: 'Guardar registros y revisar programas, archivos, cuentas y conexiones.', done: false },
    { id: 7, title: 'Revisar el aviso adicional de PHP', description: 'Comprobar también el caso CVE-2026-115560 y la recomendación vigente.', done: false },
    { id: 8, title: 'Anotar el resultado y las dudas', description: 'Dejar las versiones, fechas y comprobaciones pendientes para el equipo responsable.', done: false },
  ]);
  readonly completed = computed(() => this.tasks().filter(task => task.done).length);
  readonly progress = computed(() => this.tasks().length
    ? Math.round(this.completed() / this.tasks().length * 100)
    : 0);

  constructor() {
    this.tasks.update(tasks => restoreChecklistProgress('dps-response-checklist', tasks));
  }

  toggle(id: number, done: boolean): void {
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, done } : task));
    this.feedback.set(saveChecklistProgress('dps-response-checklist', this.tasks())
      ? 'Progreso actualizado y guardado en este navegador.'
      : 'Progreso actualizado en esta sesión; el navegador no permitió guardarlo.');
  }

  reset(): void {
    this.tasks.update(tasks => tasks.map(task => ({ ...task, done: false })));
    this.feedback.set(saveChecklistProgress('dps-response-checklist', this.tasks())
      ? 'Lista restablecida.'
      : 'Lista restablecida en esta sesión; el navegador no permitió guardarla.');
  }

  download(): void {
    const content = 'PHP2SHELL — PLAN DE RESPUESTA\n\n'
      + this.tasks().map(task => `${task.done ? '[x]' : '[ ]'} ${task.title}\n    ${task.description}`).join('\n\n')
      + '\n\nGenerado localmente en el navegador.\n';
    downloadFile('plan-respuesta-php2shell.txt', content);
    this.feedback.set('Plan descargado.');
  }
}
