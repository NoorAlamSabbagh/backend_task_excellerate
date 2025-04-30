// import { Schema, model, Types, Document } from 'mongoose';

// // Define the TypeScript interface for bw_users
// export interface IBwUser extends Document {
//   users_type: string;
//   users_id: number;
//   users_name: string;
//   last_name: string;
//   country_code: string;
//   users_mobile: number;
//   users_email?: string;
//   password: string;
//   status: 'A' | 'I' | 'B' | 'D';
//   token?: string;
//   created_ip?: string;
//   created_by?: Types.ObjectId;
//   updated_ip?: string;
//   updated_by?: Types.ObjectId;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Mongoose Schema definition
// const bwUserSchema = new Schema<IBwUser>(
//   {
//     users_id: { type: Number, trim: true, required: true },
//     users_name: { type: String, trim: true, required: true },
//     last_name: { type: String, trim: true, required: true },
//     country_code: { type: String, trim: true, required: true },
//     users_mobile: { type: Number, trim: true, required: true },
//     users_email: { type: String, trim: true },
//     password: { type: String, trim: true, required: true },
//     status: { type: String, enum: ['A', 'I', 'B', 'D'], default: 'A' },
//     token: { type: String },
//     created_ip: { type: String, trim: true },
//     created_by: { type: Schema.Types.ObjectId, trim: true },
//     updated_ip: { type: String, trim: true },
//     updated_by: { type: Schema.Types.ObjectId, trim: true },
//   },
//   { timestamps: true }
// );

// // Export the model
// export default model<IBwUser>('bw_users', bwUserSchema);




///////////////////////////////
import { Course, CourseInput } from "../interfaces/courseInterfaces";
import { Registration } from "../interfaces/registrationInterface";
import { generateCourseId } from "../utils/helpers";
import db from "../config/db.json";
import fs from 'fs';
import path from 'path';

class CourseModel {
    private courses: Course[] = db.courses || [];
    private registrations: Registration[];

    constructor() {
        // Transform the raw registration data to match the Registration interface
        this.registrations = (db.registrations || []).map(reg => ({
            ...reg,
            status: this.validateStatus(reg.status)
        }));
    }

    private validateStatus(status: string): 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' {
        const validStatuses = ['ACCEPTED', 'COURSE_FULL_ERROR', 'COURSE_CANCELED'];
        return validStatuses.includes(status) ? status as 'ACCEPTED' | 'COURSE_FULL_ERROR' | 'COURSE_CANCELED' : 'COURSE_CANCELED';
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