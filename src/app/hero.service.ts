import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import{ Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {


  constructor(private messageService: MessageService, private http: HttpClient) {}


getHeroes() : Observable<Hero[]> {      
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])))
}

getHero(id: number): Observable<Hero> {
  // For now, assume that a hero with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const hero = HEROES.find(h => h.id === id) as Hero;
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(hero);
}

private log(message: string){
  this.messageService.add(`HeroService: ${message}`)
}
private handleError<T>(operation = 'operation', result?: T){
  return (error: any): Observable<T> => {
    console.error(error)

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  }
}
private heroesUrl = 'api/heroes';
}
