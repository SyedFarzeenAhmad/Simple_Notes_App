# Backend - Simple Notes App

A robust, scalable backend API built with Node.js, Express.js, and MongoDB following industry best practices.

## 🏗️ Project Structure

```
backend/
├── config/
│   ├── config.js          # Application configuration
│   └── database.js        # Database connection setup
├── constants/
│   └── index.js           # Application constants
├── controllers/
│   └── noteController.js  # Business logic for notes
├── middlewares/
│   ├── errorMiddleware.js # Error handling middleware
│   ├── loggerMiddleware.js # Request logging middleware
│   └── validationMiddleware.js # Input validation middleware
├── models/
│   └── Note.js            # MongoDB Note schema
├── routes/
│   └── noteRoutes.js      # API route definitions
├── utils/
│   └── helpers.js          # Utility functions
├── server.js              # Main application entry point
└── package.json           # Dependencies and scripts
```

## 🚀 Features

### **Architecture & Design Patterns**
- **MVC Pattern**: Clear separation of concerns
- **Middleware Pattern**: Reusable request/response processing
- **Error Handling**: Centralized error management
- **Validation**: Input validation and sanitization
- **Logging**: Request/response logging with Morgan
- **Configuration Management**: Environment-based configuration

### **API Features**
- ✅ **CRUD Operations**: Complete Create, Read, Update, Delete
- ✅ **Data Validation**: Server-side validation with custom middleware
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Request Logging**: Detailed request/response logging
- ✅ **CORS Support**: Cross-origin resource sharing
- ✅ **Health Checks**: API health monitoring
- ✅ **Response Standardization**: Consistent API responses

### **Database Features**
- ✅ **MongoDB Integration**: Mongoose ODM
- ✅ **Schema Validation**: Data model validation
- ✅ **Indexing**: Performance optimization
- ✅ **Connection Pooling**: Efficient database connections
- ✅ **Error Handling**: Database error management

## 📋 API Endpoints

### **Notes API**
| Method | Endpoint | Description | Middleware |
|--------|----------|-------------|------------|
| GET | `/api/notes` | Get all notes | - |
| GET | `/api/notes/:id` | Get single note | `validateObjectId` |
| POST | `/api/notes` | Create new note | `validateNote` |
| PUT | `/api/notes/:id` | Update note | `validateObjectId`, `validateNote` |
| DELETE | `/api/notes/:id` | Delete note | `validateObjectId` |

### **System API**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/` | API information |

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notesapp

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Optional: JWT Configuration (for future auth)
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### **Database Configuration**
The application uses MongoDB with the following connection options:
- Connection pooling
- Timeout configurations
- Error handling
- Automatic reconnection

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### **Installation**
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## 📊 Response Format

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "statusCode": 200,
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### **Error Response**
```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

## 🔍 Validation Rules

### **Note Validation**
- **Title**: Required, max 100 characters, trimmed
- **Content**: Required, max 5000 characters
- **ID**: Valid MongoDB ObjectId format (24 hex characters)

### **Error Codes**
- `400`: Bad Request (validation errors)
- `404`: Not Found (resource not found)
- `500`: Internal Server Error (server errors)

## 🧪 Testing

### **Manual Testing**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test notes endpoint
curl http://localhost:5000/api/notes

# Create a note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a test note"}'
```

## 🔒 Security Features

- **Input Validation**: Prevents malicious input
- **CORS Configuration**: Controlled cross-origin access
- **Error Sanitization**: Prevents information leakage
- **Request Size Limits**: Prevents DoS attacks
- **MongoDB Injection Protection**: Mongoose ODM protection

## 📈 Performance Features

- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections
- **Request Logging**: Performance monitoring
- **Error Handling**: Graceful error recovery
- **Response Compression**: Reduced payload size

## 🚀 Deployment

### **Production Checklist**
- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set up proper CORS origins
- [ ] Configure logging levels
- [ ] Set up monitoring
- [ ] Configure backup strategy

### **Docker Support** (Future)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔮 Future Enhancements

- **Authentication**: JWT-based user authentication
- **Authorization**: Role-based access control
- **Rate Limiting**: API rate limiting
- **Caching**: Redis caching layer
- **File Uploads**: Note attachments
- **Search**: Full-text search
- **Pagination**: Advanced pagination
- **WebSocket**: Real-time updates
- **Testing**: Unit and integration tests
- **Documentation**: Swagger/OpenAPI docs

## 📝 Development Guidelines

### **Code Style**
- Use ES6+ features
- Follow async/await pattern
- Implement proper error handling
- Use meaningful variable names
- Add JSDoc comments for functions

### **Git Workflow**
- Feature branches for new features
- Descriptive commit messages
- Code review process
- Automated testing

## 🐛 Troubleshooting

### **Common Issues**

1. **MongoDB Connection Error**
   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **Port Already in Use**
   - Change PORT in .env
   - Kill existing process
   - Use different port

3. **Validation Errors**
   - Check request body format
   - Verify required fields
   - Check data types

## 📞 Support

For issues and questions:
- Check the logs for error details
- Verify environment configuration
- Test API endpoints manually
- Review validation rules

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**
