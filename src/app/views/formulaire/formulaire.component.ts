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
  FormArray,
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
  showCardBoardBool: boolean = false
  showDescriptionBool: boolean = false
 
  // @ts-ignore
  form: FormGroup
  //choix formulaire
  choiceControl = new FormControl<Choice | null>(null, Validators.required)
  Choices: Choice[] = [
    { name: 'Livraison de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Expedition de Colis', img: '/assets/icons/hinata.jpg' },
  ]

  constructor(
    private userData: UserDataService,
    private fb: FormBuilder,
    private http: HttpClient,
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
      cardBoardQuantity: [null, Validators.required],
      packageQuantity: [null, Validators.required],
      recipientName: [null, Validators.required],
      recipientSurname: [null, Validators.required],
    })
  }

  onFileSelected(event: any) {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        const file = event.target.files[i]
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.urls.push(reader.result as string)
          const imageDataUrl = reader.result as string
          const base64Image = window.btoa(imageDataUrl)
          const images = this.form.get('images')
          ;(images as FormArray).push(this.fb.control(base64Image))
          console.log(images)
        }
        reader.readAsDataURL(files[i])
      }
    }
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

  // onFileSelected(event: any) {
  //   this.SelectedFiles = event.target.files
  //   console.log(this.SelectedFiles[0])
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     const file = event.target.files[i]
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => {
  //       this.urls.push(reader.result as string)
  //       console.log(this.urls)
  //     }
  //     this.selectedFiles.push(event.target.files[i])
  //     console.log(this.selectedFiles)
  //   }

  // }

  // onFileSelected(event: any) {
  //   const files = event.target.files

  //   if (files) {
  //     const images: any = []
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i]
  //       const reader = new FileReader()
  //       reader.onload = () => {
  //         const imageBlob = new Blob([reader.result as string], {
  //           type: file.type,
  //         })
  //         images.push(imageBlob)
  //         this.form.controls['images'].setValue(images)
  //       }
  //       reader.readAsArrayBuffer(file)
  //     }
  //   }
  // }

  onSubmit() {
    this.userData
      .saveCustomer({ data: this.form.value })
      .subscribe((response) => {
        console.log(response)
        this.form.reset()
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  showCardBoard() {
    this.showCardBoardBool = !this.showCardBoardBool
  }
  showDescription() {
    this.showDescriptionBool = !this.showDescriptionBool
  }
}
