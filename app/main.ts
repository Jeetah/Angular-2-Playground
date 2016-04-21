import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./components/app.component";
import {HTTP_PROVIDERS} from 'angular2/http';
//import {enableProdMode} from 'angular2/core';
import {Logger} from "./services/logger.service";
// Add all operators to Observable (could be also stripped down to single methods to save bandwidth)
import 'rxjs/Rx';

// those are available to all COMPONENTS everywhere!
//enableProdMode();
bootstrap(AppComponent, [Logger, HTTP_PROVIDERS]);