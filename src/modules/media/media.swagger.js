/**
 * @swagger
 * /media/upload:
 *   post:
 *     summary: آپلود یک فایل رسانه
 *     description: این API برای آپلود یک فایل رسانه (تصاویر یا ویدیوها) به پوشه uploads استفاده می‌شود.
 *     tags: [media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: فایل رسانه‌ای که باید آپلود شود (تصاویر یا ویدیوها)
 *     responses:
 *       200:
 *         description: فایل رسانه با موفقیت آپلود شد.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: رسانه با موفقیت آپلود شد
 *                 file:
 *                   type: string
 *                   example: image1.jpg
 *       400:
 *         description: درخواست نامعتبر (مثلاً هیچ فایلی انتخاب نشده است).
 *       500:
 *         description: خطا در آپلود رسانه.
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: بازیابی تمامی فایل‌های رسانه
 *     description: این API برای بازیابی تمامی فایل‌های رسانه‌ای (تصاویر و ویدیوها) از دیتابیس استفاده می‌شود.
 *     tags: [media]
 *     responses:
 *       200:
 *         description: تمامی فایل‌های رسانه با موفقیت بازیابی شدند.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: تمامی فایل‌های رسانه با موفقیت بازیابی شدند
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fileName:
 *                         type: string
 *                         description: نام فایل رسانه‌ای
 *                         example: image1.jpg
 *                       fileHash:
 *                         type: string
 *                         description: هش فایل رسانه‌ای
 *                         example: abc123hashvalue
 *                       filePath:
 *                         type: string
 *                         description: مسیر فایل در سرور
 *                         example: uploads/image1.jpg
 *                       dateUploaded:
 *                         type: string
 *                         format: date-time
 *                         description: تاریخ بارگذاری فایل
 *                         example: "2024-09-28T12:00:00Z"
 *       500:
 *         description: خطا در بازیابی فایل‌های رسانه.
 */

/**
 * @swagger
 * /media/delete/{fileName}:
 *   delete:
 *     summary: حذف فایل بر اساس نام
 *     tags:
 *       - media
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: نام فایل برای حذف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: فایل با موفقیت حذف شد.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فایل با موفقیت حذف شد."
 *       404:
 *         description: فایل یافت نشد.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فایلی با این نام یافت نشد."
 *       500:
 *         description: خطا در حذف فایل.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطا در حذف فایل: [جزئیات خطا]"
 */
