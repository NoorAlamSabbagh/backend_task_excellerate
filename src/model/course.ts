import { Course, CourseInput } from "../interfaces/courseInterfaces";
import { Registration } from "../interfaces/registrationInterface";
import { generateCourseId } from "../utils/helpers";
import db from "../config/db.json";
import fs from 'fs';
import path from 'path';

// Define a type for the raw registration data from JSON
interface RawRegistration {
    registration_id: string;
    employee_name: string;
    email: string;
    course_id: string;
    status: string;
}

class CourseModel {
    private courses: Course[] = db.courses || [];
    private registrations: Registration[];

    constructor() {
        // Initialize with type assertion and proper transformation
        const rawRegistrations = (db.registrations || []) as RawRegistration[];
        this.registrations = rawRegistrations.map(reg => this.transformRegistration(reg));
    }

    private transformRegistration(raw: RawRegistration): Registration {
        return {
            registration_id: raw.registration_id,
            employee_name: raw.employee_name,
            email: raw.email,
            course_id: raw.course_id,
            status: this.validateStatus(raw.status)
        };
    }

    private validateStatus(status: string): 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' {
        const validStatuses = ['ACCEPTED', 'COURSE_FULL_ERROR', 'COURSE_CANCELED'];
        return validStatuses.includes(status) ? 
            status as 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' : 
            'COURSE_CANCELED';
    }

    private saveToDatabase(): void {
        const data = {
            courses: this.courses,
            registrations: this.registrations
        };
        fs.writeFileSync(path.join(__dirname, '../../src/config/db.json'), JSON.stringify(data, null, 2));
    }

    public createCourse(courseInput: CourseInput): Course {
        const course_id = generateCourseId(courseInput.course_name, courseInput.instructor_name);
        
        const newCourse: Course = {
            course_id,
            ...courseInput,
            is_allotted: false
        };
        
        this.courses.push(newCourse);
        this.saveToDatabase();
        return newCourse;
    }

    public getCourseById(course_id: string): Course | undefined {
        return this.courses.find(course => course.course_id === course_id);
    }

    public getAllCourses(): Course[] {
        return this.courses;
    }

    public getRegistrationsForCourse(course_id: string): Registration[] {
        return this.registrations.filter(reg => reg.course_id === course_id);
    }

    public updateCourseAllotmentStatus(course_id: string, isAllotted: boolean): void {
        const course = this.courses.find(c => c.course_id === course_id);
        if (course) {
            course.is_allotted = isAllotted;
            this.saveToDatabase();
        }
    }
}

export default new CourseModel();