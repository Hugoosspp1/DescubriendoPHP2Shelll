import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { IncidentPageComponent } from './pages/incident-page.component';
import { VersionsPageComponent } from './pages/versions-page.component';
import { SolutionsPageComponent } from './pages/solutions-page.component';
import { VerificationPageComponent } from './pages/verification-page.component';
import { ForensicsPageComponent } from './pages/forensics-page.component';
import { SourcesPageComponent } from './pages/sources-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Inicio | DescubriendoPHP2Shelll' },
  { path: 'incidente', component: IncidentPageComponent, title: 'El incidente | DescubriendoPHP2Shelll' },
  { path: 'versiones', component: VersionsPageComponent, title: 'Versiones y alcance | DescubriendoPHP2Shelll' },
  { path: 'soluciones', component: SolutionsPageComponent, title: 'Mitigación | DescubriendoPHP2Shelll' },
  { path: 'verificacion', component: VerificationPageComponent, title: 'Verificación | DescubriendoPHP2Shelll' },
  { path: 'forense', component: ForensicsPageComponent, title: 'Análisis forense | DescubriendoPHP2Shelll' },
  { path: 'fuentes', component: SourcesPageComponent, title: 'Fuentes oficiales | DescubriendoPHP2Shelll' },
  { path: '**', redirectTo: '' }
];
