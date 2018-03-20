import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuaPage } from './dua';
import { DecodePipe } from '../../pipes/decode/decode';
@NgModule({
  declarations: [
    DuaPage,DecodePipe
  ],
  imports: [
    IonicPageModule.forChild(DuaPage),
  ],
})
export class DuaPageModule {}
