// Mock simples do AWS SDK
jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      get: jest.fn(),
      put: jest.fn(),
      scan: jest.fn(),
      query: jest.fn()
    }))
  }
}));

// Mock simples do bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true)
}));

// Mock simples do jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
  verify: jest.fn().mockReturnValue({ userId: 'user-123' })
}));

// Mock simples do uuid
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid-123')
}));

const auth = require('../../handlers/auth');
const AWS = require('aws-sdk');

describe('Authentication Handlers', () => {
  let mockDocClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDocClient = new AWS.DynamoDB.DocumentClient();
  });

  describe('login', () => {
    test('should return 400 for missing fields', async () => {
      const event = {
        body: JSON.stringify({
          email: 'test@example.com'
          // password missing
        })
      };

      const result = await auth.login(event);
      
      expect(result.statusCode).toBe(400);
    });

    test('should return 400 for missing email', async () => {
      const event = {
        body: JSON.stringify({
          password: 'password123'
          // email missing
        })
      };

      const result = await auth.login(event);
      
      expect(result.statusCode).toBe(400);
    });
  });

  describe('register', () => {
    test('should return 400 for missing fields', async () => {
      const event = {
        body: JSON.stringify({
          email: 'test@example.com'
          // password and name missing
        })
      };

      const result = await auth.register(event);
      
      expect(result.statusCode).toBe(400);
    });

    test('should return 400 for missing name', async () => {
      const event = {
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
          // name missing
        })
      };

      const result = await auth.register(event);
      
      expect(result.statusCode).toBe(400);
    });
  });

  describe('error handling', () => {
    test('should handle DynamoDB errors', async () => {
      mockDocClient.get.mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error'))
      });

      const event = {
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      };

      const result = await auth.login(event);
      
      expect(result.statusCode).toBe(500);
    });
  });
});