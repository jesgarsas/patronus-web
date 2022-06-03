import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});

  constructor(protected dialogRef: NbDialogRef<GenericDialogComponent>) { }

  ngOnInit(): void {
  }

  accept(): void {}

  close(): void { this.dialogRef.close(); }

}

