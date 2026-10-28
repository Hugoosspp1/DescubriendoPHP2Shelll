import { Component, HostListener, computed, signal } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'dps-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="app-shell" [class.dark-theme]="darkMode()">
    <aside class="sidebar" [class.sidebar-open]="mobileMenu()">
      <a class="brand" routerLink="/" (click)="closeMobile()" aria-label="P2PBash Hugo, inicio">
        <span class="brand-mark">P<span>2</span></span>
        <span class="brand-copy"><strong>P2PBash_Hugo</strong><small>Investigación técnica</small></span>
      </a>
      <nav class="side-nav" aria-label="Navegación lateral">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMobile()"><span class="nav-icon">⌂</span> Inicio</a>
        <a routerLink="/incidente" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▣</span> El incidente</a>
        <a routerLink="/versiones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">◇</span> Versiones</a>
        <a routerLink="/soluciones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">⚙</span> Soluciones</a>
        <a routerLink="/verificacion" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">⛨</span> Verificación</a>
        <a routerLink="/forense" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▤</span> Análisis forense</a>
        <a routerLink="/fuentes" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▧</span> Fuentes</a>
      </nav>
      <div class="sidebar-spacer"></div>
      <a class="download-report" routerLink="/fuentes"><span class="report-icon">♧</span><span><strong>Consultar informe</strong><small>Fuentes oficiales · v1.0</small></span></a>
    </aside>
    <div class="mobile-scrim" [class.visible]="mobileMenu()" (click)="closeMobile()"></div>
    <main class="main-area">
      <header class="topbar">
        <button class="icon-button mobile-menu-button" (click)="toggleMobile()" aria-label="Abrir menú">☰</button>
        <nav class="top-nav" aria-label="Navegación superior">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
          <a routerLink="/incidente" routerLinkActive="active">El incidente</a>
          <a routerLink="/versiones" routerLinkActive="active">Versiones</a>
          <a routerLink="/soluciones" routerLinkActive="active">Soluciones</a>
          <a routerLink="/verificacion" routerLinkActive="active">Verificación</a>
          <a routerLink="/forense" routerLinkActive="active">Análisis forense</a>
          <a routerLink="/fuentes" routerLinkActive="active">Fuentes</a>
        </nav>
        <div class="topbar-actions">
          <label class="search-box"><span>⌕</span><input [value]="searchQuery()" (input)="onSearch($event)" (keydown.enter)="runSearch()" placeholder="Buscar…" aria-label="Buscar en la guía"></label>
          @if (searchQuery().trim()) { <div class="search-results"><strong>Buscar “{{ searchQuery() }}”</strong><p>Ir a la sección relacionada con tu búsqueda.</p><button (click)="runSearch()">Ver resultados <span>→</span></button></div> }
          <div class="theme-switch" aria-label="Cambiar apariencia">
            <button (click)="setTheme(false)" [class.selected]="!darkMode()" aria-label="Tema claro" title="Tema claro">☼</button>
            <button (click)="setTheme(true)" [class.selected]="darkMode()" aria-label="Tema oscuro" title="Tema oscuro">☾</button>
            <button (click)="setTheme(false)" aria-label="Vista estándar" title="Vista estándar">▣</button>
          </div>
        </div>
      </header>
      <section class="page-content"><router-outlet /></section>
      <footer class="site-footer"><span>P2PBash_Hugo</span><span>Investigación técnica independiente · Contrasta siempre las fuentes</span><a routerLink="/fuentes">Fuentes oficiales ↗</a></footer>
    </main>
  </div>`
})
export class AppComponent {
  readonly darkMode = signal(false);
  readonly mobileMenu = signal(false);
  readonly searchQuery = signal('');
  readonly routeName = signal('Inicio');
  readonly pageName = computed(() => this.routeName());
  private readonly names: Record<string,string> = {'/':'Inicio','/incidente':'El incidente','/versiones':'Versiones','/soluciones':'Soluciones','/verificacion':'Verificación','/forense':'Análisis forense','/fuentes':'Fuentes'};
  constructor(private readonly router: Router) {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('dps-theme') : null;
    this.darkMode.set(saved === 'dark');
    this.applyTheme();
    this.updatePageName(this.router.url);
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(event => {
      this.updatePageName(event.urlAfterRedirects);
      this.closeMobile();
      this.searchQuery.set('');
    });
  }
  @HostListener('document:keydown.escape') onEscape() { this.searchQuery.set(''); this.closeMobile(); }
  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.topbar-actions')) this.searchQuery.set('');
  }
  private updatePageName(url: string) { this.routeName.set(this.names[url.split(/[?#]/)[0] || '/'] ?? 'Guía técnica'); }
  private applyTheme() { if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', this.darkMode()); }
  setTheme(dark: boolean) {
    this.darkMode.set(dark);
    if (typeof localStorage !== 'undefined') localStorage.setItem('dps-theme', dark ? 'dark' : 'light');
    this.applyTheme();
  }
  toggleTheme() { this.setTheme(!this.darkMode()); }
  toggleMobile() { this.mobileMenu.update(value => !value); }
  closeMobile() { this.mobileMenu.set(false); }
  onSearch(event: Event) { this.searchQuery.set((event.target as HTMLInputElement).value); }
  runSearch() {
    const query = this.searchQuery().trim().toLocaleLowerCase('es');
    if (!query) return;
    const links: [string,string[]][] = [
      ['/', ['inicio','resumen','php2shell','bienvenida']],
      ['/incidente',['incidente','ataque','cronología','cve','vulnerabilidad','evidencia','riesgo']],
      ['/versiones',['versión','versiones','alcance','afectadas','php','inventario']],
      ['/soluciones',['mitigación','solución','parche','proteger','seguridad','plan']],
      ['/verificacion',['verificar','comprobar','auditoría','checklist','revisión']],
      ['/forense',['forense','logs','registro','evidencia','análisis','notas']],
      ['/fuentes',['fuentes','referencias','nvd','cve','owasp','php.net','documentación']]
    ];
    const match = links.find(([, terms]) => terms.some(term => term.includes(query) || query.includes(term)));
    this.router.navigateByUrl(match?.[0] ?? '/verificacion');
    this.searchQuery.set('');
  }
}
