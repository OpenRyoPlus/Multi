import React, { useState } from 'react';
import FlashAnzan from '../components/FlashAnzan';

export default function Home() {
  const [startTrigger, setStartTrigger] = useState(false);
  const [numThreads, setNumThreads] = useState(2); // デフォルトは2スレッド
  const [numDigits, setNumDigits] = useState(2); // デフォルトは2桁
  const [displayCount, setDisplayCount] = useState(5); // デフォルトは5回表示
  const [displayInterval, setDisplayInterval] = useState(1000); // デフォルトは1000ms (1秒)
  const [userAnswers, setUserAnswers] = useState(['', '', '', '']); // ユーザーの回答を保存

  const handleStartAll = () => {
    setStartTrigger(true);
    // Reset trigger after a short delay to allow re-triggering
    setTimeout(() => setStartTrigger(false), 100);
  };

  const handleThreadChange = (count) => {
    setNumThreads(count);
  };

  const renderFlashAnzans = () => {
    const anzans = [];
    for (let i = 0; i < numThreads; i++) {
      anzans.push(
        <FlashAnzan key={i} startTrigger={startTrigger} numDigits={numDigits} displayCount={displayCount} displayInterval={displayInterval} />
      );
    }

    if (numThreads === 4) {
      return (
        <div className="relative w-full h-full">
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {anzans}
          </div>
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 -translate-y-1/2"></div>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-600 -translate-x-1/2"></div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full h-full">
          {anzans.map((an, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 flex items-center justify-center p-4 w-full"> 
                {an}
              </div>
              {index < anzans.length - 1 && numThreads > 1 && (
                <div className="w-full h-1 bg-gray-600 my-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* 左側のパネル */}
      <div className="w-1/4 bg-black p-8 shadow-lg flex flex-col justify-start items-center">
        <h1 className="text-white text-3xl font-bold leading-tight text-center mt-4 mb-8">
          マルチスレッド<br />フラッシュ暗算
        </h1>

        {/* 設定項目 */}
        <div className="flex flex-col items-center w-full mb-auto"> 
          <h2 className="text-xl font-bold text-gray-400 mb-4">スレッド数</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => handleThreadChange(count)}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-md text-lg font-bold
                  ${numThreads === count ? 'border-purple-500 bg-purple-700' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}
              >
                {count}
              </button>
            ))}
          </div>

          {/* 桁数設定 */}
          <h2 className="text-xl font-bold text-gray-400 mb-4 mt-4">桁数</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setNumDigits(count)}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-md text-lg font-bold
                  ${numDigits === count ? 'border-purple-500 bg-purple-700' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}
              >
                {count}
              </button>
            ))}
          </div>

          {/* 表示数設定 */}
          <div className="flex items-center mb-4 mt-4">
            <h2 className="text-xl font-bold text-gray-400 mr-4">表示数</h2>
            <input
              type="text"
              value={displayCount}
              onChange={(e) => setDisplayCount(parseInt(e.target.value) || 1)}
              className="w-24 p-2 text-center bg-gray-700 border border-gray-600 rounded-md text-lg font-bold"
            />
          </div>

          {/* 表示間隔設定 */}
          <div className="flex items-center mb-4 mt-4">
            <h2 className="text-xl font-bold text-gray-400 mr-4">表示間隔 (ms)</h2>
            <input
              type="number"
              min="100"
              value={displayInterval}
              onChange={(e) => setDisplayInterval(parseInt(e.target.value) || 100)}
              className="w-24 p-2 text-center bg-gray-700 border border-gray-600 rounded-md text-lg font-bold"
            />
          </div>

          
          {/* 回答入力欄 */}
          <h2 className="text-xl font-bold text-gray-400 mb-4 mt-4">回答</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                value={userAnswers[index]}
                onChange={(e) => {
                  const newAnswers = [...userAnswers];
                  newAnswers[index] = e.target.value;
                  setUserAnswers(newAnswers);
                }}
                className="p-2 text-center bg-gray-700 border border-gray-600 rounded-md text-lg font-bold"
                placeholder={`回答 ${index + 1}`}
              />
            ))}
          </div>
          {/* 他の設定項目をここに追加 */}
        </div>

        

        {/* STARTボタン */}
        <button
          onClick={handleStartAll}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-purple-500/50 mt-auto mb-8" 
        >
          START
        </button>
      </div>

      {/* 右側のメインコンテンツエリア */}
      <div className="flex-1 flex flex-col h-screen"> {/* h-screenを追加 */}
        {renderFlashAnzans()}
      </div>
    </div>
  );
}
