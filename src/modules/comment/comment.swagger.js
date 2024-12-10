/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Operations related to weblogs
 */

/**
 * @swagger
 * /comment/{id}/:
 *   post:
 *     summary: Add a comment to a specific weblog
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the weblog to which the comment will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 blog:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the blog
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the user who commented
 *                           userName:
 *                             type: string
 *                             description: Name of the user who commented
 *                           content:
 *                             type: string
 *                             description: Content of the comment
 *                           datePosted:
 *                             type: string
 *                             format: date-time
 *                             description: Date and time when the comment was posted
 *       404:
 *         description: Weblog or user not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (token missing or invalid)
 */

/**
 * @swagger
 * /comment/{id}/{commentId}/:
 *   post:
 *     summary: Add an answer to a specific comment or response in a weblog
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the weblog
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment or response to which the answer will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the answer
 *               responseId:
 *                 type: string
 *                 description: (Optional) ID of the response to which the answer will be added, if applicable
 *     responses:
 *       200:
 *         description: Answer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "جواب شما درج شد بعد از تأیید نشان داده می‌شود"
 *                 data:
 *                   type: object
 *                   properties:
 *                     parentComment:
 *                       type: object
 *                       description: The parent comment or response to which the answer was added
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the parent comment or response
 *                         userId:
 *                           type: string
 *                           description: ID of the user who posted the comment
 *                         userName:
 *                           type: string
 *                           description: Full name of the user who posted the comment
 *                         content:
 *                           type: string
 *                           description: Content of the parent comment or response
 *                         isVisible:
 *                           type: boolean
 *                           description: Visibility status of the comment
 *                           example: false
 *                         datePosted:
 *                           type: string
 *                           format: date-time
 *                           description: Date and time when the comment was posted
 *                         answers:
 *                           type: array
 *                           description: List of answers to the comment or response
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: ID of the answer
 *                               userName:
 *                                 type: string
 *                                 description: Full name of the user who posted the answer
 *                               content:
 *                                 type: string
 *                                 description: Content of the answer
 *                               datePosted:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Date and time when the answer was posted
 *                               isVisible:
 *                                 type: boolean
 *                                 description: Visibility status of the answer
 *                                 example: false
 *       404:
 *         description: Weblog, user, or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "وبلاگ، کاربر یا کامنت یافت نشد"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "داده‌های درخواست نامعتبر است"
 */

/**
 * @swagger
 * /comment/{id}/{commentId}/:
 *   post:
 *     summary: Add an answer to a specific comment in a weblog
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the weblog
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to which the answer will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the answer
 *               responseId:
 *                 type: string
 *                 description: (Optional) ID of the response to which the new answer will be added
 *     responses:
 *       200:
 *         description: Answer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "جواب شما درج شد بعد از تأیید نشان داده می‌شود"
 *                 data:
 *                   type: object
 *                   properties:
 *                     parentComment:
 *                       type: object
 *                       description: The parent comment to which the answer was added
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the parent comment
 *                         userId:
 *                           type: string
 *                           description: ID of the user who posted the comment
 *                         userName:
 *                           type: string
 *                           description: Full name of the user who posted the comment
 *                         content:
 *                           type: string
 *                           description: Content of the parent comment
 *                         isVisible:
 *                           type: boolean
 *                           description: Visibility status of the comment
 *                           example: false
 *                         datePosted:
 *                           type: string
 *                           format: date-time
 *                           description: Date and time when the comment was posted
 *                         answers:
 *                           type: array
 *                           description: List of answers to the comment
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: ID of the answer
 *                               userName:
 *                                 type: string
 *                                 description: Full name of the user who posted the answer
 *                               content:
 *                                 type: string
 *                                 description: Content of the answer
 *                               datePosted:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Date and time when the answer was posted
 *                               isVisible:
 *                                 type: boolean
 *                                 description: Visibility status of the answer
 *                                 example: false
 *       404:
 *         description: Weblog or user or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "وبلاگ، کاربر یا کامنت یافت نشد"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "داده‌های درخواست نامعتبر است"
 */

/**
 * @swagger
 * /comment/{weblogId}/{commentId}:
 *   delete:
 *     summary: Remove a comment or a response to a comment
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: weblogId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the weblog containing the comment
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to be removed
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responseId:
 *                 type: string
 *                 description: (Optional) ID of the response to be removed, if applicable
 *     responses:
 *       200:
 *         description: Comment or response removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment or response removed successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Weblog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 *       404:
 *         description: Weblog or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weblog or comment not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /comment/{id}/comments:
 *   get:
 *     summary: Retrieve comments for a specific weblog
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the weblog for which to retrieve comments
 *     responses:
 *       200:
 *         description: Successful response with the list of comments
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
 *                       userName:
 *                         type: string
 *                         description: Name of the user who made the comment
 *                       content:
 *                         type: string
 *                         description: Content of the comment
 *                       datePosted:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the comment was posted
 *       404:
 *         description: Weblog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the weblog was not found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating bad request
 */

/**
 * @swagger
 * /comment/all:
 *   get:
 *     summary: Retrieve all comments from all blogs with pagination
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of comments per page
 *     responses:
 *       200:
 *         description: Successfully retrieved all comments with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                   example: تمامی کامنت‌ها با موفقیت دریافت شدند
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blogId:
 *                         type: string
 *                         description: شناسه وبلاگ
 *                       blogTitle:
 *                         type: string
 *                         description: عنوان وبلاگ
 *                       commentId:
 *                         type: string
 *                         description: شناسه کامنت
 *                       userName:
 *                         type: string
 *                         description: نام کاربر کامنت‌گذار
 *                       content:
 *                         type: string
 *                         description: محتوای کامنت
 *                       datePosted:
 *                         type: string
 *                         format: date-time
 *                         description: تاریخ ارسال کامنت
 *                       isVisible:
 *                         type: boolean
 *                         description: وضعیت نمایش کامنت
 *                       isResponse:
 *                         type: boolean
 *                         description: نشان‌دهنده پاسخ بودن کامنت
 *                 currentPage:
 *                   type: integer
 *                   description: شماره صفحه فعلی
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: تعداد کل صفحات
 *                   example: 5
 *                 totalComments:
 *                   type: integer
 *                   description: تعداد کل کامنت‌ها
 *                   example: 50
 *       404:
 *         description: کامنتی در صفحه مورد نظر یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: صفحه مورد نظر خالی است
 *       400:
 *         description: درخواست نادرست
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: مقدار limit باید بزرگتر از ۰ باشد
 *       500:
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: خطای داخلی سرور
 */

/**
 * @swagger
 * /comment/{weblogId}/{commentId}/visibility:
 *   patch:
 *     summary: Toggle the visibility of a comment or a response on a specific weblog
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: weblogId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the weblog where the comment is located
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the comment whose visibility will be toggled
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isVisible:
 *                 type: boolean
 *                 description: Visibility status to be updated (true for visible, false for hidden)
 *               responseId:
 *                 type: string
 *                 description: (Optional) ID of the response if toggling the visibility of a response within a comment
 *     responses:
 *       200:
 *         description: Visibility updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visibility updated successfully.
 *                 data:
 *                   type: object
 *                   description: Updated weblog data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the updated weblog
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID of the comment
 *                           isVisible:
 *                             type: boolean
 *                             description: Updated visibility status of the comment
 *                           content:
 *                             type: string
 *                             description: Content of the comment
 *       404:
 *         description: Weblog or comment not found
 *       400:
 *         description: Invalid input (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (token missing or invalid)
 */
