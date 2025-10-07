'use client';

import { useState, useEffect } from 'react';
import { decrypt, deriveKey } from '@/lib/encryption';
import VaultForm from './VaultForm';

interface VaultFormWrapperProps {
  item?: {
    _id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    salt: string;
  };
  onSave: (data: {
    title: string;
    username: string;
    password: string;
    url: string;
    notes: string;
    masterPassword: string;
    id?: string;
  }) => void;
  onCancel: () => void;
}

export default function VaultFormWrapper({ item, onSave, onCancel }: VaultFormWrapperProps) {
  const [decryptedItem, setDecryptedItem] = useState<{
    _id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    salt: string;
  } | undefined>(undefined);
  const [masterPassword, setMasterPassword] = useState('');
  const [decryptError, setDecryptError] = useState('');
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  useEffect(() => {
    const decryptItem = async () => {
      if (item && masterPassword && masterPassword.trim() !== '') {
        try {
          const key = await deriveKey(masterPassword, item.salt);
          const decryptedUsername = await decrypt(item.username, key);
          const decryptedPassword = await decrypt(item.password, key);
          const decryptedNotes = item.notes ? await decrypt(item.notes, key) : '';

          // Validate that decryption worked (decrypted data should be readable)
          if (!decryptedUsername || decryptedUsername.includes('�') || decryptedUsername.length === 0) {
            throw new Error('Invalid decryption result - wrong password');
          }

          setDecryptedItem({
            ...item,
            username: decryptedUsername,
            password: decryptedPassword,
            notes: decryptedNotes,
          });
          setDecryptError('');
        } catch (error) {
          console.error('Decryption failed:', error);
          setDecryptError('❌ Failed to decrypt data. The master password is incorrect.');
          setDecryptedItem(undefined);
        }
      } else if (item) {
        setDecryptedItem(undefined);
        if (masterPassword && masterPassword.trim() === '') {
          setDecryptError('');
        }
      }
    };

    decryptItem();
  }, [item, masterPassword]);

  if (item && !decryptedItem) {
    return (
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Decrypt Vault Item</h2>
          <p className="text-gray-300">Enter your master password to edit this item</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="masterPassword" className="block text-sm font-medium text-gray-200 mb-2">
              Master Password *
            </label>
            <div className="relative">
              <input
                type={showMasterPassword ? "text" : "password"}
                id="masterPassword"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                placeholder="Enter your master password"
              />
              <button
                type="button"
                onClick={() => setShowMasterPassword(!showMasterPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showMasterPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {decryptError && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl">
                <p className="text-red-200 text-sm">{decryptError}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VaultForm
      item={decryptedItem}
      onSave={onSave}
      onCancel={onCancel}
      initialMasterPassword={decryptedItem ? masterPassword : ''}
    />
  );
}
