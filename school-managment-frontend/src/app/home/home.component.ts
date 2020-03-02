import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  houres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  
  
  ngOnInit() {

  }

  onDrop(ev, day, hour){
    console.log(day);
    console.log(hour);
    console.log(ev);
    console.log(ev.target);
    console.log();
    
    event.preventDefault();
  }

  onDragOver(ev){
    event.stopPropagation();
    event.preventDefault();
  } 

}
