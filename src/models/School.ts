export interface School {
    id: number;
    name: string;
    address: string;
    code: string;
    director: string;
  }
  
  export class SchoolModel implements School {
    constructor(public id: number, public name: string, public address: string, public code: string, public director: string) {}
  }
  