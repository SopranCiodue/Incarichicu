import { Component, OnInit } from '@angular/core';
import { IncarichiService } from '../services/incarichi.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  incarichi: any;
  allegatiList: any;
  allegatiData: any;

  constructor(private incarichiservice: IncarichiService) {}

  ngOnInit(): void {
    this.incarichiservice.getIncarichi().subscribe((data) => {
      this.incarichi = data;
      console.log('Incarichi:', this.incarichi);
    });
    this.incarichiservice.getAllegatiList().subscribe((data) => {
      this.allegatiList = data;
      console.log('AllegatiList:', this.allegatiList);
    });
  }
}
