import { Course, CourseInput } from "../model/courseInterfaces";
import db from "../config/db.json";
import fs from 'fs';
import path from 'path';
import { AllotmentResult, Registration } from "../model/registrationInterface";
import { generateCourseId } from "../utils/helpers";

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
        console.log("_dirname", __dirname)
        fs.writeFileSync(path.join(__dirname, '../config/db.json'), JSON.stringify(data, null, 2));
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

    ////////////////////
   public allotCourse(course_id: string): AllotmentResult[] {
        const course = this.getCourseById(course_id);
        if (!course) throw new Error('Course not found');

        const registrations = this.getRegistrationsForCourse(course_id);
        
        // Check if minimum employees reached
        const isCancelled = registrations.length < course.min_employees;
        
        // Update registration statuses
        const results: AllotmentResult[] = registrations.map(reg => {
            return {
                registration_id: reg.registration_id,
                email: reg.email,
                course_id: reg.course_id,
                course_name: course.course_name,
                // instructor_name: course.instructor_name,
                // start_date: course.start_date,
                status: isCancelled ? 'COURSE_CANCELED' : 'CONFIRMED'
            };
        });

        // Sort by registration_id in ascending order
        results.sort((a, b) => a.registration_id.localeCompare(b.registration_id));

        // Mark course as allotted
        this.updateCourseAllotmentStatus(course_id, true);

        return results;
    }
    ////////////

    public getCourseById(course_id: string): Course | undefined {
        return this.courses.find(course => course.course_id === course_id);
    }

    public getCourseByName(course_name: string): Course | undefined {
        return this.courses.find(course => course.course_name === course_name);
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