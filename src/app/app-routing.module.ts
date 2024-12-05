import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventParticipantsComponent } from './event/event-participants/event-participants.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/user-dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventRegistrationComponent } from './event/event-registration/event-registration.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  
 { path: 'create-event', component: EventCreateComponent },
 { path: 'register-event/:eventId', component: EventRegistrationComponent },
{ path: 'login', component:LoginComponent },
{ path: 'register', component:RegisterComponent },
  {path :'dashboard', component:DashboardComponent},

  
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
