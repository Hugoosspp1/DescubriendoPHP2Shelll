import { Component, HostListener, computed, signal, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'dps-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="app-shell" [class.dark-theme]="darkMode()">
    <aside class="sidebar" [class.sidebar-open]="mobileMenu()">
      <a class="brand" routerLink="/" (click)="closeMobile()">
        <span class="brand-mark"><img src="assets/icono-descubriendophp2shelll.png" alt=""></span>
        <span class="brand-copy"><strong>Descubriendo</strong><small>PHP2Shell · Investigación</small></span>
      </a>
      <div class="nav-caption">EXPLORAR</div>
      <nav class="side-nav" aria-label="Navegación principal">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMobile()"><span class="nav-icon">⌂</span> Inicio</a>
        <a routerLink="/incidente" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">◈</span> El incidente <span class="nav-count">01</span></a>
        <a routerLink="/versiones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">◷</span> Versiones y alcance</a>
        <a routerLink="/soluciones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">✓</span> Mitigación</a>
        <a routerLink="/verificacion" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">⌕</span> Verificación</a>
        <a routerLink="/forense" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▤</span> Análisis forense</a>
      </nav>
      <div class="nav-caption nav-caption-spaced">RECURSOS</div>
      <nav class="side-nav"><a routerLink="/fuentes" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">↗</span> Fuentes oficiales</a></nav>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-note"><span class="note-icon">✦</span><strong>Investigar con criterio</strong><p>Prioriza fuentes primarias y evidencia verificable antes de tomar decisiones.</p><a routerLink="/fuentes">Consultar referencias <span>→</span></a></div>
      <div class="profile-row"><span class="profile-avatar">D</span><span><strong>Centro de análisis</strong><small>Guía técnica independiente</small></span><span class="profile-dots">•••</span></div>
    </aside>
    <div class="mobile-scrim" [class.visible]="mobileMenu()" (click)="closeMobile()"></div>
    <main class="main-area">
      <header class="topbar">
        <button class="icon-button mobile-menu-button" (click)="toggleMobile()" aria-label="Abrir menú">☰</button>
        <div class="breadcrumb"><span>Biblioteca técnica</span><span class="crumb-sep">/</span><strong>{{ pageName() }}</strong></div>
        <div class="topbar-actions">
          <label class="search-box"><span>⌕</span><input [value]="searchQuery()" (input)="onSearch($event)" (keydown.enter)="runSearch()" placeholder="Buscar en la guía…" aria-label="Buscar en la guía"><kbd>↵</kbd></label>
          @if (searchQuery().trim()) { <div class="search-results"><strong>Buscar “{{ searchQuery() }}”</strong><p>Busca en las secciones de esta guía.</p><button (click)="runSearch()">Ver resultados <span>→</span></button></div> }
          <button class="icon-button theme-button" (click)="toggleTheme()" [attr.aria-label]="darkMode() ? 'Activar tema claro' : 'Activar tema oscuro'" [title]="darkMode() ? 'Tema claro' : 'Tema oscuro'">{{ darkMode() ? '☼' : '◐' }}</button>
          <span class="topbar-divider"></span><span class="status-dot"></span><span class="updated-label">Guía técnica</span>
        </div>
      </header>
      <section class="page-content"><router-outlet /></section>
      <footer class="site-footer"><span>DescubriendoPHP2Shelll</span><span>Contenido informativo · Verifica las fuentes antes de actuar</span><a routerLink="/fuentes">Referencias oficiales ↗</a></footer>
    </main>
  </div>`
})
export class AppComponent {
  readonly darkMode = signal(false);
  readonly mobileMenu = signal(false);
  readonly searchQuery = signal('');
  readonly routeName = signal('Inicio');
  readonly pageName = computed(() => this.routeName());
  private readonly names: Record<string,string> = {'/':'Inicio','/incidente':'El incidente','/versiones':'Versiones y alcance','/soluciones':'Mitigación','/verificacion':'Verificación','/forense':'Análisis forense','/fuentes':'Fuentes oficiales'};
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
  private updatePageName(url: string) {
    const path = url.split(/[?#]/)[0] || '/';
    this.routeName.set(this.names[path] ?? 'Guía técnica');
  }
  private applyTheme() {
    if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', this.darkMode());
  }
  toggleTheme() {
    this.darkMode.update(value => !value);
    if (typeof localStorage !== 'undefined') localStorage.setItem('dps-theme', this.darkMode() ? 'dark' : 'light');
    this.applyTheme();
  }
  toggleMobile() { this.mobileMenu.update(value => !value); }
  closeMobile() { this.mobileMenu.set(false); }
  onSearch(event: Event) { this.searchQuery.set((event.target as HTMLInputElement).value); }
  runSearch() {
    const query = this.searchQuery().trim().toLocaleLowerCase('es');
    if (!query) return;
    const links: [string,string[]][] = [
      ['/', ['inicio','resumen','panel','php2shell','bienvenida']],
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
