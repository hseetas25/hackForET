import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-faculty-page',
  templateUrl: './faculty-page.component.html',
  styleUrls: ['./faculty-page.component.scss']
})
export class FacultyPageComponent implements OnInit {

  isFormSubmitted: boolean;
  facultyForm: FormGroup;
  file: FileList;
  fileName: string;
  url: string;
  uploadProgress: any;
  validationMessages = {
    bCode: [
      { type: 'required', message: 'Branch is required.'},
      { type: 'pattern', mesaage: 'Branch Code can contain atmost 3 characters.'}
    ],
    year: [
      { type: 'required', message: 'Year is required.' },
      { type: 'pattern', message: 'Year is of 1 digit.' }
    ],
    section: [
      { type: 'required', message: 'Section is required.'},
      { type: 'pattern', mesaage: 'Section can contain atmost 1 character.'}
    ],
    subject: [
      { type: 'required', message: 'Subject is required.'}
    ]
  };
  validationPattern = {
    bCode: new RegExp(`[a-zA-Z]{2,3}$`),
    year: new RegExp(`[1-4]{1}`),
    section: new RegExp(`[a-zA-Z]{1}$`)
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {
    this.isFormSubmitted = false;
    this.fileName = 'No File Selected';
    this.url =  '';
  }
  async upload(event: any): Promise<void> {
    this.file = event.target.files;
    const fileUpload: File = this.file.item(0);
    this.fileName = fileUpload.name;
    const fileRef = this.storage.ref(this.fileName);
    await fileRef.put(fileUpload);
    this.uploadProgress = await fileRef.put(fileUpload).percentageChanges();
    fileRef.getDownloadURL().subscribe(data=>{
      this.facultyForm.value.url = data;
      this.fileURL();
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.facultyForm = this.formBuilder.group({
      bCode: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.bCode), Validators.maxLength(3)]
      ),
      year: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.year)]
      ),
      section: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.section), Validators.maxLength(1)]
      ),
      subject: new FormControl(
        '', [Validators.required]
      ),
      url: new FormControl('')
    })
  }

  resetForm(): void {
    this.facultyForm.reset();
  }

  submitFacultyForm(): void {
    if(this.facultyForm.invalid) {
      return;
    }
    if(this.facultyForm.valid) {

    }
  }

  fileURL(): void {
    console.log(this.facultyForm.value)
  }

}
