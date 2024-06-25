export interface Gender {
    id: number;
    description: string;
    literal: string;
  }
  
  export class GenderModel implements Gender {
    constructor(public id: number, public description: string, public literal: string) {}
  }
  