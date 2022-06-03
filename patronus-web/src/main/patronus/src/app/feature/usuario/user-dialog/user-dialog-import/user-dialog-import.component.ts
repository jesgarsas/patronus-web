import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GenericDialogComponent } from 'src/app/component/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-user-dialog-import',
  templateUrl: './user-dialog-import.component.html',
  styleUrls: ['./user-dialog-import.component.scss']
})
export class UserDialogImportComponent extends GenericDialogComponent implements OnInit {

  @Input() nombres: String[] = [];

  constructor(protected dialogRef: NbDialogRef<GenericDialogComponent>) { 
    super(dialogRef);
  }

  ngOnInit(): void {
  }

}
