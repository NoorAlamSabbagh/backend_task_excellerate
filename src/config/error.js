// src/
// ├── config/
// │   └── db.json          # JSON database file
// ├── controllers/
// │   ├── course.controller.ts
// │   └── registration.controller.ts
// ├── models/
// │   ├── course.model.ts
// │   └── registration.model.ts
// ├── routes/
// │   ├── course.routes.ts
// │   └── registration.routes.ts
// ├── services/
// │   ├── course.service.ts
// │   └── registration.service.ts
// ├── interfaces/
// │   ├── course.interface.ts
// │   └── registration.interface.ts
// ├── utils/
// │   └── helpers.ts       # Helper functions
// ├── app.ts               # Express app setup
// └── server.ts            # Server entry point







/////////////////////////////
// src/model/registration.ts
import { Registration } from "../interfaces/registrationInterface";
import db from "../config/db.json";
import fs from 'fs';
import path from 'path';

class RegistrationModel {
    // Add type guard to validate status
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

    private saveToDatabase(): void {
        const data = {
            ...db,
            registrations: this.registrations
        };
        fs.writeFileSync(path.join(__dirname, '../../src/config/db.json'), JSON.stringify(data, null, 2));
    }

    // ... rest of your methods
}

export default new RegistrationModel();



//////////////////////////
// src/model/course.ts
import { Registration } from "../interfaces/registrationInterface";
import { RegistrationModel } from "./registration"; // Import the registration model

class CourseModel {
    // Use the registration model's data instead of direct db access
    public getRegistrationsForCourse(course_id: string): Registration[] {
        return RegistrationModel.getRegistrationsForCourse(course_id);
    }
    // ... rest of your methods
}

export default new CourseModel();