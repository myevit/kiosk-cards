import { buildSync } from 'esbuild';
import type { Page } from '@playwright/test';

// Exercise current TypeScript without rebuilding or modifying release artifacts.
let bundle: string;
export async function useBlindEditorSource(page: Page) {
  bundle ??= buildSync({entryPoints:['src/index.ts'],bundle:true,format:'esm',target:'es2022',write:false}).outputFiles[0].text;
  await page.route('**/dist/kiosk-cards.js', route => route.fulfill({contentType:'text/javascript',body:bundle}));
}
