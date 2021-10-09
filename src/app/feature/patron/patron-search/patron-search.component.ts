import { Component, HostListener, OnInit } from '@angular/core';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';
import { AppContants } from 'src/app/utils/app-constants';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
   selector: 'app-patron-search',
   templateUrl: './patron-search.component.html',
   styleUrls: ['./patron-search.component.scss']
})
export class PatronSearchComponent implements OnInit {

   public mobile: boolean = false;
   public patronesFiltered: PatronDTO[] = [];
   
   public patrones: PatronDTO[] = []
   constructor(
      private patronService: PatronService,
      private router: Router
      ) { }

   ngOnInit(): void {
      this.resizeInteface();
      this.getAllPatrones();
   }

   @HostListener('window:resize', ['$event'])
   onResize() {
      this.resizeInteface();
   }

   public filterList(event: any) {
      let text: string = event.target.value;
      if(text ===  undefined || text.trim().length === 0 ) {
         this.patronesFiltered = this.patrones;
         return;
      }
      let array: PatronDTO[] = [];
      this.patrones.forEach((item: PatronDTO) => {
         if(item.nombre!.trim().toLowerCase().search(text.trim().toLowerCase()) !== -1) {
            array.push(item);
         }
      });
      this.patronesFiltered = array;
   }

   public goToDetails(idPatron: number) {
      console.log(idPatron)
      this.router.navigate(['/patron/detalles'], { queryParams: { id: idPatron }, queryParamsHandling: 'merge' });
   }

   private resizeInteface() {
      this.mobile = window.innerWidth <= AppContants.minWidthPhone;
   }

   private getAllPatrones() {
      this.patronService.getAllByLocale(1).pipe(take(1)).subscribe(data => {
         this.patrones = data;
         this.patronesFiltered = this.patrones;
      });
   }

}
