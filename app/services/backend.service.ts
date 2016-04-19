import {Injectable} from "angular2/core";
import {UUID} from "angular2-uuid";
import {Logger} from "./logger.service";
import {Hero} from "./../model/hero";
import {HEROES} from "./../model/mock-heroes";


@Injectable()
export class BackendService {

    constructor(private _logger: Logger, private _http:Http) { }

    // Cache
    //private _heroes:Hero[] = [];

    /*
     Fetches all known heroes from server as Promise
     */
    getHeroes():Promise<Hero[]> {
        this._logger.info("Loading heroes from Backend...");
        // immediately resolved promise

        let url = 'http://localhost:3000/heroes';
        /*return this._http.request(url).map(function (res:Response):RegistrationForm {
            console.log(res.json());
            return new RegistrationForm(res.json());
        });*/

     /*   fetch('http://localhost:3001/sessions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(status)
            .then(json)
            .then((response) => {
                // Once we get the JWT in the response, we save it into localStorage
                localStorage.setItem('jwt', response.id_token);
                // and then we redirect the user to the home
                this.router.parent.navigate('/home');
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });*/

        @Injectable()
        export class GeonamesService {
            constructor(private http:Http) {
            }
            searchPlaces(searchText:string) {
                var params = new URLSearchParams();
                params.set('placename_startsWith', searchText);
                params.set('username', 'XXX');

                return this.http.get('http://api.geonames.org/postalCodeSearchJSON',
                    { search: params }).map(res => res.json().postalCodes);
            }
        }

        let heroes = HEROES;

        this._logger.info(`Fetched ${heroes.length} heroes.`);

        return Promise.resolve(HEROES);
    }
}