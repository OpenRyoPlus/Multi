import React, { useState, useEffect } from 'react';

const FlashAnzan = ({ startTrigger, numDigits, displayCount, displayInterval, countdown, onSumCalculated, showAnswers, correctAnswer }) => {
  const [number, setNumber] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sum, setSum] = useState(0); // 合計値を保持するstate

  const generateNumbers = () => {
    const newNumbers = [];
    const min = numDigits === 1 ? 0 : Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    let currentSum = 0;

    for (let i = 0; i < displayCount; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      newNumbers.push(num);
      currentSum += num;
    }
    setNumbers(newNumbers);
    setSum(currentSum); // 合計をセット
    setCurrentIndex(0);
    setNumber('');
  };

  useEffect(() => {
    if (startTrigger && !isRunning && countdown === null) {
      generateNumbers();
      setIsRunning(true);
    }
  }, [startTrigger, countdown]);

  useEffect(() => {
    let timer;
    const interval = displayCount > 0 ? displayInterval / displayCount : displayInterval; // 各数字の表示間隔を計算

    if (isRunning && currentIndex < numbers.length) {
      timer = setTimeout(() => {
        setNumber(numbers[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, interval); 
    } else if (isRunning && currentIndex === numbers.length) {
      timer = setTimeout(() => {
        setNumber(''); // シーケンス終了後、表示をクリア
        setIsRunning(false);
        if (onSumCalculated) {
          onSumCalculated(sum);
        }
      }, interval); // 最後の数字の表示時間も考慮
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, numbers, displayInterval, displayCount, sum, onSumCalculated]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-mono"> {/* 幅やマージンを制限するスタイルを削除 */}
      <div className="text-6xl font-bold flex items-center justify-center text-green-400"> {/* 数字を大きく表示 */}
        {countdown !== null ? <span className="text-white text-9xl">{countdown}</span> : 
         showAnswers ? <span className="text-white">{correctAnswer}</span> : 
         (isRunning || number === '') ? number : <span className="text-white">{number}</span>} {/* 合計を白色で表示 */}
      </div>
    </div>
  );
};

export default FlashAnzan;