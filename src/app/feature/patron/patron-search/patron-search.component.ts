import { Component, HostListener, OnInit } from '@angular/core';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
   selector: 'app-patron-search',
   templateUrl: './patron-search.component.html',
   styleUrls: ['./patron-search.component.scss']
})
export class PatronSearchComponent implements OnInit {

   public mobile: boolean = false;
   public patronesFiltered: PatronDTO[] = [];
   
   public patrones: any = [
      {
         "id": 1,
         "nombre": "Observable",
         "fechaCreacion": "2021-01-10",
         "autor": {
            "id": 5,
            "nick": "profesor"
         },
         "descripcion": {
            "id": 1,
            "descripcion": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "locale": {
               "id": 1,
               "code": "es"
            }
         }
      },
      {
         "id": 2,
         "nombre": "Patron",
         "fechaCreacion": "2021-02-21",
         "autor": {
            "id": 3,
            "nick": "pepe"
         },
         "descripcion": {
            "id": 2,
            "descripcion": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "locale": {
               "id": 1,
               "code": "es"
            }
         }
      },
      {
         "id": 3,
         "nombre": "Controller",
         "fechaCreacion": "2021-05-21",
         "autor": {
            "id": 3,
            "nick": "pepe"
         },
         "descripcion": {
            "id": 3,
            "descripcion": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "locale": {
               "id": 1,
               "code": "es"
            }
         }
      }
   ];

   constructor() { }

   ngOnInit(): void {
      this.resizeInteface();
      this.patronesFiltered = this.patrones;
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

   private resizeInteface() {
      this.mobile = window.innerWidth <= AppContants.minWidthPhone;
   }

}
