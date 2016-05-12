import {Component}        from '@angular/core';
import {JSONP_PROVIDERS, Response}  from '@angular/http';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


import {Logger} from "./../services/logger.service";
import {WikipediaService} from './../services/wikipedia.service';

@Component({
    selector: 'my-wiki',
    directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term1 (keyup)="search(term1.value)"/>
    <ul>
      <li *ngFor="#item of items | async">{{item}}</li>
    </ul>
     <h1>Smarter Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>
    <input #term2 (keyup)="searchSmart(term2.value)"/>
    <ul>
      <li *ngFor="#item of itemsSmart | async">{{item}}</li>
    </ul>
     <h1>Ng2-Bootstrap Static States Demo</h1>
    <p><i>Fetches when typing stops</i></p>
    <pre class="card card-block card-header">Model: {{asyncSelectedState | json}}</pre>
    <input [(ngModel)]="asyncSelectedState"
           [typeahead]="getAsyncDataStates(getContext())"
           (typeaheadLoading)="changeTypeaheadLoadingStates($event)"
           (typeaheadNoResults)="changeTypeaheadNoResultsStates($event)"
           (typeaheadOnSelect)="typeaheadOnSelectStates($event)"
           [typeaheadMinLength]="1"
           [typeaheadOptionsLimit]="7"           
           class="form-control">
    <div *ngIf="typeaheadLoadingStates===true">
        <i class="glyphicon glyphicon-refresh ng-hide" style=""></i>
    </div>
    <div *ngIf="typeaheadNoResultsStates===true" class="" style="">
        <i class="glyphicon glyphicon-remove"></i> No Results Found
    </div>
    <h1>Ng2-Bootstrap Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>
    <pre class="card card-block card-header">Model: {{asyncSelectedWiki | json}}</pre>
    <input [(ngModel)]="asyncSelectedWiki"
           [typeahead]="getAsyncDataWikiRef"
           (typeaheadLoading)="changeTypeaheadLoadingWiki($event)"
           (typeaheadNoResults)="changeTypeaheadNoResultsWiki($event)"
           (typeaheadOnSelect)="typeaheadOnSelectWiki($event)"
           [typeaheadWaitMs]="300"
           [typeaheadMinLength]="1"
           [typeaheadOptionsLimit]="7"           
           class="form-control">
    <div *ngIf="typeaheadLoadingWiki===true">
        <i class="glyphicon glyphicon-refresh ng-hide" style=""></i>
    </div>
    <div *ngIf="typeaheadNoResultsWiki===true" class="" style="">
        <i class="glyphicon glyphicon-remove"></i> No Results Found
    </div>
  `,
    providers: [JSONP_PROVIDERS, WikipediaService, Logger]
})
export class WikiComponent {

    constructor(private _wikipediaService:WikipediaService, private _logger:Logger) {
    }

    private items:Observable<string[]>;
    search(term:string) {
        this._logger.debug(`Searching stupid for ${term}`);
        this.items = this._wikipediaService.searchObserve(term);
    }

    private _searchTermStream = new Subject<string>();
    itemsSmart:Observable<string[]> = this._searchTermStream
        .debounceTime(350) // handle only last after some time
        .distinctUntilChanged()
        .switchMap((term:string) => this._wikipediaService.searchObserve(term)) // cancel previous requests
        .catch(this.handleError);
    searchSmart(term:string) {
        this._logger.debug(`Searching smart for ${term}`);
        this._searchTermStream.next(term);
    }

    private _cacheStates:any;
    private _prevContextStates:any;
    public asyncSelectedState:string='';
    public typeaheadLoadingStates:boolean=false;
    public typeaheadNoResultsStates:boolean=false;

    public asyncSelectedWiki:string='';
    public typeaheadLoadingWiki:boolean=false;
    public typeaheadNoResultsWiki:boolean=false;

    public typeaheadLoading:boolean = false;

    public statesStatic:Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico',
        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'];

    public getAsyncDataStates(context:any):Function {
        if (this._prevContextStates === context) {
            return this._cacheStates;
        }

        this._prevContextStates = context;
        let f:Function = function ():Promise<string[]> {
            let p:Promise<string[]> = new Promise((resolve:Function) => {
                 setTimeout(() => {
                    let query = new RegExp(context.asyncSelectedState, 'ig');
                    return resolve(context.statesStatic.filter((state:any) => {
                        context._logger.debug("States: Searching states async bootstrap: " + context.asyncSelectedState);
                        return query.test(state);
                    }));
                 }, 200);
            });
            return p;
        };

        this._cacheStates = f;
        return this._cacheStates;
    }

    // Dangerous!
    public getAsyncDataWikiRef = this.getAsyncDataWiki.bind(this);

    public getAsyncDataWiki():Promise<string[]> {
        this._logger.debug("Wiki: Searching Wikipedia async bootstrap: " + this.asyncSelectedWiki);
        return this._wikipediaService.searchObserve(this.asyncSelectedWiki).toPromise();
    }

    private handleError(error:Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        this._logger.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public getContext():any {
        return this;
    }

    public changeTypeaheadLoadingStates(e:boolean):void {
        this.typeaheadLoadingStates = e;
    }

    public changeTypeaheadNoResultsStates(e:boolean):void {
        this.typeaheadNoResultsStates = e;
    }

    public changeTypeaheadLoadingWiki(e:boolean):void {
        this.typeaheadLoadingWiki = e;
    }

    public changeTypeaheadNoResultsWiki(e:boolean):void {
        this.typeaheadNoResultsWiki = e;
    }

    public typeaheadOnSelectStates(e:any):void {
        this._logger.debug(`States Selected value: ${e.item}`);
    }

    public typeaheadOnSelectWiki(e:any):void {
        this._logger.debug(`Wiki: Selected value: ${e.item}`);
    }
}