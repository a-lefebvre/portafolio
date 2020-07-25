import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/Profesor/dashboard/dashboard.component';
import { PerfilComponent } from './components/Profesor/perfil/perfil.component';
import { GruposComponent } from './components/Profesor/grupos/grupos.component';
import { AddGrupoComponent } from './components/Profesor/add-grupo/add-grupo.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/Administrador/admin-dashboard/admin-dashboard.component';
import { AdminPerfilComponent } from './components/Administrador/admin-perfil/admin-perfil.component';
import { ProfesoresComponent } from './components/Administrador/profesores/profesores.component';
import { MateriasComponent } from './components/Administrador/materias/materias.component';
import { AdminGruposComponent } from './components/Administrador/admin-grupos/admin-grupos.component';
import { ReportesComponent } from './components/Profesor/reportes/reportes.component';
import { GraficsComponent } from './components/Profesor/grafics/grafics.component';
import { EstDashboardComponent } from './components/Estudiante/est-dashboard/est-dashboard.component';
import { EstGruposComponent } from './components/Estudiante/est-grupos/est-grupos.component';
import { EstInformacionComponent } from './components/Estudiante/est-informacion/est-informacion.component';
import { ManualAdminComponent } from './components/Manuales/manual-admin/manual-admin.component';
import { ManualProfeComponent } from './components/Manuales/manual-profe/manual-profe.component';
import { ManualEstudianteComponent } from './components/Manuales/manual-estudiante/manual-estudiante.component';
import { EstAutGuard } from './guards/estudiante/est-aut.guard';
import { AdminAutGuard } from './guards/administrador/admin-aut.guard';
import { ManualCompletoComponent } from './components/Manuales/manual-completo/manual-completo.component';
import { RespaldosComponent } from './components/Administrador/respaldos/respaldos.component';
import { SettingsComponent } from './components/Administrador/settings/settings.component';
import { JefeDocenciaComponent } from './components/Administrador/jefe-docencia/jefe-docencia.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InicioComponent
  },
  {
    path: 'profesor/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profesor/profile',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profesor/groups',
    component: GruposComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profesor/add/group',
    component: AddGrupoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profesor/grafics',
    component: GraficsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profesor/reports',
    component: ReportesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/profile',
    component: AdminPerfilComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/profesores',
    component: ProfesoresComponent,
    canActivate: [AdminAutGuard]
  },{
    path: 'admin/grupos',
    component: AdminGruposComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/materias',
    component: MateriasComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/backup',
    component: RespaldosComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/settings',
    component: SettingsComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'admin/docencia',
    component: JefeDocenciaComponent,
    canActivate: [AdminAutGuard]
  },
  {
    path: 'estudiante/dashboard',
    component: EstDashboardComponent,
    canActivate: [EstAutGuard]
  },
  {
    path: 'estudiante/profile',
    component: EstInformacionComponent,
    canActivate: [EstAutGuard]
  },
  {
    path: 'estudiante/groups',
    component: EstGruposComponent,
    canActivate: [EstAutGuard]
  },
  {
    path: 'manuales/administrador',
    component: ManualAdminComponent,
  },
  {
    path: 'manuales/profesor',
    component: ManualProfeComponent
  },
  {
    path: 'manuales/estudiante',
    component: ManualEstudianteComponent
  },
  {
    path: 'manuales/completo',
    component: ManualCompletoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
