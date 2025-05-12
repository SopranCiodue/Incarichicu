import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiAllegatiComponent } from './incarichi-allegati.component';

describe('IncarichiAllegatiComponent', () => {
  let component: IncarichiAllegatiComponent;
  let fixture: ComponentFixture<IncarichiAllegatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IncarichiAllegatiComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(IncarichiAllegatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
