import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLinkFooter } from './list-link-footer';

describe('ListLinkFooter', () => {
  let component: ListLinkFooter;
  let fixture: ComponentFixture<ListLinkFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLinkFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLinkFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
