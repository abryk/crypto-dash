import { useState } from 'react';

const STORAGE_KEY = 'crypto-dash-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  return { toggleFavorite, isFavorite };
};
