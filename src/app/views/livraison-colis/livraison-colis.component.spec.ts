import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonColisComponent } from './livraison-colis.component';

describe('LivraisonColisComponent', () => {
  let component: LivraisonColisComponent;
  let fixture: ComponentFixture<LivraisonColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivraisonColisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivraisonColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
