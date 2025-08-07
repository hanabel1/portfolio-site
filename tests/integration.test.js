const request = require('supertest');
const app = require('../server');

describe('Integration Tests', () => {
  describe('Navigation flow', () => {
    it('should navigate from home to about page', async () => {
      // Start at home
      const homeResponse = await request(app).get('/');
      expect(homeResponse.status).toBe(200);
      expect(homeResponse.text).toContain('Welcome to My Portfolio');

      // Navigate to about
      const aboutResponse = await request(app).get('/about');
      expect(aboutResponse.status).toBe(200);
      expect(aboutResponse.text).toContain('About Me');
    });

    it('should navigate from home to projects page', async () => {
      // Start at home
      const homeResponse = await request(app).get('/');
      expect(homeResponse.status).toBe(200);

      // Navigate to projects
      const projectsResponse = await request(app).get('/projects');
      expect(projectsResponse.status).toBe(200);
      expect(projectsResponse.text).toContain('My Projects');
    });

    it('should have consistent navigation across all pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.status).toBe(200);
        
        // Check navigation elements are present
        expect(response.text).toContain('href="/"');
        expect(response.text).toContain('href="/about"');
        expect(response.text).toContain('href="/projects"');
        expect(response.text).toContain('Portfolio</a>'); // Logo
      }
    });
  });

  describe('Page layout consistency', () => {
    it('should have consistent header across all pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.status).toBe(200);
        
        // Check header elements
        expect(response.text).toContain('<header>');
        expect(response.text).toContain('<nav class="container">');
        expect(response.text).toContain('class="logo"');
        expect(response.text).toContain('class="nav-links"');
      }
    });

    it('should have consistent footer across all pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.status).toBe(200);
        
        // Check footer elements
        expect(response.text).toContain('<footer>');
        expect(response.text).toContain('All rights reserved');
        expect(response.text).toContain(new Date().getFullYear().toString());
      }
    });

    it('should include CSS and meta tags on all pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app).get(page);
        expect(response.status).toBe(200);
        
        // Check meta tags and CSS
        expect(response.text).toContain('<meta charset="UTF-8">');
        expect(response.text).toContain('<meta name="viewport"');
        expect(response.text).toContain('<link rel="stylesheet" href="/css/style.css">');
        expect(response.text).toContain('<!DOCTYPE html>');
      }
    });
  });

  describe('Content validation', () => {
    it('should have unique titles for each page', async () => {
      const homeResponse = await request(app).get('/');
      const aboutResponse = await request(app).get('/about');
      const projectsResponse = await request(app).get('/projects');

      expect(homeResponse.text).toContain('<title>Home | Portfolio</title>');
      expect(aboutResponse.text).toContain('<title>About | Portfolio</title>');
      expect(projectsResponse.text).toContain('<title>Projects | Portfolio</title>');
    });

    it('should have active navigation state for current page', async () => {
      // Home page should have active home link
      const homeResponse = await request(app).get('/');
      expect(homeResponse.text).toMatch(/href="\/" class="active"/);

      // About page should have active about link
      const aboutResponse = await request(app).get('/about');
      expect(aboutResponse.text).toMatch(/href="\/about" class="active"/);

      // Projects page should have active projects link
      const projectsResponse = await request(app).get('/projects');
      expect(projectsResponse.text).toMatch(/href="\/projects" class="active"/);
    });
  });

  describe('Error handling', () => {
    it('should handle multiple 404 requests consistently', async () => {
      const invalidRoutes = ['/invalid', '/does-not-exist', '/random-page'];
      
      for (const route of invalidRoutes) {
        const response = await request(app).get(route);
        expect(response.status).toBe(404);
        expect(response.text).toContain('404');
        expect(response.text).toContain('Page Not Found');
      }
    });

    it('should maintain layout structure on 404 pages', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
      
      // Should still have navigation and footer
      expect(response.text).toContain('<header>');
      expect(response.text).toContain('<footer>');
      expect(response.text).toContain('class="nav-links"');
    });
  });

  describe('Performance and reliability', () => {
    it('should handle multiple concurrent requests', async () => {
      const requests = [
        request(app).get('/'),
        request(app).get('/about'),
        request(app).get('/projects'),
        request(app).get('/css/style.css')
      ];

      const responses = await Promise.all(requests);
      
      responses.forEach((response, index) => {
        if (index < 3) {
          // HTML pages
          expect(response.status).toBe(200);
          expect(response.type).toBe('text/html');
        } else {
          // CSS file
          expect(response.status).toBe(200);
          expect(response.type).toBe('text/css');
        }
      });
    });

    it('should respond quickly to requests', async () => {
      const startTime = Date.now();
      const response = await request(app).get('/');
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(1000); // Should respond within 1 second
    });
  });
});