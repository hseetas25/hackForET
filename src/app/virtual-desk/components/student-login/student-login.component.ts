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
  isSLoggedIn: boolean;
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
    rollNumber: new RegExp(`[A-Z0-9]{10}$`),
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
      this.isFormSubmitted = false;
      this.isSLoggedIn = false;
      this.loggedIn();
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

  async submitStudentForm(): Promise<void> {
    this.isFormSubmitted = true;
    if(this.studentForm.invalid) {
      return;
    }
    if(this.studentForm.valid) {
      let id = this.studentForm.value.rollNumber;
      let password =this.studentForm.value.password;
      const collection = 'college' + id.substring(0, 2);
      await this.firestore.collection(collection).doc(id).get().subscribe(async (data)=>{
        if(data.exists) {
          const userData: any = data.data();
          if(userData.password == password) {
            localStorage.setItem('slogin', 'success');
            localStorage.setItem('name', userData.sName);
            localStorage.setItem('branch', userData.bCode);
            localStorage.setItem('roll', userData.rollNumber);
            localStorage.setItem('sec', userData.section);
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
    this.studentForm.reset();
  }

  loggedIn(): void {
    if(localStorage.getItem('slogin') === 'success') {
      this.isSLoggedIn = true;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
