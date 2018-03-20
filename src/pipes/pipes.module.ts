import { NgModule } from '@angular/core';
import { DecodePipe } from './decode/decode';
import { ReversePipe } from './reverse/reverse';
@NgModule({
	declarations: [DecodePipe,
    ReversePipe],
	imports: [],
	exports: [DecodePipe,
    ReversePipe]
})
export class PipesModule {}
