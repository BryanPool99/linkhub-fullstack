import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCustomInput } from './container-custom-input';

describe('ContainerCustomInput', () => {
  let component: ContainerCustomInput;
  let fixture: ComponentFixture<ContainerCustomInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCustomInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerCustomInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
