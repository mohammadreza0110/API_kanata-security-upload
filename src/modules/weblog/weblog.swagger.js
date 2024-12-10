/**
 * @swagger
 * tags:
 *   name: Weblogs
 *   description: Operations related to weblogs
 */

/**
 * @swagger
 * /weblogs:
 *   get:
 *     summary: Retrieve weblogs with pagination
 *     tags:
 *       - Weblogs
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
 *         description: The number of weblogs to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved weblogs
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
 *                       id:
 *                         type: string
 *                         description: The ID of the weblog
 *                       title:
 *                         type: string
 *                         description: The title of the weblog
 *                       content:
 *                         type: string
 *                         description: The content of the weblog
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of weblogs
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *       404:
 *         description: Weblogs not found
 *       400:
 *         description: Invalid request parameters
 */

/**
 * @swagger
 * /weblogs/sortedByViews:
 *   get:
 *     summary: Retrieve weblogs sorted by views
 *     tags:
 *       - Weblogs
 *     responses:
 *       200:
 *         description: Successfully retrieved weblogs sorted by views
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
 *                       id:
 *                         type: string
 *                         description: The ID of the weblog
 *                       title:
 *                         type: string
 *                         description: The title of the weblog
 *                       content:
 *                         type: string
 *                         description: The content of the weblog
 *                       views:
 *                         type: integer
 *                         description: The number of views for the weblog
 *                       owner:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 *                             description: The full name of the owner
 *                       category:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: The name of the category
 *       404:
 *         description: Weblogs not found
 *       400:
 *         description: Invalid request parameters
 */

/**
 * @swagger
 * /weblogs/byLanguage:
 *   get:
 *     summary: Retrieve weblogs filtered by language with pagination and search
 *     tags:
 *       - Weblogs
 *     parameters:
 *       - name: language
 *         in: query
 *         description: The language to filter weblogs (e.g., 'fa', 'en')
 *         required: true
 *         schema:
 *           type: string
 *           example: 'fa'
 *       - name: page
 *         in: query
 *         description: The page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of weblogs to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: search
 *         in: query
 *         description: Text to search in weblog title and description
 *         required: false
 *         schema:
 *           type: string
 *           example: 'programming'
 *     responses:
 *       200:
 *         description: Successfully retrieved weblogs filtered by language with optional search
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
 *                       id:
 *                         type: string
 *                         description: The ID of the weblog
 *                       title:
 *                         type: string
 *                         description: The title of the weblog
 *                       content:
 *                         type: string
 *                         description: The content of the weblog
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of weblogs
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *       404:
 *         description: Weblogs not found
 *       400:
 *         description: Invalid request parameters
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateWeblog:
 *       type: object
 *       required:
 *         - category
 *         - owner
 *         - localizedContent
 *       properties:
 *         category:
 *           type: string
 *           description: ID of the category
 *         owner:
 *           type: string
 *           description: ID of the user who owns the weblog
 *         localizedContent:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 description: Language code
 *               title:
 *                 type: string
 *                 description: Title in the specified language
 *               content:
 *                 type: string
 *                 description: Content in the specified language
 *       example:
 *         category: "605c72ef1c4d6b001f6e4b1d"
 *         owner: "60d0fe4f5311236168a109ca"
 *         localizedContent:
 *           - language: "fa"
 *             title: "عنوان به زبان فارسی"
 *             content: "محتوای وبلاگ به زبان فارسی"
 *           - language: "en"
 *             title: "Title in English"
 *             content: "Blog content in English"
 */

/**
 * @swagger
 * /weblogs:
 *   post:
 *     summary: Create a new weblog
 *     tags:
 *       - Admin_Weblogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWeblog'
 *     responses:
 *       201:
 *         description: Weblog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the created weblog
 *                     category:
 *                       type: string
 *                       description: Category ID of the weblog
 *                     owner:
 *                       type: string
 *                       description: ID of the user who owns the weblog
 *                     localizedContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           language:
 *                             type: string
 *                             description: Language code
 *                           title:
 *                             type: string
 *                             description: Title in the specified language
 *                           content:
 *                             type: string
 *                             description: Content in the specified language
 *                     dateCreated:
 *                       type: string
 *                       description: Date the weblog was created
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 */

/**
 * @swagger
 * /weblogs/{id}/uploadImage:
 *   post:
 *     summary: Upload an image for a weblog
 *     tags:
 *       - Admin_Weblogs
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the weblog
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
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     category:
 *                       type: string
 *                     owner:
 *                       type: string
 *                     image:
 *                       type: string
 *                       description: The path to the uploaded image
 *                     localizedContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           language:
 *                             type: string
 *                           title:
 *                             type: string
 *                           content:
 *                             type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 *       404:
 *         description: Weblog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Weblog not found"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - user
 *         - userName
 *         - content
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user adding the comment
 *         userName:
 *           type: string
 *           description: Name of the user adding the comment
 *         content:
 *           type: string
 *           description: Content of the comment
 *         datePosted:
 *           type: string
 *           format: date-time
 *           description: Date and time when the comment was posted
 */

/**
 * @swagger
 * /weblogs/{id}/changeLanguage:
 *   get:
 *     summary: Get localized content of a weblog by language
 *     tags:
 *       - Weblogs
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the weblog
 *         required: true
 *         schema:
 *           type: string
 *       - name: language
 *         in: query
 *         description: Language code to fetch localized content
 *         required: true
 *         schema:
 *           type: string
 *           example: fa
 *     responses:
 *       200:
 *         description: Localized content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     category:
 *                       type: string
 *                     image:
 *                       type: string
 *                     dateCreated:
 *                       type: string
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                           userName:
 *                             type: string
 *                           content:
 *                             type: string
 *                           datePosted:
 *                             type: string
 *                           answers:
 *                             type: array
 *                             items:
 *                               type: object
 *                     owner:
 *                       type: string
 *                     localizedContent:
 *                       type: object
 *                       properties:
 *                         language:
 *                           type: string
 *                         title:
 *                           type: string
 *                         content:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Weblog or localized content not found
 */

/**
 * @swagger
 * /weblogs/{id}:
 *   get:
 *     summary: Retrieve a single weblog by ID
 *     tags:
 *       - Weblogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the weblog to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the weblog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Weblog ID
 *                 title:
 *                   type: string
 *                   description: Title of the weblog
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Category ID
 *                     name:
 *                       type: string
 *                       description: Name of the category
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of image URLs
 *                 dateCreated:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the weblog was created
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         description: ID of the user adding the comment
 *                       userName:
 *                         type: string
 *                         description: Name of the user adding the comment
 *                       content:
 *                         type: string
 *                         description: Content of the comment
 *                       datePosted:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the comment was posted
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             userName:
 *                               type: string
 *                               description: Name of the user adding the response
 *                             content:
 *                               type: string
 *                               description: Content of the response
 *                             datePosted:
 *                               type: string
 *                               format: date-time
 *                               description: Date and time when the response was posted
 *                             answers:
 *                               type: array
 *                               items:
 *                                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Weblog not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /weblogs/{id}:
 *   put:
 *     summary: Update an existing weblog
 *     tags:
 *       - Admin_Weblogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the weblog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWeblog'
 *     responses:
 *       200:
 *         description: Weblog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateWeblog'
 *                 message:
 *                   type: string
 *                   example: "Weblog updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 *       404:
 *         description: Weblog not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /weblogs/{id}:
 *   delete:
 *     summary: Delete a specific weblog by ID
 *     tags:
 *       - Admin_Weblogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the weblog to delete
 *     responses:
 *       200:
 *         description: Weblog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Weblog ID
 *                     title:
 *                       type: string
 *                       description: Title of the weblog
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Category ID
 *                         name:
 *                           type: string
 *                           description: Name of the category
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of image URLs
 *                     dateCreated:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the weblog was created
 *       404:
 *         description: Weblog not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /weblogs/search:
 *   get:
 *     summary: Search weblogs by title
 *     tags:
 *       - Admin_Weblogs
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Keyword to search in weblog titles
 *         required: true
 *         schema:
 *           type: string
 *           example: Programming
 *       - name: page
 *         in: query
 *         description: The page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of weblogs to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
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
 *                       id:
 *                         type: string
 *                         description: The ID of the weblog
 *                       title:
 *                         type: string
 *                         description: The title of the weblog
 *                       content:
 *                         type: string
 *                         description: The content of the weblog
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of search results
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *       404:
 *         description: No weblogs found with the specified keyword
 *       400:
 *         description: Invalid request parameters
 */