import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { environment } from '../../../environments/environment'
import { UserDataService } from '../../../services/user-data.service'
import { Router } from '@angular/router'
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  sub = new Subscription()
  customers: any
  urls: string[] = []
  URL = environment.apiUrl + '/clients'

  selectedFile!: File
  http: any

  constructor(
    private route: Router,
    private userData: UserDataService,
    http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.userData.customers().subscribe((data) => {
        this.customers = data
      }),
    )
  }

  // envoi des données du formulaire
  sendCustomersFormData(formData: any) {
  // console.warn(data)
  // toujours mettre la data dans un objet avant l envoi vers strapi
   this.userData.saveCustomer({ data: formData }).subscribe((result) => {
    console.log(result)
    })
  }

  // sendCustomersFormData(formData: any) {
  //   const postData = new FormData()
  //   postData.append('shipperName', formData.shipperName)
  //   postData.append('shipperSurname', formData.shipperSurname)
  //   postData.append('destination', formData.destination)
  //   postData.append('shipperAddress', formData.shipperAddress)
  //   postData.append('shipperPhone', formData.shipperPhone)
  //   postData.append('recipientName', formData.recipientName)
  //   postData.append('recipientSurname', formData.recipientSurname)
  //   postData.append('recipientPhone', formData.recipientPhone)
  //   postData.append('recipientAddress', formData.recipientAddress)
  //   postData.append('packageDescription', formData.packageDescription)
  //   postData.append('packageQuantity', formData.packageQuantity)
  //   for (let i = 0; i < this.urls.length; i++) {
  //     postData.append('pictures', this.urls[i])
  //   }
  //   this.http.post(this.URL, postData).subscribe((response: any) => {
  //     console.log(postData)
  //     console.log(response)
  //     // Faites quelque chose après la réussite de la requête
  //     alert('votre coli a été enregistré')
  //   })
  // }

  //afficher les images uploadées
  onselect(event: any): void {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.urls.push(reader.result as string)
        }
      }
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.result
    console.log(this.selectedFile)
  }

  //
  success() {
    alert('Vos informations ont bien été enrégistrés !!!!')
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
