import { Component, OnInit } from '@angular/core';
import {map} from "rxjs";
import {Apollo, gql} from "apollo-angular";
import {UserDataService} from "../../../services/user-data.service";
import {PdfServiceService} from "../../../services/pdfService.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string [] = ['Nom', 'Prénoms','Destination','Colis','VoirPlus'];
  more: boolean = false
  selectedClient: any
  myData : any


  constructor(private apollo: Apollo,
              private data: UserDataService,
              ) {}

  ngOnInit(): void {
    this.data.customersPop().subscribe((result:any)=>{
      this.myData = result.data
    })

  }

  clients$ = this.apollo
    .watchQuery({
      query: gql`
      query {
        clients {
          data {
            id
            attributes {
              shipperPhone
              recipientPhone
              destination
              createdAt
              updatedAt
              publishedAt
              shipperName
              shipperSurname
              shipperAddress
              recipientAddress
              packageDescription
              packageQuantity
              recipientName
              recipientSurname
              pictures {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
      `,
    })
    .valueChanges.pipe(
      map((result:any) => result.data.clients.data.map((c:any) => c.attributes))
    );

    voirPlus(user: any){
      this.selectedClient = user
    }

  retour(){
       this.selectedClient = false
  }



}
