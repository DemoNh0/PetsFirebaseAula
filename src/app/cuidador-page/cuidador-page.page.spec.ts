import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadorPagePage } from './cuidador-page.page';

describe('CuidadorPagePage', () => {
  let component: CuidadorPagePage;
  let fixture: ComponentFixture<CuidadorPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
