import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  selectedFiles: File[] = []
  SelectedFiles!: any[]
  imgs: string[] = []

  onFileSelected(event: any) {
    this.SelectedFiles = event.target.files
    console.log(this.SelectedFiles[0])
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i])
      console.log(this.selectedFiles)
    }
  }

  onSubmit() {
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
}
