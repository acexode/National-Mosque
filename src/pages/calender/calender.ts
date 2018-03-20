import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import HijriDate,{toHijri} from 'hijri-date/lib/safe';
declare var UQCal
/**
 * Generated class for the CalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
//@ViewChild('myMap') myMap ;
export class CalenderPage {  
  days = [
    "Al Ahad",
    "Al Athnayn",
    "Al Thalaata",
    "Al Arba'a",
    "Al Khamees",
    "Al Juma'a",
    "Al Sabt"
  ];
  months = [
    "",
    "Muḥarram",
    "Ṣafar",
    "Rabīʿl I",
    "Rabīʿl II",
    "Jumādá I",
    "Jumādá II",
    "Rajab",
    "Shaʿbān",
    "Ramaḍān",
    "Shawwāl",
    "Dhūl-Qiʿdah",
    "Dhūl-Ḥijjah"
  ];
 
  cal = new UQCal(); // assuming today is 28th of December 2013.
  HijriDate = this.cal.convert();
  Greg = new Date();
  GregYear = this.Greg.getFullYear()
  month = this.Greg.getMonth()
  index = this.Greg.getMonth()+1
  HijrYear = this.HijriDate.Hyear
  HMonth = this.HijriDate.Hmonth
  HMonthName = this.months[this.HMonth] 
  HijrDay = this.HijriDate.Hday
  Hlength = this.HijriDate.Hlength

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  monthBegin(y,m){   
    const today = new  HijriDate(y,m,2).toGregorian();
    console.log(this.HijrYear,this.HMonth,this.Hlength)
    console.log(today)
    return today
  }

 
  fetchDate(month,year){ 
    year = year || this.GregYear
    month = month || this.index       
    var cal = new UQCal(year+'-'+month+'-'+this.Greg.getDate());
    var hijriDate = cal.convert();
    var monthbegin = this.monthBegin(hijriDate.Hyear, hijriDate.Hmonth)
    var date = new Date(monthbegin)
    console.log(date)
    var calendar = this.create_calendar(date.getDay(), hijriDate.Hlength);
    document.getElementById("calendar-month-year").innerHTML =
   this.months[hijriDate.Hmonth] + " " + hijriDate.Hyear;
    console.log(this.HijrDay)
        document.getElementById("calendar-dates").appendChild(calendar);
        var td = document.querySelectorAll('td')
        var len = td.length
        for(let i=0; i< len; i++){
                if(hijriDate.Hmonth == this.months.indexOf(this.HMonthName) &&  this.HijrYear == this.HijrYear){
                 
                  if(parseInt(td[i].innerHTML) ==  this.HijrDay ){
                  td[i].className = "today"
                  }
                }else{
                  // console.log(HijriDate.Hmonth)
                  // console.log(this.months.indexOf(this.HMonthName) )
                  // console.log(HijriDate.year )
                  // console.log(this.HijrYear)
                }
           }
       
  }
 

 create_calendar(monthStart, noofdays) {
   console.log(monthStart, noofdays)
  var table = document.createElement("table");
  var tr = document.createElement("tr");
  for (let c = 0; c <= 6; c++) {
    var td = document.createElement("td");
    var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    td.innerHTML = day_name[c];
    tr.appendChild(td);
  }
  table.appendChild(tr);
  //create 2nd row
  tr = document.createElement("tr");
  //let c:any;
  console.log("this is " + monthStart);
  for (c = 0; c <= 6; c++) {
    if (c == monthStart) {
      break;
    }
    let td = document.createElement("td");
    td.innerHTML = "";
    tr.appendChild(td);
  }
  var count = 1;
  for (; c <= 6; c++) {
    let tds = <HTMLElement> document.createElement("td");
    tds.innerHTML = String(count);
    
    console.log(td);
    count++;
    tr.appendChild(tds);
  }
  table.appendChild(tr);
  //rest of the date rows
  for (var r = 3; r <= 6; r++) {
    tr = document.createElement("tr");
    for (var c = 0; c <= 6; c++) {
      if (count > noofdays) {
        table.appendChild(tr);
        return table;
      }
      var td3 = document.createElement("td");
      td3.innerHTML =  String(count);
      count++;
      tr.appendChild(td3);
    }
    table.appendChild(tr);
  }

  return table;
}
increase() {
  document.getElementById("calendar-dates").innerHTML = "";      
  if (this.index > 12) {
    this.index = 0;
    this.GregYear = this.GregYear + 1;
    this.fetchDate(this.index, this.GregYear);
  }
  this.index = this.index + 1;
  this.fetchDate(this.index, this.GregYear);
  console.log(this.index)
  console.log(this.GregYear)
  console.log( this.index);
}
 decrease() {
  document.getElementById("calendar-dates").innerHTML = "";
 
  if ( this.index <= 1) {
    this.index = 13;
    this.GregYear =  this.GregYear - 1;
    this.fetchDate(this.index, this.GregYear);
  }
  
  this.index =  this.index - 1;
  this.fetchDate(this.index, this.GregYear);
   console.log(this.index);
 }
 loadCalender(){   
   
   this.fetchDate(this.Greg.getMonth()+1, this.Greg.getFullYear());
 
 }
  ionViewDidLoad() {
  
    console.log('ionViewDidLoad CalenderPage');
    const cal = document.getElementById('calendar-container')
    console.log(cal)
    console.log(this.HijrYear);
    
    this.loadCalender()
    
  }

}
