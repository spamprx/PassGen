import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import VaultItem from '@/models/VaultItem';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { encrypt, deriveKey, generateSalt } from '@/lib/encryption';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const vaultItems = await VaultItem.find({ userId: payload.userId });
    
    // Note: In a real app, you'd decrypt here using the user's master password
    // For now, we'll return the encrypted data and handle decryption on the client
    return NextResponse.json({ items: vaultItems });
  } catch (error) {
    console.error('Get vault items error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { title, username, password, url, notes, masterPassword } = await request.json();

    if (!title || !username || !password || !masterPassword) {
      return NextResponse.json(
        { error: 'Title, username, password, and master password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate salt and derive key for encryption
    const salt = await generateSalt();
    const key = await deriveKey(masterPassword, salt);

    // Encrypt sensitive data
    const encryptedPassword = await encrypt(password, key);
    const encryptedUsername = await encrypt(username, key);
    const encryptedNotes = notes ? await encrypt(notes, key) : '';

    const vaultItem = new VaultItem({
      userId: payload.userId,
      title,
      username: encryptedUsername,
      password: encryptedPassword,
      url,
      notes: encryptedNotes,
      salt,
    });

    await vaultItem.save();

    return NextResponse.json({
      message: 'Vault item created successfully',
      item: vaultItem,
    });
  } catch (error) {
    console.error('Create vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
