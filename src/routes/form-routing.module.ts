import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "../app/views/clients/clients.component";
import {FormulaireComponent} from "../app/views/formulaire/formulaire.component";
import {OutilsComponent} from "../app/views/outils/outils.component";


const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'outils', component: OutilsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule { }
