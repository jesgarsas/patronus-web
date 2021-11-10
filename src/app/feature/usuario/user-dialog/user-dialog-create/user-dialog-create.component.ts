import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GenericDialogComponent } from 'src/app/component/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-user-dialog-create',
  templateUrl: './user-dialog-create.component.html',
  styleUrls: ['./user-dialog-create.component.scss']
})
export class UserDialogCreateComponent extends GenericDialogComponent implements OnInit {

  @Input() public rol: number = 1;
  @Input() public label: string = 'Crear usuario';

  constructor(protected dialogRef: NbDialogRef<GenericDialogComponent>) { 
    super(dialogRef);
  }

  ngOnInit(): void {
  }

}
