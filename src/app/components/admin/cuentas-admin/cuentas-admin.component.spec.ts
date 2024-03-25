import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasAdminComponent } from './cuentas-admin.component';

describe('CuentasAdminComponent', () => {
  let component: CuentasAdminComponent;
  let fixture: ComponentFixture<CuentasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
