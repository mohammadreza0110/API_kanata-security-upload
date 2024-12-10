/**
 * @swagger
 * tags:
 *   name: FormAdv
 *   description: formAdv
 */

/**
 * @swagger
 * /formAdv/evaluation-form:
 *   post:
 *     summary: ارسال فرم ارزیابی جدید
 *     tags:
 *       - FormAdv
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               immigrationCountries:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["کانادا", "استرالیا", "آمریکا", "اسپانیا", "پرتغال", "کارائیب"]
 *                 description: ترجیحات کشور
 *                 example: ["کانادا", "استرالیا"]
 *                 required: true
 *               specificMigrationInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [
 *                     "ویزای توریستی", "ویزای استارت آپ", "ویزای کارآفرینی",
 *                     "ثبت شرکت", "ویزای تحصیلی", "مهاجرت کاری",
 *                     "در حال حاضر تصمیمی نگرفتم", "انتخاب توسط دفتر زندگی نو"
 *                   ]
 *                 description: علایق مهاجرتی
 *                 example: ["ویزای تحصیلی", "مهاجرت کاری"]
 *                 required: true
 *               personalInformation:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     description: نام کامل
 *                     example: "علی احمدی"
 *                     required: true
 *                   dateOfBirth:
 *                     type: string
 *                     description: تاریخ تولد
 *                     example: "1375"
 *                     required: true
 *                   nationality:
 *                     type: string
 *                     enum: ["ایرانی", "سایر تابعیت ها"]
 *                     description: ملیت
 *                     example: "ایرانی"
 *                     required: true
 *                   gender:
 *                     type: string
 *                     enum: ["زن", "مرد"]
 *                     description: جنسیت
 *                     example: "مرد"
 *                     required: true
 *                   mobilePhone:
 *                     type: string
 *                     description: شماره موبایل
 *                     example: "09123456789"
 *                     required: true
 *                   landline:
 *                     type: string
 *                     description: شماره تلفن ثابت
 *                     example: "02112345678"
 *                   email:
 *                     type: string
 *                     description: ایمیل
 *                     example: "ali.ahmadi@example.com"
 *                     required: true
 *                   maritalStatus:
 *                     type: string
 *                     enum: ["مجرد", "متاهل", "مطلقه", "بیوه"]
 *                     description: وضعیت تاهل
 *                     example: "متاهل"
 *                     required: true
 *               educationInformation:
 *                 type: object
 *                 properties:
 *                   highestDegree:
 *                     type: string
 *                     enum: ["مدرك فنی", "دیپلم", "فوق دیپلم", "لیسانس", "فوق لیسانس", "دکترا"]
 *                     description: بالاترین مدرک تحصیلی
 *                     example: "لیسانس"
 *                     required: true
 *                   graduationDate:
 *                     type: string
 *                     description: تاریخ فارغ‌التحصیلی
 *                     example: "1395"
 *                   fieldOfStudy:
 *                     type: string
 *                     description: رشته تحصیلی
 *                     example: "مهندسی کامپیوتر"
 *                     required: true
 *                   englishLanguageCertificate:
 *                     type: string
 *                     enum: ["ندارم", "آیلتس 5 دارم", "آیلتس 6 دارم", "آیلتس 7 یا بالاتر دارم"]
 *                     description: مدرک زبان انگلیسی
 *                     example: "آیلتس 6 دارم"
 *                   frenchLanguageCertificate:
 *                     type: string
 *                     enum: ["ندارم", "در حال خواندن هستم", "مدرك زبان Tef یا Tcf دارم"]
 *                     description: مدرک زبان فرانسه
 *                     example: "مدرك زبان Tef دارم"
 *               workExperience:
 *                 type: object
 *                 properties:
 *                   lastJobTitle:
 *                     type: string
 *                     description: آخرین عنوان شغلی
 *                     example: "برنامه‌نویس"
 *                     required: true
 *                   yearsOfExperience:
 *                     type: string
 *                     enum: ["0 تا 3 سال", "3سال تا 10 سال", "10 سال به بالا"]
 *                     description: سال‌های تجربه کاری
 *                     example: "3 سال تا 10 سال"
 *                     required: true
 *               relativesInCanada:
 *                 type: string
 *                 enum: ["ندارم", "دوست", "برادر یا خواهر", "پدر یا مادر", "خاله یا عمه", "دایی یا عمو"]
 *                 description: بستگان در کانادا
 *                 example: "دوست"
 *                 required: true
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [
 *                     "پروانه کسب و کار معتبر دارم",
 *                     "تجربه کارآفرینی/کشاورزي/دامداري دارم",
 *                     "پزشک متخصص یا داروساز هستم",
 *                     "پروانه تولید از وزارت صنایع دارم",
 *                     "مدیر ارشد و سهامدار شرکت هستم",
 *                     "طرح استارت آپ دارم",
 *                     "کارمند هستم"
 *                   ]
 *                 description: مدارک و صلاحیت‌ها
 *                 example: ["کارمند هستم", "پروانه کسب و کار معتبر دارم"]
 *                 required: true
 *               spouseInformation:
 *                 type: object
 *                 properties:
 *                   marriageDate:
 *                     type: string
 *                     description: تاریخ ازدواج
 *                     example: "1390"
 *                   spouseDateOfBirth:
 *                     type: string
 *                     description: تاریخ تولد همسر
 *                     example: "1372"
 *                   spouseHighestDegree:
 *                     type: string
 *                     enum: ["مدرك فنی", "دیپلم", "فوق لیسانس", "لیسانس", "فوق لیسانس", "دکترا"]
 *                     description: بالاترین مدرک همسر
 *                     example: "فوق لیسانس"
 *                   spouseGraduationDate:
 *                     type: string
 *                     description: تاریخ فارغ‌التحصیلی همسر
 *                     example: "1394"
 *                   spouseFieldOfStudy:
 *                     type: string
 *                     description: رشته تحصیلی همسر
 *                     example: "مدیریت"
 *                   spouseEnglishLanguageCertificate:
 *                     type: string
 *                     enum: ["ندارم", "آیلتس 5 دارم", "آیلتس 6 دارم", "آیلتس 7 یا بالاتر دارم"]
 *                     description: مدرک زبان انگلیسی همسر
 *                     example: "آیلتس 6 دارم"
 *                   spouseFrenchLanguageCertificate:
 *                     type: string
 *                     enum: ["ندارم", "در حال خواندن هستم", "مدرك زبان Tef یا Tcf دارم"]
 *                     description: مدرک زبان فرانسه همسر
 *                     example: "در حال خواندن هستم"
 *                   spouseWorkExperience:
 *                     type: object
 *                     properties:
 *                       lastJobTitle:
 *                         type: string
 *                         description: آخرین عنوان شغلی همسر
 *                         example: "مدیر"
 *                       spouseYearsOfExperience:
 *                         type: string
 *                         enum: ["0 تا 3 سال", "3سال تا 10 سال", "10 سال به بالا"]
 *                         description: سال‌های تجربه کاری همسر
 *                         example: "3 سال تا 10 سال"
 *                   spouseRelativesInCanada:
 *                     type: string
 *                     enum: ["ندارم", "دوست", "برادر یا خواهر", "پدر یا مادر", "خاله یا عمه", "دایی یا عمو"]
 *                     description: بستگان همسر در کانادا
 *                     example: "ندارم"
 *               numberOfChildren:
 *                 type: string
 *                 enum: ["ندارم", "1 فرزند", "2 فرزند و بیشتر"]
 *                 description: تعداد فرزندان
 *                 example: "1 فرزند"
 *               totalAssets:
 *                 type: string
 *                 enum: [
 *                   "کمتر از 500 میلیون تومان", "500 میلیون تومان تا 1 میلیارد تومان",
 *                   "1 میلیارد تومان تا 2 میلیارد تومان", "2 میلیارد تومان و بیشتر"
 *                 ]
 *                 description: مجموع دارایی‌ها
 *                 example: "1 میلیارد تومان تا 2 میلیارد تومان"
 *               additionalQuestions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: سوالات اضافی
 *                 example: ["سوال 1", "سوال 2", "سوال 3"]
 *                 required: false
 *     responses:
 *       '200':
 *         description: فرم با موفقیت ارسال شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم با موفقیت ارسال شد"
 *       '400':
 *         description: خطای ورودی
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ورودی نامعتبر است"
 *       '500':
 *         description: خطای سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "خطای داخلی سرور"
 */


/**
 * @swagger
 * /formAdv/evaluation-form/{id}:
 *   get:
 *     summary: دریافت فرم بر اساس ID
 *     tags:
 *       - FormAdv
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID فرم
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: فرم با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم با موفقیت دریافت شد"
 *                 form:
 *                   type: object
 *                   description: اطلاعات فرم
 *                   properties:
 *                     countryPreference:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["کانادا", "استرالیا"]
 *                     # add other properties of the form object as needed
 *       404:
 *         description: فرم پیدا نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم پیدا نشد"
 *       500:
 *         description: خطا در دریافت فرم
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطا در دریافت فرم"
 */

/**
 * @swagger
 * /formAdv/evaluation-form/{id}:
 *   put:
 *     summary: به‌روزرسانی فرم بر اساس ID
 *     tags:
 *       - FormAdv
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID فرم
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Include all properties that can be updated
 *               countryPreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["کانادا", "استرالیا", "آمریکا", "اسپانیا", "پرتغال", "کارائیب"]
 *               migrationInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [
 *                     "ویزاي توریستی", "ویزاي استارت آپ", "ویزاي کارآفرینی", "ثبت شرکت",
 *                     "ویزاي تحصیلی", "مهاجرت کاري", "در حال حاضر تصمیمی نگرفتم",
 *                     "انتخاب توسط دفتر زندگی نو"
 *                   ]
 *               # Include other properties as needed
 *     responses:
 *       200:
 *         description: فرم با موفقیت به‌روزرسانی شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم با موفقیت به‌روزرسانی شد"
 *                 updatedForm:
 *                   type: object
 *                   description: اطلاعات فرم به‌روزرسانی شده
 *                   # Include properties of the updated form object
 *       404:
 *         description: فرم پیدا نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم پیدا نشد"
 *       500:
 *         description: خطا در به‌روزرسانی فرم
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطا در به‌روزرسانی فرم"
 */

/**
 * @swagger
 * /formAdv/evaluation-form/{id}:
 *   delete:
 *     summary: حذف فرم بر اساس ID
 *     tags:
 *       - FormAdv
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID فرم
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: فرم با موفقیت حذف شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم با موفقیت حذف شد"
 *       404:
 *         description: فرم پیدا نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "فرم پیدا نشد"
 *       500:
 *         description: خطا در حذف فرم
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطا در حذف فرم"
 */

/**
 * @swagger
 * /formAdv/evaluation-forms:
 *   get:
 *     summary: دریافت همه فرم‌ها با صفحه‌بندی
 *     tags:
 *       - FormAdv
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: شماره صفحه (پیش‌فرض ۱)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: تعداد فرم‌ها در هر صفحه (پیش‌فرض ۱۰)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: لیستی از فرم‌ها به همراه اطلاعات صفحه‌بندی
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalForms:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 forms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "form123"
 *                       name:
 *                         type: string
 *                         example: "فرم ارزیابی"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-01T12:00:00Z"
 *       500:
 *         description: خطا در دریافت فرم‌ها
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خطا در دریافت فرم‌ها"
 */
