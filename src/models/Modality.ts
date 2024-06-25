export interface Modality {
    id: number;
    description: string;
    num_semester: number;
    is_ordenance: boolean;
    id_school: number;
  }
  
  export class ModalityModel implements Modality {
    constructor(public id: number, public description: string, public num_semester: number, public is_ordenance: boolean, public id_school: number) {}
  }
  