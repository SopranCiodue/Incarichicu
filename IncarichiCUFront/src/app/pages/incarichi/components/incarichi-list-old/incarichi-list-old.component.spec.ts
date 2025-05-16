import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncarichiListOldComponent } from './incarichi-list-old.component';

describe('IncarichiListComponent', () => {
  let component: IncarichiListOldComponent;
  let fixture: ComponentFixture<IncarichiListOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncarichiListOldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncarichiListOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
