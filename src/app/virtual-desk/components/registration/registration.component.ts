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
  isLoggedIn: boolean;
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
    rollNumber: new RegExp(`[a-zA-Z0-9]{10}$`),
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
      this.isLoggedIn =  false;
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

  async submitStudentForm(): Promise<void> {
    this.isFormSubmitted = true;
    if(this.studentForm.invalid) {
      return;
    }
    if(this.studentForm.valid) {
      const id = this.studentForm.value.rollNumber;
      const collection = 'college' + id.substring(0, 2);
      const stData = JSON.parse(JSON.stringify(this.studentForm.value));
      await this.firestore.collection(collection).doc(id).get().subscribe(async (data)=>{
        if(data.exists) {
          this.toastr.error('Already Exists', 'Account');
          await this.delay(2000);
          window.location.reload();
        }
        else {
          await this.firestore.collection(collection).doc(id).set(stData).then((res)=>{});
          this.toastr.success('Successful', 'Registration');
          await this.delay(2000);
          this.studentForm.reset();
          this.router.navigate(['student']);
          this.toastr.info('Student Login Page', 'Redirected to');
        }
      });
    }
  }

  resetForm(): void {
    this.studentForm.reset();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  loggedIn(): void {
    if(localStorage.getItem('flogin') === 'success' || localStorage.getItem('slogin') === 'success') {
      this.isLoggedIn = true;
    }
  }

}
