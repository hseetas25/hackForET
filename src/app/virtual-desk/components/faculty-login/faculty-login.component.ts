import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.scss']
})
export class FacultyLoginComponent implements OnInit {

  isFormSubmitted: boolean;
  facultyForm: FormGroup;
  validationMessages = {
      facultyId: [
          { type: 'required', message: 'Faculty ID is required.' },
          { type: 'pattern', message: 'Faculty ID is of 10 digits.' }
        ],
      password: [
          { type: 'required', message: 'Password is required.'}
      ]
    };
  validationPattern = {
    facultyId: new RegExp(`[0-9]{10}$`),
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
