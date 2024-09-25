import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMesasComponent } from './ranking-mesas.component';

describe('RankingMesasComponent', () => {
  let component: RankingMesasComponent;
  let fixture: ComponentFixture<RankingMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingMesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
