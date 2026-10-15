import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const images = [
  { input: 'projects/nexora.png', output: 'projects/nexora.webp' },
  { input: 'projects/aether.png', output: 'projects/aether.webp' },
  { input: 'projects/vertex.png', output: 'projects/vertex.webp' },
  { input: 'og-image.png', output: 'og-image.webp' }
];

const htmlContent = `
<!DOCTYPE html>
<html>
<head><title>Convert</title></head>
<body>
<canvas id="c"></canvas>
<script>
async function processAll() {
  const list = ${JSON.stringify(images)};
  for (const item of list) {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        const c = document.getElementById('c');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        c.toBlob(async (blob) => {
          if (!blob) {
            resolve();
            return;
          }
          await fetch('/save?file=' + encodeURIComponent(item.output), {
            method: 'POST',
            body: blob
          });
          resolve();
        }, 'image/webp', 0.82);
      };
      img.onerror = () => resolve();
      img.src = '/file?file=' + encodeURIComponent(item.input);
    });
  }
  await fetch('/done');
}
processAll();
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:8999');
  
  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }
  
  if (url.pathname === '/file') {
    const rel = url.searchParams.get('file');
    const full = path.join(publicDir, rel);
    if (fs.existsSync(full)) {
      res.writeHead(200);
      fs.createReadStream(full).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end();
    return;
  }
  
  if (url.pathname === '/save') {
    const rel = url.searchParams.get('file');
    const full = path.join(publicDir, rel);
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      fs.writeFileSync(full, buf);
      console.log('Saved:', rel, '(' + Math.round(buf.length / 1024) + ' KB)');
      res.writeHead(200);
      res.end('OK');
    });
    return;
  }
  
  if (url.pathname === '/done') {
    console.log('All conversions complete!');
    res.writeHead(200);
    res.end('DONE');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
    return;
  }
  
  res.writeHead(404);
  res.end();
});

server.listen(8999, () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chromePath}" --headless --disable-gpu http://localhost:8999/`, (err) => {
    if (err) {
      console.error('Headless chrome exec:', err);
    }
  });
});
