import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isFormSubmitted: boolean;
  studentForm: FormGroup;
  validationMessages = {
      rollNumber: [
          { type: 'required', message: 'Roll Number is required.' },
          { type: 'pattern', message: 'Roll Number is of 10 digits.' }
        ],
      sName: [
          { type: 'required', message: 'Student Name is required.' },
      ],
      password: [
          { type: 'required', message: 'Password is required.'}
      ],
      bCode: [
          { type: 'required', message: 'Branch is required.'},
          { type: 'pattern', mesaage: 'Branch Code can contain atmost 3 characters.'}
      ],
      section: [
        { type: 'required', message: 'Section is required.'},
        { type: 'pattern', mesaage: 'Section can contain atmost 1 character.'}
      ]
    };
  validationPattern = {
    rollNumber: new RegExp(`[0-9]{10}$`),
    sName: new RegExp(`[a-zA-Z]+$`),
    bCode: new RegExp(`[a-zA-Z]{2,3}$`),
    section: new RegExp(`[a-zA-Z]{1}$`),
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
      sName: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.sName)]
      ),
      bCode: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.bCode), Validators.maxLength(3)]
      ),
      section: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.section), Validators.maxLength(1)]
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
