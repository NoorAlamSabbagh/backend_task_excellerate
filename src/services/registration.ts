import { Registration } from "../model/registrationInterface";
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
            this.registrations = (db.registrations || []).map(reg => this.transformRegistration(reg));
        }

    private saveToDatabase(): void {
        try {
            const data = {
                courses: CourseModel.getAllCourses(),
                registrations: this.registrations
            };
            fs.writeFileSync(path.join(__dirname, '../config/db.json'), JSON.stringify(data, null, 2));
            
        } catch (error) {
            console.log('insert Error : ', error)
        }
    }

    public createRegistration(registrationInput: Registration): Registration {
        this.registrations.push(registrationInput);
        this.saveToDatabase();
        return registrationInput;
    }

    public getRegistrationByCondition(email: string, employee_name: string, course_id: string): Registration | undefined {
        return this.registrations.find(reg =>
            reg.email === email &&
            reg.employee_name === employee_name &&
            reg.course_id === course_id
        );
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