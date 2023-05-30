import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.services';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  
  public hero?: Hero;
  
  constructor(
    private heroService: HeroesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
          delay(750),
          switchMap( ({id}) => this.heroService.getHeroById(id)),
          tap(console.log)
        ) 
        .subscribe(
          hero =>{
            if(!hero) return this.router.navigate(['/heroes/list'])
          
            this.hero = hero
            return;
          }

        )
  }
  
  goBack():void{
    this.router.navigate(['/heroes/list'])  
  }
  
}
