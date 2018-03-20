import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdkharPage,  } from './adkhar';
import { ReversePipe } from '../../pipes/reverse/reverse';

@NgModule({
  declarations: [
    AdkharPage,ReversePipe
  ],
  entryComponents:[
    AdkharPage,
    
  ],
  imports: [
    IonicPageModule.forChild(AdkharPage),
    //IonicPageModule.forChild(AdkharPageDua),
    
  ],
})
export class AdkharPageModule {}
