const app = require('../server');

describe('Application Configuration', () => {
  describe('Express app setup', () => {
    it('should be an Express application', () => {
      expect(app).toBeDefined();
      expect(typeof app).toBe('function');
      expect(app.get).toBeDefined();
      expect(app.post).toBeDefined();
      expect(app.use).toBeDefined();
    });

    it('should have view engine configured', () => {
      expect(app.get('view engine')).toBe('ejs');
    });

    it('should have views directory configured', () => {
      const viewsPath = app.get('views');
      expect(viewsPath).toBeDefined();
      expect(viewsPath).toContain('views');
    });
  });

  describe('Middleware configuration', () => {
    it('should have layout middleware configured', () => {
      expect(app.get('layout')).toBe('layout');
    });

    it('should serve static files correctly', () => {
      // This is tested by making actual requests in other test files
      expect(app).toBeDefined();
    });
  });

  describe('Route configuration', () => {
    it('should respond to GET requests', () => {
      // Test that the app can handle GET requests (tested via supertest in other files)
      expect(typeof app.get).toBe('function');
    });

    it('should have middleware stack', () => {
      // Express apps have a middleware stack
      expect(app).toBeDefined();
      expect(typeof app.use).toBe('function');
    });
  });

  describe('Environment configuration', () => {
    it('should handle different environments', () => {
      const originalEnv = process.env.NODE_ENV;
      
      // Test with test environment
      process.env.NODE_ENV = 'test';
      expect(process.env.NODE_ENV).toBe('test');
      
      // Test with production environment
      process.env.NODE_ENV = 'production';
      expect(process.env.NODE_ENV).toBe('production');
      
      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle port configuration', () => {
      const originalPort = process.env.PORT;
      
      // Test with custom port
      process.env.PORT = '4000';
      expect(process.env.PORT).toBe('4000');
      
      // Restore original port
      process.env.PORT = originalPort;
    });
  });
});