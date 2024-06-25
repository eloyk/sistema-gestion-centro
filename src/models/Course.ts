export interface Course {
    id: number;
    id_modality: number;
    id_section: number;
    id_degree: number;
    id_school_period: number
    id_teacher: number
    id_school: number
    description: string
    max_quantity: number
  }
  
  export class CourseModel implements Course {
    constructor(public id: number, public id_modality: number, public id_section: number, public id_degree: number, public id_school_period: number, public id_teacher: number, public id_school: number, public description: string, public max_quantity: number) {}
  }
  