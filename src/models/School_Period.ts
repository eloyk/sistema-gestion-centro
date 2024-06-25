export interface School_Period {
    id: number;
    description: string;
  }
  
  export class School_PeriodModel implements School_Period {
    constructor(public id: number, public description: string) {}
  }
  