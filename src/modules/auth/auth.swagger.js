/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOTPCode:
 *       type: object
 *       required:
 *         - phone
 *       properties:
 *         phone:
 *           type: string
 *           example: "09107566026"
 *     CheckOTPCode:
 *       type: object
 *       required:
 *         - phone
 *         - code
 *       properties:
 *         phone:
 *           type: string
 *           example: "09107566026"
 *         code:
 *           type: string
 *           example: "123456"
 *     LoginUser:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         phone:
 *           type: string
 *           example: "09107566026"
 *         password:
 *           type: string
 *           example: "password123"
 *     VerifyUser:
 *       type: object
 *       required:
 *         - phone
 *         - code
 *       properties:
 *         phone:
 *           type: string
 *           example: "09107566026"
 *         code:
 *           type: string
 *           example: "123456"
 *     RegisterUser:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         phone:
 *           type: string
 *           example: "09107566026"
 *         password:
 *           type: string
 *           example: "password123"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User With Phone or Email
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "user@example.com or 09123456789"
 *               password:
 *                 type: string
 *                 example: "your_password_here"
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "user@example.com or 09123456789"
 *               password:
 *                 type: string
 *                 example: "your_password_here"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register New User with Phone or Email
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "user@example.com or 09123456789"
 *                 description: "شماره تلفن یا ایمیل کاربر (فقط یکی از این دو مورد الزامی است)"
 *               password:
 *                 type: string
 *                 example: "your_password_here"
 *                 description: "رمز عبور کاربر"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "نام کامل کاربر"
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "user@example.com or 09123456789"
 *                 description: "شماره تلفن یا ایمیل کاربر (فقط یکی از این دو مورد الزامی است)"
 *               password:
 *                 type: string
 *                 example: "your_password_here"
 *                 description: "رمز عبور کاربر"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "نام کامل کاربر"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ثبت نام با موفقیت انجام شد"
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تلفن یا ایمیل الزامی است, رمز عبور باید حداقل 4 کاراکتر باشد"
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send phone verification code
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/SendOTPCode'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOTPCode'
 *     responses:
 *       200:
 *         description: Phone verification code sent
 */

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Check OTP verification code
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/VerifyUser'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyUser'
 *     responses:
 *       200:
 *         description: OTP verification code checked
 */

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully."
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized or invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP code."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePassword:
 *       type: object
 *       required:
 *         - phone
 *         - newPassword
 *       properties:
 *         phone:
 *           type: string
 *           example: "09123456789"
 *         newPassword:
 *           type: string
 *           example: "newPassword123"
 */
