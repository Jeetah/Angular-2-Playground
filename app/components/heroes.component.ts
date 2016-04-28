import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';

// convention: lower-dash case aka kebab case
import {Hero} from './../model/hero';
import {HeroService} from './../services/hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroAddComponent} from "./hero-add.component";
import {Logger} from "../services/logger.service";


// NG Decorator
@Component({
    selector: 'my-heroes',
    directives: [HeroDetailComponent, HeroAddComponent],
    templateUrl: 'app/heroes.component.html',
    // scoped to only this component!
    styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
    // TS can infer property types...
    public title = 'My Heroes';
    public heroes: Hero[];
    public selectedHero: Hero;

    // Constructor Injection
    // prefix private variables with an underscore (_) to warn readers of our code that this variable is not part of the component's public API
    constructor(private _router: Router, private _heroService: HeroService, private _logger: Logger) { }

    // could be called in constructor but this way AppComponent can be e.g. easily used in tests without doing this
    ngOnInit() {
        this.getHeroes();

    }

    getHeroesMock() {
        // Callback to set our data given to promise
        this._heroService.getHeroesMock().then(heroes => this.heroes = heroes); // ES6 arrow function
    }

    getHeroes(){
            this._heroService.getHeroes()
                // Observable returned
                .subscribe(
                    heroes => this.heroes = heroes,
                    error =>  this._logger.error(error)
                );
    }

    onSelect(hero: Hero) {
        this._logger.info("Selected hero: " + hero);
        this.selectedHero = hero;
    }

    gotoDetail() {
        this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}
