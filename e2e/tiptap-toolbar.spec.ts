import { test, expect } from "@playwright/test";

test.describe("TipTap toolbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/posts/new");
    await expect(page.locator(".ProseMirror").first()).toBeVisible();
  });

  async function editor(page: import("@playwright/test").Page) {
    return page.locator(".ProseMirror").first();
  }

  async function clickToolbar(page: import("@playwright/test").Page, label: string) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }

  test("bold applies to selection", async ({ page }) => {
    const ed = await editor(page);
    await ed.click();
    await page.keyboard.type("bold text");
    await page.keyboard.press("Control+a");
    await clickToolbar(page, "Bold");
    await expect(ed.locator("strong")).toHaveText("bold text");
  });

  test("heading 2 toggles", async ({ page }) => {
    const ed = await editor(page);
    await ed.click();
    await page.keyboard.type("My heading");
    await page.keyboard.press("Control+a");
    await clickToolbar(page, "Heading 2");
    await expect(ed.locator("h2")).toHaveText("My heading");
  });

  test("bullet list toggles", async ({ page }) => {
    const ed = await editor(page);
    await ed.click();
    await page.keyboard.type("item one");
    await clickToolbar(page, "Bullet list");
    await expect(ed.locator("ul li")).toHaveCount(1);
  });

  test("undo after typing", async ({ page }) => {
    const ed = await editor(page);
    await ed.click();
    await page.keyboard.type("remove me");
    await expect(ed).toContainText("remove me");
    await clickToolbar(page, "Undo");
    await expect(ed).not.toContainText("remove me");
  });

  test("code block toggles", async ({ page }) => {
    const ed = await editor(page);
    await ed.click();
    await page.keyboard.type("const x = 1");
    await page.keyboard.press("Control+a");
    await clickToolbar(page, "Code block");
    await expect(ed.locator("pre code")).toHaveText("const x = 1");
  });
});
