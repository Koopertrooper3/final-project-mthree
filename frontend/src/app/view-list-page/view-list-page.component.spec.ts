import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListPageComponent } from './view-list-page.component';

describe('ViewListPageComponent', () => {
  let component: ViewListPageComponent;
  let fixture: ComponentFixture<ViewListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
