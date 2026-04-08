const fs = require('fs');
const path = require('path');

describe('System Design Interview Prep - Content Validation', () => {
  const docsDir = path.resolve(__dirname, '../../docs');
  const rootDir = path.resolve(__dirname, '../..');

  describe('Documentation structure', () => {
    it('has a NOTES.md with study content', () => {
      const content = fs.readFileSync(path.join(rootDir, 'NOTES.md'), 'utf8');
      expect(content.length).toBeGreaterThan(500);
      expect(content).toContain('CAP Theorem');
    });

    it('has architecture documentation', () => {
      const filePath = path.join(docsDir, 'architecture', 'system-design.md');
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content.length).toBeGreaterThan(200);
    });

    it('has API documentation', () => {
      const filePath = path.join(docsDir, 'api', 'endpoints.md');
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe('Content completeness', () => {
    it('NOTES.md covers all core topics', () => {
      const content = fs.readFileSync(path.join(rootDir, 'NOTES.md'), 'utf8');
      const requiredTopics = [
        'CAP Theorem',
        'Consistent Hashing',
        'Database Scaling',
        'Rate Limiting',
        'Load Balancing',
        'Caching',
      ];
      for (const topic of requiredTopics) {
        expect(content).toContain(topic);
      }
    });

    it('all markdown files have valid headings', () => {
      const mdFiles = [
        path.join(rootDir, 'NOTES.md'),
        path.join(docsDir, 'architecture', 'system-design.md'),
        path.join(docsDir, 'api', 'endpoints.md'),
      ];
      for (const file of mdFiles) {
        const content = fs.readFileSync(file, 'utf8');
        expect(content).toMatch(/^#\s+.+/m);
      }
    });

    it('no placeholder images remain', () => {
      const walk = (dir) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
            walk(fullPath);
          } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            expect(content).not.toContain('placehold.co');
          }
        }
      };
      walk(rootDir);
    });
  });
});
