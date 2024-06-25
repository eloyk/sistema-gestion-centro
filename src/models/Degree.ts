export interface Degree {
    id: number;
    description: string;
    stage: string;
  }
  
  export class DegreeModel implements Degree {
    constructor(public id: number, public description: string, public stage: string) {}
  }
  