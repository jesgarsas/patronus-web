import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { PatronService } from 'src/app/service/patron.service';


@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.scss']
})
export class PatronDetailsComponent implements OnInit {

  public idPatron: number = -1;

  constructor(
    private patronService: PatronService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.idPatron = params.id;
    });
  }

}
