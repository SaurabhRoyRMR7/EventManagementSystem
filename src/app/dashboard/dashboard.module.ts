import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './user-dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { EventListComponent } from '../event/event-list/event-list.component';
import { EventModule } from '../event/event.module';



@NgModule({
  declarations: [
  DashboardComponent,
  NavbarComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    EventModule
  
  ],
  exports:[
    DashboardComponent,
    NavbarComponent,
    
  ]
})
export class DashboardModule { }
