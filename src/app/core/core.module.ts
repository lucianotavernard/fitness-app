import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { DefaultLayoutComponent } from './containers/default/default.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, NavigationComponent, DefaultLayoutComponent],
  exports: [HeaderComponent, NavigationComponent],
})
export class CoreModule {}
