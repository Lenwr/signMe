import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserDataService} from "../../../services/user-data.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  sub = new Subscription()
  message : string = ''
  form!: FormGroup
  private tokenKey = '';

  auth?: AuthService ;
  constructor(
    private userData: UserDataService,
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ) { }
  initForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],

    })
  }

  ngOnInit(): void {
    this.initForm()
    this.auth = this.authService
  }

  success() {
    alert('Vos informations ont bien été enrégistrés !!!!')
  }
  onSubmit() {
    this.userData.authenticate({
      identifier: this.form.value.email,
      password: this.form.value.password}
    ).subscribe( (response) =>{
      this.tokenKey = response.jwt
      console.log(this.tokenKey)
    });

    this.message = 'Tentative de connexion en cours . . . ',

      this.authService.login(this.form.value.email ,this.form.value.password )
        .subscribe((isLoggedIn : boolean) => {
          this.setMessage();
          if(isLoggedIn){
            this.router.navigate(['/clients'])
          } else {
            this.form.value.password= "" ;
            this.router.navigate(['/connexion'])
          }
        })
  }

  setMessage(){
     if(this.authService.isLoggedIn){
       this.message = 'Vous êtes connecté'
     }else{
       this.message = 'Identifiant ou mot de passe incorrect'
     }
  }



  //token



  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }


}
