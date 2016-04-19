// Interface = no footprint in transpiled JS
// values can be still assigned via JSON (see Mock heroes)
export class Hero {

    // The TypeScript compiler generates a public field for each public constructor parameter
    constructor(
        public id: number,
        public name: string,
        public power: string,
        public alterEgo?: string // optional
    ) {  }

}