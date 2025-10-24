# Simple Notes App - MERN Stack

A full-stack notes application built with MongoDB, Express.js, React, and Node.js. Create, edit, and manage your notes with a beautiful and responsive interface.

## Features

- ✨ Create new notes with title and content
- 📝 Edit existing notes
- 🗑️ Delete notes with confirmation
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with gradient backgrounds
- ⚡ Real-time updates
- 💾 Persistent storage with MongoDB

## Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **HTTP Client**: Axios

## Project Structure

```
Simple_Notes_App/
├── backend/
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Simple_Notes_App
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:
- **Local MongoDB**: Start your local MongoDB service
- **MongoDB Atlas**: Use your Atlas connection string in the `.env` file

## Running the Application

### Development Mode

1. **Start the backend server** (from backend directory):
```bash
npm run dev
```
The server will run on http://localhost:5000

2. **Start the React app** (from frontend directory):
```bash
npm start
```
The app will run on http://localhost:3000

### Production Mode

1. **Build the frontend**:
```bash
cd frontend
npm run build
```

2. **Start the backend**:
```bash
cd backend
npm start
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/health` - Health check

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Create a new note by filling in the title and content fields
3. Click "Save Note" to create the note
4. Edit existing notes by clicking the edit button (✏️)
5. Delete notes by clicking the delete button (🗑️)
6. All changes are automatically saved to the database

## Features in Detail

### Note Management
- **Create**: Add new notes with title and content
- **Read**: View all notes in a responsive grid layout
- **Update**: Edit existing notes inline
- **Delete**: Remove notes with confirmation dialog

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Beautiful gradients and smooth animations
- **Intuitive UX**: Clear visual feedback and easy navigation
- **Real-time Updates**: Changes reflect immediately

### Data Persistence
- **MongoDB Integration**: All notes are stored in MongoDB
- **Automatic Timestamps**: Created and updated timestamps
- **Data Validation**: Server-side validation for required fields

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB is accessible on the specified port

2. **CORS Issues**
   - The backend includes CORS middleware
   - Ensure the frontend is running on the correct port

3. **Port Conflicts**
   - Backend runs on port 5000
   - Frontend runs on port 3000
   - Change ports in `.env` and `package.json` if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- User authentication and authorization
- Note categories and tags
- Search functionality
- Rich text editing
- Note sharing
- Dark mode toggle
- Export/import notes
- Note templates
