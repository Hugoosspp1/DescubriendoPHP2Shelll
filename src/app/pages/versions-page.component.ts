import { Component, computed, signal } from '@angular/core';
import { downloadFile } from '../download-file';

interface InventoryItem {
  id: number;
  name: string;
  version: string;
  checked: boolean;
}

function isInventoryItem(value: unknown): value is InventoryItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Partial<InventoryItem>;
  return Number.isInteger(item.id)
    && typeof item.name === 'string'
    && typeof item.version === 'string'
    && typeof item.checked === 'boolean';
}

@Component({
  selector: 'dps-versions',
  standalone: true,
  template: `
    <div class="page-heading">
      <div class="eyebrow">QUÉ VERSIONES HAY QUE ACTUALIZAR</div>
      <h1>Versiones afectadas y corregidas</h1>
      <p>Busca el número de PHP que usa el servidor de la web y compáralo con esta tabla. Si no sabes dónde está, pregunta a quien administra el alojamiento.</p>
    </div>

    <div class="notice"><strong>Cómo leer la tabla</strong>Por ejemplo, PHP 8.4.27 es la primera versión de la rama 8.4 que incluye el arreglo. Si tu proveedor muestra otro número, pídele que confirme por escrito que el arreglo está incluido. No todos los proveedores cambian el número de la misma manera.</div>

    <section class="panel" style="margin-top:0">
      <h2>Versiones que ya incluyen el arreglo</h2>
      <p class="panel-intro">Actualiza al número indicado o a uno posterior de esa misma serie. Ejemplo: para PHP 8.4, el arreglo empieza en 8.4.27.</p>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Tu serie de PHP</th><th>Necesita actualización si tienes…</th><th>Primera versión corregida</th><th>Qué más debes saber</th></tr></thead><tbody>
        <tr><td>8.5</td><td>Cualquier versión anterior a 8.5.12</td><td><strong>8.5.12</strong></td><td>En Windows también comprueba la descarga actual del proveedor.</td></tr>
        <tr><td>8.4</td><td>Cualquier versión anterior a 8.4.27</td><td><strong>8.4.27</strong></td><td>Confirma que tu proveedor entregó el paquete corregido.</td></tr>
        <tr><td>8.3</td><td>Cualquier versión anterior a 8.3.36</td><td><strong>8.3.36</strong></td><td>Confirma que tu proveedor entregó el paquete corregido.</td></tr>
        <tr><td>8.2</td><td>Cualquier versión anterior a 8.2.35</td><td><strong>8.2.35</strong></td><td>El soporte normal de esta serie termina el 31 de diciembre de 2026; prepara el cambio a una serie más nueva.</td></tr>
        <tr><td>8.1 o anterior</td><td>Trátala como pendiente hasta comprobarla</td><td>Pregunta al proveedor</td><td>PHP ya no mantiene normalmente estas versiones. Algunos proveedores han preparado arreglos especiales; hay que confirmar el paquete exacto.</td></tr>
      </tbody></table></div>
      <div class="article-body" style="margin-top:15px">
        <p><strong>Ejemplo:</strong> si un servidor usa PHP 8.4.26, debe pasar como mínimo a 8.4.27. Si usa 8.3.35, debe pasar como mínimo a 8.3.36. El último número cambia dentro de cada serie; mira la fila de tu serie y no compares solo el primer número.</p>
        <p>El arreglo oficial se publicó para las series 8.2, 8.3, 8.4 y 8.5. Algunas empresas que mantienen Linux o servicios de alojamiento entregan el arreglo con un número de paquete propio. Pide el aviso de seguridad del proveedor: ese es el que indica si tu paquete está protegido.</p>
        <p>Wiz, el equipo que descubrió los fallos, informó que alguna de las versiones afectadas llega hasta PHP 5.4. PHP publicó cambios de código para ayudar a quienes todavía usan las series 7.4, 8.0 y 8.1, aunque ya no las mantiene normalmente. Para versiones más antiguas, pregunta al proveedor y planifica una actualización; no supongas que están protegidas.</p>
        <p><strong>Si el servidor tiene PHP 8.1 o anterior:</strong> no hay una actualización normal del proyecto PHP que puedas instalar como en las filas de arriba. Pregunta a la empresa que mantiene el servidor si ya puso el arreglo; pide el número exacto del paquete y el enlace al aviso. Si no puede confirmarlo, planifica cambiar a una versión actual.</p>
        <p>PHP 8.6.0 todavía era una versión de prueba, no una versión final para sitios reales. Para un servicio público usa una versión estable y mantenida.</p>
      </div>
      <div class="inline-actions">
        <a class="text-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener">Informe de quien descubrió los fallos ↗</a>
        <a class="text-link" href="https://www.php.net/archive/2026.php#2026-10-21-5" target="_blank" rel="noopener">Aviso de PHP ↗</a>
        <a class="text-link" href="https://www.php.net/supported-versions.php" target="_blank" rel="noopener">Versiones que PHP aún mantiene ↗</a>
        <a class="text-link" href="https://www.php.net/downloads.php" target="_blank" rel="noopener">Descargas oficiales ↗</a>
      </div>
    </section>

    <div class="content-grid">
      <section class="panel">
        <h2>Qué anotar de cada servidor</h2>
        <div class="article-body">
          <ul>
            <li>La versión de PHP que atiende las visitas, además de la que haya en la terminal del administrador.</li>
            <li>Cómo funciona PHP en ese servidor: por ejemplo, integrado en Apache o mediante PHP-FPM.</li>
            <li>El nombre del proveedor, el sistema y el paquete instalado; guarda el enlace al aviso que confirma la corrección.</li>
            <li>Cuántas copias del servidor hay y cuáles siguen encendidas, incluidos contenedores, colas y copias de prueba.</li>
            <li>Los límites de tamaño de formularios y archivos, y si está encendida la función de mostrar el avance de las subidas.</li>
          </ul>
          <p>Un servidor puede tener una versión de PHP para la terminal y otra distinta para la web. Por eso, pide al proveedor que confirme la que atiende las visitas.</p>
        </div>
        <pre class="code-block">php -v
php --ini
php -i</pre>
        <p class="panel-intro">Estos comandos sirven al equipo técnico como pista. No prueban por sí solos qué PHP recibe las visitas; esa confirmación debe darla el panel del alojamiento o quien administra el servidor.</p>
      </section>

      <aside class="panel">
        <h2>Versiones antiguas y Windows</h2>
        <div class="notice"><strong>Una versión antigua no está protegida por ser antigua</strong>PHP 8.1 y anteriores ya no reciben actualizaciones normales del proyecto. Tu empresa de alojamiento puede haber preparado una corrección propia: pide el aviso y confirma que el paquete está instalado.</div>
        <h3>Nota para Windows</h3>
        <p class="panel-intro">El 26 de octubre, PHP volvió a publicar los paquetes de Windows <code>8.5.12-1</code>, <code>8.4.27-1</code>, <code>8.3.36-1</code> y <code>8.2.35-1</code>. El sufijo <code>-1</code> indica que se rehizo el paquete para Windows; el número principal de PHP no cambia. Incluye otra corrección, para CVE-2026-111497, en Brotli, una pieza que comprime y descomprime datos. Es un problema separado de PHP2Shell. PHP explica que en Windows puede alcanzarse mediante cURL si está activada la descompresión automática de respuestas; esa opción viene desactivada por defecto en cURL, aunque algunas aplicaciones pueden activarla.</p>
        <a class="text-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener">Avisos recientes de PHP ↗</a>
      </aside>
    </div>

    <div class="content-grid">
      <section class="panel">
        <h2>Lista de equipos revisados</h2>
        <p class="panel-intro">Añade aquí cada servidor o copia de PHP, escribe la versión y marca lo que ya confirmaste. La lista se guarda en este navegador y puede descargarse; no se envía a ningún servidor.</p>
        <div class="filter-row">
          <button class="filter-chip" [class.selected]="filter()==='Todas'" (click)="filter.set('Todas')">Todos</button>
          <button class="filter-chip" [class.selected]="filter()==='Pendiente'" (click)="filter.set('Pendiente')">Pendientes</button>
          <button class="filter-chip" [class.selected]="filter()==='Comprobado'" (click)="filter.set('Comprobado')">Comprobados</button>
        </div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Componente</th><th>Versión / revisión</th><th>Verificación</th><th>Acción</th></tr></thead><tbody>
          @for (item of filteredItems(); track item.id) {
            <tr><td><strong>{{item.name}}</strong></td><td><input [value]="item.version" (input)="setVersion(item.id,$any($event.target).value)" [attr.aria-label]="'Versión para '+item.name" placeholder="Ej. 8.4.27 / paquete" style="max-width:180px;background:var(--surface-soft);border:1px solid var(--line);border-radius:5px;padding:6px;color:var(--text);font-size:10px"></td><td><span class="status-chip" [class.ok]="item.checked">{{item.checked?'Comprobado':'Pendiente'}}</span></td><td><div class="inline-actions"><button class="filter-chip" type="button" (click)="toggle(item.id)">{{item.checked?'Desmarcar':'Marcar'}}</button><button class="filter-chip" type="button" (click)="remove(item.id)" [attr.aria-label]="'Eliminar '+item.name">Eliminar</button></div></td></tr>
          }
        </tbody></table></div>
        <div class="form-field"><label for="new-component">Añadir un servidor</label><input id="new-component" [value]="newName()" (input)="newName.set($any($event.target).value)" placeholder="Ej. API TwinTeach de pruebas"><div class="inline-actions"><button class="btn-primary" (click)="add()">Añadir +</button><button class="btn-secondary" (click)="download()">Descargar lista ↓</button><span class="copy-feedback" aria-live="polite">{{message()}}</span></div></div>
      </section>
      <aside class="panel">
        <h2>Otros dos avisos de PHP</h2>
        <div class="article-body">
          <p><strong>CVE-2026-115560:</strong> otro fallo poco común, anunciado el 23 de octubre. No forma parte de PHP2Shell. Si la aplicación de tu servidor usa los ajustes de sesión descritos por PHP, desactiva temporalmente el indicador de avance de archivos y sigue el aviso oficial hasta que haya arreglo.</p>
          <p><strong>CVE-2026-111497:</strong> un problema distinto en una pieza que sirve para comprimir y descomprimir datos. PHP volvió a publicar sus paquetes de Windows el 26 de octubre para incluir su arreglo. Si usas Windows, descarga la versión actual.</p>
        </div>
        <div class="inline-actions"><a class="text-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener">Ver avisos PHP ↗</a></div>
      </aside>
    </div>
  `,
})
export class VersionsPageComponent {
  readonly filter = signal('Todas');
  readonly newName = signal('');
  readonly message = signal('');
  readonly items = signal<InventoryItem[]>([
    { id: 1, name: 'PHP que atiende la web', version: '', checked: false },
    { id: 2, name: 'Servidor de TwinTeach / Laravel', version: '', checked: false },
    { id: 3, name: 'Empresa o paquete que lo actualiza', version: '', checked: false },
    { id: 4, name: 'Copias de prueba y tareas automáticas', version: '', checked: false },
    { id: 5, name: 'Otros programas que incluyen PHP', version: '', checked: false },
  ]);
  readonly filteredItems = computed(() => this.items().filter(item =>
    this.filter() === 'Todas' || (this.filter() === 'Comprobado') === item.checked));

  constructor() {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('dps-inventory') : null;
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(isInventoryItem)) this.items.set(parsed);
      }
    } catch {
      // Keep the default inventory if browser storage is unavailable or invalid.
    }
  }

  private persist(): boolean {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem('dps-inventory', JSON.stringify(this.items()));
      return true;
    } catch {
      return false;
    }
  }

  toggle(id: number): void {
    this.items.update(items => items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    this.message.set(this.persist() ? 'Inventario actualizado.' : 'No se pudo guardar el inventario en este navegador.');
  }

  remove(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
    this.message.set(this.persist() ? 'Componente eliminado.' : 'Componente eliminado en esta sesión; no se pudo guardar el cambio.');
  }

  setVersion(id: number, version: string): void {
    this.items.update(items => items.map(item => item.id === id ? { ...item, version } : item));
    if (!this.persist()) this.message.set('No se pudo guardar el inventario en este navegador.');
  }

  add(): void {
    const name = this.newName().trim();
    if (!name) {
      this.message.set('Escribe un nombre primero.');
      return;
    }
    this.items.update(items => [...items, {
      id: Math.max(0, ...items.map(item => item.id)) + 1,
      name,
      version: '',
      checked: false,
    }]);
    const saved = this.persist();
    this.newName.set('');
    this.message.set(saved ? 'Componente añadido.' : 'Componente añadido, pero no se pudo guardar en este navegador.');
  }

  download(): void {
    const rows = this.items().map(item => [item.name, item.version, item.checked ? 'Sí' : 'No']);
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const body = ['COMPONENTE;VERSION;COMPROBADO', ...rows.map(row => row.map(escape).join(';'))].join('\n');
    downloadFile('inventario-php2shell.csv', '\uFEFF' + body, 'text/csv;charset=utf-8');
    this.message.set('Inventario exportado.');
  }
}
