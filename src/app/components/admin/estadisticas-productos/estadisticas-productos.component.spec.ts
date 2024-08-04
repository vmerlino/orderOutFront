import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasProductosComponent } from './estadisticas-productos.component';

describe('EstadisticasProductosComponent', () => {
  let component: EstadisticasProductosComponent;
  let fixture: ComponentFixture<EstadisticasProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
