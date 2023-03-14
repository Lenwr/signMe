import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauDeLivraisonComponent } from './bordereau-de-livraison.component';

describe('BordereauDeLivraisonComponent', () => {
  let component: BordereauDeLivraisonComponent;
  let fixture: ComponentFixture<BordereauDeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordereauDeLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BordereauDeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
