import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from './zorro/zorro.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ZorroModule
  ],
  exports: [
    ZorroModule
  ]
})
export class CommonShareModule { }
