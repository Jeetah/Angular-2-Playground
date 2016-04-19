import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { HeroService }     from './../services/hero.service';
import { Logger }     from './../services/logger.service';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent}     from './hero-detail.component';
import { DashboardComponent }     from './dashboard.component';
import { WikiComponent }     from './wiki-search.component';


// This is a Router Component
// HeroService as provider because needed in every other view (this way is singleton)
@Component({
    selector: 'heroes-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
        <a [routerLink]="['WikiSearch']">WikiSearch</a>
    </nav>     
    <router-outlet></router-outlet> <!-- this is where routed content is displayed -->    
     <p>Famous playground app for GEIOS heroes!</p>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    // Injection Providers = objects are also created upon instantiation (and available for all childs)
    // globally defined (at bootstrap) are also available. It should be not defined in a sub-component = 2 copies!
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        Logger
    ]
})
// name must be Capital!
// default = no match -> navigate to here
@RouteConfig([
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent,
    },{
        path: '/WikiSearchDemo',
        name: 'WikiSearch',
        component: WikiComponent,
    },
])
export class AppComponent implements CanDeactivate {
    title = 'Tour of Heroes';

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return confirm('Are you sure you want to leave?');
    }
}