/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Retrieve users with pagination
 *     tags:
 *       - AdminPanel_User
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
 *         description: The number of users to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The ID of the user
 *                           name:
 *                             type: string
 *                             description: The name of the user
 *                           email:
 *                             type: string
 *                             description: The email of the user
 *                     totalUsers:
 *                       type: integer
 *                       description: The total number of users
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number
 *       404:
 *         description: Users not found
 *       400:
 *         description: Invalid request parameters
 */

/**
 * @swagger
 * /user/whoami:
 *   get:
 *     summary: Get information about the current user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/uploadProfile/{id}:
 *   post:
 *     summary: Upload a profile picture for a user
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:  # نام فیلد باید "profilePicture" باشد
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/changeProfile:
 *   put:
 *     summary: Change the profile of the current user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: New full name of the user in Farsi
 *               fullNameEnglish:
 *                 type: string
 *                 description: New full name of the user in English
 *               biography:
 *                 type: string
 *                 description: New biography of the user
 *               email:
 *                 type: string
 *                 description: New email of the user
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     fullName:
 *                       type: string
 *                       description: The updated full name of the user in Farsi
 *                     fullNameEnglish:
 *                       type: string
 *                       description: The updated full name of the user in English
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                     biography:
 *                       type: string
 *                       description: The updated biography of the user
 *                     profilePicture:
 *                       type: string
 *                       description: The URL of the profile picture
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/users/{id}:
 *   put:
 *     summary: Edit user information
 *     tags:
 *       - AdminPanel_User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to edit
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *               fullNameEnglish:
 *                 type: string
 *                 description: English full name of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               role:
 *                 type: string
 *                 description: Role of the user (e.g., admin, user)
 *               biography:
 *                 type: string
 *                 description: Biography of the user
 *             example:
 *               fullName: "John Doe"
 *               fullNameEnglish: "John Doe"
 *               email: "john.doe@example.com"
 *               role: "admin"
 *               biography: "A brief bio about John Doe."
 *     responses:
 *       200:
 *         description: User information successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   type: object
 *                   description: The updated user object
 *       400:
 *         description: Bad Request - Invalid input or missing parameters
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/changePassword:
 *   put:
 *     summary: Change the password of the current user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set for the user
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the password has been changed
 *       400:
 *         description: Bad Request - The request was invalid or cannot be otherwise served
 *       401:
 *         description: Unauthorized - The request requires user authentication or the old password is incorrect
 *       403:
 *         description: Forbidden - The user does not have permission to change the password
 *       404:
 *         description: Not Found - The user was not found
 */

/**
 * @swagger
 * /user/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - AdminPanel_User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "64b5f78d4f4b3b0012c6aabc"
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "کاربر با موفقیت حذف شد"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "شناسه کاربر نامعتبر است"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "احراز هویت ناموفق"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "شما مجاز به انجام این عمل نیستید"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "کاربر پیدا نشد"
 */

/**
 * @swagger
 * /user/create-user:
 *   post:
 *     summary: ایجاد کاربر جدید توسط ادمین
 *     tags:
 *       - AdminPanel_User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - password
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: نام کامل کاربر
 *                 example: "علی رضایی"
 *               phone:
 *                 type: string
 *                 description: شماره تلفن کاربر (اختیاری اگر ایمیل وارد شده باشد)
 *                 example: "09123456789"
 *               email:
 *                 type: string
 *                 description: ایمیل کاربر (اختیاری اگر شماره تلفن وارد شده باشد)
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 description: رمز عبور کاربر
 *                 example: "yourPassword123"
 *               role:
 *                 type: string
 *                 description: نقش کاربر (user, admin, superAdmin)
 *                 example: "user"
 *     responses:
 *       201:
 *         description: کاربر با موفقیت ثبت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر جدید با موفقیت ثبت شد"
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "علی رضایی"
 *                     phone:
 *                       type: string
 *                       example: "09123456789"
 *                     email:
 *                       type: string
 *                       example: "example@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: خطا در ورودی‌ها (مانند فیلدهای ناقص یا نقش نامعتبر)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "لطفاً تمام فیلدهای لازم را وارد کنید"
 *       409:
 *         description: ایمیل یا شماره تلفن قبلاً ثبت شده است
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ایمیل یا تلفن قبلاً ثبت شده است"
 */
