import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Hero }    from './../model/hero';

@Component({
    selector: 'hero-form',
    templateUrl: 'app/hero-form.component.html'
})
export class HeroFormComponent {
    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    submitted = false;

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active = true;

    onSubmit() { this.submitted = true; }

    /**
     * Workaround: for clicking 2x = not pristine anymore -> better to re-create form (until proper solution in tutorial)
     */
    newHero() {
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(()=> this.active=true, 0);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}