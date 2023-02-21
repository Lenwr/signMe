import {Component, Input, OnInit} from '@angular/core';
import {PdfServiceService} from "../../../services/pdfService.service";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  @Input() user?: any

  constructor( private pdfService : PdfServiceService) { }

  ngOnInit(): void {
  }

  openPicture(){

  }

  generatePdf(): void {
    this.pdfService.generatePdf();
  }

}
