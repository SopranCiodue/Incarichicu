import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiAllegatiOldComponent } from './incarichi-allegati-old.component';

describe('IncarichiAllegatiComponent', () => {
  let component: IncarichiAllegatiOldComponent;
  let fixture: ComponentFixture<IncarichiAllegatiOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncarichiAllegatiOldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncarichiAllegatiOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
