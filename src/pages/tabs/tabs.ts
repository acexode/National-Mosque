import { Component } from '@angular/core';




// import { HomePage } from '../home/home';
// import { PrayersPage } from '../prayers/prayers';
// import { QuranPage } from '../quran/quran';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'PrayersPage';
  tab3Root = 'QuranPage';
  tab4Root = 'MosquePage';
  tab5Root = 'MorePage';

  constructor() {

  }
}



