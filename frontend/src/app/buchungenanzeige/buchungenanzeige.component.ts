import { Component, OnInit } from '@angular/core';
import { ApiconnectorService } from '../apiconnector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buchungenanzeige',
  templateUrl: './buchungenanzeige.component.html',
  styleUrls: ['./buchungenanzeige.component.sass']
})
export class BuchungenanzeigeComponent implements OnInit {

  reterror: string;
  buchungen ;

  constructor(private acs: ApiconnectorService, private router: Router) { }

  ngOnInit() {
    this.acs.getBuchungen(null, null).subscribe(data => {
      this.buchungen = data;
    }, err => this.reterror = err);
  }

  bearbeiten(idx: number) {
    this.router.navigateByUrl('personeneingabe', { state: this.buchungen[idx] });
  }
  loeschen(idx: number) {
    if (confirm('Diese Buchung wirklich löschen?')) {
      this.reterror = null;
      
      const bid = this.buchungen[idx].id;    
      this.acs.deleteBuchung({id: bid}).subscribe(ret => {
        console.log(ret);
      }, err => this.reterror = err);      
    }
  }

}
