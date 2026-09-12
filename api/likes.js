import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      return res.status(500).json({ error: 'Database environment variables are missing in Vercel' });
    }

    const db = createClient({ url, token });

    if (req.method === 'GET') {
      const likes = await db.get('portfolio_likes') || 0;
      return res.status(200).json({ likes });
    } 
    else if (req.method === 'POST') {
      // Increment the counter by 1
      const newLikes = await db.incr('portfolio_likes');
      return res.status(200).json({ likes: newLikes });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

