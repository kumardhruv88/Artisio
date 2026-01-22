import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description can not be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    compareAtPrice: {
        type: Number,
        default: null
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            // Artisan Food Categories
            'Coffee',
            'Chocolate',
            'Honey & Preserves',
            'Oils & Vinegars',
            'Tea',
            'Spices',
            'Cheese',
            'Bakery',
            'Nuts & Snacks',
            'Pasta & Grains',
            'Condiments',
            'Beverages',
            // Legacy Categories
            'Food & Pantry',
            'Home & Living',
            'Jewelry',
            'Ceramics',
            'Textiles',
            'Art',
            'Accessories',
            'Beauty & Wellness'
        ]
    },
    inventory: {
        stock: { type: Number, default: 0 },
        lowStockThreshold: { type: Number, default: 10 },
        trackInventory: { type: Boolean, default: true }
    },
    stock: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'archived'],
        default: 'published'
    },
    artisan: {
        type: String,
        required: true
    },
    dietary: {
        type: [String],
        default: []
    },
    origin: {
        type: String,
        default: ''
    },
    // NEW: Nutritional Information
    nutritionalInfo: {
        serving_size: { type: String, default: '' },
        calories: { type: Number, default: 0 },
        fat: { type: String, default: '' },
        carbs: { type: String, default: '' },
        protein: { type: String, default: '' },
        sugar: { type: String, default: '' },
        sodium: { type: String, default: '' },
        fiber: { type: String, default: '' },
        caffeine: { type: String, default: '' },
        calcium: { type: String, default: '' }
    },
    // NEW: Ingredients
    ingredients: {
        type: String,
        default: ''
    },
    // NEW: Product Variants
    variants: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to create slug from name
productSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name.toLowerCase().split(' ').join('-').replace(/[&']/g, '');
    }
    next();
});

export default mongoose.model('Product', productSchema);
