import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  URL = environment.apiUrl + '/clients'
  url = environment.apiUrl + '/clients?populate=*'
  userUrl = environment.apiUrl + '/clients:id'
  uploadUrl = environment.apiUrl + '/upload/files'

  constructor(private http: HttpClient) { }

  customers() {
    return this.http.get(this.url)
  }

  customer() {
    return this.http.get(this.userUrl)
  }
  saveCustomer(data : any){
    return this.http.post<any>(this.URL, data)
  }
  getUpload(){
    return this.http.get(this.uploadUrl)
  }
}
