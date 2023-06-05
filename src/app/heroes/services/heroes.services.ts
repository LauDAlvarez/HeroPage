import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { environments } from 'src/environments/environments';


@Injectable({
    providedIn: 'root'
})
export class HeroesService {
    private baseUrl: string = environments.baseUrl;

    constructor( private http: HttpClient ){}
    
    getHeroes():Observable<Hero[]>{ 
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
    }

    getHeroById(id: string):Observable<Hero|undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
                        .pipe(
                            tap(console.log),
                            catchError( error => of(undefined))
                        )
    }
    
    getSuggestions(query: string): Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=5`)
    }
    
    addHero(hero: Hero):Observable<Hero[]>{ 
        return this.http.post<Hero[]>(`${this.baseUrl}/heroes`, hero)
    }
    
    updateHero(hero: Hero):Observable<Hero>{ 
        return this.http.patch<Hero>(`${this.baseUrl}/heroes`, hero)
                            
    }
    
    deleteHero(id: string):Observable<boolean>{ 
        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
                        .pipe(
                            catchError( err => of(false) ),
                            map( rep => true, console.log )
                        )
    }


}