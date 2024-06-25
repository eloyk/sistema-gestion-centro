export interface Student_List {
    id: number;
    id_student: number;
    id_course: number;
    id_school_period: number;
    id_school: number;
    order_num: number;
  }
  
  export class Student_ListModel implements Student_List {
    constructor(public id: number, public id_student: number, public id_course: number, public id_school_period: number, public order_num: number, public id_school: number) {}
  }
  