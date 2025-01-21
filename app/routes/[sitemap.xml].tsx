export const loader = () => {
  const content = `
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>https://cvrsnap.com/</loc>
	<lastmod>2025-01-21T17:28:53+01:00</lastmod>
	<priority>1.0</priority>
</url>
<url>
	<loc>https://cvrsnap.com/create</loc>
	<lastmod>2025-01-21T17:28:53+01:00</lastmod>
	<priority>1.0</priority>
</url>
</urlset>
   `;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8'
    }
  });
};
