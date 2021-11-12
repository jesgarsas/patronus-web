import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GenericDialogComponent } from 'src/app/component/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-user-dialog-reset-password',
  templateUrl: './user-dialog-reset-password.component.html',
  styleUrls: ['./user-dialog-reset-password.component.scss']
})
export class UserDialogResetPasswordComponent extends GenericDialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<GenericDialogComponent>) { 
    super(dialogRef);
  }

  ngOnInit(): void {
  }

}
