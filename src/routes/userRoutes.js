/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

import express from 'express'
const router = express.Router();
import { createUser }  from '../controllers/userController.js'

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body or user already exists
 *       500:
 *         description: Server error
 */
router.post('/', createUser);

export default router;

