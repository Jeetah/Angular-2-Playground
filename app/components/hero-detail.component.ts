import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {Hero} from './../model/hero';
import {HeroService} from "./../services/hero.service";

import {Logger} from "./../services/logger.service";

import {HighlightDirective} from './directives/highlight.directive';

// since child component it inherits e.g. providers!
// input manually: inputs: ['hero'] - but we use URL-Param-Extraction
@Component({
        selector: 'hero-detail',
        directives: [HighlightDirective],
        templateUrl: 'app/hero-detail.component.html',
        styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    public hero: Hero;

    constructor(private _heroService: HeroService, private _routeParams: RouteParams, private _logger : Logger) { }

    // We cast the $event as an any type, which means we've abandoned strong typing to simplify our code. We generally prefer the strong typing that TypeScript affords.
    // Strong typing reveals a serious problem with passing a DOM event into the method: too much awareness of template details, too little separation of concerns!!!
    onKey(event:any) {
        this._logger.info("Key: '" + event.target.value + "'");
    }

    onKeyEnter(event:any) {
        this._logger.info("Enter preassed: '" + event.target.value + "'");
    }

    ngOnInit() {
        let id = +this._routeParams.get('id'); // += converts to Number
        this._heroService.getHeroMock(id)
            .then(hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }
}