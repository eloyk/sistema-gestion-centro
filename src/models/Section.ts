export interface Section {
    id: number;
    description: string;
  }
  
  export class SectionModel implements Section {
    constructor(public id: number, public description: string) {}
  }
  