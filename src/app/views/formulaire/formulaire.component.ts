import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { environment } from '../../../environments/environment'
import { UserDataService } from '../../../services/user-data.service'
import { Router } from '@angular/router'
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field'

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  sub = new Subscription()
  customers: any
  urls: string[] = []

  selectedFile!: File

  constructor(private route: Router, private userData: UserDataService) {}

  ngOnInit(): void {
    this.sub.add(
      this.userData.customers().subscribe((data) => {
        this.customers = data
      }),
    )
  }

  //envoi des données du formulaire
  getCustomersFormData(formData: any) {
    //console.warn(data)
    //toujours mettre la data dans un objet avant l envoi vers strapi
    this.userData.saveCustomer({ data: formData }).subscribe((result) => {})
  }

  next() {
    this.route.navigate(['colis']).then(
      (nav) => {
        console.log(nav) // true if navigation is successful
      },
      (err) => {
        console.log(err) // when there's an error
      },
    )
  }

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
