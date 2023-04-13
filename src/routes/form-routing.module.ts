import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "../app/views/clients/clients.component";
import {FormulaireComponent} from "../app/views/formulaire/formulaire.component";
import {OutilsComponent} from "../app/views/outils/outils.component";
import {FactureComponent} from "../app/views/facture/facture.component";
import {LivraisonColisComponent} from "../app/views/livraison-colis/livraison-colis.component";
import {ExpeditionColisComponent} from "../app/views/expedition-colis/expedition-colis.component";
import {SubmitPageComponent} from "../app/views/submit-page/submit-page.component";
import {ConnexionComponent} from "../app/views/connexion/connexion.component";
import {AuthGuard} from "../app/auth.guard";



const routes: Routes = [
  {path: '', redirectTo: 'formulaire', pathMatch: "full"},
  { path: 'clients', component: ClientsComponent , canActivate: [AuthGuard]},
  { path: 'formulaire', component: FormulaireComponent},
  { path: 'outils', component: OutilsComponent , canActivate: [AuthGuard]},
  { path: 'facture', component: FactureComponent , canActivate: [AuthGuard]},
  { path: 'livraisonColis', component: LivraisonColisComponent , canActivate: [AuthGuard]},
  { path: 'expeditionColis', component: ExpeditionColisComponent  },
  { path: 'submit', component: SubmitPageComponent , },
  { path: 'connexion', component: ConnexionComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule { }
