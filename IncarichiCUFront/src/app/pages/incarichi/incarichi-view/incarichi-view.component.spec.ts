import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiViewComponent } from './incarichi-view.component';

describe('IncarichiViewComponent', () => {
  let component: IncarichiViewComponent;
  let fixture: ComponentFixture<IncarichiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncarichiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncarichiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
