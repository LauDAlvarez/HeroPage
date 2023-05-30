import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {
  public publishers = [
    {id: 'DC - Comics', desc: ' DC Comics'},
    {id: 'Marvel - Comics', desc: ' Marvel Comics'}
  ]
}
