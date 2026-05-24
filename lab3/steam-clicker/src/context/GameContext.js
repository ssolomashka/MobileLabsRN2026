import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [panCount, setPanCount] = useState(0);
  const [flingRightCount, setFlingRightCount] = useState(0);
  const [flingLeftCount, setFlingLeftCount] = useState(0);
  const [pinchCount, setPinchCount] = useState(0);
  const [lastAction, setLastAction] = useState('');

  const addScore = useCallback((points, action) => {
    setScore((s) => s + points);
    setLastAction(action);
  }, []);

  const onTap = useCallback(() => {
    setTapCount((c) => c + 1);
    addScore(1, '+1 очко! 👆');
  }, [addScore]);

  const onDoubleTap = useCallback(() => {
    setDoubleTapCount((c) => c + 1);
    addScore(2, '+2 очки! ✌️');
  }, [addScore]);

  const onLongPress = useCallback(() => {
    setLongPressCount((c) => c + 1);
    addScore(10, '+10 очок! ⏳');
  }, [addScore]);

  const onPan = useCallback(() => {
    setPanCount((c) => c + 1);
    addScore(3, '+3 очки! 🖐️');
  }, [addScore]);

  const onFlingRight = useCallback(() => {
    setFlingRightCount((c) => c + 1);
    const p = Math.floor(Math.random() * 15) + 5;
    addScore(p, `+${p} очок! ➡️`);
  }, [addScore]);

  const onFlingLeft = useCallback(() => {
    setFlingLeftCount((c) => c + 1);
    const p = Math.floor(Math.random() * 15) + 5;
    addScore(p, `+${p} очок! ⬅️`);
  }, [addScore]);

  const onPinch = useCallback(() => {
    setPinchCount((c) => c + 1);
    addScore(5, '+5 очок! 🔍');
  }, [addScore]);

  const gameState = {
    score, tapCount, doubleTapCount, longPressCount,
    panCount, flingRightCount, flingLeftCount, pinchCount,
  };

  return (
    <GameContext.Provider value={{
      gameState, lastAction,
      onTap, onDoubleTap, onLongPress, onPan,
      onFlingRight, onFlingLeft, onPinch,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
