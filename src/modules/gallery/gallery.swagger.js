/**
 * @swagger
 * /gallery/images:
 *   get:
 *     summary: دریافت لیست تصاویر
 *     description: این API لیستی از تصاویر ذخیره شده در پوشه uploads را برمی‌گرداند.
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: لیست تصاویر با موفقیت دریافت شد.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: تصاویر با موفقیت دریافت شد
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fileName:
 *                         type: string
 *                         example: image1.jpg
 *                       url:
 *                         type: string
 *                         example: /uploads/image1.jpg
 *       500:
 *         description: خطا در دریافت تصاویر.
 */

/**
 * @swagger
 * /gallery/upload:
 *   post:
 *     summary: آپلود یک تصویر
 *     description: این API به شما اجازه می‌دهد یک تصویر را آپلود کرده و لینک آن را دریافت کنید.
 *     tags: [Gallery]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: فایل تصویری که آپلود می‌شود
 *     responses:
 *       200:
 *         description: تصویر با موفقیت آپلود شد.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: تصویر با موفقیت آپلود شد
 *                 fileUrl:
 *                   type: string
 *                   example: /uploads/image123.jpg
 *       400:
 *         description: هیچ فایلی آپلود نشده است.
 *       500:
 *         description: خطا در آپلود تصویر.
 */
/**
 * @swagger
 * /gallery/{fileName}:
 *   delete:
 *     summary: حذف یک تصویر با نام فایل
 *     tags:
 *       - Gallery
 *     parameters:
 *       - name: fileName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: نام فایلی که باید حذف شود
 *     responses:
 *       200:
 *         description: تصویر با موفقیت حذف شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تصویر با موفقیت حذف شد"
 *       400:
 *         description: درخواست اشتباه
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "نام فایل ارسال نشده است"
 *       404:
 *         description: تصویر مورد نظر یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تصویر مورد نظر یافت نشد"
 *       500:
 *         description: خطا در سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطای سرور"
 */
