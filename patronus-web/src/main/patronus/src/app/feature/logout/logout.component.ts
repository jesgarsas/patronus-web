import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { NotifierService } from 'src/app/service/notifier.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-logout',
  template: '',
  styleUrls: []
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(private loginService: LoginService,
    private toastService: ToastService,
    private router: Router,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loginService.logout();
      this.toastService.showConfirmation('Éxito', 'Se ha cerrado la sesión');
      this.notifierService.emitUserLogged(false);
      this.router.navigate([AppContants.LOGIN_PATH]);
    });
  }

}
