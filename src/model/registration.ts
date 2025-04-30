// import { Registration, RegistrationInput } from "../interfaces/registrationInterface";
// import { generateRegistrationId } from "../utils/helpers";
// import db from "../config/db.json";
// import fs from 'fs';
// import path from 'path';
// import CourseModel from "./course";

// class RegistrationModel {
//     private registrations: Registration[] = db.registrations || [];

//     private saveToDatabase(): void {
//         const data = {
//             courses: CourseModel.getAllCourses(),
//             registrations: this.registrations
//         };
//         fs.writeFileSync(path.join(__dirname, '../../src/config/db.json'), JSON.stringify(data, null, 2));
//     }

//     public createRegistration(registrationInput: RegistrationInput): Registration {
//         const course = CourseModel.getCourseById(registrationInput.course_id);
//         if (!course) throw new Error('Course not found');

//         // Check if registration already exists
//         const existingRegistration = this.registrations.find(
//             reg => reg.email === registrationInput.email && 
//                   reg.course_id === registrationInput.course_id
//         );
//         if (existingRegistration) throw new Error('Employee already registered for this course');

//         const courseRegistrations = this.getRegistrationsForCourse(registrationInput.course_id);
        
//         let status: 'ACCEPTED' | 'COURSE_FULL_ERROR' = 'ACCEPTED';
//         if (courseRegistrations.length >= course.max_employees) {
//             status = 'COURSE_FULL_ERROR';
//         }

//         const registration_id = generateRegistrationId(registrationInput.employee_name, course.course_name);

//         const newRegistration: Registration = {
//             registration_id,
//             ...registrationInput,
//             status
//         };

//         if (status === 'ACCEPTED') {
//             this.registrations.push(newRegistration);
//             this.saveToDatabase();
//         }

//         return newRegistration;
//     }

//     public getRegistrationById(registration_id: string): Registration | undefined {
//         return this.registrations.find(reg => reg.registration_id === registration_id);
//     }

//     public getRegistrationsForCourse(course_id: string): Registration[] {
//         return this.registrations.filter(reg => reg.course_id === course_id);
//     }

//     public cancelRegistration(registration_id: string): Registration {
//         const registration = this.registrations.find(reg => reg.registration_id === registration_id);
//         if (!registration) throw new Error('Registration not found');

//         const course = CourseModel.getCourseById(registration.course_id);
//         if (!course) throw new Error('Course not found');

//         if (course.is_allotted) {
//             throw new Error('Course already allotted, cancellation rejected');
//         }

//         this.registrations = this.registrations.filter(reg => reg.registration_id !== registration_id);
//         this.saveToDatabase();

//         return registration;
//     }

//     public getAllRegistrations(): Registration[] {
//         return this.registrations;
//     }
// }

// export default new RegistrationModel();








///////////////////////////
import { Registration, RegistrationInput } from "../interfaces/registrationInterface";
import { generateRegistrationId } from "../utils/helpers";
import db from "../config/db.json";
import fs from 'fs';
import path from 'path';
import CourseModel from "./course";

class RegistrationModel {
    private isValidStatus(status: string): status is 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' {
        return ['ACCEPTED', 'COURSE_FULL_ERROR', 'COURSE_CANCELED'].includes(status);
    }

    // Transform raw data to proper Registration type
    private transformRegistration(data: any): Registration {
        return {
            ...data,
            status: this.isValidStatus(data.status) ? data.status : 'COURSE_CANCELED'
        };
    }

     private registrations: Registration[];
    
        constructor() {
            // Transform the raw data on initialization
            this.registrations = (db.registrations || []).map(reg => this.transformRegistration(reg));
        }
    // private registrations: Registration[] = db.registrations || [];

    private saveToDatabase(): void {
        const data = {
            courses: CourseModel.getAllCourses(),
            registrations: this.registrations
        };
        fs.writeFileSync(path.join(__dirname, '../../src/config/db.json'), JSON.stringify(data, null, 2));
    }

    public createRegistration(registrationInput: RegistrationInput): Registration {
        const course = CourseModel.getCourseById(registrationInput.course_id);
        if (!course) throw new Error('Course not found');

        // Check if registration already exists
        const existingRegistration = this.registrations.find(
            reg => reg.email === registrationInput.email && 
                  reg.course_id === registrationInput.course_id
        );
        if (existingRegistration) throw new Error('Employee already registered for this course');

        const courseRegistrations = this.getRegistrationsForCourse(registrationInput.course_id);
        
        let status: 'ACCEPTED' | 'COURSE_FULL_ERROR' = 'ACCEPTED';
        if (courseRegistrations.length >= course.max_employees) {
            status = 'COURSE_FULL_ERROR';
        }

        const registration_id = generateRegistrationId(registrationInput.employee_name, course.course_name);

        const newRegistration: Registration = {
            registration_id,
            ...registrationInput,
            status
        };

        if (status === 'ACCEPTED') {
            this.registrations.push(newRegistration);
            this.saveToDatabase();
        }

        return newRegistration;
    }

    public getRegistrationById(registration_id: string): Registration | undefined {
        return this.registrations.find(reg => reg.registration_id === registration_id);
    }

    public getRegistrationsForCourse(course_id: string): Registration[] {
        return this.registrations.filter(reg => reg.course_id === course_id);
    }

    public cancelRegistration(registration_id: string): Registration {
        const registration = this.registrations.find(reg => reg.registration_id === registration_id);
        if (!registration) throw new Error('Registration not found');

        const course = CourseModel.getCourseById(registration.course_id);
        if (!course) throw new Error('Course not found');

        if (course.is_allotted) {
            throw new Error('Course already allotted, cancellation rejected');
        }

        this.registrations = this.registrations.filter(reg => reg.registration_id !== registration_id);
        this.saveToDatabase();

        return registration;
    }

    public getAllRegistrations(): Registration[] {
        return this.registrations;
    }
}

export default new RegistrationModel();