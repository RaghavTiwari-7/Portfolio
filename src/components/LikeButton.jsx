import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch initial likes on mount
  useEffect(() => {
    // Check if this specific user already liked it previously
    if (localStorage.getItem('portfolio_liked')) {
      setHasLiked(true);
    }
    
    // Fetch global count
    fetch('/api/likes')
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleLike = () => {
    if (hasLiked) return; // Prevent double liking
    
    // Optimistic UI update
    setHasLiked(true);
    setLikes(prev => prev + 1);
    localStorage.setItem('portfolio_liked', 'true');
    
    // Fun confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#8b5cf6', '#3b82f6'] // Pink, Purple, Blue
    });

    // Send to database
    fetch('/api/likes', { method: 'POST' }).catch(console.error);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button 
        onClick={handleLike}
        whileHover={{ scale: hasLiked ? 1 : 1.05 }}
        whileTap={{ scale: hasLiked ? 1 : 0.95 }}
        className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md transition-all duration-300 ${
          hasLiked 
            ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50 cursor-default' 
            : 'bg-[#11111d]/90 border border-dark-border text-slate-300 hover:text-pink-400 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]'
        }`}
      >
        <FaHeart className={hasLiked ? 'text-pink-500' : ''} />
        {loading ? '...' : likes}
      </motion.button>
    </motion.div>
  );
};

export default LikeButton;

