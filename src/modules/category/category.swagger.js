/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: successfully
 */

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */


/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */


/**
 * @swagger
 * /category/language:
 *   get:
 *     summary: Get categories filtered by language
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         required: true
 *         description: Language code to filter categories (e.g., 'en', 'fa')
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   localizedContent:
 *                     type: object
 *                     properties:
 *                       language:
 *                         type: string
 *                         description: Language code (e.g., 'en', 'fa')
 *                       name:
 *                         type: string
 *                         description: Name of the category in the specific language
 *                       slug:
 *                         type: string
 *                         description: Slug for the category in the specific language
 *                   parent:
 *                     type: string
 *                     description: ID of the parent category
 *                   parents:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of parent category IDs
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "زبان مورد نظر ارسال نشده است"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LocalizedCategory:
 *       type: object
 *       required:
 *         - language
 *         - name
 *         - slug
 *       properties:
 *         language:
 *           type: string
 *           description: Language code (e.g., 'en', 'fa')
 *         name:
 *           type: string
 *           description: Name of the category in the specific language
 *         slug:
 *           type: string
 *           description: Slug for the category in the specific language
 *     CreateCategory:
 *       type: object
 *       properties:
 *         localizedContent:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LocalizedCategory'
 *           description: List of localized content for the category
 *         parent:
 *           type: string
 *           description: Optional parent category ID
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create New Category
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 */
