import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiFilterComponent } from './incarichi-filter.component';

describe('IncarichiFilterComponent', () => {
  let component: IncarichiFilterComponent;
  let fixture: ComponentFixture<IncarichiFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncarichiFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncarichiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
