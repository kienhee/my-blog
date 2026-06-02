import { test, expect } from "@playwright/test";

test.describe("Dashboard CMS", () => {
  test("hashtags: off-canvas create drawer", async ({ page }) => {
    await page.goto("/dashboard/hashtags");
    await expect(page.getByRole("heading", { name: "Hashtags" })).toBeVisible();

    await page.getByRole("button", { name: "Thêm mới" }).click();
    await expect(page.getByRole("heading", { name: "Create Hashtag" })).toBeVisible();

    const slug = `e2e-tag-${Date.now()}`;
    await page.getByPlaceholder("Title").fill(`E2E ${slug}`);
    await page.getByPlaceholder("Slug").fill(slug);
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText(`E2E ${slug}`)).toBeVisible({ timeout: 5000 });
  });

  test("posts new: TipTap typing, no duplicate link warning", async ({ page }) => {
    const consoleWarnings: string[] = [];
    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("Duplicate extension") || text.includes("hydration")) {
        consoleWarnings.push(text);
      }
    });

    await page.goto("/dashboard/posts/new");
    await expect(page.getByRole("heading", { name: "New Post" })).toBeVisible();
    await expect(page.locator(".ProseMirror").first()).toBeVisible();

    await page.getByPlaceholder("Post title").fill("E2E Test Post");
    await page.getByPlaceholder("Slug").fill("e2e-test-post");

    const editor = page.locator(".ProseMirror").first();
    await editor.click();
    await page.keyboard.type("Hello from Playwright E2E test.");
    await expect(editor).toContainText("Hello from Playwright");

    expect(consoleWarnings).toEqual([]);
  });

  test("posts list and new post link", async ({ page }) => {
    await page.goto("/dashboard/posts");
    await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
    await expect(page.getByRole("link", { name: "New Post" })).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("categories page and drawer", async ({ page }) => {
    await page.goto("/dashboard/categories");
    await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
    await page.getByRole("button", { name: "Thêm mới" }).click();
    await expect(page.getByRole("heading", { name: "Create Category" })).toBeVisible();
  });

  test("post edit page loads", async ({ page }) => {
    await page.goto("/dashboard/posts");
    const editLink = page.getByRole("link", { name: /edit/i }).first();
    if (await editLink.isVisible()) {
      await editLink.click();
      await expect(page.getByRole("heading", { name: /Edit Post/i })).toBeVisible();
      await expect(page.locator(".ProseMirror").first()).toBeVisible();
    }
  });
});
