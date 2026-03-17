import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { parseCustomDate } from "helpers/date.helper";
import { IComment } from "@models/comment.model";

export class ArticlePage extends BasePage {
    readonly title: Locator;
    readonly extrasInfo: Locator; ///span[contains(@class,'extra-author')]
    readonly author: Locator;
    readonly commentName: Locator;
    readonly commentEmail: Locator;
    readonly commentContent: Locator;
    readonly commentSuccessMessage: Locator;
    readonly commentSubmitBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator("h1.h1");
        this.extrasInfo = this.page.locator("span[class*='extra-author']");
        this.commentName = this.page.locator("input[name='name']");
        this.commentEmail = this.page.locator("input[name='email']");
        this.commentContent = this.page.locator("#input-comment");
        this.author = this.page.locator("a.author");
        this.commentSuccessMessage = this.page.locator("div[class*='alert-success']");
        this.commentSubmitBtn = this.page.locator("#button-comment");
    }

    async getAuthor(): Promise<string> {
        return await this.author.textContent()
    }

    async getTitle(): Promise<string> {
        return await this.title.textContent()
    }

    async getDate(): Promise<Date> {
        const extrasText = await this.extrasInfo.textContent();
        const dateMatch = extrasText?.match(/\s*-\s*(.+)/);;
        if (dateMatch && dateMatch[1]) {
            const parsedDate = parseCustomDate(dateMatch[1]);
            return parsedDate;
        }
        throw new Error("Published date not found or in unexpected format");
    }

    async addComment(comment: IComment) {
        await this.commentName.fill(comment.name);
        await this.commentEmail.fill(comment.email);
        await this.commentContent.fill(comment.content);

        await this.commentSubmitBtn.click();
    }

    async getSuccessCommentMessage() {
        return await this.commentSuccessMessage.textContent();
    }
}