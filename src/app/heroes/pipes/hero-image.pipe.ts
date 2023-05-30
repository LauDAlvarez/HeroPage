import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(heroe:  Hero, ): string {
    if(!heroe.id && !heroe.alt_img){
      return 'assets/no-image.png'
    }

    return `assets/heroes/${heroe.id}.jpg`
  }

}
