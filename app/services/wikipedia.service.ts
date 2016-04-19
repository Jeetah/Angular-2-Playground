import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

/**
 * JSONP example (old alternative to CORS)
 */
@Injectable()
export class WikipediaService {
    
    constructor(private jsonp: Jsonp) {}
    
    search (term: string):Observable<String[]> {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        var params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(request => <string[]> request.json()[1]) 
            .catch(this.handleError);
    }
    
    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}