const { connectDB, Note } = require('./lib/mongodb');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectDB();

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const note = await Note.findById(id);
      if (!note) {
        return res.status(404).json({
          success: false,
          error: 'Note not found'
        });
      }
      res.status(200).json({
        success: true,
        data: note
      });
    } else if (req.method === 'PUT') {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
      }
      const note = await Note.findByIdAndUpdate(
        id,
        { title, content, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!note) {
        return res.status(404).json({
          success: false,
          error: 'Note not found'
        });
      }
      res.status(200).json({
        success: true,
        data: note
      });
    } else if (req.method === 'DELETE') {
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        return res.status(404).json({
          success: false,
          error: 'Note not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Note deleted successfully'
      });
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
