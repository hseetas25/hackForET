import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {

  documentData: object;
  subjects: Array<string>;
  searchPipe: any = '';
  searchWord: any = '';
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
    this.documentData = {};
    this.subjects = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var year = localStorage.getItem('roll').substring(0, 2);
    if(year == '19') {
      year = '3';
    }
    if(year == '18') {
      year = '4';
    }
    if(year == '20') {
      year = '2';
    }
    if(year == '21') {
      year = '1'
    }
    const collection = localStorage.getItem('branch') + year + localStorage.getItem('sec');
    this.firestore.collection(collection).snapshotChanges().subscribe((data)=>{
      if(data && data.length > 0) {
        data.forEach((data)=>{
          let obj: any=  data.payload.doc.data();
          if( obj.subject in this.documentData) {
            this.documentData[obj.subject].push(obj);
          }
          else {
            this.documentData[obj.subject] = [obj];
            this.subjects.push(obj.subject);
          }
        });
      }
    });

    console.log(this.documentData);
    
  }

  openNewTab(url: string): void {
    window.open(url, '_blank')
  }

}
