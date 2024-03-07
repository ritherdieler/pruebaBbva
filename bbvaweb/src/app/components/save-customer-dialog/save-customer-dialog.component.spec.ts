import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCustomerDialogComponent } from './save-customer-dialog.component';

describe('SaveCustomerDialogComponent', () => {
  let component: SaveCustomerDialogComponent;
  let fixture: ComponentFixture<SaveCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveCustomerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
