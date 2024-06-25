export interface Inscription {
    id: number;
    id_school: number;
    id_document: number;
    id_student: number;
  }
  
  export class InscriptionModel implements Inscription {
    constructor(public id: number, public id_school: number, public id_document: number, public id_student: number) {}
  }
  