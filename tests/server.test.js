const request = require('supertest');
const app = require('../server');

describe('Portfolio Server', () => {
  describe('GET /', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });

    it('should return HTML content', async () => {
      const response = await request(app).get('/');
      expect(response.type).toBe('text/html');
    });

    it('should contain the home page title', async () => {
      const response = await request(app).get('/');
      expect(response.text).toContain('<title>Home | Portfolio</title>');
    });

    it('should contain navigation with active home link', async () => {
      const response = await request(app).get('/');
      expect(response.text).toContain('class="active"');
      expect(response.text).toContain('Home</a>');
    });

    it('should contain welcome content', async () => {
      const response = await request(app).get('/');
      expect(response.text).toContain('Full Stack Developer');
    });

    it('should contain CSS link', async () => {
      const response = await request(app).get('/');
      expect(response.text).toContain('<link rel="stylesheet" href="/css/style.css">');
    });
  });

  describe('GET /about', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/about');
      expect(response.status).toBe(200);
    });

    it('should return HTML content', async () => {
      const response = await request(app).get('/about');
      expect(response.type).toBe('text/html');
    });

    it('should contain the about page title', async () => {
      const response = await request(app).get('/about');
      expect(response.text).toContain('<title>About | Portfolio</title>');
    });

    it('should contain navigation with active about link', async () => {
      const response = await request(app).get('/about');
      expect(response.text).toContain('href="/about" class="active"');
    });

    it('should contain about content', async () => {
      const response = await request(app).get('/about');
      expect(response.text).toContain('About Me');
      expect(response.text).toContain('My Story');
    });

    it('should contain skills section', async () => {
      const response = await request(app).get('/about');
      expect(response.text).toContain('Skills & Technologies');
      expect(response.text).toContain('Frontend');
      expect(response.text).toContain('Backend');
    });
  });

  describe('GET /projects', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/projects');
      expect(response.status).toBe(200);
    });

    it('should return HTML content', async () => {
      const response = await request(app).get('/projects');
      expect(response.type).toBe('text/html');
    });

    it('should contain the projects page title', async () => {
      const response = await request(app).get('/projects');
      expect(response.text).toContain('<title>Projects | Portfolio</title>');
    });

    it('should contain navigation with active projects link', async () => {
      const response = await request(app).get('/projects');
      expect(response.text).toContain('href="/projects" class="active"');
    });

    it('should contain projects content', async () => {
      const response = await request(app).get('/projects');
      expect(response.text).toContain('My Projects');
      expect(response.text).toContain('showcase of my recent work');
    });

    it('should contain project cards', async () => {
      const response = await request(app).get('/projects');
      expect(response.text).toContain('project-card');
      expect(response.text).toContain('E-Commerce Platform');
    });
  });

  describe('GET /nonexistent (404 handler)', () => {
    it('should return 404 status code for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
    });

    it('should return HTML content for 404', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.type).toBe('text/html');
    });

    it('should contain 404 page title', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.text).toContain('<title>404 - Page Not Found | Portfolio</title>');
    });

    it('should contain 404 error message', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.text).toContain('404');
      expect(response.text).toContain('Page Not Found');
    });

    it('should contain navigation links on 404 page', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.text).toContain('Go Home');
      expect(response.text).toContain('View Projects');
    });
  });

  describe('Static file serving', () => {
    it('should serve CSS files', async () => {
      const response = await request(app).get('/css/style.css');
      expect(response.status).toBe(200);
      expect(response.type).toBe('text/css');
    });

    it('should contain CSS content', async () => {
      const response = await request(app).get('/css/style.css');
      expect(response.text).toContain('body');
      expect(response.text).toContain('font-family');
    });
  });

  describe('Response headers', () => {
    it('should have proper content-type for HTML pages', async () => {
      const response = await request(app).get('/');
      expect(response.headers['content-type']).toContain('text/html');
    });

    it('should have proper content-type for CSS files', async () => {
      const response = await request(app).get('/css/style.css');
      expect(response.headers['content-type']).toContain('text/css');
    });
  });
});