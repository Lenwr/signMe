import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "../app/views/clients/clients.component";
import {FormulaireComponent} from "../app/views/formulaire/formulaire.component";
import {OutilsComponent} from "../app/views/outils/outils.component";
import {FactureComponent} from "../app/views/facture/facture.component";
import {LivraisonColisComponent} from "../app/views/livraison-colis/livraison-colis.component";
import {ExpeditionColisComponent} from "../app/views/expedition-colis/expedition-colis.component";


const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'outils', component: OutilsComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'livraisonColis', component: LivraisonColisComponent },
  { path: 'expeditionColis', component: ExpeditionColisComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule { }
