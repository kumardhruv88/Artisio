import time
import json
import random
import os
import requests

# --- CONFIGURATION ---
UNSPLASH_ACCESS_KEY = "Cq_pACOv2IcQBPMV40Z9Gj__be_wxwoEaQ_5qVQRaWU"

# Expanded product templates for 200+ products
PRODUCT_TEMPLATES = [
    # ============ COFFEE (25 products) ============
    {"query": "artisan coffee beans", "name": "Ethiopian Yirgacheffe Coffee", "category": "Coffee", "base_price": 24},
    {"query": "coffee roasting", "name": "Colombian Supremo Beans", "category": "Coffee", "base_price": 22},
    {"query": "specialty coffee", "name": "Guatemalan Antigua Coffee", "category": "Coffee", "base_price": 26},
    {"query": "coffee beans bag", "name": "Brazilian Santos Coffee", "category": "Coffee", "base_price": 20},
    {"query": "dark roast coffee", "name": "Italian Espresso Blend", "category": "Coffee", "base_price": 28},
    {"query": "light roast coffee", "name": "Kenyan AA Single Origin", "category": "Coffee", "base_price": 32},
    {"query": "organic coffee", "name": "Peruvian Organic Fair Trade", "category": "Coffee", "base_price": 25},
    {"query": "french roast coffee", "name": "French Roast Supreme", "category": "Coffee", "base_price": 22},
    {"query": "arabica coffee", "name": "Costa Rican Tarrazu", "category": "Coffee", "base_price": 28},
    {"query": "mocha coffee", "name": "Sumatran Mandheling", "category": "Coffee", "base_price": 26},
    {"query": "decaf coffee", "name": "Swiss Water Decaf Blend", "category": "Coffee", "base_price": 24},
    {"query": "espresso beans", "name": "Naples Style Espresso", "category": "Coffee", "base_price": 30},
    {"query": "coffee plantation", "name": "Jamaican Blue Mountain", "category": "Coffee", "base_price": 58},
    {"query": "coffee blend", "name": "House Breakfast Blend", "category": "Coffee", "base_price": 18},
    {"query": "single origin coffee", "name": "Papua New Guinea Estate", "category": "Coffee", "base_price": 29},
    {"query": "coffee cup", "name": "Vietnamese Robusta Bold", "category": "Coffee", "base_price": 16},
    {"query": "coffee farm", "name": "Honduras Highland Reserve", "category": "Coffee", "base_price": 23},
    {"query": "fresh coffee", "name": "Mexican Chiapas Organic", "category": "Coffee", "base_price": 21},
    {"query": "coffee grinder", "name": "Rwanda Red Bourbon", "category": "Coffee", "base_price": 27},
    {"query": "barista coffee", "name": "Tanzania Peaberry", "category": "Coffee", "base_price": 31},
    {"query": "black coffee", "name": "Indian Mysore Nuggets", "category": "Coffee", "base_price": 25},
    {"query": "coffee brewing", "name": "Yemen Mocha Sanani", "category": "Coffee", "base_price": 45},
    {"query": "flavored coffee", "name": "Hazelnut Cream Coffee", "category": "Coffee", "base_price": 19},
    {"query": "vanilla coffee", "name": "French Vanilla Bean", "category": "Coffee", "base_price": 20},
    {"query": "caramel coffee", "name": "Caramel Macchiato Blend", "category": "Coffee", "base_price": 21},
    
    # ============ CHOCOLATE (25 products) ============
    {"query": "artisan chocolate bar", "name": "Single Origin Dark Chocolate 72%", "category": "Chocolate", "base_price": 12},
    {"query": "handmade chocolate", "name": "Sea Salt Caramel Chocolate", "category": "Chocolate", "base_price": 14},
    {"query": "luxury chocolate", "name": "Madagascar Vanilla Chocolate", "category": "Chocolate", "base_price": 16},
    {"query": "chocolate truffle", "name": "Assorted Truffle Collection", "category": "Chocolate", "base_price": 32},
    {"query": "cacao beans", "name": "Raw Cacao Nibs Premium", "category": "Chocolate", "base_price": 18},
    {"query": "milk chocolate", "name": "Belgian Milk Chocolate Bar", "category": "Chocolate", "base_price": 10},
    {"query": "white chocolate", "name": "Ivory White Chocolate", "category": "Chocolate", "base_price": 11},
    {"query": "dark chocolate", "name": "Venezuela Dark 85%", "category": "Chocolate", "base_price": 15},
    {"query": "chocolate gift box", "name": "Luxury Chocolate Gift Box", "category": "Chocolate", "base_price": 48},
    {"query": "hot chocolate", "name": "Artisan Hot Cocoa Mix", "category": "Chocolate", "base_price": 14},
    {"query": "chocolate spread", "name": "Hazelnut Chocolate Spread", "category": "Chocolate", "base_price": 12},
    {"query": "cocoa powder", "name": "Dutch Process Cocoa Powder", "category": "Chocolate", "base_price": 16},
    {"query": "chocolate bonbon", "name": "Handcrafted Bonbon Set", "category": "Chocolate", "base_price": 28},
    {"query": "ruby chocolate", "name": "Ruby Chocolate Bar", "category": "Chocolate", "base_price": 18},
    {"query": "mint chocolate", "name": "Dark Mint Chocolate Thins", "category": "Chocolate", "base_price": 13},
    {"query": "orange chocolate", "name": "Orange Peel Dark Chocolate", "category": "Chocolate", "base_price": 14},
    {"query": "espresso chocolate", "name": "Espresso Bean Chocolate", "category": "Chocolate", "base_price": 15},
    {"query": "almond chocolate", "name": "Roasted Almond Milk Chocolate", "category": "Chocolate", "base_price": 12},
    {"query": "hazelnut chocolate", "name": "Gianduja Hazelnut Bar", "category": "Chocolate", "base_price": 16},
    {"query": "coconut chocolate", "name": "Toasted Coconut Dark Chocolate", "category": "Chocolate", "base_price": 13},
    {"query": "berry chocolate", "name": "Raspberry Filled Truffles", "category": "Chocolate", "base_price": 22},
    {"query": "chili chocolate", "name": "Spicy Chili Dark Chocolate", "category": "Chocolate", "base_price": 14},
    {"query": "matcha chocolate", "name": "Matcha White Chocolate", "category": "Chocolate", "base_price": 15},
    {"query": "sugar free chocolate", "name": "Sugar-Free Dark Collection", "category": "Chocolate", "base_price": 17},
    {"query": "vegan chocolate", "name": "Vegan Oat Milk Chocolate", "category": "Chocolate", "base_price": 14},
    
    # ============ HONEY & PRESERVES (30 products) ============
    {"query": "organic honey jar", "name": "Wildflower Raw Honey", "category": "Honey & Preserves", "base_price": 18},
    {"query": "honeycomb", "name": "Pure Honeycomb Chunks", "category": "Honey & Preserves", "base_price": 24},
    {"query": "lavender honey", "name": "Lavender Infused Honey", "category": "Honey & Preserves", "base_price": 22},
    {"query": "manuka honey", "name": "Premium Manuka Honey UMF 15+", "category": "Honey & Preserves", "base_price": 45},
    {"query": "strawberry jam", "name": "Wild Strawberry Preserves", "category": "Honey & Preserves", "base_price": 14},
    {"query": "fruit preserves", "name": "Fig & Walnut Jam", "category": "Honey & Preserves", "base_price": 16},
    {"query": "marmalade", "name": "Blood Orange Marmalade", "category": "Honey & Preserves", "base_price": 15},
    {"query": "berry jam", "name": "Mixed Berry Compote", "category": "Honey & Preserves", "base_price": 14},
    {"query": "clover honey", "name": "Clover Blossom Honey", "category": "Honey & Preserves", "base_price": 16},
    {"query": "acacia honey", "name": "Italian Acacia Honey", "category": "Honey & Preserves", "base_price": 20},
    {"query": "buckwheat honey", "name": "Dark Buckwheat Honey", "category": "Honey & Preserves", "base_price": 18},
    {"query": "orange blossom honey", "name": "Orange Blossom Honey", "category": "Honey & Preserves", "base_price": 19},
    {"query": "apricot jam", "name": "Apricot Preserve", "category": "Honey & Preserves", "base_price": 13},
    {"query": "peach jam", "name": "Georgia Peach Jam", "category": "Honey & Preserves", "base_price": 14},
    {"query": "blueberry jam", "name": "Maine Blueberry Preserves", "category": "Honey & Preserves", "base_price": 15},
    {"query": "raspberry jam", "name": "Red Raspberry Jam", "category": "Honey & Preserves", "base_price": 14},
    {"query": "blackberry jam", "name": "Wild Blackberry Jam", "category": "Honey & Preserves", "base_price": 15},
    {"query": "cherry preserves", "name": "Morello Cherry Preserves", "category": "Honey & Preserves", "base_price": 16},
    {"query": "lemon curd", "name": "Meyer Lemon Curd", "category": "Honey & Preserves", "base_price": 12},
    {"query": "apple butter", "name": "Spiced Apple Butter", "category": "Honey & Preserves", "base_price": 11},
    {"query": "pumpkin butter", "name": "Autumn Pumpkin Butter", "category": "Honey & Preserves", "base_price": 12},
    {"query": "truffle honey", "name": "Black Truffle Honey", "category": "Honey & Preserves", "base_price": 28},
    {"query": "cinnamon honey", "name": "Cinnamon Infused Honey", "category": "Honey & Preserves", "base_price": 17},
    {"query": "ginger honey", "name": "Ginger Root Honey", "category": "Honey & Preserves", "base_price": 18},
    {"query": "hot honey", "name": "Spicy Hot Honey", "category": "Honey & Preserves", "base_price": 16},
    {"query": "plum jam", "name": "Italian Plum Preserves", "category": "Honey & Preserves", "base_price": 14},
    {"query": "grape jelly", "name": "Concord Grape Jelly", "category": "Honey & Preserves", "base_price": 10},
    {"query": "quince paste", "name": "Spanish Membrillo", "category": "Honey & Preserves", "base_price": 15},
    {"query": "rose jam", "name": "Turkish Rose Petal Jam", "category": "Honey & Preserves", "base_price": 18},
    {"query": "chestnut honey", "name": "Corsican Chestnut Honey", "category": "Honey & Preserves", "base_price": 22},
    
    # ============ OILS & VINEGARS (25 products) ============
    {"query": "olive oil bottle", "name": "Extra Virgin Olive Oil", "category": "Oils & Vinegars", "base_price": 28},
    {"query": "truffle oil", "name": "White Truffle Oil", "category": "Oils & Vinegars", "base_price": 38},
    {"query": "balsamic vinegar", "name": "Aged Balsamic Vinegar 12yr", "category": "Oils & Vinegars", "base_price": 34},
    {"query": "avocado oil", "name": "Cold-Pressed Avocado Oil", "category": "Oils & Vinegars", "base_price": 26},
    {"query": "sesame oil", "name": "Toasted Sesame Oil", "category": "Oils & Vinegars", "base_price": 14},
    {"query": "walnut oil", "name": "French Walnut Oil", "category": "Oils & Vinegars", "base_price": 22},
    {"query": "pumpkin seed oil", "name": "Austrian Pumpkin Seed Oil", "category": "Oils & Vinegars", "base_price": 24},
    {"query": "coconut oil", "name": "Virgin Coconut Oil", "category": "Oils & Vinegars", "base_price": 16},
    {"query": "flaxseed oil", "name": "Organic Flaxseed Oil", "category": "Oils & Vinegars", "base_price": 18},
    {"query": "infused olive oil", "name": "Lemon Infused Olive Oil", "category": "Oils & Vinegars", "base_price": 24},
    {"query": "garlic oil", "name": "Roasted Garlic Olive Oil", "category": "Oils & Vinegars", "base_price": 22},
    {"query": "chili oil", "name": "Calabrian Chili Oil", "category": "Oils & Vinegars", "base_price": 18},
    {"query": "basil oil", "name": "Fresh Basil Olive Oil", "category": "Oils & Vinegars", "base_price": 20},
    {"query": "apple cider vinegar", "name": "Raw Apple Cider Vinegar", "category": "Oils & Vinegars", "base_price": 12},
    {"query": "red wine vinegar", "name": "Cabernet Red Wine Vinegar", "category": "Oils & Vinegars", "base_price": 14},
    {"query": "white wine vinegar", "name": "Champagne Wine Vinegar", "category": "Oils & Vinegars", "base_price": 16},
    {"query": "sherry vinegar", "name": "Spanish Sherry Vinegar", "category": "Oils & Vinegars", "base_price": 18},
    {"query": "rice vinegar", "name": "Japanese Rice Vinegar", "category": "Oils & Vinegars", "base_price": 10},
    {"query": "fig balsamic", "name": "Fig Balsamic Reduction", "category": "Oils & Vinegars", "base_price": 22},
    {"query": "honey vinegar", "name": "Honey Wine Vinegar", "category": "Oils & Vinegars", "base_price": 16},
    {"query": "raspberry vinegar", "name": "Raspberry Vinegar", "category": "Oils & Vinegars", "base_price": 14},
    {"query": "pomegranate vinegar", "name": "Pomegranate Balsamic", "category": "Oils & Vinegars", "base_price": 18},
    {"query": "black truffle oil", "name": "Black Truffle Olive Oil", "category": "Oils & Vinegars", "base_price": 42},
    {"query": "hazelnut oil", "name": "Roasted Hazelnut Oil", "category": "Oils & Vinegars", "base_price": 26},
    {"query": "macadamia oil", "name": "Australian Macadamia Oil", "category": "Oils & Vinegars", "base_price": 28},
    
    # ============ TEA (30 products) ============
    {"query": "loose leaf tea", "name": "Organic Earl Grey Tea", "category": "Tea", "base_price": 16},
    {"query": "herbal tea", "name": "Chamomile Lavender Blend", "category": "Tea", "base_price": 14},
    {"query": "matcha powder", "name": "Ceremonial Grade Matcha", "category": "Tea", "base_price": 32},
    {"query": "oolong tea", "name": "Taiwanese High Mountain Oolong", "category": "Tea", "base_price": 24},
    {"query": "tea leaves", "name": "Jasmine Green Tea Pearls", "category": "Tea", "base_price": 18},
    {"query": "black tea", "name": "English Breakfast Premium", "category": "Tea", "base_price": 14},
    {"query": "green tea", "name": "Japanese Sencha", "category": "Tea", "base_price": 16},
    {"query": "white tea", "name": "White Peony Silver Needle", "category": "Tea", "base_price": 28},
    {"query": "puerh tea", "name": "Aged Puerh Tea Cake", "category": "Tea", "base_price": 45},
    {"query": "chai tea", "name": "Masala Chai Spice Blend", "category": "Tea", "base_price": 15},
    {"query": "rooibos tea", "name": "South African Rooibos", "category": "Tea", "base_price": 14},
    {"query": "mint tea", "name": "Moroccan Mint Tea", "category": "Tea", "base_price": 13},
    {"query": "ginger tea", "name": "Ginger Lemon Wellness Tea", "category": "Tea", "base_price": 14},
    {"query": "hibiscus tea", "name": "Hibiscus Berry Herbal", "category": "Tea", "base_price": 13},
    {"query": "turmeric tea", "name": "Golden Turmeric Tea", "category": "Tea", "base_price": 15},
    {"query": "darjeeling tea", "name": "Darjeeling First Flush", "category": "Tea", "base_price": 26},
    {"query": "assam tea", "name": "Assam Breakfast Bold", "category": "Tea", "base_price": 15},
    {"query": "ceylon tea", "name": "Ceylon Orange Pekoe", "category": "Tea", "base_price": 16},
    {"query": "lapsang souchong", "name": "Lapsang Souchong Smoky", "category": "Tea", "base_price": 20},
    {"query": "bergamot tea", "name": "Lady Grey Citrus", "category": "Tea", "base_price": 16},
    {"query": "butterfly pea tea", "name": "Blue Butterfly Pea Flower", "category": "Tea", "base_price": 18},
    {"query": "rose tea", "name": "Rose Petal Black Tea", "category": "Tea", "base_price": 17},
    {"query": "peach tea", "name": "White Peach Oolong", "category": "Tea", "base_price": 19},
    {"query": "vanilla tea", "name": "Vanilla Rooibos", "category": "Tea", "base_price": 15},
    {"query": "lavender tea", "name": "Lavender Earl Grey", "category": "Tea", "base_price": 17},
    {"query": "yerba mate", "name": "Argentine Yerba Mate", "category": "Tea", "base_price": 14},
    {"query": "hojicha tea", "name": "Japanese Hojicha Roasted", "category": "Tea", "base_price": 18},
    {"query": "genmaicha", "name": "Genmaicha Brown Rice Tea", "category": "Tea", "base_price": 16},
    {"query": "gyokuro tea", "name": "Premium Gyokuro", "category": "Tea", "base_price": 38},
    {"query": "iced tea", "name": "Summer Peach Iced Tea Blend", "category": "Tea", "base_price": 14},
    
    # ============ SPICES (25 products) ============
    {"query": "saffron threads", "name": "Premium Saffron Threads", "category": "Spices", "base_price": 42},
    {"query": "vanilla beans", "name": "Madagascar Vanilla Beans", "category": "Spices", "base_price": 28},
    {"query": "spice collection", "name": "Global Spice Collection", "category": "Spices", "base_price": 36},
    {"query": "cardamom pods", "name": "Green Cardamom Pods", "category": "Spices", "base_price": 22},
    {"query": "cinnamon sticks", "name": "Ceylon True Cinnamon", "category": "Spices", "base_price": 16},
    {"query": "turmeric powder", "name": "Organic Turmeric Powder", "category": "Spices", "base_price": 14},
    {"query": "black pepper", "name": "Tellicherry Black Pepper", "category": "Spices", "base_price": 18},
    {"query": "cumin seeds", "name": "Whole Cumin Seeds", "category": "Spices", "base_price": 12},
    {"query": "paprika", "name": "Hungarian Sweet Paprika", "category": "Spices", "base_price": 14},
    {"query": "smoked paprika", "name": "Spanish Smoked Paprika", "category": "Spices", "base_price": 16},
    {"query": "nutmeg", "name": "Whole Nutmeg", "category": "Spices", "base_price": 15},
    {"query": "cloves spice", "name": "Indonesian Whole Cloves", "category": "Spices", "base_price": 14},
    {"query": "star anise", "name": "Star Anise Pods", "category": "Spices", "base_price": 13},
    {"query": "fennel seeds", "name": "Italian Fennel Seeds", "category": "Spices", "base_price": 11},
    {"query": "coriander seeds", "name": "Indian Coriander Seeds", "category": "Spices", "base_price": 10},
    {"query": "mustard seeds", "name": "Yellow Mustard Seeds", "category": "Spices", "base_price": 9},
    {"query": "sumac spice", "name": "Lebanese Sumac", "category": "Spices", "base_price": 14},
    {"query": "zaatar", "name": "Middle Eastern Za'atar", "category": "Spices", "base_price": 15},
    {"query": "ras el hanout", "name": "Moroccan Ras el Hanout", "category": "Spices", "base_price": 18},
    {"query": "garam masala", "name": "Indian Garam Masala", "category": "Spices", "base_price": 14},
    {"query": "curry powder", "name": "Madras Curry Powder", "category": "Spices", "base_price": 12},
    {"query": "chinese five spice", "name": "Chinese Five Spice Blend", "category": "Spices", "base_price": 13},
    {"query": "herbs de provence", "name": "Herbes de Provence", "category": "Spices", "base_price": 14},
    {"query": "bay leaves", "name": "Turkish Bay Leaves", "category": "Spices", "base_price": 11},
    {"query": "pink peppercorn", "name": "Pink Peppercorns", "category": "Spices", "base_price": 16},
    
    # ============ CHEESE (20 products) ============
    {"query": "artisan cheese", "name": "Aged Gouda 18 Month", "category": "Cheese", "base_price": 34},
    {"query": "cheese board", "name": "Cheese Tasting Selection", "category": "Cheese", "base_price": 48},
    {"query": "blue cheese", "name": "Roquefort Blue Cheese", "category": "Cheese", "base_price": 28},
    {"query": "goat cheese", "name": "Fresh Herb Goat Cheese", "category": "Cheese", "base_price": 18},
    {"query": "brie cheese", "name": "French Brie de Meaux", "category": "Cheese", "base_price": 26},
    {"query": "camembert", "name": "Normandy Camembert", "category": "Cheese", "base_price": 24},
    {"query": "cheddar cheese", "name": "Aged English Cheddar", "category": "Cheese", "base_price": 22},
    {"query": "parmesan cheese", "name": "Parmigiano Reggiano 24mo", "category": "Cheese", "base_price": 38},
    {"query": "gruyere cheese", "name": "Swiss Gruyère", "category": "Cheese", "base_price": 28},
    {"query": "manchego cheese", "name": "Spanish Manchego", "category": "Cheese", "base_price": 26},
    {"query": "pecorino cheese", "name": "Pecorino Romano", "category": "Cheese", "base_price": 24},
    {"query": "feta cheese", "name": "Greek Feta PDO", "category": "Cheese", "base_price": 18},
    {"query": "mozzarella cheese", "name": "Buffalo Mozzarella", "category": "Cheese", "base_price": 22},
    {"query": "ricotta cheese", "name": "Fresh Italian Ricotta", "category": "Cheese", "base_price": 14},
    {"query": "burrata cheese", "name": "Creamy Burrata", "category": "Cheese", "base_price": 24},
    {"query": "stilton cheese", "name": "English Stilton Blue", "category": "Cheese", "base_price": 28},
    {"query": "gorgonzola cheese", "name": "Italian Gorgonzola Dolce", "category": "Cheese", "base_price": 26},
    {"query": "comte cheese", "name": "French Comté 12 Month", "category": "Cheese", "base_price": 32},
    {"query": "taleggio cheese", "name": "Lombardy Taleggio", "category": "Cheese", "base_price": 24},
    {"query": "fontina cheese", "name": "Val d'Aosta Fontina", "category": "Cheese", "base_price": 26},
    
    # ============ BAKERY (20 products) ============
    {"query": "sourdough bread", "name": "Artisan Sourdough Loaf", "category": "Bakery", "base_price": 8},
    {"query": "croissant", "name": "Butter Croissants (6pk)", "category": "Bakery", "base_price": 12},
    {"query": "pastry", "name": "Almond Pastry Collection", "category": "Bakery", "base_price": 16},
    {"query": "baguette", "name": "French Baguette", "category": "Bakery", "base_price": 6},
    {"query": "ciabatta bread", "name": "Italian Ciabatta", "category": "Bakery", "base_price": 7},
    {"query": "focaccia bread", "name": "Rosemary Focaccia", "category": "Bakery", "base_price": 9},
    {"query": "brioche bread", "name": "Classic French Brioche", "category": "Bakery", "base_price": 10},
    {"query": "rye bread", "name": "German Rye Bread", "category": "Bakery", "base_price": 8},
    {"query": "multigrain bread", "name": "Seven Grain Loaf", "category": "Bakery", "base_price": 9},
    {"query": "olive bread", "name": "Mediterranean Olive Bread", "category": "Bakery", "base_price": 10},
    {"query": "pretzel", "name": "Bavarian Soft Pretzels", "category": "Bakery", "base_price": 8},
    {"query": "danish pastry", "name": "Fruit Danish Assortment", "category": "Bakery", "base_price": 14},
    {"query": "pain au chocolat", "name": "Pain au Chocolat (4pk)", "category": "Bakery", "base_price": 10},
    {"query": "cinnamon roll", "name": "Cinnamon Rolls (6pk)", "category": "Bakery", "base_price": 12},
    {"query": "scone", "name": "British Cream Scones", "category": "Bakery", "base_price": 10},
    {"query": "muffin", "name": "Blueberry Muffins (4pk)", "category": "Bakery", "base_price": 9},
    {"query": "biscotti", "name": "Italian Almond Biscotti", "category": "Bakery", "base_price": 11},
    {"query": "madeleines", "name": "French Madeleines", "category": "Bakery", "base_price": 12},
    {"query": "shortbread", "name": "Scottish Shortbread Fingers", "category": "Bakery", "base_price": 10},
    {"query": "financier cake", "name": "Almond Financiers", "category": "Bakery", "base_price": 13},
    
    # ============ NUTS & SNACKS (20 products) ============
    {"query": "roasted almonds", "name": "Smoked Almonds Premium", "category": "Nuts & Snacks", "base_price": 14},
    {"query": "cashews", "name": "Honey Roasted Cashews", "category": "Nuts & Snacks", "base_price": 16},
    {"query": "trail mix", "name": "Artisan Trail Mix", "category": "Nuts & Snacks", "base_price": 12},
    {"query": "pistachios", "name": "Roasted Pistachios", "category": "Nuts & Snacks", "base_price": 18},
    {"query": "macadamia nuts", "name": "Hawaiian Macadamias", "category": "Nuts & Snacks", "base_price": 22},
    {"query": "pecans", "name": "Candied Pecans", "category": "Nuts & Snacks", "base_price": 16},
    {"query": "walnuts", "name": "California Walnuts", "category": "Nuts & Snacks", "base_price": 14},
    {"query": "hazelnuts", "name": "Oregon Hazelnuts", "category": "Nuts & Snacks", "base_price": 15},
    {"query": "brazil nuts", "name": "Organic Brazil Nuts", "category": "Nuts & Snacks", "base_price": 18},
    {"query": "mixed nuts", "name": "Deluxe Mixed Nuts", "category": "Nuts & Snacks", "base_price": 16},
    {"query": "dried fruit", "name": "Tropical Dried Fruit Mix", "category": "Nuts & Snacks", "base_price": 14},
    {"query": "dried mango", "name": "Thai Dried Mango", "category": "Nuts & Snacks", "base_price": 12},
    {"query": "dried apricots", "name": "Turkish Dried Apricots", "category": "Nuts & Snacks", "base_price": 13},
    {"query": "dates medjool", "name": "Medjool Dates", "category": "Nuts & Snacks", "base_price": 16},
    {"query": "figs dried", "name": "Mediterranean Dried Figs", "category": "Nuts & Snacks", "base_price": 14},
    {"query": "prunes", "name": "French Agen Prunes", "category": "Nuts & Snacks", "base_price": 12},
    {"query": "coconut chips", "name": "Toasted Coconut Chips", "category": "Nuts & Snacks", "base_price": 10},
    {"query": "granola", "name": "Artisan Honey Granola", "category": "Nuts & Snacks", "base_price": 11},
    {"query": "energy balls", "name": "Date & Nut Energy Bites", "category": "Nuts & Snacks", "base_price": 14},
    {"query": "nut butter", "name": "Almond Butter Smooth", "category": "Nuts & Snacks", "base_price": 15},
    
    # ============ PASTA & GRAINS (15 products) ============
    {"query": "fresh pasta", "name": "Handmade Tagliatelle", "category": "Pasta & Grains", "base_price": 14},
    {"query": "quinoa", "name": "Organic Tricolor Quinoa", "category": "Pasta & Grains", "base_price": 12},
    {"query": "risotto rice", "name": "Carnaroli Risotto Rice", "category": "Pasta & Grains", "base_price": 16},
    {"query": "spaghetti", "name": "Bronze-Cut Spaghetti", "category": "Pasta & Grains", "base_price": 8},
    {"query": "penne pasta", "name": "Artisan Penne Rigate", "category": "Pasta & Grains", "base_price": 8},
    {"query": "fettuccine", "name": "Egg Fettuccine", "category": "Pasta & Grains", "base_price": 10},
    {"query": "lasagna sheets", "name": "Fresh Lasagna Sheets", "category": "Pasta & Grains", "base_price": 12},
    {"query": "orzo pasta", "name": "Italian Orzo", "category": "Pasta & Grains", "base_price": 7},
    {"query": "couscous", "name": "Moroccan Couscous", "category": "Pasta & Grains", "base_price": 8},
    {"query": "farro grain", "name": "Italian Farro", "category": "Pasta & Grains", "base_price": 10},
    {"query": "wild rice", "name": "Minnesota Wild Rice", "category": "Pasta & Grains", "base_price": 14},
    {"query": "polenta", "name": "Stone-Ground Polenta", "category": "Pasta & Grains", "base_price": 9},
    {"query": "arborio rice", "name": "Arborio Superfino Rice", "category": "Pasta & Grains", "base_price": 12},
    {"query": "basmati rice", "name": "Aged Basmati Rice", "category": "Pasta & Grains", "base_price": 14},
    {"query": "jasmine rice", "name": "Thai Jasmine Rice", "category": "Pasta & Grains", "base_price": 12},
    
    # ============ CONDIMENTS (15 products) ============
    {"query": "hot sauce", "name": "Ghost Pepper Hot Sauce", "category": "Condiments", "base_price": 12},
    {"query": "mustard", "name": "Whole Grain Dijon Mustard", "category": "Condiments", "base_price": 10},
    {"query": "pesto sauce", "name": "Classic Basil Pesto", "category": "Condiments", "base_price": 14},
    {"query": "sriracha", "name": "Artisan Sriracha", "category": "Condiments", "base_price": 9},
    {"query": "chimichurri", "name": "Argentine Chimichurri", "category": "Condiments", "base_price": 11},
    {"query": "harissa paste", "name": "Tunisian Harissa", "category": "Condiments", "base_price": 10},
    {"query": "tahini", "name": "Lebanese Tahini", "category": "Condiments", "base_price": 12},
    {"query": "miso paste", "name": "Japanese White Miso", "category": "Condiments", "base_price": 14},
    {"query": "fish sauce", "name": "Vietnamese Fish Sauce", "category": "Condiments", "base_price": 8},
    {"query": "soy sauce", "name": "Aged Japanese Soy Sauce", "category": "Condiments", "base_price": 12},
    {"query": "worcestershire sauce", "name": "Premium Worcestershire", "category": "Condiments", "base_price": 10},
    {"query": "aioli sauce", "name": "Garlic Aioli", "category": "Condiments", "base_price": 9},
    {"query": "tapenade", "name": "Olive Tapenade", "category": "Condiments", "base_price": 12},
    {"query": "romesco sauce", "name": "Catalan Romesco", "category": "Condiments", "base_price": 11},
    {"query": "gochujang", "name": "Korean Gochujang", "category": "Condiments", "base_price": 10},
    
    # ============ BEVERAGES (15 products) ============
    {"query": "kombucha", "name": "Ginger Lemon Kombucha", "category": "Beverages", "base_price": 8},
    {"query": "cold brew coffee", "name": "Cold Brew Concentrate", "category": "Beverages", "base_price": 16},
    {"query": "sparkling water", "name": "Italian Sparkling Water", "category": "Beverages", "base_price": 6},
    {"query": "craft soda", "name": "Small Batch Root Beer", "category": "Beverages", "base_price": 5},
    {"query": "ginger beer", "name": "Jamaican Ginger Beer", "category": "Beverages", "base_price": 6},
    {"query": "lemonade", "name": "Fresh Squeezed Lemonade", "category": "Beverages", "base_price": 7},
    {"query": "iced tea bottle", "name": "Peach Iced Tea", "category": "Beverages", "base_price": 5},
    {"query": "coconut water", "name": "Pure Coconut Water", "category": "Beverages", "base_price": 6},
    {"query": "almond milk", "name": "Barista Almond Milk", "category": "Beverages", "base_price": 7},
    {"query": "oat milk", "name": "Creamy Oat Milk", "category": "Beverages", "base_price": 7},
    {"query": "juice bottle", "name": "Cold-Pressed Green Juice", "category": "Beverages", "base_price": 10},
    {"query": "orange juice", "name": "Fresh Squeezed OJ", "category": "Beverages", "base_price": 8},
    {"query": "apple cider", "name": "Spiced Apple Cider", "category": "Beverages", "base_price": 7},
    {"query": "tonic water", "name": "Artisan Tonic Water", "category": "Beverages", "base_price": 5},
    {"query": "elderflower drink", "name": "Elderflower Pressé", "category": "Beverages", "base_price": 6},
]

OUTPUT_FILE = "../server/seeds/scraped_products.json"

# Nutritional info templates by category
NUTRITIONAL_INFO = {
    "Coffee": {"serving_size": "8 fl oz brewed", "calories": 2, "fat": "0g", "carbs": "0g", "protein": "0g", "caffeine": "95mg", "sodium": "5mg"},
    "Chocolate": {"serving_size": "40g", "calories": 210, "fat": "13g", "carbs": "23g", "protein": "3g", "sugar": "18g", "sodium": "15mg"},
    "Honey & Preserves": {"serving_size": "1 tbsp (21g)", "calories": 64, "fat": "0g", "carbs": "17g", "protein": "0g", "sugar": "17g", "sodium": "1mg"},
    "Oils & Vinegars": {"serving_size": "1 tbsp (14g)", "calories": 120, "fat": "14g", "carbs": "0g", "protein": "0g", "sodium": "0mg"},
    "Tea": {"serving_size": "8 fl oz brewed", "calories": 2, "fat": "0g", "carbs": "0g", "protein": "0g", "caffeine": "25-50mg", "sodium": "7mg"},
    "Spices": {"serving_size": "1 tsp (2g)", "calories": 6, "fat": "0g", "carbs": "1g", "protein": "0g", "sodium": "1mg"},
    "Cheese": {"serving_size": "30g", "calories": 110, "fat": "9g", "carbs": "0g", "protein": "7g", "sodium": "180mg", "calcium": "20%"},
    "Bakery": {"serving_size": "1 piece", "calories": 180, "fat": "6g", "carbs": "28g", "protein": "4g", "sugar": "4g", "sodium": "240mg"},
    "Nuts & Snacks": {"serving_size": "28g", "calories": 160, "fat": "14g", "carbs": "6g", "protein": "6g", "fiber": "3g", "sodium": "0mg"},
    "Pasta & Grains": {"serving_size": "56g dry", "calories": 200, "fat": "1g", "carbs": "41g", "protein": "7g", "fiber": "2g", "sodium": "0mg"},
    "Condiments": {"serving_size": "1 tbsp", "calories": 25, "fat": "2g", "carbs": "2g", "protein": "0g", "sodium": "120mg"},
    "Beverages": {"serving_size": "12 fl oz", "calories": 45, "fat": "0g", "carbs": "11g", "protein": "0g", "sugar": "10g", "sodium": "10mg"},
}

# Ingredients templates by category
INGREDIENTS_TEMPLATES = {
    "Coffee": ["100% Arabica Coffee Beans", "Single Origin Coffee Beans", "Organic Arabica Coffee", "Specialty Grade Coffee Beans"],
    "Chocolate": ["Cacao Mass, Cacao Butter, Organic Cane Sugar, Vanilla Extract", "Dark Chocolate (Cacao, Sugar), Sea Salt, Natural Flavors", "Organic Cacao, Coconut Sugar, Cocoa Butter"],
    "Honey & Preserves": ["100% Pure Raw Honey", "Fruit, Organic Cane Sugar, Pectin, Citric Acid", "Fresh Berries, Sugar, Lemon Juice"],
    "Oils & Vinegars": ["100% Extra Virgin Olive Oil", "Cold-Pressed Oil, Natural Flavoring", "Wine Vinegar, Grape Must, Natural Aging"],
    "Tea": ["Organic Tea Leaves", "Hand-Picked Tea Leaves, Natural Essences", "Chamomile Flowers, Lavender, Rose Petals"],
    "Spices": ["100% Pure Ground Spice", "Whole Spice Pods/Seeds", "Organic Dried Herbs and Spices"],
    "Cheese": ["Pasteurized Milk, Salt, Cheese Cultures, Rennet", "Organic Milk, Sea Salt, Cultures, Enzymes"],
    "Bakery": ["Organic Wheat Flour, Water, Sea Salt, Sourdough Starter", "Flour, Butter, Sugar, Eggs, Yeast, Salt"],
    "Nuts & Snacks": ["Roasted Nuts, Sea Salt", "Almonds, Honey, Coconut Oil, Sea Salt", "Mixed Nuts, Dried Fruits, Seeds"],
    "Pasta & Grains": ["Durum Wheat Semolina, Water", "100% Whole Grain, Water", "Organic Grain, No Additives"],
    "Condiments": ["Tomatoes, Olive Oil, Garlic, Basil, Salt", "Vinegar, Mustard Seeds, Spices, Salt", "Peppers, Vinegar, Salt, Garlic"],
    "Beverages": ["Filtered Water, Organic Tea, Natural Flavors", "Fresh Juice, Purified Water", "Sparkling Water, Natural Essences"],
}

# Variant templates by category
VARIANTS_TEMPLATES = {
    "Coffee": {"size": ["250g", "500g", "1kg"], "grind": ["Whole Bean", "Espresso", "French Press", "Drip"]},
    "Chocolate": {"size": ["50g", "100g", "200g"], "type": ["Bar", "Gift Box"]},
    "Honey & Preserves": {"size": ["200g", "400g", "750g"]},
    "Oils & Vinegars": {"size": ["250ml", "500ml", "1L"]},
    "Tea": {"size": ["50g", "100g", "250g"], "type": ["Loose Leaf", "Tea Bags", "Pyramid Sachets"]},
    "Spices": {"size": ["25g", "50g", "100g"], "type": ["Whole", "Ground"]},
    "Cheese": {"weight": ["150g", "300g", "500g"]},
    "Bakery": {"quantity": ["1 piece", "4 pack", "6 pack"]},
    "Nuts & Snacks": {"size": ["100g", "250g", "500g"]},
    "Pasta & Grains": {"size": ["250g", "500g", "1kg"]},
    "Condiments": {"size": ["150g", "300g"]},
    "Beverages": {"size": ["330ml", "750ml", "1L"], "pack": ["Single", "4-Pack", "12-Pack"]},
}

def get_unsplash_images(query, per_page=1):
    """Fetch images from Unsplash API"""
    url = "https://api.unsplash.com/search/photos"
    params = {
        "query": query,
        "per_page": per_page,
        "client_id": UNSPLASH_ACCESS_KEY
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        images = []
        for result in data.get('results', []):
            images.append({
                "url": result['urls']['regular'],
                "thumb": result['urls']['small'],
                "photographer": result['user']['name']
            })
        
        return images
    except Exception as e:
        print(f"Error fetching images for '{query}': {e}")
        return []

def generate_product_description(name, category):
    """Generate realistic product descriptions"""
    descriptions = {
        "Coffee": f"Discover the rich, complex flavors of our {name}. Sourced from sustainable farms and expertly roasted to bring out unique tasting notes. Perfect for pour-over, French press, or espresso.",
        "Chocolate": f"Indulge in our {name}, crafted with ethically-sourced cacao. Each bar is carefully tempered to achieve the perfect snap and melt-in-your-mouth texture.",
        "Honey & Preserves": f"Our {name} is harvested from local apiaries and small-batch producers. Pure, natural, and bursting with authentic flavor.",
        "Oils & Vinegars": f"Premium {name} from traditional producers. First cold-pressed for maximum flavor and health benefits. Perfect for finishing dishes or gourmet cooking.",
        "Tea": f"Experience the delicate complexity of {name}. Hand-picked leaves processed using time-honored methods to preserve flavor and aroma.",
        "Spices": f"Elevate your cooking with our {name}. Sourced directly from origin farms and ground fresh for maximum potency and flavor.",
        "Cheese": f"Artisanal {name} aged to perfection. Each wheel represents generations of cheesemaking expertise and terroir-driven flavor.",
        "Bakery": f"Fresh-baked {name} made daily with organic flour and traditional techniques. Crispy, flavorful, and utterly irresistible.",
        "Nuts & Snacks": f"Our {name} are carefully selected, roasted, and seasoned for the perfect balance of flavor and crunch.",
        "Pasta & Grains": f"Handcrafted {name} made with heritage grains. The foundation of authentic, home-cooked meals.",
        "Condiments": f"Bold and flavorful {name} to elevate any dish. Made in small batches with premium ingredients.",
        "Beverages": f"Refreshing {name} crafted with care. Pure ingredients, no artificial flavors, just authentic taste."
    }
    
    return descriptions.get(category, f"Authentic {name} from artisan producers.")

def generate_artisan_name():
    """Generate realistic artisan producer names"""
    first_names = ["Heritage", "Golden", "Mountain", "Coastal", "Valley", "Harvest", "Wild", "Pure", "Ancient", "Noble", "Royal", "Sunrise", "Meadow", "River", "Forest", "Sunset", "Alpine", "Ocean", "Prairie", "Rustic"]
    second_names = ["Farms", "Artisans", "Producers", "Collective", "Co-op", "Estate", "Craftsmen", "Makers", "Fields", "Grove", "Mill", "Kitchen", "Gardens", "Works", "Brothers", "Sisters", "Family", "House", "Cellar", "Springs"]
    
    return f"{random.choice(first_names)} {random.choice(second_names)}"

def main():
    print("=== ARTISIO PRODUCT SCRAPER (ENHANCED - 240+ Products) ===\n")
    
    if UNSPLASH_ACCESS_KEY == "YOUR_UNSPLASH_ACCESS_KEY_HERE":
        print("❌ ERROR: Please set your Unsplash API key!")
        return
    
    all_products = []
    
    total = len(PRODUCT_TEMPLATES)
    print(f"📦 Scraping {total} products...\n")
    
    for i, template in enumerate(PRODUCT_TEMPLATES, 1):
        print(f"[{i}/{total}] Fetching: {template['name']}...")
        
        # Get image from Unsplash
        images = get_unsplash_images(template['query'], per_page=1)
        
        if not images:
            print(f"  ⚠️  No images found, using placeholder")
            image_url = f"https://via.placeholder.com/800x800/0A2E2E/D4AF37?text={template['name'].replace(' ', '+')}"
        else:
            image_url = images[0]['url']
        
        category = template['category']
        
        # Get nutritional info for category
        nutrition = NUTRITIONAL_INFO.get(category, {}).copy()
        # Add slight variations
        if 'calories' in nutrition:
            nutrition['calories'] = int(nutrition['calories'] * random.uniform(0.9, 1.1))
        
        # Get ingredients
        ingredients_list = INGREDIENTS_TEMPLATES.get(category, ["Premium ingredients"])
        ingredients = random.choice(ingredients_list)
        
        # Get variants
        variants = VARIANTS_TEMPLATES.get(category, {"size": ["Standard"]}).copy()
        
        # Create product object
        product = {
            "name": template['name'],
            "slug": template['name'].lower().replace(' ', '-').replace('&', 'and').replace("'", ""),
            "description": generate_product_description(template['name'], category),
            "price": round(template['base_price'] + random.uniform(-2, 5), 2),
            "compareAtPrice": round(template['base_price'] + random.uniform(5, 15), 2),
            "category": category,
            "images": [image_url],
            "inventory": {
                "stock": random.randint(15, 120),
                "lowStockThreshold": 10,
                "trackInventory": True
            },
            "artisan": generate_artisan_name(),
            "dietary": random.sample(["organic", "gluten-free", "vegan", "non-gmo", "fair-trade", "kosher", "dairy-free", "nut-free"], k=random.randint(1, 4)),
            "rating": round(random.uniform(4.2, 5.0), 1),
            "reviewCount": random.randint(8, 350),
            "featured": random.choice([True, False, False, False, False]),  # 20% featured
            "status": "published",
            "origin": random.choice(["Ethiopia", "Colombia", "France", "Italy", "USA", "Madagascar", "Spain", "Japan", "Greece", "Switzerland", "Belgium", "Mexico", "Peru", "India", "Vietnam", "Thailand"]),
            "nutritionalInfo": nutrition,
            "ingredients": ingredients,
            "variants": variants
        }
        
        all_products.append(product)
        time.sleep(0.3)  # Be respectful to API
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ SUCCESS!")
    print(f"📦 Scraped {len(all_products)} products")
    print(f"📁 Saved to: {os.path.abspath(OUTPUT_FILE)}")
    print(f"\n💡 Next Steps:")
    print(f"   1. cd ../server")
    print(f"   2. npm run seed")
    print(f"   3. Restart your backend server")

if __name__ == "__main__":
    main()