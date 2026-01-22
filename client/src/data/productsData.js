/**
 * Centralized Products Data
 * 250 products across 5 categories: Coffee & Tea, Honey & Jams, Oils & Vinegars, Chocolates, Beverages
 */

// Unsplash image collections by category
const images = {
    coffee: [
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600',
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600',
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
    ],
    tea: [
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600',
        'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600',
        'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600',
        'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600',
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600',
    ],
    honey: [
        'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=600',
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600',
        'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600',
        'https://images.unsplash.com/photo-1601063476271-1f31c53b1b5c?w=600',
        'https://images.unsplash.com/photo-1550411294-098cf28f5f3e?w=600',
    ],
    jam: [
        'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=600',
        'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
        'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600',
    ],
    oil: [
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600',
        'https://images.unsplash.com/photo-1596360415914-6fdd3e5b457a?w=600',
        'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600',
        'https://images.unsplash.com/photo-1612540139150-66ce6cbb50a6?w=600',
        'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600',
    ],
    vinegar: [
        'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600',
        'https://images.unsplash.com/photo-1621947081720-86970823b77a?w=600',
        'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600',
    ],
    chocolate: [
        'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600',
        'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600',
        'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600',
        'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600',
        'https://images.unsplash.com/photo-1548907040-4bea42c3d11d?w=600',
        'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600',
        'https://images.unsplash.com/photo-1553452118-621e1f860f43?w=600',
    ],
    beverages: [
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600',
        'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600',
        'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=600',
        'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600',
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600',
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600',
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600',
    ],
};

// Artisan data
const artisans = {
    coffee: [
        { name: 'Highland Roasters', location: 'Ethiopia' },
        { name: 'Blue Mountain Estate', location: 'Jamaica' },
        { name: 'Kona Pacific', location: 'Hawaii' },
        { name: 'Colombian Heritage', location: 'Colombia' },
        { name: 'Sumatra Select', location: 'Indonesia' },
        { name: 'Guatemala Highlands', location: 'Guatemala' },
        { name: 'Tuscan Roast Co.', location: 'Italy' },
        { name: 'Nordic Bean', location: 'Norway' },
    ],
    tea: [
        { name: 'Darjeeling Gardens', location: 'India' },
        { name: 'Kyoto Tea Masters', location: 'Japan' },
        { name: 'Formosa Oolong', location: 'Taiwan' },
        { name: 'Ceylon Heritage', location: 'Sri Lanka' },
        { name: 'Dragon Well Estate', location: 'China' },
    ],
    honey: [
        { name: 'Golden Hive', location: 'New Zealand' },
        { name: 'Wildflower Apiaries', location: 'California' },
        { name: 'Manuka Grove', location: 'New Zealand' },
        { name: 'Alpine Bee Co.', location: 'Switzerland' },
        { name: 'Lavender Fields', location: 'France' },
    ],
    jam: [
        { name: 'Berry Blessed', location: 'Oregon' },
        { name: 'Provence Preserves', location: 'France' },
        { name: 'Stone Fruit Kitchen', location: 'Georgia' },
        { name: 'Nordic Berries', location: 'Finland' },
    ],
    oil: [
        { name: 'Mediterranean Grove', location: 'Greece' },
        { name: 'Tuscan Gold', location: 'Italy' },
        { name: 'Andalusian Estates', location: 'Spain' },
        { name: 'California Olive Ranch', location: 'California' },
        { name: 'Cretan Heritage', location: 'Greece' },
    ],
    vinegar: [
        { name: 'Vineyard Heritage', location: 'Modena, Italy' },
        { name: 'Orchard Ferments', location: 'Vermont' },
        { name: 'Balsamic Masters', location: 'Italy' },
    ],
    chocolate: [
        { name: 'Cacao Dreams', location: 'Belgium' },
        { name: 'Swiss Alpine Confections', location: 'Switzerland' },
        { name: 'Single Origin Cacao', location: 'Ecuador' },
        { name: 'Parisian Chocolatiers', location: 'France' },
        { name: 'Madagascar Cacao', location: 'Madagascar' },
        { name: 'Venezuelan Cacao', location: 'Venezuela' },
    ],
    beverages: [
        { name: 'Craft Soda Co.', location: 'Brooklyn' },
        { name: 'Mountain Springs', location: 'Colorado' },
        { name: 'Tropical Pressery', location: 'Florida' },
        { name: 'Kombucha Culture', location: 'Portland' },
        { name: 'Ginger Works', location: 'Vermont' },
    ],
};

// Helper function to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomRating = () => (4 + Math.random() * 1).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 300) + 20;
const getRandomStock = () => Math.floor(Math.random() * 100) + 10;
const getRandomPrice = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);

// Product definitions by category
const productDefinitions = {
    'Coffee & Tea': [
        // Coffee Products (30)
        { name: 'Organic Ethiopian Coffee', subtitle: 'Single Origin · Light Roast', type: 'coffee' },
        { name: 'Colombian Supremo', subtitle: 'Medium Roast · Full Body', type: 'coffee' },
        { name: 'Blue Mountain Reserve', subtitle: 'Premium Jamaican · Smooth', type: 'coffee' },
        { name: 'Sumatra Mandheling', subtitle: 'Dark Roast · Earthy Notes', type: 'coffee' },
        { name: 'Guatemala Antigua', subtitle: 'Medium-Dark · Chocolate Notes', type: 'coffee' },
        { name: 'Kenya AA Plus', subtitle: 'Bright Acidity · Wine Notes', type: 'coffee' },
        { name: 'Costa Rica Tarrazu', subtitle: 'Light Roast · Citrus Notes', type: 'coffee' },
        { name: 'Brazilian Santos', subtitle: 'Medium Roast · Nutty', type: 'coffee' },
        { name: 'Kona Extra Fancy', subtitle: 'Hawaiian Premium · Silky', type: 'coffee' },
        { name: 'Papua New Guinea Organic', subtitle: 'Wild Grown · Complex', type: 'coffee' },
        { name: 'Yemeni Mocha', subtitle: 'Ancient Variety · Fruity', type: 'coffee' },
        { name: 'Rwanda Red Bourbon', subtitle: 'Single Origin · Floral', type: 'coffee' },
        { name: 'Mexican Chiapas', subtitle: 'Organic · Mild', type: 'coffee' },
        { name: 'Vietnamese Robusta', subtitle: 'Strong · Bold', type: 'coffee' },
        { name: 'Indonesian Java', subtitle: 'Estate Grown · Spicy', type: 'coffee' },
        { name: 'Espresso Perfetto Blend', subtitle: 'Italian Style · Crema Rich', type: 'coffee' },
        { name: 'French Roast Supreme', subtitle: 'Dark Roast · Smoky', type: 'coffee' },
        { name: 'Swiss Water Decaf', subtitle: 'Chemical-Free · Smooth', type: 'coffee' },
        { name: 'Cold Brew Concentrate', subtitle: 'Ready to Mix · Bold', type: 'coffee' },
        { name: 'Vanilla Bean Coffee', subtitle: 'Flavored · Sweet', type: 'coffee' },
        { name: 'Hazelnut Dreams', subtitle: 'Flavored · Nutty', type: 'coffee' },
        { name: 'Mocha Java Blend', subtitle: 'Classic · Balanced', type: 'coffee' },
        { name: 'Breakfast Blend', subtitle: 'Light-Medium · Bright', type: 'coffee' },
        { name: 'House Blend Reserve', subtitle: 'Medium · Everyday', type: 'coffee' },
        { name: 'Peaberry Tanzania', subtitle: 'Rare · Intense', type: 'coffee' },
        { name: 'Geisha Panama', subtitle: 'Competition Grade · Floral', type: 'coffee' },
        { name: 'Burundi Long Miles', subtitle: 'Micro-Lot · Complex', type: 'coffee' },
        { name: 'Honduras Marcala', subtitle: 'Fair Trade · Caramel', type: 'coffee' },
        { name: 'El Salvador Pacamara', subtitle: 'Limited Edition · Tropical', type: 'coffee' },
        { name: 'Peruvian High Altitude', subtitle: 'Organic · Bright', type: 'coffee' },
        // Tea Products (20)
        { name: 'Darjeeling First Flush', subtitle: 'The Champagne of Teas', type: 'tea' },
        { name: 'Japanese Matcha Premium', subtitle: 'Ceremonial Grade · Vibrant', type: 'tea' },
        { name: 'Oolong Formosa', subtitle: 'Traditional · Floral', type: 'tea' },
        { name: 'Earl Grey Supreme', subtitle: 'Bergamot Infused · Classic', type: 'tea' },
        { name: 'Ceylon Orange Pekoe', subtitle: 'Bold · Brisk', type: 'tea' },
        { name: 'Jasmine Pearl', subtitle: 'Hand-Rolled · Fragrant', type: 'tea' },
        { name: 'Dragon Well Green', subtitle: 'Pan-Fired · Sweet', type: 'tea' },
        { name: 'Assam Second Flush', subtitle: 'Malty · Strong', type: 'tea' },
        { name: 'White Peony', subtitle: 'Delicate · Subtle', type: 'tea' },
        { name: 'Pu-erh Aged 10 Years', subtitle: 'Fermented · Earthy', type: 'tea' },
        { name: 'Chai Masala Blend', subtitle: 'Spiced · Warming', type: 'tea' },
        { name: 'Rooibos African Red', subtitle: 'Caffeine-Free · Smooth', type: 'tea' },
        { name: 'English Breakfast Classic', subtitle: 'Bold · Traditional', type: 'tea' },
        { name: 'Genmaicha Rice Tea', subtitle: 'Japanese · Toasty', type: 'tea' },
        { name: 'Sencha Fukamushi', subtitle: 'Deep-Steamed · Rich', type: 'tea' },
        { name: 'Lapsang Souchong', subtitle: 'Smoked · Unique', type: 'tea' },
        { name: 'Chamomile Golden', subtitle: 'Herbal · Calming', type: 'tea' },
        { name: 'Peppermint Supreme', subtitle: 'Refreshing · Cooling', type: 'tea' },
        { name: 'Hibiscus Berry Blend', subtitle: 'Fruity · Tart', type: 'tea' },
        { name: 'Gyokuro Jade Dew', subtitle: 'Shade-Grown · Umami', type: 'tea' },
    ],
    'Honey & Jams': [
        // Honey Products (25)
        { name: 'Artisan Honey Collection', subtitle: 'Raw & Unfiltered', type: 'honey' },
        { name: 'Manuka Honey UMF 15+', subtitle: 'New Zealand Premium', type: 'honey' },
        { name: 'Wildflower Raw Honey', subtitle: 'Multi-Floral · Pure', type: 'honey' },
        { name: 'Acacia Honey', subtitle: 'Light & Mild · Italian', type: 'honey' },
        { name: 'Buckwheat Dark Honey', subtitle: 'Strong · Antioxidant Rich', type: 'honey' },
        { name: 'Lavender Infused Honey', subtitle: 'French Provence · Floral', type: 'honey' },
        { name: 'Orange Blossom Honey', subtitle: 'California Citrus · Sweet', type: 'honey' },
        { name: 'Clover Pure Honey', subtitle: 'Classic · Versatile', type: 'honey' },
        { name: 'Eucalyptus Honey', subtitle: 'Australian · Bold', type: 'honey' },
        { name: 'Chestnut Honey', subtitle: 'Italian · Slightly Bitter', type: 'honey' },
        { name: 'Forest Honey', subtitle: 'Honeydew · Complex', type: 'honey' },
        { name: 'Sage Honey', subtitle: 'California Wild · Light', type: 'honey' },
        { name: 'Tupelo Honey', subtitle: 'Southern · Never Crystallizes', type: 'honey' },
        { name: 'Heather Honey', subtitle: 'Scottish · Robust', type: 'honey' },
        { name: 'Rosemary Honey', subtitle: 'Mediterranean · Herbal', type: 'honey' },
        { name: 'Cinnamon Infused Honey', subtitle: 'Spiced · Warming', type: 'honey' },
        { name: 'Truffle Honey', subtitle: 'Gourmet · Savory', type: 'honey' },
        { name: 'Hot Honey', subtitle: 'Chili Infused · Spicy', type: 'honey' },
        { name: 'Honeycomb Natural', subtitle: 'Raw · Edible Comb', type: 'honey' },
        { name: 'Creamed Honey', subtitle: 'Spreadable · Smooth', type: 'honey' },
        { name: 'Sourwood Honey', subtitle: 'Appalachian · Rare', type: 'honey' },
        { name: 'Linden Honey', subtitle: 'Eastern European · Minty', type: 'honey' },
        { name: 'Sidr Honey', subtitle: 'Yemeni · Premium', type: 'honey' },
        { name: 'Blueberry Honey', subtitle: 'Maine · Fruity', type: 'honey' },
        { name: 'Meadowfoam Honey', subtitle: 'Pacific Northwest · Unique', type: 'honey' },
        // Jam Products (25)
        { name: 'Wild Strawberry Jam', subtitle: 'Small Batch · Intense', type: 'jam' },
        { name: 'Raspberry Preserve', subtitle: 'Seedless · Smooth', type: 'jam' },
        { name: 'Blueberry Compote', subtitle: 'Maine Wild · Pure', type: 'jam' },
        { name: 'Blackberry Bramble Jam', subtitle: 'Scottish Style · Rich', type: 'jam' },
        { name: 'Apricot Preserve', subtitle: 'French · Whole Fruit', type: 'jam' },
        { name: 'Fig Jam with Thyme', subtitle: 'Mediterranean · Savory', type: 'jam' },
        { name: 'Peach Butter', subtitle: 'Georgia · Silky', type: 'jam' },
        { name: 'Cherry Preserve', subtitle: 'Montmorency · Tart', type: 'jam' },
        { name: 'Plum Damson Jam', subtitle: 'English · Traditional', type: 'jam' },
        { name: 'Orange Marmalade', subtitle: 'Seville · Bitter-Sweet', type: 'jam' },
        { name: 'Lemon Curd', subtitle: 'British · Creamy', type: 'jam' },
        { name: 'Mango Chutney', subtitle: 'Indian · Spiced', type: 'jam' },
        { name: 'Pear Ginger Jam', subtitle: 'Autumn Harvest · Warming', type: 'jam' },
        { name: 'Cranberry Relish', subtitle: 'Holiday · Tangy', type: 'jam' },
        { name: 'Mixed Berry Jam', subtitle: 'Triple Berry · Classic', type: 'jam' },
        { name: 'Rose Petal Preserve', subtitle: 'Turkish · Floral', type: 'jam' },
        { name: 'Passion Fruit Curd', subtitle: 'Tropical · Tangy', type: 'jam' },
        { name: 'Quince Paste', subtitle: 'Spanish Membrillo · Dense', type: 'jam' },
        { name: 'Gooseberry Jam', subtitle: 'English Garden · Tart', type: 'jam' },
        { name: 'Elderflower Jelly', subtitle: 'Floral · Delicate', type: 'jam' },
        { name: 'Rhubarb Ginger Jam', subtitle: 'Spring Harvest · Zesty', type: 'jam' },
        { name: 'Lingonberry Preserve', subtitle: 'Scandinavian · Classic', type: 'jam' },
        { name: 'Cloudberry Jam', subtitle: 'Arctic · Rare', type: 'jam' },
        { name: 'Tomato Jam', subtitle: 'Savory · Unique', type: 'jam' },
        { name: 'Bacon Jam', subtitle: 'Smoky · Umami', type: 'jam' },
    ],
    'Oils & Vinegars': [
        // Oil Products (25)
        { name: 'Small Batch Olive Oil', subtitle: 'Extra Virgin · Cold Pressed', type: 'oil' },
        { name: 'Tuscan Extra Virgin', subtitle: 'Italian DOP · Peppery', type: 'oil' },
        { name: 'Greek Kalamata Oil', subtitle: 'Single Estate · Fruity', type: 'oil' },
        { name: 'Spanish Arbequina', subtitle: 'Mild · Buttery', type: 'oil' },
        { name: 'California Mission Blend', subtitle: 'New World · Robust', type: 'oil' },
        { name: 'Lemon Infused Olive Oil', subtitle: 'Citrus · Bright', type: 'oil' },
        { name: 'Garlic Infused Oil', subtitle: 'Roasted · Aromatic', type: 'oil' },
        { name: 'Basil Olive Oil', subtitle: 'Fresh Herb · Italian', type: 'oil' },
        { name: 'Chili Olive Oil', subtitle: 'Spicy · Vibrant', type: 'oil' },
        { name: 'Truffle Oil White', subtitle: 'Alba · Luxury', type: 'oil' },
        { name: 'Black Truffle Oil', subtitle: 'Perigord · Earthy', type: 'oil' },
        { name: 'Avocado Oil Premium', subtitle: 'High Heat · Neutral', type: 'oil' },
        { name: 'Walnut Oil French', subtitle: 'Roasted · Nutty', type: 'oil' },
        { name: 'Sesame Oil Toasted', subtitle: 'Asian · Aromatic', type: 'oil' },
        { name: 'Pumpkin Seed Oil', subtitle: 'Austrian · Earthy', type: 'oil' },
        { name: 'Hazelnut Oil', subtitle: 'Oregon · Sweet', type: 'oil' },
        { name: 'Argan Oil Culinary', subtitle: 'Moroccan · Nutty', type: 'oil' },
        { name: 'Pistachio Oil', subtitle: 'Sicilian · Delicate', type: 'oil' },
        { name: 'Flaxseed Oil Organic', subtitle: 'Cold Pressed · Omega Rich', type: 'oil' },
        { name: 'Hemp Seed Oil', subtitle: 'Organic · Nutritious', type: 'oil' },
        { name: 'Coconut Oil Virgin', subtitle: 'Cold Pressed · Pure', type: 'oil' },
        { name: 'Grapeseed Oil', subtitle: 'Light · Versatile', type: 'oil' },
        { name: 'Macadamia Oil', subtitle: 'Australian · Buttery', type: 'oil' },
        { name: 'Rosemary Olive Oil', subtitle: 'Herb Infused · Mediterranean', type: 'oil' },
        { name: 'Meyer Lemon Oil', subtitle: 'California · Bright', type: 'oil' },
        // Vinegar Products (25)
        { name: 'Aged Balsamic Vinegar', subtitle: '12 Years · Modena DOP', type: 'vinegar' },
        { name: 'Traditional Balsamic 25yr', subtitle: 'Acetaia · Complex', type: 'vinegar' },
        { name: 'White Balsamic', subtitle: 'Golden · Mild', type: 'vinegar' },
        { name: 'Apple Cider Vinegar', subtitle: 'Raw · With Mother', type: 'vinegar' },
        { name: 'Sherry Vinegar Reserva', subtitle: 'Spanish · Nutty', type: 'vinegar' },
        { name: 'Red Wine Vinegar', subtitle: 'French · Classic', type: 'vinegar' },
        { name: 'Champagne Vinegar', subtitle: 'Delicate · Light', type: 'vinegar' },
        { name: 'Rice Vinegar Premium', subtitle: 'Japanese · Mild', type: 'vinegar' },
        { name: 'Raspberry Vinegar', subtitle: 'Fruit Infused · Tangy', type: 'vinegar' },
        { name: 'Fig Balsamic', subtitle: 'Infused · Sweet', type: 'vinegar' },
        { name: 'Pomegranate Vinegar', subtitle: 'Persian · Tart', type: 'vinegar' },
        { name: 'Honey Balsamic', subtitle: 'Sweet · Smooth', type: 'vinegar' },
        { name: 'Black Garlic Balsamic', subtitle: 'Umami · Rich', type: 'vinegar' },
        { name: 'Maple Balsamic', subtitle: 'Vermont · Autumn', type: 'vinegar' },
        { name: 'Tarragon Vinegar', subtitle: 'French Herb · Classic', type: 'vinegar' },
        { name: 'Malt Vinegar', subtitle: 'British · Fish & Chips', type: 'vinegar' },
        { name: 'Black Vinegar Chinese', subtitle: 'Chinkiang · Complex', type: 'vinegar' },
        { name: 'Coconut Vinegar', subtitle: 'Filipino · Mild', type: 'vinegar' },
        { name: 'Date Vinegar', subtitle: 'Middle Eastern · Sweet', type: 'vinegar' },
        { name: 'Umeboshi Vinegar', subtitle: 'Japanese Plum · Salty', type: 'vinegar' },
        { name: 'Cane Vinegar', subtitle: 'Caribbean · Subtle', type: 'vinegar' },
        { name: 'Banyuls Vinegar', subtitle: 'French · Wine-like', type: 'vinegar' },
        { name: 'Pedro Ximenez Vinegar', subtitle: 'Sweet Sherry · Luxurious', type: 'vinegar' },
        { name: 'White Wine Vinegar', subtitle: 'Crisp · Clean', type: 'vinegar' },
        { name: 'Herb Garden Vinegar', subtitle: 'Multi-Herb · Fresh', type: 'vinegar' },
    ],
    'Chocolates': [
        { name: 'Handcrafted Dark Chocolate', subtitle: '72% Cacao · Single Origin', type: 'chocolate' },
        { name: 'Swiss Milk Chocolate Bar', subtitle: 'Alpine Milk · Creamy', type: 'chocolate' },
        { name: 'Belgian Assortment Box', subtitle: 'Mixed Pralines · Gift Set', type: 'chocolate' },
        { name: 'Dark Chocolate Truffles', subtitle: 'Ganache Filled · Luxurious', type: 'chocolate' },
        { name: 'Sea Salt Caramel Chocolates', subtitle: 'Butter Caramel · Sweet-Salty', type: 'chocolate' },
        { name: 'Madagascar 70% Dark', subtitle: 'Fruity Notes · Single Origin', type: 'chocolate' },
        { name: 'Venezuela Criollo', subtitle: 'Rare Cacao · Floral', type: 'chocolate' },
        { name: 'Ecuador Dark 85%', subtitle: 'Intense · Low Sugar', type: 'chocolate' },
        { name: 'Peru Single Origin', subtitle: 'Nutty · Smooth', type: 'chocolate' },
        { name: 'Ghana Milk Chocolate', subtitle: 'Classic · Rich', type: 'chocolate' },
        { name: 'White Chocolate Raspberry', subtitle: 'Creamy · Fruity', type: 'chocolate' },
        { name: 'Hazelnut Gianduja', subtitle: 'Italian · Nutty', type: 'chocolate' },
        { name: 'Pistachio Dark Chocolate', subtitle: 'Sicilian Nuts · Crunchy', type: 'chocolate' },
        { name: 'Almond Praline Bar', subtitle: 'Roasted · Sweet', type: 'chocolate' },
        { name: 'Orange Peel Dark', subtitle: 'Candied · Citrus', type: 'chocolate' },
        { name: 'Espresso Bean Chocolate', subtitle: 'Coffee Crunch · Bold', type: 'chocolate' },
        { name: 'Lavender Milk Chocolate', subtitle: 'Floral · Unique', type: 'chocolate' },
        { name: 'Chili Lime Dark', subtitle: 'Spicy · Mexican Style', type: 'chocolate' },
        { name: 'Matcha White Chocolate', subtitle: 'Japanese · Green Tea', type: 'chocolate' },
        { name: 'Rose Turkish Delight', subtitle: 'Middle Eastern · Exotic', type: 'chocolate' },
        { name: 'Salted Pretzel Milk', subtitle: 'Crunchy · Sweet-Salty', type: 'chocolate' },
        { name: 'Coconut Dark Chocolate', subtitle: 'Tropical · Toasted', type: 'chocolate' },
        { name: 'Mint Dark Chocolate', subtitle: 'Refreshing · Cool', type: 'chocolate' },
        { name: 'Peanut Butter Cups', subtitle: 'American Classic · Creamy', type: 'chocolate' },
        { name: 'Caramelized Banana', subtitle: 'Tropical · Unique', type: 'chocolate' },
        { name: 'Earl Grey Chocolate', subtitle: 'Tea Infused · British', type: 'chocolate' },
        { name: 'Bourbon Vanilla Truffle', subtitle: 'Madagascar · Smooth', type: 'chocolate' },
        { name: 'Champagne Truffles', subtitle: 'Sparkling · Celebratory', type: 'chocolate' },
        { name: 'Cognac Filled Chocolates', subtitle: 'French · Sophisticated', type: 'chocolate' },
        { name: 'Whiskey Cream Truffles', subtitle: 'Irish · Boozy', type: 'chocolate' },
        { name: 'Tahitian Vanilla Bar', subtitle: 'Premium · Aromatic', type: 'chocolate' },
        { name: 'Cardamom Milk Chocolate', subtitle: 'Indian Spice · Warming', type: 'chocolate' },
        { name: 'Ginger Dark Chocolate', subtitle: 'Crystallized · Zingy', type: 'chocolate' },
        { name: 'Fig Walnut Dark', subtitle: 'Mediterranean · Nutty', type: 'chocolate' },
        { name: 'Cherry Kirsch Chocolate', subtitle: 'Black Forest · Boozy', type: 'chocolate' },
        { name: 'Toffee Crunch Bar', subtitle: 'Butter Toffee · Crunchy', type: 'chocolate' },
        { name: 'Honeycomb Chocolate', subtitle: 'Cinder Toffee · British', type: 'chocolate' },
        { name: 'Marzipan Filled', subtitle: 'Almond · German Style', type: 'chocolate' },
        { name: 'Maple Pecan Dark', subtitle: 'Canadian · Autumn', type: 'chocolate' },
        { name: 'Passion Fruit Ganache', subtitle: 'Tropical · Tangy', type: 'chocolate' },
        { name: 'Ruby Chocolate Bar', subtitle: 'Pink Cacao · Fruity', type: 'chocolate' },
        { name: 'Blonde Chocolate', subtitle: 'Caramelized · New', type: 'chocolate' },
        { name: 'Sugar-Free Dark 70%', subtitle: 'Stevia · Diabetic Friendly', type: 'chocolate' },
        { name: 'Vegan Milk Alternative', subtitle: 'Oat Milk · Dairy-Free', type: 'chocolate' },
        { name: 'Raw Cacao Nibs', subtitle: 'Superfood · Bitter', type: 'chocolate' },
        { name: 'Chocolate Covered Almonds', subtitle: 'Roasted · Classic', type: 'chocolate' },
        { name: 'Chocolate Raisins', subtitle: 'Plump · Sweet', type: 'chocolate' },
        { name: 'Chocolate Goji Berries', subtitle: 'Superfood · Tangy', type: 'chocolate' },
        { name: 'Hot Chocolate Bombs', subtitle: 'Marshmallow Filled · Fun', type: 'chocolate' },
        { name: 'Drinking Chocolate', subtitle: 'Thick · European Style', type: 'chocolate' },
    ],
    'Beverages': [
        { name: 'Craft Ginger Beer', subtitle: 'Spicy · Authentic', type: 'beverages' },
        { name: 'Elderflower Sparkling', subtitle: 'Floral · Refreshing', type: 'beverages' },
        { name: 'Blood Orange Soda', subtitle: 'Italian · Citrus', type: 'beverages' },
        { name: 'Lavender Lemonade', subtitle: 'Provence · Relaxing', type: 'beverages' },
        { name: 'Hibiscus Cooler', subtitle: 'Mexican · Tangy', type: 'beverages' },
        { name: 'Pomegranate Sparkling', subtitle: 'Persian · Antioxidant', type: 'beverages' },
        { name: 'Craft Root Beer', subtitle: 'Small Batch · Classic', type: 'beverages' },
        { name: 'Cream Soda Artisan', subtitle: 'Vanilla · Creamy', type: 'beverages' },
        { name: 'Cola Craft Natural', subtitle: 'Real Kola · Unique', type: 'beverages' },
        { name: 'Birch Beer', subtitle: 'Eastern US · Traditional', type: 'beverages' },
        { name: 'Sarsaparilla', subtitle: 'Old West · Herbal', type: 'beverages' },
        { name: 'Ginger Kombucha', subtitle: 'Probiotic · Zingy', type: 'beverages' },
        { name: 'Mango Kombucha', subtitle: 'Tropical · Gut Health', type: 'beverages' },
        { name: 'Berry Kombucha', subtitle: 'Antioxidant · Fizzy', type: 'beverages' },
        { name: 'Green Tea Kombucha', subtitle: 'Energizing · Light', type: 'beverages' },
        { name: 'Turmeric Tonic', subtitle: 'Anti-Inflammatory · Earthy', type: 'beverages' },
        { name: 'Switchel Traditional', subtitle: 'Apple Cider · Vermont', type: 'beverages' },
        { name: 'Shrub Raspberry', subtitle: 'Drinking Vinegar · Tangy', type: 'beverages' },
        { name: 'Cold Pressed Orange', subtitle: 'Fresh · Vitamin C', type: 'beverages' },
        { name: 'Green Juice Blend', subtitle: 'Kale Spinach · Detox', type: 'beverages' },
        { name: 'Beet Carrot Juice', subtitle: 'Earthy · Energizing', type: 'beverages' },
        { name: 'Watermelon Agua Fresca', subtitle: 'Mexican · Summer', type: 'beverages' },
        { name: 'Horchata Traditional', subtitle: 'Rice Milk · Cinnamon', type: 'beverages' },
        { name: 'Thai Iced Tea Mix', subtitle: 'Creamy · Spiced', type: 'beverages' },
        { name: 'Matcha Latte Powder', subtitle: 'Instant · Creamy', type: 'beverages' },
        { name: 'Golden Milk Mix', subtitle: 'Turmeric · Warming', type: 'beverages' },
        { name: 'Hot Cocoa Premium', subtitle: 'Dutch Process · Rich', type: 'beverages' },
        { name: 'Chai Concentrate', subtitle: 'Spiced · Ready Mix', type: 'beverages' },
        { name: 'Sparkling Water Lime', subtitle: 'Natural · Refreshing', type: 'beverages' },
        { name: 'Tonic Water Craft', subtitle: 'Quinine · Botanical', type: 'beverages' },
        { name: 'Club Soda Premium', subtitle: 'Effervescent · Clean', type: 'beverages' },
        { name: 'Coconut Water Pure', subtitle: 'Young · Electrolytes', type: 'beverages' },
        { name: 'Aloe Vera Drink', subtitle: 'Korean · Refreshing', type: 'beverages' },
        { name: 'Cactus Water', subtitle: 'Prickly Pear · Unique', type: 'beverages' },
        { name: 'Maple Water', subtitle: 'Vermont · Light', type: 'beverages' },
        { name: 'Birch Water', subtitle: 'Nordic · Mineral', type: 'beverages' },
        { name: 'Rose Water Drink', subtitle: 'Persian · Floral', type: 'beverages' },
        { name: 'Cucumber Mint Water', subtitle: 'Spa · Refreshing', type: 'beverages' },
        { name: 'Lychee Sparkling', subtitle: 'Asian · Sweet', type: 'beverages' },
        { name: 'Yuzu Lemonade', subtitle: 'Japanese Citrus · Unique', type: 'beverages' },
        { name: 'Tamarind Soda', subtitle: 'Mexican · Tangy', type: 'beverages' },
        { name: 'Guava Nectar', subtitle: 'Tropical · Sweet', type: 'beverages' },
        { name: 'Mango Lassi', subtitle: 'Indian · Creamy', type: 'beverages' },
        { name: 'Açaí Berry Blend', subtitle: 'Brazilian · Superfood', type: 'beverages' },
        { name: 'Passion Fruit Juice', subtitle: 'Tropical · Tangy', type: 'beverages' },
        { name: 'Grapefruit Sparkling', subtitle: 'Bitter · Refreshing', type: 'beverages' },
        { name: 'Cranberry Spritzer', subtitle: 'Tart · Festive', type: 'beverages' },
        { name: 'Peach Iced Tea', subtitle: 'Southern · Sweet', type: 'beverages' },
        { name: 'Arnold Palmer', subtitle: 'Half Tea Half Lemonade', type: 'beverages' },
        { name: 'Mint Julep Mix', subtitle: 'Kentucky · Fresh', type: 'beverages' },
    ],
};

// Generate complete product objects
let productId = 1;
const products = [];

const badges = ['New', 'Bestseller', 'Sale', null, null, null]; // 50% chance of no badge
const certifications = {
    coffee: ['USDA Organic', 'Fair Trade', 'Rainforest Alliance'],
    tea: ['Organic', 'Direct Trade', 'Sustainable'],
    honey: ['Raw', 'Organic', 'Non-GMO'],
    jam: ['Small Batch', 'No Preservatives', 'Organic'],
    oil: ['Extra Virgin', 'Cold Pressed', 'Organic', 'PDO'],
    vinegar: ['Aged', 'Traditional', 'DOP'],
    chocolate: ['Fair Trade', 'Organic', 'Bean-to-Bar'],
    beverages: ['Organic', 'Non-GMO', 'No Added Sugar'],
};

const tags = {
    coffee: ['Organic', 'Fair Trade', 'Single Origin', 'Specialty', 'Artisan Roasted'],
    tea: ['Organic', 'Loose Leaf', 'Single Estate', 'Hand-Picked'],
    honey: ['Raw', 'Unfiltered', 'Local', 'Organic'],
    jam: ['Low Sugar', 'Organic', 'Small Batch', 'Artisan'],
    oil: ['Cold Pressed', 'Extra Virgin', 'Infused', 'Single Estate'],
    vinegar: ['Aged', 'Organic', 'Traditional', 'Infused'],
    chocolate: ['Bean-to-Bar', 'Fair Trade', 'Single Origin', 'Organic'],
    beverages: ['Craft', 'Organic', 'Probiotic', 'No Preservatives'],
};

const priceRanges = {
    coffee: [14.99, 49.99],
    tea: [9.99, 39.99],
    honey: [12.99, 79.99],
    jam: [7.99, 24.99],
    oil: [16.99, 69.99],
    vinegar: [8.99, 89.99],
    chocolate: [5.99, 45.99],
    beverages: [3.99, 19.99],
};

Object.entries(productDefinitions).forEach(([category, items]) => {
    items.forEach((item) => {
        const type = item.type;
        const artisanList = artisans[type] || artisans.coffee;
        const imageList = images[type] || images.coffee;
        const certList = certifications[type] || certifications.coffee;
        const tagList = tags[type] || tags.coffee;
        const [minPrice, maxPrice] = priceRanges[type] || [10, 50];

        const basePrice = getRandomPrice(minPrice, maxPrice);
        const hasSale = Math.random() < 0.15; // 15% chance of sale
        const selectedBadge = hasSale ? 'Sale' : getRandomItem(badges);

        const product = {
            id: productId++,
            name: item.name,
            subtitle: item.subtitle,
            price: basePrice,
            salePrice: hasSale ? +(basePrice * 0.8).toFixed(2) : null,
            image: getRandomItem(imageList),
            images: [
                getRandomItem(imageList),
                getRandomItem(imageList),
                getRandomItem(imageList),
                getRandomItem(imageList),
            ],
            rating: parseFloat(getRandomRating()),
            reviews: getRandomReviews(),
            stock: getRandomStock(),
            badge: selectedBadge,
            category: category,
            artisan: getRandomItem(artisanList),
            shortDescription: `Discover the exceptional quality of our ${item.name}. Carefully sourced and crafted by expert artisans, this ${type} delivers an unforgettable experience.`,
            description: `Our ${item.name} represents the pinnacle of artisan craftsmanship. Each batch is carefully curated to ensure the highest quality and authentic flavor profiles.\n\nSourced from trusted artisan producers who have perfected their craft over generations, this product showcases the unique characteristics that make it truly special. Whether you're a connoisseur or new to artisan ${type}, you'll appreciate the attention to detail in every aspect.`,
            variants: getVariantsForType(type),
            ingredients: getIngredientsForType(type, item.name),
            nutritionalInfo: getNutritionalInfoForType(type),
            tags: tagList.slice(0, 3),
            certifications: certList.slice(0, Math.floor(Math.random() * 3) + 1),
        };

        products.push(product);
    });
});

function getVariantsForType(type) {
    switch (type) {
        case 'coffee':
            return {
                size: ['250g', '500g', '1kg'],
                grind: ['Whole Bean', 'Espresso', 'Filter', 'French Press']
            };
        case 'tea':
            return {
                size: ['50g', '100g', '250g'],
                format: ['Loose Leaf', 'Tea Bags', 'Pyramid Bags']
            };
        case 'honey':
            return {
                size: ['250g', '500g', '1kg']
            };
        case 'jam':
            return {
                size: ['200g', '400g']
            };
        case 'oil':
            return {
                size: ['250ml', '500ml', '1L']
            };
        case 'vinegar':
            return {
                size: ['100ml', '250ml', '500ml']
            };
        case 'chocolate':
            return {
                size: ['50g', '100g', '200g'],
                type: ['Bar', 'Gift Box']
            };
        case 'beverages':
            return {
                size: ['330ml', '750ml', '1L'],
                pack: ['Single', '4-Pack', '12-Pack']
            };
        default:
            return { size: ['Small', 'Medium', 'Large'] };
    }
}

function getIngredientsForType(type, name) {
    switch (type) {
        case 'coffee':
            return ['100% Arabica Coffee Beans'];
        case 'tea':
            return [`Premium ${name.split(' ')[0]} Tea Leaves`];
        case 'honey':
            return ['100% Pure Raw Honey'];
        case 'jam':
            return ['Fruit', 'Organic Cane Sugar', 'Lemon Juice', 'Pectin'];
        case 'oil':
            return ['100% Cold Pressed Oil'];
        case 'vinegar':
            return ['Aged Vinegar', 'Natural Flavors'];
        case 'chocolate':
            return ['Cacao Beans', 'Cacao Butter', 'Organic Cane Sugar', 'Vanilla'];
        case 'beverages':
            return ['Filtered Water', 'Natural Flavors', 'Organic Sweeteners'];
        default:
            return ['Premium Ingredients'];
    }
}

function getNutritionalInfoForType(type) {
    switch (type) {
        case 'coffee':
            return { 'Serving': '240ml', 'Calories': '2', 'Caffeine': '95mg' };
        case 'tea':
            return { 'Serving': '240ml', 'Calories': '0', 'Caffeine': '25-50mg' };
        case 'honey':
            return { 'Serving': '1 tbsp', 'Calories': '64', 'Sugar': '17g' };
        case 'jam':
            return { 'Serving': '1 tbsp', 'Calories': '50', 'Sugar': '12g' };
        case 'oil':
            return { 'Serving': '1 tbsp', 'Calories': '120', 'Fat': '14g' };
        case 'vinegar':
            return { 'Serving': '1 tbsp', 'Calories': '3', 'Carbs': '0.5g' };
        case 'chocolate':
            return { 'Serving': '40g', 'Calories': '210', 'Sugar': '18g' };
        case 'beverages':
            return { 'Serving': '330ml', 'Calories': '80', 'Sugar': '20g' };
        default:
            return { 'Serving': 'Varies', 'Calories': 'Varies' };
    }
}

// Export products array and helper functions
export default products;

export const getProductById = (id) => products.find(p => p.id === Number(id));

export const getProductsByCategory = (category) => {
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
};

export const categories = ['All', 'Coffee & Tea', 'Honey & Jams', 'Oils & Vinegars', 'Chocolates', 'Beverages'];
