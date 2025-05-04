import { Course } from "./courseInterfaces";

export interface Registration {
    registration_id: string;
    employee_name: string;
    email: string;
    course_id: string;
    status: 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED';
    course?: Course;
}

export interface RegistrationInput {
    employee_name: string;
    email: string;
    course_id: string;
}

export interface AllotmentResult {
    registration_id: string;
    email: string;
    course_id: string;
    course_name: string;
    // instructor_name: string;
    // start_date: string;
    status: string;
}


