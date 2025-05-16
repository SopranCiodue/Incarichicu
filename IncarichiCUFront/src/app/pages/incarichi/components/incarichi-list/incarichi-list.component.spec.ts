import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiListComponent } from './incarichi-list.component';

describe('IncarichiListComponent', () => {
  let component: IncarichiListComponent;
  let fixture: ComponentFixture<IncarichiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncarichiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncarichiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
