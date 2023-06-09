import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
  constructor(private router: Router,)
{

}

test()
{
  this.router.navigateByUrl("template/paginaDesiderata");
}
goToIncarichi()
{
  this.router.navigateByUrl("template/incarichi");
}
}
