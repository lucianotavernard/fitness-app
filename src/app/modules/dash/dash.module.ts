import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashRoutingModule } from './dash-rounting.module';

import { DashComponent } from './containers/dash/dash.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DashRoutingModule],
  declarations: [DashComponent],
})
export class DashModule {}
