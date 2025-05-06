import express, { Router } from "express";

const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

import courseController from "./controllers/courseController";
import registrationController from "./controllers/registrationController";


//<======================= Course routes ===========================>
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - course_name
 *         - instructor_name
 *         - start_date
 *         - min_employees
 *         - max_employees
 *       properties:
 *         course_name:
 *           type: string
 *           description: The name of the course
 *         instructor_name:
 *           type: string
 *           description: The name of the instructor
 *         start_date:
 *           type: string
 *           description: The start date of the course (format DDMMYYYY)
 *         min_employees:
 *           type: integer
 *           description: Minimum number of employees required
 *         max_employees:
 *           type: integer
 *           description: Maximum number of employees allowed
 *     Registration:
 *       type: object
 *       required:
 *         - employee_name
 *         - email
 *       properties:
 *         employee_name:
 *           type: string
 *           description: The name of the employee
 *         email:
 *           type: string
 *           description: The email of the employee
 */

// POST routes

/**
 * @swagger
 * /add/courseOffering:
 *   post:
 *     summary: Add a new course offering
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: course added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: object
 *                       properties:
 *                         course_id:
 *                           type: string
 *                           example: OFFERING-JAVA-JAMES
 *       400:
 *         description: Input data error
 */

router.post('/add/courseOffering', courseController.addCourse);

/**
 * @swagger
 * /allot/{course_id}:
 *   post:
 *     summary: Allot a course to registered employees
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course allotment completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Course allotted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: object
 *                       properties:
 *                         allotted:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Registration'
 *       404:
 *         description: Course not found
 */


router.post('/allot/:course_id', courseController.allotCourse);
//<================ Register routes  ===========================>
/**
 * @swagger
 * /add/register/{course_id}:
 *   post:
 *     summary: Register for a course
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Registration successful or course full
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: successfully registered for OFFERING-JAVA-JAMES
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: object
 *                       properties:
 *                         registration_id:
 *                           type: string
 *                           example: ANDY-OFFERING-JAVA-JAMES
 *                         status:
 *                           type: string
 *                           example: ACCEPTED
 *       400:
 *         description: Input data error
 *       404:
 *         description: Course not found
 */
router.post('/add/register/:course_id', registrationController.registerForCourse);

/**
 * @swagger
 * /cancel/{registration_id}:
 *   post:
 *     summary: Cancel a course registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: registration_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The registration ID
 *     responses:
 *       200:
 *         description: Cancellation accepted or rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Cancellation accepted
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           example: CANCEL_ACCEPTED
 *       404:
 *         description: Registration not found
 */
router.post('/cancel/:registration_id', registrationController.cancelRegistration);

export default router;

