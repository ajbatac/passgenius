import { NextResponse } from 'next/server';

export async function GET() {
  const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>PassGenius Changelog</title>
  <link>https://passgenius.techhive.net/changelog</link>
  <description>Recent updates for PassGenius - Securing your digital world, locally.</description>
  <language>en-us</language>
  <lastBuildDate>Sun, 29 Mar 2026 16:42:00 +0000</lastBuildDate>
  <atom:link href="https://passgenius.techhive.net/changelog/rss" rel="self" type="application/rss+xml" />

  <item>
    <title>Version 0.3.0 - Bookmarklet Sidebar &amp; UI Polish</title>
    <link>https://passgenius.techhive.net/changelog</link>
    <guid isPermaLink="false">passgenius-0-3-0</guid>
    <pubDate>Sun, 29 Mar 2026 16:42:00 +0000</pubDate>
    <description><![CDATA[
      <ul>
        <li><strong>Bookmarklet Sidebar:</strong> Added a new Sidebar Bookmarklet feature that opens PassGenius in a persistent sidebar on any website.</li>
        <li><strong>Improved Contrast:</strong> Enhanced the visibility of footer text, legal links, and author credits across the entire application.</li>
        <li><strong>UI Refinements:</strong> Integrated the "Drag to Bar" indicator directly into the bookmarklet card with a sleek curved arrow and micro-animations.</li>
        <li><strong>Author Attribution:</strong> Added official author credit and personal website link in the support section.</li>
        <li><strong>SEO Meta-Files:</strong> Added robots.txt, sitemap.xml, and rss.xml for better search engine discoverability.</li>
      </ul>
    ]]></description>
  </item>

  <item>
    <title>Version 0.2.0 - Security &amp; Privacy Focus</title>
    <link>https://passgenius.techhive.net/changelog</link>
    <guid isPermaLink="false">passgenius-0-2-0</guid>
    <pubDate>Sat, 21 Mar 2026 12:00:00 +0000</pubDate>
    <description><![CDATA[
      <ul>
        <li><strong>Absolute Local Security:</strong> Emphasized our commitment to local processing. We've refined our messaging to ensure you know your data never touches the cloud.</li>
        <li><strong>Redesigned Legal Pages:</strong> Upgraded our legal documents with a continuous, unified cyber-futuristic theme.</li>
        <li><strong>Polished Interface Text:</strong> Refined wording throughout the app to match our premium aesthetic.</li>
        <li><strong>Social Sharing:</strong> Added high-quality previews that look beautiful when you share PassGenius on social media.</li>
      </ul>
    ]]></description>
  </item>

  <item>
    <title>Version 0.1 - Initial Launch</title>
    <link>https://passgenius.techhive.net/changelog</link>
    <guid isPermaLink="false">passgenius-0-1-0</guid>
    <pubDate>Wed, 05 Mar 2026 09:00:00 +0000</pubDate>
    <description><![CDATA[
      <ul>
        <li><strong>Smart Suggestions:</strong> AI-powered password recommendations based on website categories.</li>
        <li><strong>Cyber-Futuristic UI:</strong> Completely redesigned modern, clean interface with dark/light mode toggle.</li>
        <li><strong>Multi-Password Generation:</strong> Generate four distinct password options instantly.</li>
        <li><strong>Responsive Layout:</strong> Optimized for cross-device usage.</li>
      </ul>
    ]]></description>
  </item>
</channel>
</rss>`;

  return new NextResponse(rssContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
