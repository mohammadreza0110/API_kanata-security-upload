/**
 * @swagger
 * /form/messages:
 *   get:
 *     summary: Retrieve messages with pagination
 *     tags:
 *       - Form
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of messages to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The ID of the message
 *                           content:
 *                             type: string
 *                             description: The content of the message
 *                     totalMessages:
 *                       type: integer
 *                       description: The total number of messages
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number
 *       404:
 *         description: Messages not found
 *       400:
 *         description: Invalid request parameters
 */

/**
 * @swagger
 * /form/sendMsg:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The user's full name
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               email:
 *                 type: string
 *                 description: The user's email
 *               issue:
 *                 type: string
 *                 description: The issue or subject of the message
 *               msg:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       200:
 *         description: Message successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   description: The saved message object
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /form/messages/{id}:
 *   get:
 *     summary: Retrieve a specific message by ID
 *     tags:
 *       - Form
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the message to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: "123456"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the message details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the message
 *                 content:
 *                   type: string
 *                   description: The content of the message
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the message was created
 *       404:
 *         description: Message not found
 *       403:
 *         description: Access forbidden - Admins only
 *       401:
 *         description: Unauthorized - Authentication required
 *       400:
 *         description: Invalid request parameters
 */

/**
 * @swagger
 * /form/messages/{id}:
 *   delete:
 *     summary: Delete a specific message by ID
 *     tags:
 *       - Form
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the message to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "123456"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "پیام با موفقیت حذف شد"
 *                 data:
 *                   type: object
 *                   description: Details of the deleted message
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the deleted message
 *                     fullName:
 *                       type: string
 *                       description: Full name of the sender
 *                     phone:
 *                       type: string
 *                       description: Phone number of the sender
 *                     email:
 *                       type: string
 *                       description: Email address of the sender
 *                     issue:
 *                       type: string
 *                       description: The issue/topic of the message
 *                     msg:
 *                       type: string
 *                       description: The content of the message
 *       404:
 *         description: Message not found
 *       403:
 *         description: Access forbidden - Admins only
 *       401:
 *         description: Unauthorized - Authentication required
 *       400:
 *         description: Invalid request parameters
 */
