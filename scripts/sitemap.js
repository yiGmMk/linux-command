const path = require('path');
const fs = require('fs-extra');
const SitemapGenerator = require('sitemap-generator');

const xmlFile = path.join(process.cwd(), '.deploy/sitemap.xml')
const generator = SitemapGenerator('https://linux.programnotes.cn', {
  maxDepth: 0,
  filepath: xmlFile,
  maxEntriesPerFile: 50000,
  stripQuerystring: true,
  decodeResponses: true,
});

// register event listeners
generator.on('done', async () => {
  const str = await fs.readFileSync(xmlFile);
  const newStr = str.toString();
  await fs.outputFile(xmlFile, newStr);
  console.log('sitemaps created!')
});

// start the crawler
generator.start();