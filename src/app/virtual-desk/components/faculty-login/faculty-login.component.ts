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
  isFLoggedIn: boolean;
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
    facultyId: new RegExp(`[A-Z0-9]{10}$`),
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
      this.isFormSubmitted = false;
      this.isFLoggedIn = false;
      this.loggedIn();
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

  async submitFacultyForm(): Promise<void> {
    this.isFormSubmitted = true;
    if(this.facultyForm.invalid) {
      return;
    }
    if(this.facultyForm.valid) {
      let id = this.facultyForm.value.facultyId;
      let password =this.facultyForm.value.password;
      await this.firestore.collection(`faculty`).doc(id).get().subscribe(async (data)=>{
        if(data.exists) {
          const userData: any = data.data();
          if(userData.password == password) {
            localStorage.setItem('flogin', 'success');
            localStorage.setItem('id', id);
            localStorage.setItem('name', userData.facultyName);
            this.toastr.success('Successful', 'Login');
            await this.delay(1000);
            window.location.reload();
          }
        }
        else {
          this.toastr.error('Details', 'Invalid');
          await this.delay(2000);
          window.location.reload();
        }
      })
    }
  }

  resetForm(): void {
    this.facultyForm.reset();
  }

  loggedIn(): void {
    if(localStorage.getItem('flogin') === 'success') {
      this.isFLoggedIn = true;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
