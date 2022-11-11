import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { ScheduleRoutingModule } from './schedule-rounting.module';

import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';

import { ScheduleComponent } from './containers/schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ScheduleRoutingModule,
  ],
  declarations: [
    ScheduleDaysComponent,
    ScheduleAssignComponent,
    ScheduleSectionComponent,
    ScheduleControlsComponent,
    ScheduleCalendarComponent,
    ScheduleComponent,
  ],
})
export class ScheduleModule {}
