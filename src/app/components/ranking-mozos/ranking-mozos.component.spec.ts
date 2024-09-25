import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMozosComponent } from './ranking-mozos.component';

describe('RankingMozosComponent', () => {
  let component: RankingMozosComponent;
  let fixture: ComponentFixture<RankingMozosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingMozosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMozosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
