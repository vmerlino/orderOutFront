import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MozosAdminComponent } from './mozos-admin.component';

describe('MozosAdminComponent', () => {
  let component: MozosAdminComponent;
  let fixture: ComponentFixture<MozosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MozosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MozosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
