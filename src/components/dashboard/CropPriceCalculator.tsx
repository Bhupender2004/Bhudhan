'use client';

import React, { useState } from 'react';

const cropOptions = [
  { label: 'Wheat', value: 'wheat', emoji: '🌾' },
  { label: 'Rice', value: 'rice', emoji: '🍚' },
  { label: 'Sugarcane', value: 'sugarcane', emoji: '🥥' },
  { label: 'Cotton', value: 'cotton', emoji: '🧵' },
  { label: 'Maize', value: 'maize', emoji: '🌽' },
  { label: 'Soybean', value: 'soybean', emoji: '🫘' },
  { label: 'Potato', value: 'potato', emoji: '🥔' },
  { label: 'Onion', value: 'onion', emoji: '🧅' },
  { label: 'Tomato', value: 'tomato', emoji: '🍅' },
];

export default function CropPriceCalculator() {
  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const qty = parseFloat(quantity);
    const mandiRate = parseFloat(rate);
    if (!crop) {
      setError('Please select a crop.');
      return;
    }
    if (isNaN(qty) || qty <= 0) {
      setError('Enter a valid quantity (quintals).');
      return;
    }
    if (isNaN(mandiRate) || mandiRate <= 0) {
      setError('Enter a valid mandi rate (₹/quintal).');
      return;
    }
    setTotal(qty * mandiRate);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-none p-2 sm:p-4 space-y-3 border border-green-200 dark:border-green-900 w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-300 flex items-center gap-2 mb-2">Crop Price Calculator <span>💰</span></h2>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Crop Name <span className="ml-1">🌾</span></label>
        <select
          className="w-full border rounded px-3 py-2 text-sm focus:outline-green-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
          value={crop}
          onChange={e => setCrop(e.target.value)}
        >
          <option value="">Select Crop</option>
          {cropOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Quantity (Quintals) <span>⚖️</span></label>
        <input
          type="number"
          min="0"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-green-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Enter quantity in quintals"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Mandi Rate (₹/Quintal) <span>💸</span></label>
        <input
          type="number"
          min="0"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-green-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-zinc-700"
          value={rate}
          onChange={e => setRate(e.target.value)}
          placeholder="Enter mandi rate per quintal"
        />
      </div>
      {error && <div className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>}
      <button
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold text-base py-2 px-4 rounded transition shadow-md mt-2"
        onClick={handleCalculate}
        type="button"
      >
        Calculate
      </button>
      {total !== null && !error && (
        <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded text-base text-green-800 dark:text-green-200 flex items-center gap-2 justify-center shadow-sm">
          <span>Estimated Total Price:</span>
          <span className="font-bold text-lg">₹{total.toLocaleString('en-IN')}</span>
        </div>
      )}
    </div>
  );
}
