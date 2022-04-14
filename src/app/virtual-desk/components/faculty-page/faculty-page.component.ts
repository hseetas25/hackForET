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
  facultyData: any = [];
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
    bCode: new RegExp(`[A-Z]{2,3}$`),
    year: new RegExp(`[1-4]{1}`),
    section: new RegExp(`[A-Z]{1}$`)
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
    this.facultyData = [];
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
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getDocs();
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
      url: new FormControl(''),
      name: new FormControl('')
    })
  }

  resetForm(): void {
    this.facultyForm.reset();
  }

  async submitFacultyForm(): Promise<void> {
    this.facultyForm.value.name = localStorage.getItem('name');
    console.log(this.facultyForm.value)
      const collection = this.facultyForm.value.bCode + this.facultyForm.value.year + this.facultyForm.value.section;
      const fCollection = localStorage.getItem('id');
      const id = this.firestore.createId();
      await this.firestore.collection(collection).doc(id).set(this.facultyForm.value).then((data)=>{});
      await this.firestore.collection(fCollection).doc(id).set(this.facultyForm.value).then((data)=>{});
      this.toastr.success('Uploaded', 'File Successfully');
      this.delay(2000);
      window.location.reload();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getDocs(): Promise<void> {
    await this.firestore.collection(localStorage.getItem('id')).stateChanges().subscribe((data)=>{
      if(data && data.length > 0) {
        data.forEach((data)=>{
          this.facultyData.push(data.payload.doc.data());
        })
      }
    })
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

}
