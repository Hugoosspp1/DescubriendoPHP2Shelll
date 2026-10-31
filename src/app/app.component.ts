import { Component, HostListener, computed, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

type ThemePreference = 'system' | 'light' | 'dark';

interface SearchDestination {
  path: string;
  label: string;
  terms: string[];
}

@Component({
  selector: 'dps-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell" [class.dark-theme]="darkMode()">
      <aside id="primary-navigation" class="sidebar" [class.sidebar-open]="mobileMenu()">
        <a class="brand" routerLink="/" (click)="closeMobile()" aria-label="Descubriendo PHP2Shell, inicio">
          <span class="brand-mark" aria-hidden="true"><img src="assets/favicon.svg" alt=""></span>
          <span class="brand-copy"><strong>Descubriendo</strong><strong class="brand-title-second"><span>PHP2</span>Shell</strong><small>Informe de seguridad</small></span>
        </a>
        <nav class="side-nav" aria-label="Navegación lateral">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMobile()"><span class="nav-icon">⌂</span> Inicio</a>
          <a routerLink="/incidente" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▣</span> El incidente</a>
          <a routerLink="/versiones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">◇</span> Versiones</a>
          <a routerLink="/soluciones" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">⚙</span> Soluciones</a>
          <a routerLink="/verificacion" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">⛨</span> Comprobar protección</a>
          <a routerLink="/forense" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▤</span> Buscar señales</a>
          <a routerLink="/fuentes" routerLinkActive="active" (click)="closeMobile()"><span class="nav-icon">▧</span> Fuentes</a>
        </nav>
        <div class="sidebar-spacer"></div>
        <a class="download-report" routerLink="/fuentes" (click)="closeMobile()"><span class="report-icon">♧</span><span><strong>Consultar informe</strong><small>Fuentes oficiales · v1.0</small></span></a>
      </aside>
      <div class="mobile-scrim" [class.visible]="mobileMenu()" (click)="closeMobile()"></div>

      <main class="main-area">
        <header class="topbar">
          <button class="icon-button mobile-menu-button" type="button" (click)="toggleMobile()" [attr.aria-expanded]="mobileMenu()" aria-controls="primary-navigation" [attr.aria-label]="mobileMenu() ? 'Cerrar menú' : 'Abrir menú'">☰</button>
          <a class="topbar-brand" routerLink="/" aria-label="Descubriendo PHP2Shell, inicio">
            <span class="brand-mark" aria-hidden="true"><img src="assets/favicon.svg" alt=""></span>
            <span class="topbar-wordmark"><span>Descubriendo</span><strong><span>PHP2</span>Shell</strong></span>
          </a>
          <nav class="top-nav" aria-label="Navegación superior">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
            <a routerLink="/incidente" routerLinkActive="active">El incidente</a>
            <a routerLink="/versiones" routerLinkActive="active">Versiones</a>
            <a routerLink="/soluciones" routerLinkActive="active">Soluciones</a>
            <a routerLink="/verificacion" routerLinkActive="active">Comprobar protección</a>
            <a routerLink="/forense" routerLinkActive="active">Buscar señales</a>
            <a routerLink="/fuentes" routerLinkActive="active">Fuentes</a>
          </nav>
          <div class="topbar-actions">
            <div class="search-box" [class.search-box-open]="searchOpen()">
              <button class="search-trigger" type="button" (click)="openSearch(searchInput)" aria-label="Abrir búsqueda" title="Buscar en la guía">⌕</button>
              <input #searchInput [value]="searchQuery()" (focus)="searchOpen.set(true)" (input)="onSearch($event)" (keydown.enter)="runSearch()" placeholder="Buscar en la guía…" aria-label="Buscar en la guía">
            </div>
            @if (searchOpen() && searchQuery().trim()) {
              <div class="search-results" role="status" aria-live="polite">
                <strong>Resultados para “{{ searchQuery() }}”</strong>
                @if (searchDestination(); as destination) {
                  <p>Sección sugerida: {{ destination.label }}</p>
                  <button type="button" (click)="runSearch()">Abrir sección <span>→</span></button>
                } @else {
                  <p>No encontré una sección relacionada. Prueba con PHP, versiones, TwinTeach, proteger o registros.</p>
                }
              </div>
            }
            <div class="theme-switch" role="group" aria-label="Cambiar apariencia">
              <button type="button" (click)="setTheme('light')" [class.selected]="themePreference()==='light'" aria-label="Tema claro" title="Tema claro">☼</button>
              <button type="button" (click)="setTheme('dark')" [class.selected]="themePreference()==='dark'" aria-label="Tema oscuro" title="Tema oscuro">☾</button>
              <button type="button" (click)="setTheme('system')" [class.selected]="themePreference()==='system'" aria-label="Usar tema del sistema" title="Usar tema del sistema">◐</button>
            </div>
          </div>
        </header>

        <section class="page-content"><router-outlet /></section>
        <footer class="site-footer"><span>Descubriendo PHP2Shell</span><span>Guía sencilla · Comprueba siempre la información con el proveedor</span><a routerLink="/fuentes">Fuentes oficiales ↗</a></footer>
      </main>
    </div>
  `,
})
export class AppComponent {
  readonly themePreference = signal<ThemePreference>('system');
  readonly systemPrefersDark = signal(false);
  readonly darkMode = computed(() => this.themePreference() === 'dark'
    || (this.themePreference() === 'system' && this.systemPrefersDark()));
  readonly mobileMenu = signal(false);
  readonly searchQuery = signal('');
  readonly searchOpen = signal(false);

  private readonly searchDestinations: SearchDestination[] = [
    { path: '/incidente', label: 'El incidente', terms: ['php2shell', 'php2bash', 'incidente', 'ataque', 'cronología', 'descubrimiento', 'cve', 'vulnerabilidad', 'riesgo', 'memoria', 'impacto', 'qué pasó'] },
    { path: '/versiones', label: 'Versiones y alcance', terms: ['versión', 'versiones', 'afectadas', 'php', 'inventario', '8.2', '8.3', '8.4', '8.5', 'actualizar', 'paquete'] },
    { path: '/soluciones', label: 'Cómo protegerse', terms: ['mitigación', 'solución', 'parche', 'proteger', 'seguridad', 'plan', 'actualizar', 'aislar', 'arreglo'] },
    { path: '/verificacion', label: 'Comprobar protección', terms: ['verificar', 'comprobar', 'revisar', 'lista', 'reiniciar', 'detección', 'angular', 'laravel', 'twinteach', 'api', 'servidor'] },
    { path: '/forense', label: 'Buscar señales', terms: ['registros', 'registro', 'señales', 'entró', 'análisis', 'notas', 'dirección', 'aws', 'proceso', 'archivo', 'explotación', 'phpsessid'] },
    { path: '/fuentes', label: 'Fuentes oficiales', terms: ['fuentes', 'referencias', 'nvd', 'owasp', 'php.net', 'documentación', 'cisa', 'ncsc'] },
    { path: '/', label: 'Inicio', terms: ['inicio', 'resumen', 'bienvenida'] },
  ];

  readonly searchDestination = computed(() => {
    const query = this.normalizeSearch(this.searchQuery());
    if (!query) return null;
    return this.searchDestinations.find(destination => destination.terms.some(term => {
      const normalizedTerm = this.normalizeSearch(term);
      return normalizedTerm.includes(query) || query.includes(normalizedTerm);
    })) ?? null;
  });

  constructor(private readonly router: Router) {
    const colorScheme = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
    if (colorScheme) {
      this.systemPrefersDark.set(colorScheme.matches);
      colorScheme.addEventListener('change', event => this.systemPrefersDark.set(event.matches));
    }

    try {
      const savedPreference = typeof localStorage !== 'undefined' ? localStorage.getItem('dps-theme') : null;
      if (savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system') {
        this.themePreference.set(savedPreference);
      }
    } catch {
      // Follow the operating system preference when browser storage is unavailable.
    }

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.closeMobile();
      this.searchQuery.set('');
      this.searchOpen.set(false);
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.searchQuery.set('');
    this.searchOpen.set(false);
    this.closeMobile();
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
      event.preventDefault();
      this.searchOpen.set(true);
      requestAnimationFrame(() => document.querySelector<HTMLInputElement>('.search-box input')?.focus());
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('.topbar-actions')) {
      this.searchQuery.set('');
      this.searchOpen.set(false);
    }
  }

  setTheme(preference: ThemePreference): void {
    this.themePreference.set(preference);
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem('dps-theme', preference);
    } catch {
      // The selected theme remains active for this visit.
    }
  }

  toggleMobile(): void {
    this.mobileMenu.update(value => !value);
  }

  closeMobile(): void {
    this.mobileMenu.set(false);
  }

  openSearch(input: HTMLInputElement): void {
    this.searchOpen.set(true);
    requestAnimationFrame(() => input.focus());
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.searchOpen.set(true);
  }

  runSearch(): void {
    const destination = this.searchDestination();
    if (!destination) return;
    this.router.navigateByUrl(destination.path);
    this.searchQuery.set('');
    this.searchOpen.set(false);
  }

  private normalizeSearch(value: string): string {
    return value.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
