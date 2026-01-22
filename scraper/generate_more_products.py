"""
Artisio Product Generator - Expands catalog to 400 products
Generates rich product data with nutritional info, ingredients, and variants
Uses curated images - NO API required

Usage: python generate_more_products.py
"""

import json
import random
from datetime import datetime

# Curated images by category
CURATED_IMAGES = {
    "Coffee": [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
        "https://images.unsplash.com/photo-1504627298434-2119d6928e93?w=800&q=80",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
        "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
        "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80",
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    ],
    "Chocolate": [
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80",
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
        "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800&q=80",
        "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&q=80",
        "https://images.unsplash.com/photo-1542843137-8791a6904d14?w=800&q=80",
    ],
    "Honey & Preserves": [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
        "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=800&q=80",
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80",
        "https://images.unsplash.com/photo-1474654424859-b0c476d02082?w=800&q=80",
    ],
    "Oils & Vinegars": [
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&q=80",
        "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=800&q=80",
        "https://images.unsplash.com/photo-1612187245498-51c73d74aba9?w=800&q=80",
        "https://images.unsplash.com/photo-1594043802604-5f96a6b88d44?w=800&q=80",
    ],
    "Tea": [
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80",
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
        "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80",
    ],
    "Spices": [
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
        "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
        "https://images.unsplash.com/photo-1599909533538-04435c228808?w=800&q=80",
        "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=800&q=80",
        "https://images.unsplash.com/photo-1606471191009-63994b048fae?w=800&q=80",
    ],
    "Cheese": [
        "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80",
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80",
        "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?w=800&q=80",
        "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&q=80",
        "https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=800&q=80",
    ],
    "Bakery": [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
        "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&q=80",
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
    ],
    "Nuts & Snacks": [
        "https://images.unsplash.com/photo-1536591375623-4be0da0bc9e8?w=800&q=80",
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80",
        "https://images.unsplash.com/photo-1541990257-4f5832a3f5c0?w=800&q=80",
        "https://images.unsplash.com/photo-1606050627694-c75b1d7d3b2d?w=800&q=80",
    ],
    "Pasta & Grains": [
        "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=800&q=80",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80",
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    ],
    "Condiments": [
        "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&q=80",
        "https://images.unsplash.com/photo-1585672840563-f2af2ced55c9?w=800&q=80",
        "https://images.unsplash.com/photo-1592417817038-d13fd7342ef6?w=800&q=80",
    ],
    "Beverages": [
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
        "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&q=80",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
        "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80",
    ],
}

# New product templates to add
NEW_PRODUCTS = {
    "Coffee": [
        ("Kenyan AA Premium", "Bold wine-like acidity with blackcurrant and citrus notes", "Kenya"),
        ("Sumatra Mandheling Dark", "Full-bodied with earthy, herbal, and cedar undertones", "Indonesia"),
        ("Costa Rican Tarrazú", "Bright citrus with honey sweetness and clean finish", "Costa Rica"),
        ("Panama Geisha Reserve", "Floral jasmine with bergamot and tropical fruit", "Panama"),
        ("Jamaica Blue Mountain", "Mild, smooth with no bitterness and sweet herbs", "Jamaica"),
        ("Vietnamese Robusta Bold", "Intense dark chocolate with smoky finish", "Vietnam"),
        ("Hawaiian Kona Extra Fancy", "Nutty with bright spice and buttery body", "Hawaii"),
        ("Yemen Mocha Matari", "Complex winey flavor with chocolate notes", "Yemen"),
        ("Indian Monsooned Malabar", "Muted acidity with musty spice character", "India"),
        ("Rwanda Single Origin", "Red fruit sweetness with floral aromatics", "Rwanda"),
        ("Burundi Kayanza", "Bright berry acidity with honey finish", "Burundi"),
        ("Peru Cajamarca Organic", "Balanced with milk chocolate and citrus", "Peru"),
    ],
    "Chocolate": [
        ("Madagascar Single Origin 70%", "Fruity raspberry notes with bright citrus finish", "Madagascar"),
        ("Ecuador Arriba Nacional 85%", "Floral cacao with delicate jasmine and spice", "Ecuador"),
        ("Venezuelan Criollo Reserve", "Complex dried fruit with toasted nut notes", "Venezuela"),
        ("Dominican Republic 72%", "Smooth fudge with caramel undertones", "Dominican Republic"),
        ("Ghana Dark Milk 55%", "Creamy toffee with roasted cocoa notes", "Ghana"),
        ("Belgian Praline Truffles", "Hazelnut praline in dark chocolate shell", "Belgium"),
        ("Swiss White Vanilla Bean", "Pure vanilla with creamy cocoa butter", "Switzerland"),
        ("Italian Gianduja Spread", "Piedmont hazelnuts blended with dark chocolate", "Italy"),
        ("French Cognac Truffles", "Dark ganache infused with aged cognac", "France"),
        ("Japanese Matcha Dark Bar", "Ceremonial matcha with 65% dark chocolate", "Japan"),
    ],
    "Tea": [
        ("First Flush Darjeeling", "Muscatel grape with floral champagne notes", "India"),
        ("Gyokuro Shade-Grown", "Sweet umami with marine freshness and seaweed", "Japan"),
        ("Phoenix Dan Cong Oolong", "Orchid fragrance with honey and peach finish", "China"),
        ("Taiwanese High Mountain", "Creamy with lilac and light butter notes", "Taiwan"),
        ("Ceylon Silver Tips", "Delicate with pine and light honey sweetness", "Sri Lanka"),
        ("Nepali Golden Tips", "Malty sweetness with stone fruit aromatics", "Nepal"),
        ("Korean Jeoncha Green", "Toasted rice with vegetal freshness", "Korea"),
        ("Kenyan Purple Tea", "Berry notes with antioxidant richness", "Kenya"),
        ("Moroccan Mint Classic", "Spearmint with gunpowder green base", "Morocco"),
        ("South African Rooibos Red", "Naturally sweet with vanilla and honey", "South Africa"),
    ],
    "Honey & Preserves": [
        ("New Zealand Manuka UMF 20+", "Medicinal grade with earthy sweetness", "New Zealand"),
        ("Italian Acacia Premium", "Delicate vanilla with light floral notes", "Italy"),
        ("Greek Thyme Wild Harvest", "Herbaceous with aromatic intensity", "Greece"),
        ("Australian Leatherwood", "Distinctive spicy with unique terroir", "Australia"),
        ("Turkish Pine Forest", "Dark amber with mineral complexity", "Turkey"),
        ("French Lavender Infused", "Provence lavender with light honey base", "France"),
        ("Scottish Heather Reserve", "Thick gel texture with bitter-sweet edge", "Scotland"),
        ("Egyptian Clover Blossom", "Light golden with mild sweetness", "Egypt"),
        ("Sicilian Orange Marmalade", "Blood orange with bittersweet peel", "Italy"),
        ("English Strawberry Preserve", "Chunky berries in light set jam", "England"),
    ],
    "Oils & Vinegars": [
        ("Aged Balsamic Tradizionale 25yr", "Sweet complexity with fig and prune notes", "Italy"),
        ("Koroneiki Extra Virgin", "Peppery finish with green almond and artichoke", "Greece"),
        ("Spanish Arbequina EVOO", "Buttery with ripe tomato and apple notes", "Spain"),
        ("Californian Mission Blend", "Medium fruity with fresh herb aromatics", "USA"),
        ("Portuguese Galega Reserve", "Golden with sweet pepper and almond notes", "Portugal"),
        ("Sherry Vinegar Gran Reserva", "Nutty complexity with long aged character", "Spain"),
        ("Champagne Vinegar AOC", "Delicate effervescence with crisp acidity", "France"),
        ("White Truffle Infused Oil", "Earthy white truffle in premium olive oil", "Italy"),
        ("Lemon Agrumato Pressed", "Fresh lemon co-pressed with Tuscan olives", "Italy"),
        ("Chili Infused Olive Oil", "Calabrian chili heat in extra virgin base", "Italy"),
    ],
    "Spices": [
        ("Kashmiri Saffron Grade 1", "Floral with honey and hay aromatics", "India"),
        ("Madagascar Bourbon Vanilla", "Creamy with sweet caramel undertones", "Madagascar"),
        ("Vietnamese Saigon Cinnamon", "Intense spicy-sweet with high oil content", "Vietnam"),
        ("Zanzibar Whole Cloves", "Aromatic with numbing warmth", "Tanzania"),
        ("Spanish Smoked Paprika", "Deep smoky with sweet pepper notes", "Spain"),
        ("Tellicherry Black Pepper", "Bold citrus with complex heat", "India"),
        ("Japanese Shichimi Togarashi", "Seven spice blend with sesame and chili", "Japan"),
        ("Moroccan Ras el Hanout", "Complex 27-spice warm blend", "Morocco"),
        ("Ethiopian Berbere", "Chili-forward with fenugreek and cardamom", "Ethiopia"),
        ("Indian Garam Masala", "Warming blend of cumin, coriander, cardamom", "India"),
    ],
    "Cheese": [
        ("French Comté 24 Months", "Nutty with crystalline crunch and caramel", "France"),
        ("Italian Parmigiano 36 Months", "Sharp granular with umami depth", "Italy"),
        ("Spanish Manchego Curado", "Sheep milk with butterscotch undertones", "Spain"),
        ("Swiss Gruyère AOP", "Slightly sweet with earthy complexity", "Switzerland"),
        ("English Stilton Blue", "Creamy blue with tangy mineral notes", "England"),
        ("Dutch Aged Gouda 3 Year", "Butterscotch crystals with deep caramel", "Netherlands"),
        ("Irish Cashel Blue", "Mild blue with grassy milk sweetness", "Ireland"),
        ("Greek Feta PDO", "Tangy brine with creamy crumble", "Greece"),
        ("Vermont Cheddar Reserve", "Sharp with horseradish bite", "USA"),
        ("Australian Washed Rind", "Pungent with meaty umami character", "Australia"),
    ],
    "Bakery": [
        ("French Baguette Tradition", "Crisp crust with soft airy crumb", "France"),
        ("Italian Ciabatta Rustica", "Large holes with olive oil richness", "Italy"),
        ("German Vollkornbrot", "Dense whole grain with seeds throughout", "Germany"),
        ("Danish Kringle Almond", "Flaky layers with marzipan filling", "Denmark"),
        ("Portuguese Pastel de Nata", "Caramelized custard in crisp shell", "Portugal"),
        ("Japanese Milk Bread Shokupan", "Ultra-soft with pillowy texture", "Japan"),
        ("Swedish Cardamom Buns", "Aromatic cardamom with pearl sugar", "Sweden"),
        ("Greek Olive Oil Bread", "Tender crumb with fruity olive notes", "Greece"),
        ("Irish Soda Bread", "Quick bread with buttermilk tang", "Ireland"),
        ("Mexican Conchas Sweet Roll", "Soft rolls with sugar shell topping", "Mexico"),
    ],
    "Nuts & Snacks": [
        ("Piedmont Hazelnuts IGP", "Sweet with delicate toasted notes", "Italy"),
        ("Marcona Almonds Fried", "Buttery Spanish almonds with sea salt", "Spain"),
        ("Iranian Pistachios Akbari", "Large kernels with sweet earthiness", "Iran"),
        ("Australian Macadamias", "Rich buttery with subtle sweetness", "Australia"),
        ("Brazilian Nuts in Shell", "Creamy texture with mineral notes", "Brazil"),
        ("Turkish Antep Pistachios", "Intense green color with sweet flavor", "Turkey"),
        ("California Walnuts Halves", "Mild with pleasant bitter edge", "USA"),
        ("French Candied Chestnuts", "Sweet glazed marrons with vanilla", "France"),
        ("Japanese Rice Crackers", "Savory soy with wasabi and nori", "Japan"),
        ("Indian Masala Cashews", "Spiced with turmeric and chili", "India"),
    ],
    "Pasta & Grains": [
        ("Italian Bronze-Die Spaghetti", "Rough texture for sauce adhesion", "Italy"),
        ("Sardinian Fregola Toasted", "Semolina pearls with nutty char", "Italy"),
        ("Japanese Soba Buckwheat", "Earthy with delicate chew", "Japan"),
        ("Greek Orzo Kritharaki", "Rice-shaped pasta for pilaf", "Greece"),
        ("French Couscous Royale", "Fine semolina with quick cook", "France"),
        ("Italian Carnaroli Risotto", "Superior starch for creamy risotto", "Italy"),
        ("Spanish Bomba Paella", "Absorbs liquid without breaking", "Spain"),
        ("Indian Basmati Aged", "Aromatic with separate long grains", "India"),
        ("Thai Jasmine Fragrant", "Floral with soft sticky texture", "Thailand"),
        ("Wild Rice Blend American", "Nutty grass-like with chewy texture", "USA"),
    ],
    "Condiments": [
        ("Japanese Aged Soy Sauce", "Complex umami with subtle sweetness", "Japan"),
        ("Korean Gochujang Paste", "Fermented chili with malty depth", "Korea"),
        ("French Dijon Mustard", "Sharp clean heat with wine notes", "France"),
        ("English Worcestershire", "Complex fermented anchovy umami", "England"),
        ("Thai Fish Sauce Premium", "Pungent umami with sea essence", "Thailand"),
        ("Mexican Chipotle Adobo", "Smoky dried jalapeño in tomato", "Mexico"),
        ("Italian Pesto Genovese", "Fresh basil with pine nut and Parmesan", "Italy"),
        ("Indian Mango Chutney", "Sweet-sour with warm spice notes", "India"),
        ("Middle Eastern Tahini", "Creamy sesame with bitter edge", "Lebanon"),
        ("Harissa Rose Tunisia", "Floral chili paste with caraway", "Tunisia"),
    ],
    "Beverages": [
        ("Italian Limoncello Artisan", "Bright lemon with sweet finish", "Italy"),
        ("Japanese Yuzu Juice Pure", "Citrus with grapefruit-mandarin notes", "Japan"),
        ("Mexican Horchata Concentrate", "Rice milk with cinnamon vanilla", "Mexico"),
        ("French Elderflower Cordial", "Floral with light honey sweetness", "France"),
        ("Turkish Rose Water", "Intense rose petal essence", "Turkey"),
        ("Indian Masala Chai Syrup", "Warming spices in concentrated form", "India"),
        ("Italian Amaretto Syrup", "Almond with marzipan sweetness", "Italy"),
        ("Moroccan Orange Blossom", "Delicate citrus floral water", "Morocco"),
        ("Greek Mountain Tea", "Herbal with iron-rich minerality", "Greece"),
        ("Australian Lemon Myrtle", "Native citrus with eucalyptus notes", "Australia"),
    ],
}

# Nutritional templates by category
NUTRITION_TEMPLATES = {
    "Coffee": {"serving_size": "8 fl oz brewed", "calories": 2, "fat": "0g", "carbs": "0g", "protein": "0g", "caffeine": "95mg", "sodium": "5mg"},
    "Chocolate": {"serving_size": "40g (3 squares)", "calories": 220, "fat": "14g", "carbs": "20g", "protein": "3g", "sugar": "12g", "fiber": "3g"},
    "Tea": {"serving_size": "8 fl oz brewed", "calories": 2, "fat": "0g", "carbs": "0g", "protein": "0g", "caffeine": "40mg", "sodium": "0mg"},
    "Honey & Preserves": {"serving_size": "1 tbsp (21g)", "calories": 64, "fat": "0g", "carbs": "17g", "protein": "0g", "sugar": "17g", "sodium": "0mg"},
    "Oils & Vinegars": {"serving_size": "1 tbsp (14g)", "calories": 120, "fat": "14g", "carbs": "0g", "protein": "0g", "sodium": "0mg"},
    "Spices": {"serving_size": "1 tsp (2g)", "calories": 6, "fat": "0g", "carbs": "1g", "protein": "0g", "sodium": "1mg"},
    "Cheese": {"serving_size": "30g", "calories": 120, "fat": "10g", "carbs": "0g", "protein": "7g", "calcium": "200mg", "sodium": "180mg"},
    "Bakery": {"serving_size": "1 piece (60g)", "calories": 180, "fat": "3g", "carbs": "32g", "protein": "6g", "fiber": "2g", "sodium": "280mg"},
    "Nuts & Snacks": {"serving_size": "30g", "calories": 180, "fat": "16g", "carbs": "6g", "protein": "5g", "fiber": "2g", "sodium": "0mg"},
    "Pasta & Grains": {"serving_size": "85g dry", "calories": 310, "fat": "1g", "carbs": "63g", "protein": "11g", "fiber": "2g", "sodium": "0mg"},
    "Condiments": {"serving_size": "1 tbsp (15g)", "calories": 15, "fat": "0g", "carbs": "3g", "protein": "1g", "sodium": "290mg"},
    "Beverages": {"serving_size": "250ml", "calories": 45, "fat": "0g", "carbs": "11g", "protein": "0g", "sugar": "10g", "sodium": "5mg"},
}

# Ingredients templates by category
INGREDIENTS_TEMPLATES = {
    "Coffee": "100% Single Origin Arabica Coffee Beans",
    "Chocolate": "Cacao Mass, Cacao Butter, Organic Cane Sugar, Vanilla Extract",
    "Tea": "Pure Whole Leaf Tea, Natural Aromatics",
    "Honey & Preserves": "Pure Raw Honey from Single Floral Source",
    "Oils & Vinegars": "Cold-Pressed Extra Virgin Oil, First Press",
    "Spices": "Whole Dried Spice, Hand-Selected, No Additives",
    "Cheese": "Pasteurized Milk, Salt, Cultures, Rennet",
    "Bakery": "Wheat Flour, Water, Natural Yeast, Sea Salt",
    "Nuts & Snacks": "Premium Whole Nuts, Lightly Roasted",
    "Pasta & Grains": "Durum Wheat Semolina, Water",
    "Condiments": "Natural Ingredients, Traditionally Fermented",
    "Beverages": "Natural Fruit Extract, Pure Cane Sugar, Filtered Water",
}

# Variants by category
VARIANTS_TEMPLATES = {
    "Coffee": {"size": ["250g", "500g", "1kg"], "grind": ["Whole Bean", "Espresso", "French Press", "Drip"]},
    "Chocolate": {"size": ["50g", "100g", "200g"], "type": ["Dark", "Milk", "Extra Dark"]},
    "Tea": {"size": ["50g", "100g", "250g"], "type": ["Loose Leaf", "Tea Bags"]},
    "Honey & Preserves": {"size": ["250g", "500g", "1kg"]},
    "Oils & Vinegars": {"size": ["250ml", "500ml", "1L"]},
    "Spices": {"size": ["50g", "100g", "250g"], "type": ["Whole", "Ground"]},
    "Cheese": {"size": ["200g", "500g", "1kg"]},
    "Bakery": {"size": ["Single", "Pack of 4", "Pack of 8"]},
    "Nuts & Snacks": {"size": ["100g", "250g", "500g"]},
    "Pasta & Grains": {"size": ["500g", "1kg", "2kg"]},
    "Condiments": {"size": ["200ml", "500ml", "1L"]},
    "Beverages": {"size": ["250ml", "500ml", "1L"]},
}

ARTISANS = [
    "Heritage Valley Farm", "Ancient Grove Estate", "Mountain Peak Artisans",
    "Coastal Harvest Co.", "Golden Fields Producers", "Royal Gardens Collective",
    "Sunrise Meadows", "Old World Traditions", "Artisan's Choice",
    "Terra Madre Co.", "Harvest Moon Farm", "Pure Origin Estates",
    "Craftsman's Guild", "Nature's Bounty", "Silver Creek Farm",
]

DIETARY_OPTIONS = ["organic", "fair-trade", "sustainable", "vegan", "gluten-free", "non-gmo"]


def generate_slug(name):
    """Generate URL-safe slug from product name"""
    return name.lower().replace(" ", "-").replace("'", "").replace("%", "").replace("+", "plus")


def get_image(category, index):
    """Get curated image for category"""
    images = CURATED_IMAGES.get(category, CURATED_IMAGES["Coffee"])
    return images[index % len(images)]


def generate_product(name, description, category, origin, index):
    """Generate a complete product with all fields"""
    price = round(random.uniform(15, 95), 2)
    compare_price = round(price * random.uniform(1.1, 1.4), 2)
    
    return {
        "name": name,
        "slug": generate_slug(name),
        "description": f"{description}. Carefully sourced and crafted by master artisans using traditional methods passed down through generations. Each batch is quality-tested to ensure exceptional flavor and freshness.",
        "price": price,
        "compareAtPrice": compare_price,
        "category": category,
        "images": [get_image(category, index)],
        "inventory": {
            "stock": random.randint(25, 200),
            "lowStockThreshold": 10,
            "trackInventory": True
        },
        "artisan": random.choice(ARTISANS),
        "dietary": random.sample(DIETARY_OPTIONS, k=random.randint(1, 3)),
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviewCount": random.randint(12, 250),
        "featured": random.random() < 0.12,
        "status": "published",
        "origin": origin,
        "nutritionalInfo": NUTRITION_TEMPLATES.get(category, NUTRITION_TEMPLATES["Coffee"]).copy(),
        "ingredients": INGREDIENTS_TEMPLATES.get(category, "100% Natural Ingredients"),
        "variants": VARIANTS_TEMPLATES.get(category, {"size": ["Standard", "Large"]}),
    }


def main():
    print("=" * 60)
    print("🎨 ARTISIO PRODUCT GENERATOR")
    print("   Expanding catalog to 400 products")
    print("=" * 60)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Load existing products
    json_path = "../server/seeds/scraped_products.json"
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            products = json.load(f)
        print(f"\n📦 Loaded {len(products)} existing products")
    except FileNotFoundError:
        print(f"\n❌ File not found: {json_path}")
        products = []
    
    # Get existing slugs to avoid duplicates
    existing_slugs = {p.get("slug", "") for p in products}
    
    # Generate new products
    new_count = 0
    target = 400
    products_needed = target - len(products)
    
    print(f"\n🔧 Generating {products_needed} new products...\n")
    
    category_counts = {}
    
    for category, product_list in NEW_PRODUCTS.items():
        for i, (name, desc, origin) in enumerate(product_list):
            if len(products) >= target:
                break
            
            slug = generate_slug(name)
            if slug in existing_slugs:
                continue  # Skip duplicates
            
            product = generate_product(name, desc, category, origin, i)
            products.append(product)
            existing_slugs.add(slug)
            new_count += 1
            
            category_counts[category] = category_counts.get(category, 0) + 1
            print(f"  ✓ Added: {name}")
    
    # Save updated products
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"   Previous count: {len(products) - new_count}")
    print(f"   New products added: {new_count}")
    print(f"   Total products: {len(products)}")
    print(f"\n   New products by category:")
    for cat, count in sorted(category_counts.items()):
        print(f"     {cat}: +{count}")
    
    print(f"\n✅ Saved to: {json_path}")
    print("\n" + "-" * 60)
    print("💡 NEXT STEPS:")
    print("   1. cd c:\\Users\\Dhruv\\OneDrive\\Desktop\\fullstack\\server")
    print("   2. npm run seed")
    print("   3. npm run dev")
    print("-" * 60)


if __name__ == "__main__":
    main()
