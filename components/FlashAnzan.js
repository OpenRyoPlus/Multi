import React, { useState, useEffect } from 'react';

const FlashAnzan = ({ startTrigger, numDigits, displayCount, displayInterval }) => {
  const [number, setNumber] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateNumbers = () => {
    const newNumbers = [];
    const min = numDigits === 1 ? 0 : Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;

    for (let i = 0; i < displayCount; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      newNumbers.push(num);
    }
    setNumbers(newNumbers);
    setCurrentIndex(0);
    setNumber('');
  };

  useEffect(() => {
    if (startTrigger && !isRunning) {
      generateNumbers();
      setIsRunning(true);
    }
  }, [startTrigger]);

  useEffect(() => {
    let timer;
    if (isRunning && currentIndex < numbers.length) {
      timer = setTimeout(() => {
        setNumber(numbers[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, displayInterval); // Display each number for displayInterval
    } else if (isRunning && currentIndex === numbers.length) {
      timer = setTimeout(() => {
        setNumber(''); // Clear number after sequence
        setIsRunning(false);
      }, 1000); // Keep last number for 1 second then clear
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, numbers]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-mono"> {/* 幅やマージンを制限するスタイルを削除 */}
      <div className="text-6xl font-bold flex items-center justify-center text-green-400"> {/* 数字を大きく表示 */} 
        {number}
      </div>
    </div>
  );
};

export default FlashAnzan;