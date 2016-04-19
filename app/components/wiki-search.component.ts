import {Component}        from 'angular2/core';
import {JSONP_PROVIDERS, Response}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
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
    <h1>Ng2-Bootstrap Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>
    <pre class="card card-block card-header">Model: {{searchTermBS | json}}</pre>
    <input [(ngModel)]="searchTermBS"
           [typeahead]="searchSmartProm(searchTermBS)"
           (typeaheadOnSelect)="typeaheadOnSelect($event)"
           [typeaheadOptionField]="'name'"
           class="form-control">
           <div *ngIf="typeaheadNoResults===true" class="" style="">
        <i class="glyphicon glyphicon-remove"></i> No Results Found
    </div>
  `,
    providers: [JSONP_PROVIDERS, WikipediaService, Logger]
})
export class WikiComponent {

    constructor(private _wikipediaService:WikipediaService, private _logger:Logger) { }


    private _items:Observable<string[]>;
    search(term:string) {
        this._items = this._wikipediaService.search(term);
    }

    private _searchTermStream = new Subject<string>();
    itemsSmart:Observable<string[]> = this._searchTermStream
        .debounceTime(350) // handle only last after some time
        .distinctUntilChanged()
        .switchMap((term:string) => this._wikipediaService.search(term)) // cancel previous requests
        .catch(this.handleError);
    searchSmart(term:string) {
        this._searchTermStream.next(term);
    }

    private _searchTermStreamProm = new Subject<string>();
    itemsSmartPromise:Promise<string[]> = this._searchTermStreamProm
        .debounceTime(350) // handle only last after some time
        .distinctUntilChanged()
        .switchMap((term:string) => this._wikipediaService.search(term)) // cancel previous requests
        .catch(this.handleError).toPromise();
    searchSmartProm(term:string) {
        this._searchTermStreamProm.next(term);
    }

    private handleError(error:Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        this._logger.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public searchTermBS:string = '';
    public asyncSelected:string = '';
    public typeaheadLoading:boolean = false;
    public typeaheadNoResults:boolean = false;

    public getContext():any {
        return this;
    }

    public changeTypeaheadLoading(e:boolean):void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e:boolean):void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e:any):void {
        console.log(`Selected value: ${e.item}`);
    }
}