import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[myHighlight]',
    // The host property refers to the DOM element that hosts our attribute directive
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class HighlightDirective {
    private _defaultColor = 'red';
    private _el:HTMLElement;

    // "input" property because data flows from the binding expression into our directive
    // Maybe we don't want that property name inside the directive perhaps because it doesn't express our intention well. We can alias the highlightColor property with the attribute name by passing myHighlight into the @Input decorator. (but we could use same name like this: @Input() myHighlight: string;)
    @Input('myHighlight') highlightColor: string;

    @Input() set defaultColor(colorName:string){
        this._defaultColor = colorName || this._defaultColor;
    }

    constructor(el: ElementRef) { this._el = el.nativeElement; }

    onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }
    onMouseLeave() { this._highlight(null); }

    private _highlight(color:string) {
        this._el.style.backgroundColor = color;
    }
}
