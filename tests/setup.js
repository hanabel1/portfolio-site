// Global test setup
process.env.NODE_ENV = 'test';
process.env.PORT = 0; // Use a random available port for testing

// Global test timeout
jest.setTimeout(10000);

// Console log suppression during tests (uncomment if needed)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };