import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionComponentes } from './presentacion-componentes';

describe('PresentacionComponentes', () => {
  let component: PresentacionComponentes;
  let fixture: ComponentFixture<PresentacionComponentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentacionComponentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentacionComponentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
