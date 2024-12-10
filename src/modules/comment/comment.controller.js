const autoBind = require("auto-bind");
const CommentService = require("./comment.service");
const HttpCodes = require("http-codes");
const dotenv = require("dotenv");
dotenv.config();

class CommentController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = CommentService;
    }

    async addComment(req, res) {
        try {
            const blogId = req.params.id; // دریافت ID وبلاگ از پارامتر مسیر
            const { content, parentCommentId } = req.body; // دریافت محتوای کامنت و ID والد (در صورت وجود)
            const userId = req.user?._id; // استخراج userId از توکن

            // بررسی اعتبار داده‌های ارسالی
            if (!userId) {
                throw new createHttpError.BadRequest("User ID is required.");
            }
            if (!content) {
                throw new createHttpError.BadRequest("Content is required.");
            }


            // افزودن کامنت به وبلاگ یا پاسخ به کامنت والد
            const newComment = await this.#service.addCommentToBlog(
                blogId,
                userId,
                content,
                parentCommentId
            );

            res.status(200).json({
                message: "کامنت با موفقیت درج شد و بعد از تایید نشان داده می‌شود",
                comment: newComment,
            });
        } catch (error) {
            // مدیریت خطاهای شناخته‌شده و عمومی
            if (
                error.message === "وبلاگ یافت نشد" ||
                error.message === "کاربر یافت نشد" ||
                error.message === "کامنت والد یافت نشد"
            ) {
                res.status(404).json({ success: false, message: error.message });
            } else {
                console.error('Error:', error); // لاگ کردن خطا برای اشکال‌زدایی
                res.status(400).json({ success: false, message: "خطا در درج کامنت", error: error.message });
            }
        }
    }

    async answersComment(req, res, next) {
        try {
            const { id: weblogId, commentId } = req.params;
            const { content, responseId } = req.body;
            const userId = req.user._id;

            // بررسی صحت ورودی‌ها
            if (!content) {
                return res.status(400).json({ message: "محتوای پاسخ نمی‌تواند خالی باشد" });
            }

            // فراخوانی سرویس برای افزودن پاسخ
            const { parentComment, newAnswer } = await this.#service.answersComment(
                weblogId,
                commentId,
                content,
                userId,
                responseId
            );

            return res.status(200).json({
                message: "جواب شما درج شد و بعد از تأیید نشان داده می‌شود",
                newAnswer,
            });
        } catch (error) {
            next(error);
        }
    }

    async toggleVisibility(req, res, next) {
        try {
            const { weblogId, commentId } = req.params;
            const { isVisible, responseId } = req.body;

            const result = await this.#service.toggleVisibility(weblogId, commentId, {
                isVisible,
                responseId,
            });

            res.status(200).json(result);
        } catch (error) {
            console.error("خطا در تغییر وضعیت:", error.message);
            next(error);
        }
    }

    async removeComment(req, res, next) {
        try {
            const { weblogId, commentId } = req.params;
            const { responseId } = req.body; // responseId اختیاری است

            console.log("weblogId",weblogId)
            console.log("commentId",commentId)

            // فراخوانی سرویس برای حذف کامنت
             await this.#service.removeComment(weblogId, commentId, responseId);

            res.status(200).json({
                message: "کامنت با موفقیت حذف شد."
            });
        } catch (error) {
            next(error); // ارسال خطا به میدلور عمومی برای هندل کردن
        }
    }

    async getComments(req, res, next) {
        try {
            const {id} = req.params;

            // دریافت کامنت‌ها از سرویس
            const comments = await this.#service.getCommentsForWeblog(id);

            // ارسال پاسخ
            return res.status(HttpCodes.OK).json({
                data: comments,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllComments(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // اطمینان از اینکه limit مثبت باشد
            if (limit <= 0) {
                throw new createHttpError.BadRequest("مقدار limit باید بزرگتر از ۰ باشد");
            }

            // دریافت نتیجه از سرویس
            const result = await this.#service.getAllComments(page, limit);

            return res.status(HttpCodes.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentController();
