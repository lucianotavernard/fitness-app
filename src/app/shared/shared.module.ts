import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [ListItemComponent],
  declarations: [ListItemComponent],
})
export class SharedModule {}
