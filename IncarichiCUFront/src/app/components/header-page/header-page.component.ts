import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private router: Router,)
  {

  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

goToIncarichi()
{
  this.router.navigateByUrl("template/incarichi");
}
}
