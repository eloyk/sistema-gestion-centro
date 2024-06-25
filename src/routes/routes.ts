import express from 'express';
import ModalityRoutes from './ModalityRoutes';
import TeacherRoutes from './TeacherRoute';
import GenderRoutes from './GenderRoutes';
import CountryRoutes from './CountryRoutes';
import CourseRoutes from './CourseRoute';
import DegreeRoutes from './DegreeRoutes';
import DocumentRoutes from './DocumentRoutes';
import InscriptionRoutes from './InscriptionRoutes';
import School_PeriodRoutes from './School_PeriodRoutes';
import SectionRoutes from './SectionRoutes';
import SchoolRoutes from './SchoolRoutes';
import Student_ListRoutes from './Student_ListRoutes';
import StudentRoutes from './StudentRoutes';
import UserRoutes from './UserRoutes';

const routes = (server:express.Application): void => {
    server.use('/api/modality', new ModalityRoutes().router);
    server.use('/api/teacher', new TeacherRoutes().router);
    server.use('/api/gender', new GenderRoutes().router);
    server.use('/api/country', new CountryRoutes().router);
    server.use('/api/course', new CourseRoutes().router);
    server.use('/api/degree', new DegreeRoutes().router);
    server.use('/api/document', new DocumentRoutes().router);
    server.use('/api/inscription', new InscriptionRoutes().router);
    server.use('/api/schoolperiod', new School_PeriodRoutes().router);
    server.use('/api/section', new SectionRoutes().router);
    server.use('/api/school', new SchoolRoutes().router);
    server.use('/api/studentlist', new Student_ListRoutes().router);
    server.use('/api/student', new StudentRoutes().router);
    server.use('/api/user', new UserRoutes().router);
};

export default routes