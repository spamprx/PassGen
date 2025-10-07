'use client';

import { useState, useEffect } from 'react';
import { decrypt, deriveKey } from '@/lib/encryption';

interface VaultItemProps {
  item: {
    _id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    salt: string;
    createdAt: string;
    updatedAt: string;
  };
  masterPassword: string;
  onEdit: (item: {
    _id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    salt: string;
    createdAt: string;
    updatedAt: string;
  }) => void;
  onDelete: (id: string) => void;
}

export default function VaultItem({ item, masterPassword, onEdit, onDelete }: VaultItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [decryptedData, setDecryptedData] = useState<{
    username: string;
    password: string;
    notes: string;
  } | null>(null);
  const [decryptError, setDecryptError] = useState(false);

  // Reset decrypted data when master password changes
  useEffect(() => {
    setDecryptedData(null);
    setDecryptError(false);
    setShowPassword(false);
    setShowUsername(false);
  }, [masterPassword]);

  const decryptData = async () => {
    if (decryptedData) return;
    
    if (!masterPassword || masterPassword.trim() === '') {
      alert('Please enter your master password first.');
      return;
    }

    try {
      setDecryptError(false);
      // Use the stored salt for this item
      const key = await deriveKey(masterPassword, item.salt);
      
      const username = await decrypt(item.username, key);
      const password = await decrypt(item.password, key);
      const notes = item.notes ? await decrypt(item.notes, key) : '';

      // Validate that decryption worked (decrypted data should be readable)
      if (!username || username.includes('�') || username.length === 0) {
        throw new Error('Invalid decryption result');
      }

      setDecryptedData({ username, password, notes });
    } catch (error) {
      console.error('Decryption failed:', error);
      setDecryptError(true);
      setDecryptedData(null);
      alert('Failed to decrypt data. Please check your master password and try again.');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Auto-clear after 15 seconds
      setTimeout(() => {
        navigator.clipboard.writeText('');
      }, 15000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShowPassword = async () => {
    if (!decryptedData) {
      await decryptData();
    }
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mr-4 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(item)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {!masterPassword ? (
          <div className="p-4 bg-yellow-500/20 border border-yellow-400/50 rounded-xl">
            <p className="text-sm text-yellow-200">
              Please enter your master password above to view this item&apos;s details.
            </p>
          </div>
        ) : decryptError ? (
          <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
            <p className="text-sm text-red-200">
              ❌ Decryption failed! The master password you entered is incorrect for this item.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300 w-24">Username:</span>
              <span className="text-sm text-white font-mono">
                {decryptedData ? (showUsername ? decryptedData.username : '••••••••') : '••••••••'}
              </span>
              {!decryptedData && (
                <button
                  onClick={decryptData}
                  className="text-xs bg-blue-500/20 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-colors text-blue-300"
                >
                  Show
                </button>
              )}
              {decryptedData && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowUsername(!showUsername)}
                    className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-white flex items-center gap-1"
                  >
                    {showUsername ? (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                        Hide
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Show
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(decryptedData.username)}
                    className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-white"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300 w-24">Password:</span>
              <span className="text-sm text-white font-mono">
                {showPassword && decryptedData ? decryptedData.password : '••••••••'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleShowPassword}
                  className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-white flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                      Hide
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Show
                    </>
                  )}
                </button>
                {showPassword && decryptedData && (
                  <button
                    onClick={() => copyToClipboard(decryptedData.password)}
                    className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors text-white"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {item.url && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-300 w-24">URL:</span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              {item.url}
            </a>
          </div>
        )}

        {decryptedData?.notes && (
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-gray-300 w-24">Notes:</span>
            <span className="text-sm text-gray-200">{decryptedData.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}
