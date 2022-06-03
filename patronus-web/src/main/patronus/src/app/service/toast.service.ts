import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  showError(title: string, msg: string, position?: NbGlobalLogicalPosition) {
    this.toastrService.danger(msg, title, { position: position ? position : NbGlobalLogicalPosition.TOP_END, limit: 3, icon: { icon: 'close-outline', pack: 'eva' } });
  }

  showConfirmation(title: string, msg: string, position?: NbGlobalLogicalPosition) {
    this.toastrService.success(msg, title, { position: position ? position : NbGlobalLogicalPosition.TOP_END, limit: 3 });
  }
}
