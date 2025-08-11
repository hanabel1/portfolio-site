const request = require('supertest');
const app = require('../server');

describe('Edge Cases and Error Handling', () => {
  describe('HTTP Methods', () => {
    it('should handle POST requests to existing routes (method not allowed)', async () => {
      const response = await request(app).post('/');
      expect(response.status).toBe(404); // Express returns 404 for unhandled methods
    });

    it('should handle PUT requests to existing routes', async () => {
      const response = await request(app).put('/about');
      expect(response.status).toBe(404);
    });

    it('should handle DELETE requests to existing routes', async () => {
      const response = await request(app).delete('/projects');
      expect(response.status).toBe(404);
    });
  });

  describe('URL variations', () => {
    it('should handle URLs with trailing slashes', async () => {
      const response = await request(app).get('/about/');
      // Express with static middleware might handle this differently
      expect([200, 404]).toContain(response.status);
    });

    it('should handle case sensitivity', async () => {
      const response = await request(app).get('/About');
      // Express with static middleware might handle this differently  
      expect([200, 404]).toContain(response.status);
    });

    it('should handle URLs with query parameters', async () => {
      const response = await request(app).get('/?query=test');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<main>');
    });

    it('should handle URLs with fragments', async () => {
      const response = await request(app).get('/projects#section1');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<h1>');
    });
  });

  describe('Static file edge cases', () => {
    it('should return 404 for non-existent CSS files', async () => {
      const response = await request(app).get('/css/nonexistent.css');
      expect(response.status).toBe(404);
    });

    it('should return 404 for non-existent image files', async () => {
      const response = await request(app).get('/images/nonexistent.jpg');
      expect(response.status).toBe(404);
    });

    it('should handle requests to public directory itself', async () => {
      const response = await request(app).get('/css/');
      expect(response.status).toBe(404);
    });
  });

  describe('Large requests', () => {
    it('should handle requests with very long URLs', async () => {
      const longPath = '/this-is-a-very-long-path-that-does-not-exist' + 'x'.repeat(500);
      const response = await request(app).get(longPath);
      expect(response.status).toBe(404);
    });
  });

  describe('Special characters in URLs', () => {
    it('should handle URLs with encoded characters', async () => {
      const response = await request(app).get('/about%20test');
      expect(response.status).toBe(404);
    });

    it('should handle URLs with special characters', async () => {
      const response = await request(app).get('/projects@test');
      expect(response.status).toBe(404);
    });
  });

  describe('Content validation edge cases', () => {
    it('should ensure all pages have DOCTYPE declaration', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.text).toMatch(/<!DOCTYPE html>/i);
      }
    });

    it('should ensure all pages have proper HTML structure', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.text).toContain('<html');
        expect(response.text).toContain('<head>');
        expect(response.text).toContain('<body>');
        expect(response.text).toContain('</html>');
      }
    });

    it('should ensure 404 page has proper structure', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('<html');
      expect(response.text).toContain('</html>');
    });
  });

  describe('Response time consistency', () => {
    it('should respond consistently across multiple requests', async () => {
      const requests = Array(5).fill().map(() => request(app).get('/'));
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.text).toContain('<main>');
      });
    });
  });
});