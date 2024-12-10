const autoBind = require("auto-bind");
const WeblogModel = require("../weblog/weblog.model");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");  // اضافه کردن این خط برای وارد کردن mongoose

class CommentService {
    #model;
    #userModel;

    constructor() {
        autoBind(this);
        this.#model = WeblogModel;
        this.#userModel = UserModel;
    }

    async addCommentToBlog(blogId, userId, commentContent, parentCommentId = null) {
        // پیدا کردن وبلاگ مورد نظر
        const blog = await this.#model.findById(blogId);
        if (!blog) {
            throw new createHttpError.NotFound("وبلاگ یافت نشد");
        }

        // پیدا کردن کاربر مورد نظر
        const user = await this.#userModel.findById(userId);
        if (!user) {
            throw new createHttpError.NotFound("کاربر یافت نشد");
        }

        // ساخت کامنت جدید
        const newComment = {
            userId: user._id,
            userName: user.fullName || user.fullNameEnglish || user.email || "ناشناس", // اطمینان از وجود userName
            content: commentContent,
            datePosted: new Date(),
            isVisible: false,
            answers: [],
        };

        if (parentCommentId) {
            // بررسی وجود کامنت والد
            const parentComment = blog.comments.id(parentCommentId);
            if (!parentComment) {
                throw new createHttpError.NotFound("کامنت والد یافت نشد");
            }
            parentComment.answers.push(newComment); // افزودن پاسخ به کامنت والد
        } else {
            blog.comments.push(newComment); // افزودن کامنت جدید به وبلاگ
        }

        // ذخیره وبلاگ به همراه کامنت‌های جدید
        await blog.save();

        // استخراج کامنت ذخیره‌شده
        const savedComment = parentCommentId
            ? blog.comments.id(parentCommentId).answers.at(-1)
            : blog.comments.at(-1);

        // بازگشت اطلاعات کامنت جدید
        return {
            idComment: savedComment._id,
            userId: savedComment.userId,
            userName: savedComment.userName,
            content: savedComment.content,
            datePosted: savedComment.datePosted,
            answers: savedComment.answers,
        };
    }

    async answersComment(weblogId, commentId, content, userId, responseId) {
        // بررسی و یافتن وبلاگ
        const weblog = await this.#model.findById(weblogId);
        if (!weblog) throw new createHttpError.NotFound("وبلاگ یافت نشد");

        // بررسی و یافتن کاربر
        const user = await this.#userModel.findById(userId);
        if (!user) throw new createHttpError.NotFound("کاربر یافت نشد");

        // تابع بازگشتی برای جستجوی کامنت یا پاسخ درختی
        const findComment = (comments, id) => {
            for (const comment of comments) {
                if (comment._id.equals(id)) return comment;
                const found = findComment(comment.answers, id);
                if (found) return found;
            }
            return null;
        };

        // یافتن کامنت والد
        const parentComment = findComment(weblog.comments, commentId);
        if (!parentComment) throw new createHttpError.NotFound("کامنت یا پاسخ یافت نشد");

        // ساخت پاسخ جدید با بررسی مقداردهی صحیح
        const newAnswer = {
            userId: user._id,
            userName: user.fullName?.trim() || user.fullNameEnglish?.trim() || user.email || "ناشناس",
            content,
            datePosted: new Date(),
            isVisible: false,
            answers: [],
        };

        // اطمینان از اینکه userId به درستی مقداردهی شده است
        if (!newAnswer.userId) {
            throw new createHttpError.BadRequest("شناسه کاربر نامعتبر است");
        }

        // اضافه کردن پاسخ جدید به پاسخ یا کامنت اصلی
        if (responseId) {
            const responseComment = findComment(parentComment.answers, responseId);
            if (!responseComment) throw new createHttpError.NotFound("پاسخ والد یافت نشد");
            responseComment.answers.push(newAnswer);
        } else {
            parentComment.answers.push(newAnswer);
        }

        // ذخیره تغییرات در وبلاگ
        await weblog.save();

        return {
            parentComment: {
                _id: parentComment._id,
                content: parentComment.content,
                answers: parentComment.answers,
            },
            newAnswer,
        };
    }

    async toggleVisibility(weblogId, commentId, { isVisible, responseId }) {
        const filter = responseId
            ? { _id: weblogId, "comments.answers._id": responseId }
            : { _id: weblogId, "comments._id": commentId };

        const update = responseId
            ? { "comments.$[].answers.$[answer].isVisible": isVisible }
            : { "comments.$.isVisible": isVisible };

        const options = {
            arrayFilters: responseId ? [{ "answer._id": responseId }] : undefined,
            new: true,
        };

        // به‌روزرسانی کامنت یا پاسخ
        const weblog = await this.#model.findOneAndUpdate(filter, { $set: update }, options)
            .populate("comments.userId", "fullName fullNameEnglish email");

        if (!weblog) {
            throw new createHttpError.NotFound("کامنت یا پاسخ یافت نشد");
        }

        return {
            message: "وضعیت دیدن کامنت یا پاسخ با موفقیت تغییر کرد",
            isVisible,
        };
    }

    async removeComment(weblogId, commentId, responseId = null) {
        const weblog = await this.#model.findById(weblogId);
        if (!weblog) throw new createHttpError.NotFound("وبلاگ یافت نشد");

        // تبدیل commentId به ObjectId
        const commentObjectId = new mongoose.Types.ObjectId(commentId); // استفاده از new برای ایجاد ObjectId


        // چاپ تمام کامنت‌ها برای بررسی


        // بررسی دقیق وجود commentId در میان کامنت‌ها
        const commentIndex = weblog.comments.findIndex((comment) => comment._id.equals(commentObjectId));
        if (commentIndex === -1) {

            throw new createHttpError.NotFound("کامنت یافت نشد");
        }

        if (responseId) {
            // حذف پاسخ از داخل یک کامنت
            const parentComment = weblog.comments[commentIndex];
            const responseIndex = parentComment.answers.findIndex(
                (answer) => answer._id.toString() === responseId
            );
            if (responseIndex === -1) throw new createHttpError.NotFound("پاسخ یافت نشد");

            parentComment.answers.splice(responseIndex, 1);
        } else {
            // حذف کامنت اصلی
            weblog.comments.splice(commentIndex, 1);
        }

        // ذخیره تغییرات در پایگاه داده
        await weblog.save();
        return weblog;
    }

    async getCommentsForWeblog(weblogId) {
        const weblog = await this.#model.findById(weblogId)
            .populate({
                path: "comments.userId",
                select: "fullName fullNameEnglish"
            })
            .populate({
                path: "comments.answers.userId",
                select: "fullName fullNameEnglish"
            })
            .exec();

        if (!weblog) {
            throw new createHttpError.NotFound("وبلاگ یافت نشد");
        }

        // بررسی داده‌های populate شده


        const flattenAnswers = (answers, parentCommentId, parentUserName) => {
            const flatAnswers = [];

            answers.forEach((response) => {
                flatAnswers.push({
                    commentId: response._id,
                    userName: response.userId?.fullName || response.userId?.fullNameEnglish || "ناشناس",
                    content: response.content,
                    datePosted: response.datePosted,
                    isVisible: response.isVisible,
                    isResponse: true,
                    parentCommentId: parentCommentId,
                    parentUserName: parentUserName || "ناشناس",
                });

                if (response.answers && response.answers.length > 0) {
                    flatAnswers.push(
                        ...flattenAnswers(
                            response.answers,
                            response._id,
                            response.userId?.fullName || response.userId?.fullNameEnglish || "ناشناس"
                        )
                    );
                }
            });

            return flatAnswers;
        };

        const commentsWithAnswers = weblog.comments.map((comment) => {
            const flatAnswers = flattenAnswers(
                comment.answers,
                comment._id,
                comment.userId?.fullName || comment.userId?.fullNameEnglish || "ناشناس"
            );

            return {
                commentId: comment._id,
                userName: comment.userId?.fullName || comment.userId?.fullNameEnglish || "ناشناس",
                content: comment.content,
                datePosted: comment.datePosted,
                isVisible: comment.isVisible,
                isResponse: false,
                answers: flatAnswers,
            };
        });

        return commentsWithAnswers;
    }

    async getAllComments(page = 1, limit = 10) {
        page = Math.max(page, 1);
        limit = Math.max(limit, 1);
        const skip = (page - 1) * limit;

        try {
            // شمارش کل کامنت‌ها و پاسخ‌ها
            const totalComments = await this.#model.aggregate([
                { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        total: {
                            $add: [
                                1,
                                { $size: { $ifNull: ["$comments.answers", []] } }
                            ],
                        },
                    },
                },
                { $group: { _id: null, count: { $sum: "$total" } } },
            ]);

            const total = totalComments.length ? totalComments[0].count : 0;
            const totalPages = Math.ceil(total / limit);

            if (total === 0 || page > totalPages) {
                throw new createHttpError.NotFound("صفحه مورد نظر خالی است");
            }

            // بارگذاری وبلاگ‌ها و کامنت‌ها
            const blogs = await this.#model
                .find()
                .populate({
                    path: "comments.userId",
                    select: "fullName fullNameEnglish email",
                })
                .populate({
                    path: "comments.answers.userId",
                    select: "fullName fullNameEnglish email",
                })
                .skip(skip)
                .limit(limit)
                .exec();

            const allComments = [];

            // استخراج کامنت‌ها و پاسخ‌ها به صورت بازگشتی
            const extractComments = (comments, blogId, blogTitle, parentCommentId = null, parentUserName = null) => {
                comments.forEach((comment) => {
                    const userId = comment.userId?._id || null;
                    const userName = comment.userId?.fullName || comment.userId?.fullNameEnglish || "ناشناس";

                    // افزودن کامنت یا پاسخ به آرایه فلت
                    allComments.push({
                        blogId,
                        blogTitle,
                        commentId: comment._id,
                        parentCommentId,
                        parentUserName,
                        userId,
                        userName,
                        content: comment.content,
                        datePosted: comment.datePosted,
                        isVisible: comment.isVisible,
                        isResponse: !!parentCommentId,
                    });

                    // جستجوی بازگشتی برای پاسخ‌ها
                    if (comment.answers && comment.answers.length > 0) {
                        extractComments(comment.answers, blogId, blogTitle, comment._id, userName);
                    }
                });
            };

            // پردازش داده‌های وبلاگ و کامنت‌ها
            blogs.forEach((blog) => {
                const blogId = blog._id;
                const blogTitle = blog.localizedContent.find((content) => content.language === "fa")?.title || "بدون عنوان";
                extractComments(blog.comments, blogId, blogTitle);
            });

            return {
                message: "تمامی کامنت‌ها با موفقیت دریافت شدند",
                data: allComments,  // اضافه شدن data در پاسخ
                currentPage: page,
                totalPages,
                totalComments: total,
            };
        } catch (error) {
            console.error("Error fetching comments:", error);
            throw new createHttpError.InternalServerError("مشکلی در دریافت کامنت‌ها پیش آمده است");
        }
    }



}

module.exports = new CommentService();
