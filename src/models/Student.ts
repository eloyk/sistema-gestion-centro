export interface Student {
    id: number;
    names: string;
    surnames: string;
    address: string;
    birth_date: Date;
    id_gender: number;
    id_school: number;
  }
  
  export class StudentModel implements Student {
    constructor(public id: number, public names: string, public surnames: string, public address: string, public birth_date: Date, public id_gender: number, public id_school: number) {}
  }
  