import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FormulaireComponent } from './views/formulaire/formulaire.component'
import { ClientsComponent } from './views/clients/clients.component'
import { RouterOutlet } from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { FormRoutingModule } from '../routes/form-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { ClientDetailsComponent } from './views/client-details/client-details.component'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import { NavComponent } from './views/nav/nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { OutilsComponent } from './views/outils/outils.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { FactureComponent } from './views/facture/facture.component';
import { LivraisonColisComponent } from './views/livraison-colis/livraison-colis.component';
import { ExpeditionColisComponent } from './views/expedition-colis/expedition-colis.component';


@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    ClientsComponent,
    ClientDetailsComponent,
    NavComponent,
    OutilsComponent,
    FactureComponent,
    LivraisonColisComponent,
    ExpeditionColisComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterOutlet,
    FormsModule,
    FormRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    ApolloModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://localhost:1337/graphql',
          }),
        }
      },
      deps: [HttpLink],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
