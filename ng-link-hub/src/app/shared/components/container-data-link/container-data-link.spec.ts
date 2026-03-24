import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDataLink } from './container-data-link';

describe('ContainerDataLink', () => {
  let component: ContainerDataLink;
  let fixture: ComponentFixture<ContainerDataLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerDataLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerDataLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
