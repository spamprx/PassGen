import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import VaultItem from '@/models/VaultItem';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { encrypt, deriveKey, generateSalt } from '@/lib/encryption';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const vaultItem = await VaultItem.findOne({
      _id: params.id,
      userId: payload.userId,
    });

    if (!vaultItem) {
      return NextResponse.json({ error: 'Vault item not found' }, { status: 404 });
    }

    return NextResponse.json({ item: vaultItem });
  } catch (error) {
    console.error('Get vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const vaultItem = await VaultItem.findOne({
      _id: params.id,
      userId: payload.userId,
    });

    if (!vaultItem) {
      return NextResponse.json({ error: 'Vault item not found' }, { status: 404 });
    }

    // Generate salt and derive key for encryption
    const salt = await generateSalt();
    const key = await deriveKey(masterPassword, salt);

    // Encrypt sensitive data
    const encryptedPassword = await encrypt(password, key);
    const encryptedUsername = await encrypt(username, key);
    const encryptedNotes = notes ? await encrypt(notes, key) : '';

    vaultItem.title = title;
    vaultItem.username = encryptedUsername;
    vaultItem.password = encryptedPassword;
    vaultItem.url = url;
    vaultItem.notes = encryptedNotes;
    vaultItem.salt = salt;

    await vaultItem.save();

    return NextResponse.json({
      message: 'Vault item updated successfully',
      item: vaultItem,
    });
  } catch (error) {
    console.error('Update vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const vaultItem = await VaultItem.findOneAndDelete({
      _id: params.id,
      userId: payload.userId,
    });

    if (!vaultItem) {
      return NextResponse.json({ error: 'Vault item not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Vault item deleted successfully',
    });
  } catch (error) {
    console.error('Delete vault item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
