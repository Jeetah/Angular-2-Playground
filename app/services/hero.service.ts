import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Logger} from "./logger.service";

import {HEROES} from './../model/mock-heroes';
import {Hero} from "./../model/hero";


/**
 * https://angular.io/docs/ts/latest/guide/server-communication.html
 */
@Injectable()
export class HeroService {

    private _heroesUrl = 'http://localhost:3001/heroes';  // URL to web api
    private _heroesUrlJson = 'app/heroes.json'; // URL to JSON file
    constructor(private _logger: Logger, private _http: Http) { }

    getHeroes():Observable<any> {
        return this._http.get(this._heroesUrl)
            .map(res => <Hero[]> res.json().data) // if heroes are wrapped in a data root object
            .do(data => this._logger.debug(data)) // eyeball results in the console
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        this._logger.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    post():Observable<any> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._heroesUrl, body, options)
            .map(res =>  <Hero> res.json().data)
            .catch(this.handleError)
    }

    /*
        Fetches all known heroes from server as Promise
     */
    getHeroesMock():Promise<Hero[]> {
        this._logger.info("Loading heroes from mock...");
        // immediately resolved promise
        return Promise.resolve(HEROES);
    }

    getHeroesSlowMock():Promise<Hero[]> {
        this._logger.info("Loading heroes with latency from mock...");
        return new Promise<Hero[]>(resolve =>
            setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
        );
    }

    addHeroMock(newName:string):any {
        this._logger.info("adding..." + HEROES.length);
        let hero = new Hero(HEROES.length +1, name, "DefaultingPower");

         HEROES.push(hero);
    }

    addHero (name: string) : Observable<Hero> {
        // The server will generate the id and return the entire JSON representation of the new hero including its generated id. The hero arrives tucked inside a response object with its own data property.
        
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._heroesUrl, body, options)
            .map(res =>  <Hero> res.json().data)
            .catch(this.handleError)  
    }

    getHeroMock(id: number) {
        return Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]);
    }
}