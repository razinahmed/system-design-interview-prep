const fs = require('fs');
const path = require('path');

describe('System Design Interview Prep - Content Unit Tests', () => {
  const rootDir = path.resolve(__dirname, '../..');

  describe('NOTES.md formatting', () => {
    let content;

    beforeAll(() => {
      content = fs.readFileSync(path.join(rootDir, 'NOTES.md'), 'utf8');
    });

    it('starts with a level-1 heading', () => {
      expect(content.trimStart()).toMatch(/^# /);
    });

    it('uses level-2 headings for main topics', () => {
      const h2Matches = content.match(/^## .+/gm);
      expect(h2Matches.length).toBeGreaterThanOrEqual(5);
    });

    it('uses bullet points for sub-items', () => {
      const bulletMatches = content.match(/^- .+/gm);
      expect(bulletMatches.length).toBeGreaterThanOrEqual(10);
    });

    it('does not contain TODO or placeholder markers', () => {
      expect(content).not.toMatch(/TODO/i);
      expect(content).not.toMatch(/placeholder/i);
      expect(content).not.toMatch(/lorem ipsum/i);
    });

    it('mentions real technologies and systems', () => {
      const techKeywords = ['DynamoDB', 'Cassandra', 'Kafka', 'Redis', 'Nginx'];
      const found = techKeywords.filter(kw => content.includes(kw));
      expect(found.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Documentation files', () => {
    it('system-design.md has multiple sections', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'docs', 'architecture', 'system-design.md'),
        'utf8'
      );
      const headings = content.match(/^## .+/gm) || [];
      expect(headings.length).toBeGreaterThanOrEqual(3);
    });

    it('endpoints.md contains table formatting', () => {
      const content = fs.readFileSync(
        path.join(rootDir, 'docs', 'api', 'endpoints.md'),
        'utf8'
      );
      expect(content).toContain('|');
      expect(content).toContain('---');
    });

    it('no files contain the generic stub content', () => {
      const stubPatterns = [
        '142 Assertions passed',
        'Enterprise Architecture',
        'Triggers main operational payload',
      ];
      const files = [
        path.join(rootDir, 'docs', 'api', 'endpoints.md'),
        path.join(rootDir, 'docs', 'architecture', 'system-design.md'),
      ];
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of stubPatterns) {
          expect(content).not.toContain(pattern);
        }
      }
    });
  });
});
