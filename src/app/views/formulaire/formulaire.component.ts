import { Component, OnInit } from '@angular/core'

import { UserDataService } from '../../../services/user-data.service'
import { Router } from '@angular/router'
import {FormControl, Validators} from "@angular/forms";

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


  constructor( private route: Router
  ) {}



  ngOnInit(): void {

  }

  submit() {
    if (this.choiceControl.value?.name == 'Expedition de Colis') {
      this.route.navigate(['expeditionColis'])
    } else if (this.choiceControl.value?.name == 'Livraison de Colis') {
      this.route.navigate(['livraisonColis'])
    } if (this.choiceControl.value?.name == 'Déménagement') {
      this.route.navigate(['facture'])
    }
    console.log(this.choiceControl.value?.name)
  }
  //choix formulaire
  choiceControl = new FormControl<Choice | null>(null, Validators.required)
  Choices: Choice[] = [
    { name: 'Livraison de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Expedition de Colis', img: '/assets/icons/hinata.jpg' },
    { name: 'Déménagement', img: '/assets/icons/hinata.jpg' },
  ]


}
