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
    <div className="bg-card dark:bg-zinc-900 rounded-xl shadow-sm p-4 sm:p-6 border border-green-100 dark:border-green-900/40 w-full">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span>🌾</span> Crop Name
          </label>
          <select
            className="w-full h-11 border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-background text-foreground border-input"
            value={crop}
            onChange={e => setCrop(e.target.value)}
          >
            <option value="">Select Crop</option>
            {cropOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span>⚖️</span> Quantity (Quintals)
          </label>
          <input
            type="number"
            min="0"
            className="w-full h-11 border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-background text-foreground border-input"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span>💸</span> Mandi Rate (₹/Quintal)
          </label>
          <input
            type="number"
            min="0"
            className="w-full h-11 border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-background text-foreground border-input"
            value={rate}
            onChange={e => setRate(e.target.value)}
            placeholder="Enter mandi rate"
          />
        </div>
      </div>

      {error && <div className="mt-4 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-1">
        <span className="text-base">⚠️</span> {error}
      </div>}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          className="w-full sm:w-auto min-w-[160px] h-11 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-base px-8 rounded-lg transition-all shadow-sm hover:shadow-md"
          onClick={handleCalculate}
          type="button"
        >
          Calculate Total
        </button>

        {total !== null && !error && (
          <div className="flex-1 w-full p-3 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 rounded-lg text-green-800 dark:text-green-200 flex items-center justify-between px-6 transition-all duration-300">
            <span className="text-sm font-medium uppercase tracking-wider opacity-70">Estimated Total:</span>
            <span className="font-bold text-2xl tracking-tight">₹{total.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
