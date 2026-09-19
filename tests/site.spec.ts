import { test, expect } from "@playwright/test";
import { scenes, DURATION, FPS } from "../src/content";

test("30-second timeline keeps seven seconds for the QR", () => {
  expect(DURATION / FPS).toBe(30);
  let end = 0;
  for (const scene of scenes) {
    expect(scene.start).toBe(end);
    end += scene.seconds;
  }
  expect(end).toBe(30);
  expect(scenes.at(-1)?.seconds).toBe(7);
});

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
  for (const [chapter, file] of [
    ["00:00 Meet Sera", "3"],
    ["00:04 Swap", "0"],
    ["00:10 Confirm", "1"],
    ["00:17 Verify", "2"],
  ]) {
    await page.getByRole("button", { name: chapter }).click();
    const capture = page.locator(".screen-frame img");
    await expect(capture).toHaveAttribute(
      "src",
      new RegExp(`screen_shot/${file}\\.jpg$`),
    );
    await expect
      .poll(() =>
        capture.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.getByRole("button", { name: "00:17 Verify" }).click();
  await expect(
    page.getByRole("heading", { name: "Match off-chain. Settle on-chain." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Booth mode" }).click();
  await expect(page.locator(".nav")).toBeHidden();
  await page.getByRole("button", { name: "Exit booth mode" }).click();
  await expect(
    page.getByRole("link", { name: "Open Sera community" }),
  ).toHaveAttribute("href", "https://t.me/seraprotocol");
  await page.getByRole("button", { name: "00:23 Let’s connect" }).click();
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
  await page.getByRole("button", { name: "00:00 Meet Sera" }).click();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `out/${info.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
