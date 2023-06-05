import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {
  
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })
  public publishers = [
    { id: 'DC - Comics', desc: ' DC Comics' },
    { id: 'Marvel - Comics', desc: ' Marvel Comics' }
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero; 
    return hero
  }
  
  ngOnInit(): void {
    console.log(this.currentHero)
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        tap(console.log),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe(
        hero => {
          if (!hero) return this.router.navigateByUrl('/')

          this.heroForm.reset(hero);
          return;
        }
      )
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return console.log('Formato invalido');



    if (!this.currentHero.id) {
      this.heroesService.addHero( this.currentHero )
        .subscribe(
          hero => {
            console.log('Se Creo un Heroe', hero)
          }
        )

      return;
    }

    console.log(this.currentHero)
    this.heroesService.updateHero( this.currentHero )
      .subscribe(
          hero => {
            console.log('Se Actualizo un Heroe', hero)
          }
      )


  }
}
