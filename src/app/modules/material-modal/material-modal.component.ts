import { Component, OnInit, NgModule, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.scss']
})
export class MaterialModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log("this is what data contains",data)
     }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit() {
    }

}
