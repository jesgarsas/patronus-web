import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-password-change',
  templateUrl: './dialog-password-change.component.html',
  styleUrls: ['./dialog-password-change.component.scss']
})
export class DialogPasswordChangeComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});

  constructor(protected dialogRef: NbDialogRef<DialogPasswordChangeComponent>) { }

  ngOnInit(): void {
  }

  accept(): void {}

  close(): void { this.dialogRef.close(); }

}
