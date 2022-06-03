import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GenericDialogDeleteComponent } from '../generic-dialog-delete/generic-dialog-delete.component';

@Component({
  selector: 'app-generic-dialog-cancel',
  templateUrl: './generic-dialog-cancel.component.html',
  styleUrls: ['./generic-dialog-cancel.component.scss']
})
export class GenericDialogCancelComponent implements OnInit {
  
  constructor(protected dialogRef: NbDialogRef<GenericDialogDeleteComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  accept() {
    
  }
}
