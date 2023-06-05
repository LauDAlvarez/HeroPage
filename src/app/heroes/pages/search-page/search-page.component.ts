import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { tap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput = new FormControl('')
  public heroes: Hero[] = []; 
  public selectedHero?: Hero;

  constructor(
    private heroService: HeroesService
  ){}

  searchHero(){
    const value: string = this.searchInput.value || ''; 
    if( value ){
      this.heroService.getSuggestions(value)
        .subscribe(heroes => {
          this.heroes = heroes;
        })
    }else{
      this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
        })
    }
    

  }
  onSelectedOption( event: MatAutocompleteActivatedEvent): void{
    
    if( !event.option?.value ){
      this.selectedHero = undefined;
      return;
    }
    
    const hero: Hero = event.option.value
    const heroSelected: Hero = event.option.value
    this.searchInput
      .setValue( hero.superhero )
    this.heroService
      .getHeroById(hero.id)
      .pipe(
        tap(console.log)
      )
      .subscribe( hero => this.selectedHero= hero)
                    
  }

}

