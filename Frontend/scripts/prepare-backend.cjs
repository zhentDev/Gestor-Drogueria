const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const backendSrc = path.resolve(__dirname, '../../Backend');
const buildDir = path.resolve(__dirname, '../backend-build');

// Clean build dir
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir);

// Files to copy (whitelist to avoid junk)
const filesToCopy = ['bin', 'database', 'app.js', 'package.json', 'package-lock.json', '.env']; // Add folders/files as needed. Assuming .env might be needed or generated.

console.log('Copying backend files...');

// Helper to copy recursive
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    if (exists) fs.copyFileSync(src, dest);
  }
}

// Copy whitelist
filesToCopy.forEach(file => {
  const srcPath = path.join(backendSrc, file);
  const destPath = path.join(buildDir, file);
  if (fs.existsSync(srcPath)) {
      copyRecursiveSync(srcPath, destPath);
  } else {
      console.log(`Warning: ${file} not found in backend source.`);
  }
});

console.log('Installing production dependencies...');
try {
  execSync('npm install --production', { cwd: buildDir, stdio: 'inherit' });
  console.log('Backend prepared successfully in backend-build');
} catch (e) {
  console.error('Failed to install backend dependencies', e);
  process.exit(1);
}
