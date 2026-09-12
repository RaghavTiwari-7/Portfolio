import Redis from 'ioredis';

let redis = null;

export default async function handler(req, res) {
  // CORS headers for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const redisUrl = process.env.REDIS_URL || process.env.KV_URL;

    if (!redisUrl) {
      return res.status(500).json({ error: 'REDIS_URL environment variable is missing' });
    }

    if (!redis) {
      redis = new Redis(redisUrl);
    }

    if (req.method === 'GET') {
      const likesStr = await redis.get('portfolio_likes');
      const likes = likesStr ? parseInt(likesStr, 10) : 0;
      return res.status(200).json({ likes });
    } 
    else if (req.method === 'POST') {
      const newLikes = await redis.incr('portfolio_likes');
      return res.status(200).json({ likes: newLikes });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

