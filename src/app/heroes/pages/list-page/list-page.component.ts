import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.services';
import { Hero } from '../../interfaces/heroes.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  public heroes: Hero[] = []

  constructor( private heroService: HeroesService){
    
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
        .pipe(tap(console.log))
        .subscribe( heroe => this.heroes = heroe)
        
  }

}
