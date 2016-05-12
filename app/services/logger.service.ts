import {Injectable} from '@angular/core';

@Injectable()
export class Logger {
    info(msg: any)   { console.log(msg); }
    error(msg: any) { console.error(msg); }
    warn(msg: any)  { console.warn(msg); }
    debug(msg: any)  { console.debug(msg); }
}