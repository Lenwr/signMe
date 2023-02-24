import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  url = environment.apiUrl + '/clients'
  URL = environment.apiUrl + '/clients?populate=*'
  userUrl = environment.apiUrl + '/clients:id'

  constructor(private http: HttpClient) {}

  customers() {
    return this.http.get(this.url)
  }
  customersPop() {
    return this.http.get(this.URL)
  }

  customer() {
    return this.http.get(this.userUrl)
  }
  saveCustomer(data: any) {
    return this.http.post<any>(this.url, data)
  }

  sendFormData(data: any): Observable<any> {
    const formData = new FormData()

    // Ajouter les champs du formulaire
    formData.append('shipperName', data.shipperName)
    formData.append('shipperSurname', data.shipperSurname)
    formData.append('shipperAddress', data.shipperAddress)
    formData.append('shipperPhone', data.shipperPhone)
    formData.append('recipientName', data.recipientName)
    formData.append('recipientSurname', data.recipientSurname)
    formData.append('recipientAddress', data.recipientAddress)
    formData.append('recipientPhone', data.recipientPhone)
    formData.append('destination', data.destination)
    formData.append('description', data.description)
    formData.append('packageQuantity', data.packageQuantity)

    // Ajouter l'image
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append('pictures', data.image[i])
      }
    }

    // Envoyer la requête HTTP POST
    return this.http.post<any>(this.url, formData)
  }
}
