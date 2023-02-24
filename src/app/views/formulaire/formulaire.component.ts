import { Component, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'
import { UserDataService } from '../../../services/user-data.service'
import { Router } from '@angular/router'

import { HttpClient, HttpHeaders } from '@angular/common/http'
import {
  FormControl,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms'
import { Subscription } from 'rxjs/internal/Subscription'

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
  selectedFile!: any
  selectedForm: boolean = false
  selectedForm2: boolean = false
  uploadedFileUrl: string = ''
  selectedFiles: File[] = []
  SelectedFiles!: any[]
  imgs: string[] = []
  formData: FormData = new FormData()
  // @ts-ignore
  form: FormGroup

  constructor(
    private route: Router,
    private userData: UserDataService,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm()
    // this.form.valueChanges.subscribe((val) => {
    //   console.log(val)
    // })

    this.sub.add(
      this.userData.customers().subscribe((data) => {
        this.customers = data
      }),
    )
  }

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
      packageQuantity: [null, Validators.required],
      recipientName: [null, Validators.required],
      recipientSurname: [null, Validators.required],
      pictures: [null, Validators.required],
    })
  }

  // envoi des données du formulaire
  // console.warn(data)
  // toujours mettre la data dans un objet avant l envoi vers strapi

  sendCustomersFormData(formData: NgForm) {
    this.userData.saveCustomer({ data: formData.value }).subscribe((result) => {
      console.log(result)
    })
  }

  //
  success() {
    alert('Vos informations ont bien été enrégistrés !!!!')
  }
  submit() {
    if (this.choiceControl.value?.name == 'Expedition de Colis') {
      this.selectedForm = true
    } else if (this.choiceControl.value?.name == 'Livraison de Colis') {
      this.selectedForm2 = true
    } else this.selectedForm = false

    console.log(this.choiceControl.value?.name)
  }

  //choix formulaire
  choiceControl = new FormControl<Choice | null>(null, Validators.required)
  Choices: Choice[] = [
    { name: 'Livraison de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Expedition de Colis', img: '/assets/icons/hinata.jpg' },
  ]

  onFileSelected(event: any) {
    this.SelectedFiles = event.target.files
    console.log(this.SelectedFiles[0])
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.urls.push(reader.result as string)
      }
      this.selectedFiles.push(event.target.files[i])
      console.log(this.selectedFiles)
    }
  }
  onSubmit() {
    this.userData
      .saveCustomer({ data: this.form.value })
      .subscribe((response) => {
        console.log(response)
        this.form.reset()
      })
  }

  getCustomersFormData() {
    // this.formData.append('shipperName', formData.shipperName)
    // this.formData.append('shipperSurname', formData.shipperSurname)
    // this.formData.append('shipperAddress', formData.shipperAddress)
    // this.formData.append('shipperPhone', formData.shipperPhone)
    // this.formData.append('recipientName', formData.recipientName)
    // this.formData.append('recipientSurname', formData.recipientSurname)
    // this.formData.append('recipientAddress', formData.recipientAddress)
    // this.formData.append('recipientPhone', formData.recipientPhone)
    // this.formData.append('destination', formData.destination)
    // this.formData.append('description', formData.description)
    // this.formData.append('packageQuantity', formData.packageQuantity)

    // for (let i = 0; i < this.imgs.length; i++) {
    //   this.formData.append('pictures', this.imgs[i])
    // }

    // this.userData.saveCustomer({ data: formData }).subscribe((result) => {
    //   console.log(result)
    // })
    const formData = new FormData()
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(
        'files',
        this.selectedFiles[i],
        this.selectedFiles[i].name,
      )
      console.log(formData)
    }
    this.http
      .post('http://localhost:1337/api/upload', formData)
      .subscribe((response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.imgs.push(response[i].url)
        }
        console.log(this.imgs)
        // Enregistrer l'image dans Strapi en utilisant l'URL de l'image renvoyée
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
