import { NgModule } from '@angular/core';
import { DecodePipe } from './decode/decode';
import { ReversePipe } from './reverse/reverse';
import { VidsPipe } from './vids/vids';
@NgModule({
	declarations: [DecodePipe,
    ReversePipe,
    VidsPipe],
	imports: [],
	exports: [DecodePipe,
    ReversePipe,
    VidsPipe]
})
export class PipesModule {}
