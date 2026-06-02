import { test, expect } from "@playwright/test";

test.describe("TipTap insert modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/posts/new");
    await expect(page.locator(".ProseMirror").first()).toBeVisible();
  });

  test("link modal inserts hyperlink", async ({ page }) => {
    const editor = page.locator(".ProseMirror").first();
    await editor.click();
    await page.keyboard.type("click here");
    await page.keyboard.press("Control+a");

    await page.getByRole("button", { name: "Link", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByLabel("URL").fill("example.com");
    await page.getByRole("button", { name: "Apply link" }).click();

    await expect(editor.locator("a")).toContainText("click here");
  });

  test("image modal inserts image", async ({ page }) => {
    await page.getByRole("button", { name: "Image", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByLabel("URL").fill("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400");
    await page.getByLabel("Alt text").fill("Laptop on desk");
    await page.getByRole("button", { name: "Insert image" }).click();

    await expect(page.locator(".ProseMirror img[alt='Laptop on desk']")).toHaveAttribute("src", /unsplash/);
  });
});
