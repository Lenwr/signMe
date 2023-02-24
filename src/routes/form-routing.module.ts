import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TestComponent } from 'src/app/test/test.component'
import { ClientsComponent } from '../app/views/clients/clients.component'
import { FormulaireComponent } from '../app/views/formulaire/formulaire.component'

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'test', component: TestComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
