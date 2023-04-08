import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  url = environment.apiUrl + '/clients'
  URL = environment.apiUrl + '/clients?populate=*'
  userUrl = environment.apiUrl + '/clients:id'
  authUrl = environment.apiUrl + '/auth/local'

  constructor(private http: HttpClient) { }

  customers() {
    return this.http.get(this.url)
  }
  customersPop(){
    return this.http.get(this.URL)
  }

  customer() {
    return this.http.get(this.userUrl)
  }
  saveCustomer(data : any){
    return this.http.post<any>(this.url, data)
  }
  authenticate(data: any){
   return this.http
      .post<any>(this.authUrl, data)
  }
}
