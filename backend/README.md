# Vehicle Selection Backend

A scalable Node.js backend API for vehicle selection submissions with logbook uploads.

## Features

- **TypeScript**: Full TypeScript support for type safety
- **Express.js**: Fast, unopinionated web framework
- **File Upload**: Multer-based logbook file upload handling
- **Validation**: Request validation with express-validator
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Winston-based structured logging
- **Error Handling**: Centralized error handling middleware
- **Testing**: Jest test framework with coverage reporting

## Project Structure

```
src/
├── config/          # Configuration management
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── routes/          # API routes
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── server.ts        # Main server file
tests/               # Test files
package.json
tsconfig.json
jest.config.js
README.md
```

## API Endpoints

### POST /api/vehicles/submit
Submit a vehicle selection with logbook file.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `make`: string (required)
  - `model`: string (required)
  - `badge`: string (required)
  - `logbook`: file (required, plain text)

**Response:**
```json
{
  "success": true,
  "data": {
    "vehicle": {
      "make": "Toyota",
      "model": "Camry",
      "badge": "LE"
    },
    "logbook": "file content...",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "id": "vs_1234567890_abc123def"
  },
  "message": "Vehicle submission processed successfully"
}
```

### GET /api/vehicles
Get all submissions.

### GET /api/health
Health check endpoint.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration.

## Development

1. Start development server:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start production server:
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `PORT` | `3001` | Server port |
| `HOST` | `localhost` | Server host |
| `API_PREFIX` | `/api` | API route prefix |
| `CORS_ORIGIN` | `http://localhost:3000` | CORS allowed origin |

## Testing

The project includes unit tests for services and integration tests for API endpoints. Tests use Jest and Supertest.

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment variables for production.

3. Start the server:
   ```bash
   npm start
   ```

## Contributing

1. Follow the existing code style and structure
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License.