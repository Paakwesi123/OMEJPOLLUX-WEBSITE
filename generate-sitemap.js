// generate-sitemap.js
import { writeFileSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const sitemap = new SitemapStream({ hostname: 'https://www.omejpollux.org' });

// List all important routes here
const pages = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/events',
  '/careers',
  '/contact'
];

// Add each page to the sitemap
pages.forEach((url) => sitemap.write({ url }));
sitemap.end();

streamToPromise(sitemap).then((data) => {
  writeFileSync('./dist/sitemap.xml', data.toString());
  console.log('✅ Sitemap generated at dist/sitemap.xml');
});
