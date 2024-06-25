export interface Teacher {
    id: number;
    names: string;
    surnames: string;
    address: string;
    birth_date: Date;
    specialization: string;
    position: string;
    id_gender: number;
    id_school: number;
  }
  
  export class TeacherModel implements Teacher {
    constructor(public id: number, public names: string, public surnames: string, public address: string, public birth_date: Date, public specialization: string, public position: string, public id_gender: number, public id_school: number) {}
  }
  