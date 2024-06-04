import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoCreateComponent } from './mozo-create.component';

describe('MozoCreateComponent', () => {
  let component: MozoCreateComponent;
  let fixture: ComponentFixture<MozoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MozoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MozoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
