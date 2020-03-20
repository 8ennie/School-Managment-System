import { Component, OnInit, Input } from '@angular/core';
import { SubLesson } from 'src/app/lesson-instance/sub-lesson-instance.model';

@Component({
  selector: 'app-substitute-plan-list-part',
  templateUrl: './substitute-plan-list-part.component.html',
  styleUrls: ['./substitute-plan-list-part.component.css']
})
export class SubstitutePlanListPartComponent implements OnInit {

  @Input() subLesson:SubLesson;

  constructor() { }

  ngOnInit(): void {
  }

}
