import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";
import {Route, Router} from "@angular/router";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.apiUrl + '/auth/local'

  constructor(
    private router : Router ,
    private http: HttpClient
  ) { }

  isLoggedIn : boolean = false ;
  redirectUrl : string = '';

  login(mail: string , password : string ): Observable<boolean>{
    const isLoggedIn = ( mail == 'merveil@gmail.com' && password == 'Merveil2023');
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }
  logout(){
    this.isLoggedIn = false ;
    this.router.navigate(['/connexion']);
  }


}

