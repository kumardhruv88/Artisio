import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

// Load env vars
dotenv.config(); // Loads .env from CWD (server/) by default

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🔌 MongoDB Connected');

        // Read JSON file
        const dataPath = path.join(__dirname, 'scraped_products.json');
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const products = JSON.parse(jsonData);

        console.log(`📦 Found ${products.length} products to import...`);

        // Clear existing products
        await Product.deleteMany({});
        console.log('🧹 Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('✅ Data Imported Successfully!');

        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
