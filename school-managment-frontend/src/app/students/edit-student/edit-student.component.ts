import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { ClassService } from 'src/app/classes/class.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {


  id: number;
  editMode = false;
  allowEdit = false;
  grades = [];
  studentForm = new FormGroup({
    firstName: new FormControl({ value: '', Validators: [Validators.required] }),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('MALE', Validators.required),
    grade: new FormControl('')
  });
  constructor(
    private route: ActivatedRoute,
    private studnetService: StudentService,
    private router: Router,
    private gradeService: ClassService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.allowEdit = this.authService.hasRole('ROLE_ADMIN');
    if (!this.allowEdit) {
      this.studentForm.disable();
    }
    this.gradeService.getAllClasses().pipe(
      map(data => data._embedded.grades)).
      subscribe(grades => {
        this.grades = grades.map(grade => grade = { label: grade.name, value: grade._links.self.href });
      });
    this.route.params.subscribe((parms: Params) => {
      this.id = parms['id'];
      this.editMode = parms['id'] != null && parms['id'] !== 'new';
      if (this.editMode) {
        this.studnetService.getStudent(this.id).subscribe((student: Student) => {
          if (student.grade != null) {
            student.grade = environment.apiUrl + 'grades/' + student.grade.id;
          }
          this.studentForm.reset(student);
        });
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.studnetService.editStudent(this.id, this.studentForm.value).subscribe(() => {
        setTimeout(() => {
          this.studnetService.getStudent(this.id).subscribe(nS => {
            this.studnetService.changeStudent(nS);
            this.studentForm.reset(nS);
            this.messageService.add({
              severity: 'success',
              summary: 'Successfull Creation',
              detail: 'Student was added successfully'
            });
            this.router.navigate(['/students']);
          });
        },
          100);
      });
    } else {
      this.studnetService.saveStudent(this.studentForm.value).subscribe(newStudent => {
        const url = newStudent._links.self.href;
        this.studnetService.getStudent(url.substring(url.lastIndexOf('/') + 1)).subscribe(nS => {
          this.studnetService.addStudent(nS);
          this.studentForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Successfull Creation',
            detail: 'Student was added successfully'
          });
          this.router.navigate(['/students']);
        });
      });
    }
  }
  onCancel() {
    this.router.navigate(['/students']);
  }

  onDelete() {
    this.studnetService.deleteStudent(this.id).subscribe(data => {
      this.router.navigate(['/students']);
    });
  }
}
