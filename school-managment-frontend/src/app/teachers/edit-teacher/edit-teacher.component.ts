
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/_services/subject.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html'
})
export class EditTeacherComponent implements OnInit {

    editMode = false;
    id: number;

    teacherForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        gender: new FormControl('MALE', Validators.required),
        subjects: new FormControl('')
    });


    allSubjects = [];
    subjects = [];
    gender: string;

    constructor(private subjectService: SubjectService,
        private teacherService: TeacherService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.subjectService.getAllSubjects().pipe(
            map(data => data._embedded.subjects)).
            subscribe(subjects => {
                this.allSubjects = subjects.map(subject => subject = { label: subject.name, value: subject._links.self.href });
            });
        this.route.params.subscribe((parms: Params) => {
            this.id = parms['id'];
            this.editMode = parms['id'] != null && parms['id'] !== 'new';
            if (this.editMode) {
                this.teacherService.getTeacher(this.id).subscribe((teacher: Teacher) => {
                    const editTeacher: Teacher = teacher;
                    editTeacher.subjects = teacher.subjects.map((sub: { _links }) =>
                        sub = sub._links.self.href.replace('{?projection}', '')
                    );
                    this.teacherForm.reset(editTeacher);
                });
            }
        });
    }

    onSubmit() {
        if (this.editMode) {
            this.teacherService.editTeacher(this.id, this.teacherForm.value).subscribe(() => {
                setTimeout(() => {
                    this.teacherService.getTeacher(this.id).subscribe(updatedTeacher => {
                        this.teacherService.changeTeacher(updatedTeacher);
                        this.teacherForm.reset(updatedTeacher);
                        this.teacherForm.patchValue({subjects: updatedTeacher.subjects.map(subject =>
                            subject = subject._links.self.href.replace('{?projection}', '')
                        )});
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successfull Change',
                            detail: 'Teacher was changed successfully'
                        });
                    });
                },
                    100);
            });
        } else {
            this.teacherService.saveTeacher(this.teacherForm.value).subscribe(newTeacher => {
                const url = newTeacher._links.self.href;
                this.teacherService.getTeacher(url.substring(url.lastIndexOf('/') + 1)).subscribe(nT => {
                    console.log(nT);
                    
                    this.teacherService.addTeacher(nT);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successfull Creation',
                        detail: 'Teacher was added successfully'
                    });
                    this.router.navigate(['/teachers']);
                });
            });
        }
    }

    onCancel() {
        this.router.navigate(['/teachers']);
    }

    onDelete() {
        this.teacherService.deleteTeacher(this.id).subscribe(data => {
            this.router.navigate(['/teachers']);
        });
    }
}
