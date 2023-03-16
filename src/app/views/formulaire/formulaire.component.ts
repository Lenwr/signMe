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
import {FormBuilder, FormControl, Validators} from '@angular/forms'
interface Choice {
  name: string
  img: string
}

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  sub = new Subscription()
  customers: any
  urls: string[] = []
  url = environment.apiUrl + '/clients'
  selectedFile!: File
  selectedForm: boolean = false
  selectedForm2: boolean = false
  showDescriptionBool: boolean = false
  showCardBoardBool: boolean = false
  // @ts-ignore
  form: FormGroup

  constructor(
    private route: Router,
    private userData: UserDataService,
    private fb: FormBuilder,
  ) {}


  initForm() {
    this.form = this.fb.group({
      shipperName: [null, Validators.required],
      shipperSurname: [null, Validators.required],
      shipperAddress: [null, Validators.required],
      recipientAddress: [null, Validators.required],
      shipperPhone: [null, Validators.required],
      recipientPhone: [null, Validators.required],
      packageDescription: [null, Validators.required],
      destination: [null, Validators.required],
      description: [null, Validators.required],
      cardBoardQuantity: [null, Validators.required],
      packageQuantity: [null, Validators.required],
      recipientName: [null, Validators.required],
      recipientSurname: [null, Validators.required],
    })
  }
  ngOnInit(): void {
    this.initForm()
    this.sub.add(
      this.userData.customers().subscribe((data) => {
        this.customers = data
      }),
    )
  }

  // envoi des données du formulaire
  // console.warn(data)
  // toujours mettre la data dans un objet avant l envoi vers strapi

  sendCustomersFormData(formData: any) {
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
  submit() {
    if (this.choiceControl.value?.name == 'Expedition de Colis') {
      this.selectedForm = true
    } else if (this.choiceControl.value?.name == 'Livraison de Colis') {
      this.route.navigate(['livraisonColis'])
    } if (this.choiceControl.value?.name == 'Déménagement') {
      this.route.navigate(['facture'])
    }
    console.log(this.choiceControl.value?.name)
  }

  //choix formulaire
  choiceControl = new FormControl<Choice | null>(null, Validators.required)
  Choices: Choice[] = [
    { name: 'Livraison de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Expedition de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Déménagement', img: '/assets/icons/hinata.jpg' },
  ]

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  showDescription() {
    this.showDescriptionBool = !this.showDescriptionBool
  }
  showCardBoard() {
    this.showCardBoardBool = !this.showCardBoardBool
  }

  onSubmit() {
    this.userData
      .saveCustomer({ data: this.form.value })
      .subscribe((response) => {
        console.log(response)
        this.form.reset()
      })
  }
}
