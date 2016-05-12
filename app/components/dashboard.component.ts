import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {HeroService} from "../services/hero.service";
import {Hero} from "../model/hero";


@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroesMock: Hero[] = [];
    heroes: Hero[] = [];

    errorMessage: string;

    constructor(private _heroService: HeroService, private _router: Router) { }

    ngOnInit() {
        this.getHeroes();
        this.getHeroesMock();
    }

    getHeroes() {
        this._heroService.getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error =>  this.errorMessage = <any>error);
    }

    getHeroesMock() {
        this._heroService.getHeroesMock()
            .then(heroes => this.heroesMock = heroes.slice(1,5));
    }

    gotoDetail(hero : Hero){
        // name and parameter list
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }
}