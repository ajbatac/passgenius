import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passgenius.vercel.app';
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PassGenius Changelog</title>
    <link>${baseUrl}/changelog</link>
    <description>Recent updates to PassGenius.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/changelog/rss" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Version 0.2.0 (March 21, 2026)</title>
      <link>${baseUrl}/changelog</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/changelog#0.2.0</guid>
      <description>
        <![CDATA[
          <div>
            <h3>🛡️ Security & Privacy Focus</h3>
            <ul>
              <li><strong>Absolute Local Security:</strong> Emphasized our commitment to local processing. We've refined our messaging to ensure you know your data never touches the cloud.</li>
            </ul>
            <h3>🎨 UI & Design Enhancements</h3>
            <ul>
              <li><strong>Redesigned Legal Pages:</strong> Upgraded our legal documents with a continuous, unified cyber-futuristic theme.</li>
              <li><strong>Polished Interface Text:</strong> Refined wording throughout the app (like "Password Options" and "Results Vault") to match our premium aesthetic.</li>
            </ul>
            <h3>🌟 Shareability</h3>
            <ul>
              <li><strong>Social Sharing:</strong> Added high-quality previews that look beautiful when you share PassGenius on social media.</li>
            </ul>
          </div>
        ]]>
      </description>
    </item>
    <item>
      <title>Version 0.1 (March 5, 2026)</title>
      <link>${baseUrl}/changelog</link>
      <pubDate>${new Date('2026-03-05').toUTCString()}</pubDate>
      <guid>${baseUrl}/changelog#0.1</guid>
      <description>
        <![CDATA[
          <div>
            <h3>✨ New Features</h3>
            <ul>
              <li><strong>Smart Suggestions:</strong> Get smart, AI-powered password recommendations based on the type of website.</li>
              <li><strong>Fresh New Look:</strong> We've completely redesigned the app with a modern, clean interface and a cool new color scheme.</li>
              <li><strong>Dark Mode:</strong> You can now switch between light and dark themes.</li>
              <li><strong>More Choices:</strong> We now generate four password options at a time.</li>
            </ul>
            <h3>🚀 Improvements</h3>
            <ul>
              <li><strong>Better Layout:</strong> The app now uses a two-column layout.</li>
              <li><strong>Bigger Regenerate Button:</strong> We've added a large, easy-to-click button to generate new passwords.</li>
            </ul>
            <h3>🐞 Bug Fixes</h3>
            <ul>
              <li>We squashed a few minor bugs to make the app run more smoothly and fixed compatibility issues to ensure a stable experience.</li>
            </ul>
          </div>
        ]]>
      </description>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
