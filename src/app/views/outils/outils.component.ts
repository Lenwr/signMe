import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.css']
})
export class OutilsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  v1: any
  v2: any
  v3: any
  punitaire:any
  vol:any
  constructor() { }

  ngOnInit(): void {
  }

  volume(){
    let volume = document.getElementById("volume") as HTMLInputElement
    let val1 = document.getElementById("valeur1") as HTMLInputElement
    let val2 = document.getElementById("valeur2") as HTMLInputElement
    let val3 = document.getElementById("valeur3") as HTMLInputElement
    let pu = document.getElementById("pu") as HTMLInputElement

    this.v1 = val1.value
    this.v2 = val2.value
    this.v3 = val3.value
    this.punitaire = pu.value

    this.vol = this.v1 * this.v2 * this.v3 * this.punitaire
    volume.value = this.vol



  }

}
