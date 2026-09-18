import { test, expect } from "@playwright/test";
test("event journey: no overflow, playable film, chapter and contact", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await expect(
    page
      .getByRole("heading", { name: "Money moves. Currencies differ." })
      .first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Watch the story" }).click();
  await page.getByRole("button", { name: "00:17 Meet Sera" }).click();
  await expect(
    page.getByRole("heading", { name: "Match off-chain. Settle on-chain." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Booth mode" }).click();
  await expect(page.locator(".nav")).toBeHidden();
  await page.getByRole("button", { name: "Exit booth mode" }).click();
  await expect(
    page.getByRole("link", { name: "Open Sera community" }),
  ).toHaveAttribute("href", "https://t.me/seraprotocol");
  await page.getByRole("button", { name: "00:43 Let’s connect" }).click();
  await expect(page.locator(".video-qr img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images: HTMLImageElement[]) =>
          images
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.src),
        ),
    )
    .toEqual([]);
  const qr = await page.request.get("share-qr.svg");
  expect(qr.ok()).toBe(true);
  expect(await qr.text()).toContain("<svg");
  await page.getByRole("button", { name: "Share this story" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "00:00 The opportunity" }).click();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `out/${info.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
