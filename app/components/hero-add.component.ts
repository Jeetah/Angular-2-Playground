import {Component} from 'angular2/core';

import {Hero} from './../model/hero';
import {HeroService} from "./../services/hero.service";
import {HeroFormComponent} from './hero-form.component'
import {Logger} from "./../services/logger.service";

// since child component it inherits e.g. providers!
@Component({
    selector: 'hero-add',
    //inputs: ['hero'],
    directives: [HeroFormComponent],
    // templateUrl: for file
    template: `
    <div>
        <h2>Events Demo:</h2>
        <div>
            <label>Name: </label>
            <!-- Local template variable given to event -->
            <input #newHero
                (keyup.enter)="addHero(newHero.value); newHero.value=''"
                (blur)="addHero(newHero.value); newHero.value=''">
            <button (click)=addHero(newHero.value); newHero.value=''>Add</button>
        </div>
        <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
        <h2>Forms Demo:</h2>
        <div>
            <hero-form>...</hero-form>
        </div>
    </div>
`,
})
export class HeroAddComponent {
    
    errorMessage:String;

    constructor(private _heroService: HeroService, private _logger : Logger) { }

    addHeroMock(newHero:string) {
        if (newHero.length !== 0) {
            this._logger.info("Adding new hero: '" + newHero + "'");
            this._heroService.addHeroMock(newHero);
        }
    }

    addHero (name: string) {
        if (!name) {return;}
        this._heroService.addHero(name)
            .subscribe(
                hero  =>  this._logger.info("Added Hero: " + hero),
                error =>  this.errorMessage = <any>error);
    }
}