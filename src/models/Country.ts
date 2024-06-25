export interface Country {
    id: number;
    description: string;
    nationality: string;
    literal: string;
    code: number
  }
  
  export class CountryModel implements Country {
    constructor(public id: number, public description: string, public nationality: string, public literal: string, public code: number) {}
  }
