import { test, expect } from '@fixtures/base.fixture';
import { sampleArticleFashion } from '@data/article.model';
import { SAMPLE_COMMENT } from '@data/comment.model';

test('Verify article title, author, and published date', async ({ articlePage }) => {
    const ARTICLE_DATA = sampleArticleFashion;

    await articlePage.navigateToArticleViaURL(ARTICLE_DATA.id);
    await expect(articlePage.title).toBeVisible();
    await expect(articlePage.author).toBeVisible();

    await expect(await articlePage.getTitle()).toBe(ARTICLE_DATA.title);
    await expect(await articlePage.getAuthor()).toBe(ARTICLE_DATA.author);
    await expect(await articlePage.getDate()).toStrictEqual(ARTICLE_DATA.date);
})

test("Verify user can add comment into an article", async ({ articlePage }) => {
    const ARTICLE_DATA = sampleArticleFashion;
    const COMMENT_DATA = SAMPLE_COMMENT;

    await articlePage.navigateToArticleViaURL(ARTICLE_DATA.id);
    await articlePage.addComment(COMMENT_DATA);
    await expect(articlePage.commentSuccessMessage).toBeVisible();
    await expect(await articlePage.getSuccessCommentMessage())
        .toContain("Thank you for your comment. It has been submitted to the webmaster for approval.");
})