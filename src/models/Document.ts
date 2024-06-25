export interface Document {
    id: number;
    documentid_copy: boolean;
    photo_2x2: boolean;
    birth_certificate: boolean;
    doctor_certified: boolean;
    certified_record: boolean;
    id_student: number;
  }
  
  export class DocumentModel implements Document {
    constructor(public id: number, public documentid_copy: boolean, public photo_2x2: boolean, public birth_certificate: boolean, public doctor_certified: boolean, public certified_record: boolean, public id_student: number) {}
  }
  