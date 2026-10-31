import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { IncidentPageComponent } from './pages/incident-page.component';
import { VersionsPageComponent } from './pages/versions-page.component';
import { SolutionsPageComponent } from './pages/solutions-page.component';
import { VerificationPageComponent } from './pages/verification-page.component';
import { ForensicsPageComponent } from './pages/forensics-page.component';
import { SourcesPageComponent } from './pages/sources-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Inicio | Descubriendo PHP2Shell' },
  { path: 'incidente', component: IncidentPageComponent, title: 'El incidente | Descubriendo PHP2Shell' },
  { path: 'versiones', component: VersionsPageComponent, title: 'Versiones y alcance | Descubriendo PHP2Shell' },
  { path: 'soluciones', component: SolutionsPageComponent, title: 'Mitigación | Descubriendo PHP2Shell' },
  { path: 'verificacion', component: VerificationPageComponent, title: 'Verificación | Descubriendo PHP2Shell' },
  { path: 'forense', component: ForensicsPageComponent, title: 'Análisis forense | Descubriendo PHP2Shell' },
  { path: 'fuentes', component: SourcesPageComponent, title: 'Fuentes oficiales | Descubriendo PHP2Shell' },
  { path: '**', redirectTo: '' }
];
