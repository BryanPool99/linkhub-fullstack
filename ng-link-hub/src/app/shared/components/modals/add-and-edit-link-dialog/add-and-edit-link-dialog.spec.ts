import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditLinkDialog } from './add-and-edit-link-dialog';

describe('AddAndEditLinkDialog', () => {
  let component: AddAndEditLinkDialog;
  let fixture: ComponentFixture<AddAndEditLinkDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditLinkDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAndEditLinkDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
