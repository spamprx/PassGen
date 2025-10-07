// Simple migration script to add salt field to existing vault items
// Run this once to update existing data

import mongoose from 'mongoose';
import { generateSalt } from './src/lib/encryption';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

// Migration function
const migrateVaultItems = async () => {
  try {
    const VaultItem = mongoose.model('VaultItem', new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      title: String,
      username: String,
      password: String,
      url: String,
      notes: String,
      salt: String,
    }, { timestamps: true }));

    // Find all vault items without salt
    const itemsWithoutSalt = await VaultItem.find({ salt: { $exists: false } });
    
    console.log(`Found ${itemsWithoutSalt.length} items without salt`);
    
    // Add salt to each item
    for (const item of itemsWithoutSalt) {
      const salt = await generateSalt();
      await VaultItem.updateOne({ _id: item._id }, { salt });
      console.log(`Updated item: ${item.title}`);
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run migration
connectDB().then(() => {
  migrateVaultItems();
});
