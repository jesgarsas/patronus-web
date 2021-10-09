import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';


@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.scss']
})
export class PatronDetailsComponent implements OnInit {

  public idPatron: number = -1;
  public patron: PatronDTO | undefined = undefined;

  constructor(
    private patronService: PatronService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.idPatron = params.id;
    });

    this.patronService.getByIdAndLocale(this.idPatron, 1).pipe(take(1)).subscribe(data => {
      this.patron = data;
    });
  }

}
