import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
    info(msg: any)   { console.log(msg); }
    error(msg: any) { console.error(msg); }
    warn(msg: any)  { console.warn(msg); }
    debug(msg: any)  { console.debug(msg); }
}