// no extensio needed since SystemJS is configured to use ".js" as ending
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Title} from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {HTTP_PROVIDERS} from '@angular/http';
//import {enableProdMode} from '@angular2/core';
import {Logger} from "./services/logger.service";
// Add all operators to Observable (could be also stripped down to single methods to save bandwidth)
import 'rxjs/Rx';

// those are available to all COMPONENTS everywhere!
//enableProdMode();
bootstrap(AppComponent, [Logger, HTTP_PROVIDERS, Title])
    .then(
        () => window.console.info( 'Angular finished bootstrapping your application!' ),
        (error) => {
            console.warn( 'Angular was not able to bootstrap your application.' );
            console.error( error );
        }
    );