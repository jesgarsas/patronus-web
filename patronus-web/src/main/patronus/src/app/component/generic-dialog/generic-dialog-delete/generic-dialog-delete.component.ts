import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-generic-dialog-delete',
  templateUrl: './generic-dialog-delete.component.html',
  styleUrls: ['./generic-dialog-delete.component.scss']
})
export class GenericDialogDeleteComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<GenericDialogDeleteComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  accept() {
    
  }
}
