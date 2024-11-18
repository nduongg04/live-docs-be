# LiveDocs Backend 🚀

<div align="center">
  <img src="https://github.com/nduongg04/live-docs-fe/blob/main/public/assets/icons/logo-icon.svg" alt="LiveDocs Logo" width="120"/>
  
  Backend API for LiveDocs - A modern, real-time collaborative documentation platform.
  
  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
  
  [API Docs](https://live-docs-be.duong.website/api-docs) · [Frontend Repo](https://github.com/nduongg04/live-docs-fe) 
</div>

## 🔗 Related Repositories

This is the backend repository of LiveDocs. For the frontend implementation, please visit:
- [LiveDocs Frontend](https://github.com/nduongg04/live-docs-fe)

## ✨ Features

- 🔐 User authentication and authorization
- 📝 Document CRUD operations
- 📤 File upload handling

## 🛠️ Built With

- [NestJS](https://nestjs.com/) - Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Jest](https://jestjs.io/) - Testing Framework
- [Swagger](https://swagger.io/) - API Documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/live-docs-be.git
cd live-docs-be
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
#MongoDB
MONGODB_URI=
MONGODB_DB_NAME=

#Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

#JWT
JWT_SECRET=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRES_IN=
JWT_ACCESS_TOKEN_EXPIRES_IN=
```

4. Run the development server
```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at `http://localhost:8000`

## Project Structure
```
live-docs-be/
├── src/
│ ├── auth/         # Authentication modules
│ ├── users/        # User management
│ ├── documents/    # Document management
│ ├── common/       # Shared utilities
│ └── config/       # Configuration
├── test/           # Test files
└── docs/           # Documentation
```

## API Documentation

API documentation is available at `/api-docs` when running the server locally.

## Available Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.