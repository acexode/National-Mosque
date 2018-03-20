import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurahPage } from './surah';

@NgModule({
  declarations: [
    SurahPage,
  ],
  imports: [
    IonicPageModule.forChild(SurahPage),
  ],
})
export class SurahPageModule {}
