// src/server.ts
import 'zone.js/node';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { platformServer } from '@angular/platform-server';
import { AppServerModule } from './app/app.module.server';
import { DOCUMENT } from '@angular/common';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const distFolder = join(__dirname, '../browser');
const indexHtml = join(distFolder, 'index.html');

// Serve static files
app.use(express.static(distFolder, { maxAge: '1y' }));

// SSR for all other routes (Express 5 requires '/*' instead of '*')
app.get('/*', async (req, res, next) => {
  try {
    // Read template
    const template = readFileSync(indexHtml).toString();

    // Bootstrap Angular AppServerModule
    const moduleRef = await platformServer().bootstrapModule(AppServerModule);

    // Get DOCUMENT to render full HTML
    const document = moduleRef.injector.get(DOCUMENT);
    const html = template.replace(
      '<app-root></app-root>',
      document.documentElement.outerHTML
    );

    res.status(200).send(html);
  } catch (err) {
    console.error('❌ SSR Error:', err);
    next(err);
  }
});

// Start server
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`✅ Angular SSR server running at http://localhost:${port}`);
});
