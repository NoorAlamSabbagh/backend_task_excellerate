export interface Course {
    course_id: string;
    course_name: string;
    instructor_name: string;
    start_date: string; // ddmmyyyy format
    min_employees: number;
    max_employees: number;
    registrations?: Registration[]; // Ensure Registration is defined or imported
    is_allotted?: boolean;
}

// Define or import the Registration interface
export interface Registration {
    employee_id: string;
    registration_date: string; // ddmmyyyy format
}

export interface CourseInput {
    course_name: string;
    instructor_name: string;
    start_date: string;
    min_employees: number;
    max_employees: number;
}