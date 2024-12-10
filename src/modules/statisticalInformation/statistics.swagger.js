/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationCountResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             totalUsers:
 *               type: integer
 *               description: Total number of registered users
 *         message:
 *           type: string
 *           description: Success message
 *     WeblogCountResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             totalWeblogs:
 *               type: integer
 *               description: Total number of weblogs
 *         message:
 *           type: string
 *           description: Success message
 *     FormCountResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             totalForms:
 *               type: integer
 *               description: Total number of forms
 *         message:
 *           type: string
 *           description: Success message

 */

/**
 * @swagger
 * /statistics/registration:
 *   get:
 *     summary: Get total number of registered users
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: Total number of registered users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationCountResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /statistics/weblogs:
 *   get:
 *     summary: Get total number of weblogs
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: Total number of weblogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeblogCountResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /statistics/forms:
 *   get:
 *     summary: Get total number of forms
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: Total number of forms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormCountResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /statistics/forms:
 *   get:
 *     summary: Retrieve the total number of forms
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the total number of forms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   description: Total number of forms
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request if the request parameters are invalid or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining why the request failed
 *       401:
 *         description: Unauthorized if the request does not include a valid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating authorization failure
 *       500:
 *         description: Internal server error if something goes wrong on the server side
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating server failure
 */

/**
 * @swagger
 * /statistics/weekly-views:
 *   get:
 *     summary: Retrieve the total number of views for each week in a specified date range
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: startDate
 *         in: query
 *         description: The start date of the range to count weekly views, in ISO 8601 format (e.g., 2024-08-01)
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         description: The end date of the range to count weekly views, in ISO 8601 format (e.g., 2024-08-31)
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successfully retrieved the weekly views for the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: The start date of the week
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: The end date of the week
 *                       totalViews:
 *                         type: integer
 *                         description: Total number of views for the week
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request if the date parameters are missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining why the request failed
 *       401:
 *         description: Unauthorized if the request does not include a valid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating authorization failure
 *       500:
 *         description: Internal server error if something goes wrong on the server side
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating server failure
 */
