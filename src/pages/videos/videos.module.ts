import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';
import { VidsPipe } from '../../pipes/vids/vids';

@NgModule({
  declarations: [
    VideosPage,VidsPipe
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
  ],
})
export class VideosPageModule {}
