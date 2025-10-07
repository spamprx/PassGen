'use client';

import { useState } from 'react';
import { generatePassword, getPasswordStrength, PasswordOptions } from '@/lib/passwordGenerator';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });

  const generateNewPassword = () => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
    } catch {
      alert('Please select at least one character type');
    }
  };

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        // Auto-clear after 15 seconds
        setTimeout(() => {
          setPassword('');
        }, 15000);
      } catch (error) {
        console.error('Failed to copy password:', error);
      }
    }
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Password Generator</h2>
        <p className="text-gray-300">Create strong, secure passwords instantly</p>
      </div>
      
      {/* Generated Password Display */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-3">
          Generated Password
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            placeholder="Click Generate to create a password"
          />
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        {strength && (
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-300">Strength:</span>
              <span className={`text-sm font-semibold ${strength.color}`}>
                {strength.label}
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  strength.score === 0 ? 'bg-red-500' :
                  strength.score === 1 ? 'bg-orange-500' :
                  strength.score === 2 ? 'bg-yellow-500' :
                  strength.score === 3 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${(strength.score + 1) * 20}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Password Options */}
      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            Password Length: <span className="text-blue-400 font-bold">{options.length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="w-full h-3 bg-gray-700/50 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(options.length - 4) / 46 * 100}%, #374151 ${(options.length - 4) / 46 * 100}%, #374151 100%)`
            }}
          />
        </div>

        {/* Character Type Options */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">Character Types</label>
          
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-200">Uppercase (A-Z)</span>
            </label>
            
            <label className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-200">Lowercase (a-z)</span>
            </label>
            
            <label className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-200">Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-200">Symbols (!@#$%^&*)</span>
            </label>
          </div>
          
          <label className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={options.excludeSimilar}
              onChange={(e) => setOptions({ ...options, excludeSimilar: e.target.checked })}
              className="mr-3 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-200">Exclude similar characters (0O1lI)</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateNewPassword}
        className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
      >
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generate Password
        </div>
      </button>
    </div>
  );
}
