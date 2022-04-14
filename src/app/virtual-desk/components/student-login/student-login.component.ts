import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  isFormSubmitted: boolean;
  studentForm: FormGroup;
  validationMessages = {
      rollNumber: [
          { type: 'required', message: 'Roll Number is required.' },
          { type: 'pattern', message: 'Roll Number is of 10 digits.' }
        ],
      password: [
          { type: 'required', message: 'Password is required.'}
      ]
    };
  validationPattern = {
    rollNumber: new RegExp(`[0-9]{10}$`),
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
      this.isFormSubmitted = false;

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.formBuilder.group({
      rollNumber: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.rollNumber), Validators.maxLength(10)]
      ),
      password: new FormControl(
        '', [Validators.required]
      )
    })
  }

  submitStudentForm(): void {
    this.isFormSubmitted = true;
  }

  resetForm(): void {
    this.studentForm.reset();
  }

}
