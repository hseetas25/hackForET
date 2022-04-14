import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-registration',
  templateUrl: './faculty-registration.component.html',
  styleUrls: ['./faculty-registration.component.scss']
})
export class FacultyRegistrationComponent implements OnInit {

  isFormSubmitted: boolean;
  facultyForm: FormGroup;
  validationMessages = {
      facultyId: [
          { type: 'required', message: 'Faculty ID is required.' },
          { type: 'pattern', message: 'Faculty ID is of 10 digits.' }
        ],
      facultyName: [
          { type: 'required', message: 'Faculty Name is required.' },
      ],
      password: [
          { type: 'required', message: 'Password is required.'}
      ],
      bCode: [
          { type: 'required', message: 'Department is required.'},
          { type: 'pattern', mesaage: 'Dept Code can contain atmost 3 characters.'}
      ]
    };
  validationPattern = {
    facultyId: new RegExp(`[0-9]{10}$`),
    facultyName: new RegExp(`[a-zA-Z]+$`),
    bCode: new RegExp(`[a-zA-Z\d]{2,3}$`),
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
    this.facultyForm = this.formBuilder.group({
      facultyId: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.facultyId), Validators.maxLength(10)]
      ),
      facultyName: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.facultyName)]
      ),
      bCode: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.bCode), Validators.maxLength(3)]
      ),
      password: new FormControl(
        '', [Validators.required]
      )
    })
  }

  submitFacultyForm(): void {
    
  }

  resetForm(): void {
    this.facultyForm.reset();
  }

}
