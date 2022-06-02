import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-generic-dialog-info',
  templateUrl: './generic-dialog-info.component.html',
  styleUrls: ['./generic-dialog-info.component.scss']
})
export class GenericDialogInfoComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<GenericDialogInfoComponent>) { }

  ngOnInit(): void {
  }

  accept() {
    this.dialogRef.close();
  }

}
