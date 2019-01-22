const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('http://micheleandrosa.wedding', {
  stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});

// start the crawler
generator.start();