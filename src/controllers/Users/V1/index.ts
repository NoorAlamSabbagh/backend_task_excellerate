import express, { Router } from "express";

const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

import courseController from "./controllers/courseController";
import registrationController from "./controllers/registrationController";


// Course routes
router.post('/add/courseOffering', courseController.addCourse);
router.post('/allot/:course_id', courseController.allotCourse);
//Register routes
router.post('/add/register/:course_id', registrationController.registerForCourse);
router.post('/cancel/:registration_id', registrationController.cancelRegistration);

export default router;
