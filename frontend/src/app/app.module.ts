import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, 
        MatMenuModule, 
        MatCardModule, 
        MatTableModule, 
        MatIconModule, 
        MatCheckboxModule, 
        MatSidenavModule, 
        MatProgressSpinnerModule,
        MatRadioModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select'; 
import { MatSortModule } from '@angular/material/sort'; 
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CookieService } from 'ngx-cookie-service';
// 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginProfesorComponent } from './components/Profesor/login-profesor/login-profesor.component';
import { LoginEstudianteComponent } from './components/Estudiante/login-estudiante/login-estudiante.component';
import { SignupProfesorComponent } from './components/Profesor/signup-profesor/signup-profesor.component';
import { NavegacionComponent } from './components/Profesor/navegacion/navegacion.component';
import { DashboardComponent } from './components/Profesor/dashboard/dashboard.component';
import { GraficasComponent } from './components/Profesor/graficas/graficas.component';
import { PerfilComponent } from './components/Profesor/perfil/perfil.component';
import { GruposComponent } from './components/Profesor/grupos/grupos.component';
import { AddGrupoComponent } from './components/Profesor/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './components/Profesor/edit-grupo/edit-grupo.component';
import { ListaAsistenciaComponent } from './components/Profesor/lista-asistencia/lista-asistencia.component';
import { AddEstudianteComponent } from './components/Profesor/add-estudiante/add-estudiante.component';
import { AddEstudiantesComponent } from './components/Profesor/add-estudiantes/add-estudiantes.component';
import { ViewNewEstudiantesComponent } from './components/Profesor/view-new-estudiantes/view-new-estudiantes.component';
import { AddCriterioComponent } from './components/Profesor/add-criterio/add-criterio.component';
import { ViewCriteriosComponent } from './components/Profesor/view-criterios/view-criterios.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { AddActividadComponent } from './components/Profesor/add-actividad/add-actividad.component';
import { ViewActividadesComponent } from './components/Profesor/view-actividades/view-actividades.component';
import { CalificacionesComponent } from './components/Profesor/calificaciones/calificaciones.component';
import { LoginAdminComponent } from './components/Administrador/login-admin/login-admin.component';
import { AdminDashboardComponent } from './components/Administrador/admin-dashboard/admin-dashboard.component';
import { AdminPerfilComponent } from './components/Administrador/admin-perfil/admin-perfil.component';
import { AdminNavegacionComponent } from './components/Administrador/admin-navegacion/admin-navegacion.component';
import { AddProfesoresComponent } from './components/Administrador/add-profesores/add-profesores.component';
import { AddProfesorComponent } from './components/Administrador/add-profesor/add-profesor.component';
import { ProfesoresComponent } from './components/Administrador/profesores/profesores.component';
import { ViewNewProfesoresComponent } from './components/Administrador/view-new-profesores/view-new-profesores.component';
import { ListarProfesoresComponent } from './components/Administrador/listar-profesores/listar-profesores.component';
import { AddGruposComponent } from './components/Administrador/add-grupos/add-grupos.component';
import { GenerateFormatoComponent } from './components/Administrador/generate-formato/generate-formato.component';
import { ViewNewGruposComponent } from './components/Administrador/view-new-grupos/view-new-grupos.component';
import { AddMateriasComponent } from './components/Administrador/add-materias/add-materias.component';
import { MateriasComponent } from './components/Administrador/materias/materias.component';
import { ListarMateriasComponent } from './components/Administrador/listar-materias/listar-materias.component';
import { ListarGruposComponent } from './components/Administrador/listar-grupos/listar-grupos.component';
import { AdminGruposComponent } from './components/Administrador/admin-grupos/admin-grupos.component';
import { AddMateriaComponent } from './components/Administrador/add-materia/add-materia.component';
import { ReportesComponent } from './components/Profesor/reportes/reportes.component';
import { ReporteAsistenciasComponent } from './components/Profesor/reporte-asistencias/reporte-asistencias.component';
import { ReporteCalificacionesFinalComponent } from './components/Profesor/reporte-calificaciones-final/reporte-calificaciones-final.component';
import { ReporteCalificacionesParcialComponent } from './components/Profesor/reporte-calificaciones-parcial/reporte-calificaciones-parcial.component';
import { GraficsComponent } from './components/Profesor/grafics/grafics.component';
import { EstDashboardComponent } from './components/Estudiante/est-dashboard/est-dashboard.component';
import { EstNavegacionComponent } from './components/Estudiante/est-navegacion/est-navegacion.component';
import { EstPerfilComponent } from './components/Estudiante/est-perfil/est-perfil.component';
import { EstGruposComponent } from './components/Estudiante/est-grupos/est-grupos.component';
import { EstInformacionComponent } from './components/Estudiante/est-informacion/est-informacion.component';
import { EstViewGrupoComponent } from './components/Estudiante/est-view-grupo/est-view-grupo.component';
import { EstAsistenciasComponent } from './components/Estudiante/est-asistencias/est-asistencias.component';
import { EstCriteriosComponent } from './components/Estudiante/est-criterios/est-criterios.component';
import { EstActividadesComponent } from './components/Estudiante/est-actividades/est-actividades.component';
import { EstCalifParcialesComponent } from './components/Estudiante/est-calif-parciales/est-calif-parciales.component';
import { EstCalifActividadesComponent } from './components/Estudiante/est-calif-actividades/est-calif-actividades.component';
import { ManualAdminComponent } from './components/Manuales/manual-admin/manual-admin.component';
import { ManualProfeComponent } from './components/Manuales/manual-profe/manual-profe.component';
import { ManualEstudianteComponent } from './components/Manuales/manual-estudiante/manual-estudiante.component';
import { ManualCompletoComponent } from './components/Manuales/manual-completo/manual-completo.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { RespaldosComponent } from './components/Administrador/respaldos/respaldos.component';
import { BackupsComponent } from './components/Administrador/backups/backups.component';
import { DeleteEstudianteComponent } from './components/Profesor/delete-estudiante/delete-estudiante.component';
import { SettingsComponent } from './components/Administrador/settings/settings.component';
import { AjustesFileComponent } from './components/Administrador/ajustes-file/ajustes-file.component';
import { PreviewFileComponent } from './components/Administrador/preview-file/preview-file.component';
import { JefeDocenciaComponent } from './components/Administrador/jefe-docencia/jefe-docencia.component';
import { ListarDocenciaComponent } from './components/Administrador/listar-docencia/listar-docencia.component';
import { ViewJefeDocenciaComponent } from './components/Administrador/view-jefe-docencia/view-jefe-docencia.component';




@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    InicioComponent,
    LoginProfesorComponent,
    LoginEstudianteComponent,
    SignupProfesorComponent,
    NavegacionComponent,
    DashboardComponent,
    GraficasComponent,
    PerfilComponent,
    GruposComponent,
    AddGrupoComponent,
    EditGrupoComponent,
    ListaAsistenciaComponent,
    AddEstudianteComponent,
    AddEstudiantesComponent,
    ViewNewEstudiantesComponent,
    AddCriterioComponent,
    ViewCriteriosComponent,
    DialogConfirmComponent,
    AddActividadComponent,
    ViewActividadesComponent,
    CalificacionesComponent,
    LoginAdminComponent,
    AdminDashboardComponent,
    AdminPerfilComponent,
    AdminNavegacionComponent,
    AddProfesoresComponent,
    AddProfesorComponent,
    ProfesoresComponent,
    ViewNewProfesoresComponent,
    ListarProfesoresComponent,
    AddGruposComponent,
    GenerateFormatoComponent,
    ViewNewGruposComponent,
    AddMateriasComponent,
    MateriasComponent,
    ListarMateriasComponent,
    ListarGruposComponent,
    AdminGruposComponent,
    AddMateriaComponent,
    ReportesComponent,
    ReporteAsistenciasComponent,
    ReporteCalificacionesFinalComponent,
    ReporteCalificacionesParcialComponent,
    GraficsComponent,
    EstDashboardComponent,
    EstNavegacionComponent,
    EstPerfilComponent,
    EstGruposComponent,
    EstInformacionComponent,
    EstViewGrupoComponent,
    EstAsistenciasComponent,
    EstCriteriosComponent,
    EstActividadesComponent,
    EstCalifParcialesComponent,
    EstCalifActividadesComponent,
    ManualAdminComponent,
    ManualProfeComponent,
    ManualEstudianteComponent,
    ManualCompletoComponent,
    RespaldosComponent,
    BackupsComponent,
    DeleteEstudianteComponent,
    SettingsComponent,
    AjustesFileComponent,
    PreviewFileComponent,
    JefeDocenciaComponent,
    ListarDocenciaComponent,
    ViewJefeDocenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    ChartsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    PdfViewerModule,
    StorageModule.forRoot({ IDBNoWrap: false }),
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  entryComponents:[
    LoginProfesorComponent,
    LoginEstudianteComponent,
    SignupProfesorComponent,
    EditGrupoComponent,
    ViewNewEstudiantesComponent,
    DialogConfirmComponent,
    AddActividadComponent,
    ViewActividadesComponent,
    LoginAdminComponent,
    ViewNewProfesoresComponent,
    ViewNewGruposComponent,
    EstViewGrupoComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
