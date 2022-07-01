import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';
import { AppContants } from 'src/app/utils/app-constants';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page/page';
import { ToastService } from 'src/app/service/toast.service';
import { PatronFilterDto } from 'src/app/models/patron/filters/patron-filter-dto';
import { FilterDto } from 'src/app/models/filter/filter-dto';

@Component({
   selector: 'app-patron-search',
   templateUrl: './patron-search.component.html',
   styleUrls: ['./patron-search.component.scss']
})
export class PatronSearchComponent implements OnInit {

   public mobile: boolean = false;
   public numPages: number[] = [];
   public statusPage: string[] = ['primary', 'basic', 'basic'];
   public page: Page = new Page();
   public filter: PatronFilterDto = new PatronFilterDto();

   public patrones: PatronDTO[] = []
   public nameFilter: any;
   public loading: boolean = false;

   constructor(
      private patronService: PatronService,
      private router: Router,
      private toastService: ToastService
   ) { }

   ngOnInit(): void {
      this.resizeInteface();
      this.getAllPatrones();
   }

   @HostListener('window:resize', ['$event'])
   onResize() {
      this.resizeInteface();
   }

   public handleInput(event: any) {
      if (event.code === 'Enter') { return this.filterList(); }
   }

   public setFilter(event: any) {
      this.nameFilter = event.target.value;
   }

   public filterList() {
      this.filter = new PatronFilterDto(this.nameFilter ? this.nameFilter.trim() : '');
      this.getAllPatrones();
   }

   public goToDetails(idPatron: number) {
      this.router.navigate([AppContants.PATRON_DETALLES_PATH], { queryParams: { id: idPatron }, queryParamsHandling: 'merge' });
   }

   public onPage(value: any) {
      this.statusPage[this.filter.pageNumber!] = 'basic';
      this.statusPage[value - 1] = 'primary';
      this.filter.pageNumber! = value - 1;
      this.getAllPatrones();
   }

   private resizeInteface() {
      this.mobile = window.innerWidth <= AppContants.minWidthPhone;
   }

   private getAllPatrones() {
      this.loading = true;
      this.patronService.getAllByPageFilter(this.filter).pipe(take(1)).subscribe((data: Page) => {
         if (data) {
            this.page = data;
            if (this.numPages.length !== data.totalPages) { this.generatePaginator() };
            this.loading = false;
         }
      }, error => {
         this.loading = false;
         this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
      });
   }
   private generatePaginator() {
      this.numPages = [];
      for (let i = 0; i < this.page.totalPages!; i++) {
         this.numPages[i] = i + 1;
         this.statusPage[i] = 'basic';
      }
      if (this.page.totalPages! > 0) { this.statusPage[0] = 'primary'; }
   }

}
