import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const likes = await kv.get('portfolio_likes') || 0;
      return res.status(200).json({ likes });
    } 
    else if (req.method === 'POST') {
      // Increment the counter by 1
      const newLikes = await kv.incr('portfolio_likes');
      return res.status(200).json({ likes: newLikes });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to connect to database' });
  }
}

