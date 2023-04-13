import { Component, OnInit } from '@angular/core';
import {Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormControl} from '@angular/forms'
import {UserDataService} from "../../../services/user-data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-expedition-colis',
  templateUrl: './expedition-colis.component.html',
  styleUrls: ['./expedition-colis.component.css']
})
export class ExpeditionColisComponent implements OnInit {


  sub = new Subscription()


  customers: any
  urls: string[] = []
  url = environment.apiUrl + '/clients'
  selectedFile!: File
  selectedForm2: boolean = false
  showDescriptionBool: boolean = false
  showCardBoardBool: boolean = false
  // @ts-ignore
  form: FormGroup
  constructor(
    private userData: UserDataService,
    private fb: FormBuilder,
    private router : Router
  ) {
  }

  initForm() {
    this.form = this.fb.group({
      shipperName: [null, Validators.required],
      shipperSurname: [null, ],
      shipperAddress: [null, ],
      recipientAddress: [null],
      shipperPhone: [null , Validators.required],
      recipientPhone:[null , Validators.required],
      packageDescription: [null],
      destination: [null],
      description: [null],
      cardBoardQuantity: [null ],
      packageQuantity: [null , Validators.required],
      recipientName: [null],
      recipientSurname: [null],
    });
    this.form.patchValue({
      shipperName: '',
      shipperSurname: '',
      shipperAddress: '',
      recipientAddress: '',
      shipperPhone: '',
      recipientPhone:'',
      packageDescription: '',
      destination: '',
      description: '',
      cardBoardQuantity: '0',
      recipientName: '',
      recipientSurname: '',
    });
  };




  ngOnInit(): void {
    this.initForm()
    this.sub.add(
      this.userData.customers().subscribe((data) => {
        this.customers = data
      }),
    )
  }

  sendCustomersFormData(formData: any) {
    this.userData.saveCustomer({ data: formData }).subscribe((result) => {
      console.log(result)
    })
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
        this.router.navigate(['submit'])
      })
  }

}
