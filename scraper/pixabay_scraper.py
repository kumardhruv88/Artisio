"""
Pixabay Image Fetcher for Artisio Products
Uses free Pixabay API (100 requests/minute, unlimited per day)

Usage:
1. Get free API key from https://pixabay.com/api/docs/
2. Set PIXABAY_API_KEY environment variable
3. Run: python pixabay_scraper.py
"""

import json
import os
import time
import random
import requests
from datetime import datetime

# Pixabay API Configuration
PIXABAY_API_KEY = os.getenv("PIXABAY_API_KEY", "YOUR_PIXABAY_API_KEY_HERE")
PIXABAY_BASE_URL = "https://pixabay.com/api/"

# Category-specific search terms for better image matching
CATEGORY_SEARCH_TERMS = {
    "Coffee": ["coffee beans", "espresso", "coffee cup artisan", "roasted coffee", "coffee brewing"],
    "Chocolate": ["dark chocolate", "chocolate bar artisan", "cocoa", "truffles chocolate", "premium chocolate"],
    "Honey & Preserves": ["honey jar", "artisan honey", "jam preserves", "fruit preserves", "honeycomb"],
    "Oils & Vinegars": ["olive oil bottle", "balsamic vinegar", "cooking oil premium", "artisan oil"],
    "Tea": ["loose leaf tea", "tea leaves", "herbal tea", "premium tea", "tea ceremony"],
    "Spices": ["spice jars", "artisan spices", "exotic spices", "cooking spices", "premium spices"],
    "Cheese": ["artisan cheese", "cheese wheel", "gourmet cheese", "aged cheese", "premium cheese"],
    "Bakery": ["artisan bread", "fresh pastry", "sourdough", "bakery goods", "fresh baked"],
    "Nuts & Snacks": ["mixed nuts", "premium nuts", "gourmet snacks", "roasted nuts", "almonds cashews"],
    "Pasta & Grains": ["artisan pasta", "fresh pasta", "italian pasta", "whole grains", "gourmet pasta"],
    "Condiments": ["gourmet sauce", "artisan condiment", "premium mustard", "specialty sauce"],
    "Beverages": ["craft beverage", "artisan drink", "premium juice", "gourmet beverage"],
}

# Fallback static images by category (curated high-quality Pixabay images)
FALLBACK_IMAGES = {
    "Coffee": [
        "https://cdn.pixabay.com/photo/2017/09/04/18/39/coffee-2714970_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/04/12/11/19/coffee-1324126_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/31/13/59/coffee-791439_1280.jpg",
    ],
    "Chocolate": [
        "https://cdn.pixabay.com/photo/2018/02/21/08/40/chocolate-3169866_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/09/17/18/25/chocolate-2758824_1280.jpg",
    ],
    "Honey & Preserves": [
        "https://cdn.pixabay.com/photo/2017/10/07/21/45/honey-2828676_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/07/28/22/05/honey-865157_1280.jpg",
    ],
    "Oils & Vinegars": [
        "https://cdn.pixabay.com/photo/2016/01/03/17/59/olive-oil-1119859_1280.jpg",
    ],
    "Tea": [
        "https://cdn.pixabay.com/photo/2016/11/29/12/45/tea-1869716_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/07/12/12/50/tea-2496930_1280.jpg",
    ],
    "Spices": [
        "https://cdn.pixabay.com/photo/2016/06/17/17/25/spices-1463763_1280.jpg",
    ],
    "Cheese": [
        "https://cdn.pixabay.com/photo/2016/01/15/19/18/cheese-1142530_1280.jpg",
    ],
    "Bakery": [
        "https://cdn.pixabay.com/photo/2017/06/14/19/00/bread-2403393_1280.jpg",
    ],
    "Nuts & Snacks": [
        "https://cdn.pixabay.com/photo/2016/10/27/22/52/nuts-1776466_1280.jpg",
    ],
    "Pasta & Grains": [
        "https://cdn.pixabay.com/photo/2016/12/06/18/27/pasta-1887233_1280.jpg",
    ],
    "Condiments": [
        "https://cdn.pixabay.com/photo/2014/12/21/23/41/spices-575773_1280.jpg",
    ],
    "Beverages": [
        "https://cdn.pixabay.com/photo/2017/08/02/00/55/coffee-2568375_1280.jpg",
    ],
}

def fetch_pixabay_image(query: str, category: str = None) -> str:
    """Fetch a single image URL from Pixabay API"""
    try:
        params = {
            "key": PIXABAY_API_KEY,
            "q": query,
            "image_type": "photo",
            "orientation": "horizontal",
            "safesearch": "true",
            "per_page": 10,
            "min_width": 800,
        }
        
        response = requests.get(PIXABAY_BASE_URL, params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("hits"):
                # Pick a random image from results for variety
                hit = random.choice(data["hits"][:5])
                return hit.get("webformatURL") or hit.get("largeImageURL")
        
        # Fallback to curated images
        return get_fallback_image(category)
        
    except Exception as e:
        print(f"  ⚠ Pixabay API error: {e}")
        return get_fallback_image(category)


def get_fallback_image(category: str) -> str:
    """Get a curated fallback image for a category"""
    images = FALLBACK_IMAGES.get(category, FALLBACK_IMAGES.get("Coffee", []))
    return random.choice(images) if images else "https://via.placeholder.com/800x600"


def is_placeholder_image(url: str) -> bool:
    """Check if image URL is a placeholder"""
    if not url:
        return True
    placeholders = ["placeholder", "placehold", "via.placeholder"]
    return any(p in url.lower() for p in placeholders)


def fix_product_images(products: list) -> list:
    """Update products with placeholder images using Pixabay"""
    fixed_count = 0
    
    for i, product in enumerate(products):
        images = product.get("images", [])
        category = product.get("category", "Coffee")
        
        # Check if image needs fixing
        if not images or is_placeholder_image(images[0] if images else ""):
            # Get search terms for this category
            search_terms = CATEGORY_SEARCH_TERMS.get(category, ["artisan food"])
            query = random.choice(search_terms)
            
            print(f"  [{i+1}/{len(products)}] Fixing: {product['name'][:40]}...")
            
            # Fetch new image
            new_image = fetch_pixabay_image(query, category)
            product["images"] = [new_image]
            fixed_count += 1
            
            # Rate limiting - Pixabay allows 100 req/min
            time.sleep(0.7)
    
    return products, fixed_count


def generate_additional_products(existing_count: int = 265, target_count: int = 300) -> list:
    """Generate additional products to reach target count"""
    new_products = []
    products_needed = target_count - existing_count
    
    if products_needed <= 0:
        return []
    
    print(f"\n📦 Generating {products_needed} additional products...")
    
    # Additional product templates by category
    PRODUCT_TEMPLATES = {
        "Coffee": [
            ("Kenyan AA Premium", "Bold, wine-like acidity with blackcurrant notes"),
            ("Sumatra Mandheling", "Full-bodied with earthy, herbal undertones"),
            ("Costa Rican Tarrazú", "Bright citrus notes with clean finish"),
            ("Panama Geisha Reserve", "Floral jasmine with bergamot essence"),
        ],
        "Chocolate": [
            ("Madagascar Single Origin 70%", "Fruity raspberry notes with bright finish"),
            ("Ecuador Arriba Nacional", "Floral cacao with delicate spice"),
            ("Venezuelan Criollo Reserve", "Complex with dried fruit and nuts"),
        ],
        "Tea": [
            ("First Flush Darjeeling", "Muscatel grapes with floral notes"),
            ("Gyokuro Shade-Grown", "Sweet umami with marine freshness"),
            ("Phoenix Dan Cong Oolong", "Orchid fragrance with honey finish"),
        ],
        "Honey & Preserves": [
            ("New Zealand Manuka UMF 20+", "Medicinal grade with earthy sweetness"),
            ("Italian Acacia Honey", "Delicate vanilla with floral notes"),
        ],
        "Oils & Vinegars": [
            ("Aged Balsamic Tradizionale 25yr", "Sweet complexity with fig notes"),
            ("Koroneiki Extra Virgin", "Peppery finish with green almond"),
        ],
    }
    
    artisans = ["Heritage Valley Farm", "Ancient Grove Estate", "Mountain Peak Artisans", 
                "Coastal Harvest Co.", "Golden Fields Producers", "Royal Gardens"]
    origins = ["Italy", "France", "Spain", "Japan", "Greece", "New Zealand", "Tanzania"]
    
    product_id = existing_count + 1
    
    for category, templates in PRODUCT_TEMPLATES.items():
        for name, desc in templates:
            if len(new_products) >= products_needed:
                break
                
            search_terms = CATEGORY_SEARCH_TERMS.get(category, ["artisan food"])
            query = random.choice(search_terms)
            
            print(f"  Creating: {name}...")
            
            # Fetch image from Pixabay
            image_url = fetch_pixabay_image(query, category)
            
            product = {
                "name": name,
                "slug": name.lower().replace(" ", "-").replace("'", "").replace("%", ""),
                "description": f"{desc}. Carefully sourced and crafted by master artisans using traditional methods passed down through generations.",
                "price": round(random.uniform(18, 85), 2),
                "compareAtPrice": round(random.uniform(25, 120), 2),
                "category": category,
                "images": [image_url],
                "inventory": {
                    "stock": random.randint(20, 150),
                    "lowStockThreshold": 10,
                    "trackInventory": True
                },
                "artisan": random.choice(artisans),
                "dietary": random.sample(["organic", "fair-trade", "sustainable", "vegan"], k=random.randint(1, 2)),
                "rating": round(random.uniform(4.0, 5.0), 1),
                "reviewCount": random.randint(15, 200),
                "featured": random.random() < 0.15,
                "status": "published",
                "origin": random.choice(origins),
            }
            
            new_products.append(product)
            time.sleep(0.7)
            
    return new_products


def main():
    print("=" * 60)
    print("🎨 ARTISIO PIXABAY IMAGE FIXER & PRODUCT GENERATOR")
    print("=" * 60)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check API key
    if PIXABAY_API_KEY == "YOUR_PIXABAY_API_KEY_HERE":
        print("\n⚠ No Pixabay API key found!")
        print("Using curated fallback images instead...")
        use_api = False
    else:
        print(f"\n✓ Pixabay API key configured")
        use_api = True
    
    # Load existing products
    json_path = "../server/seeds/scraped_products.json"
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            products = json.load(f)
        print(f"\n📦 Loaded {len(products)} existing products")
    except FileNotFoundError:
        print(f"\n❌ File not found: {json_path}")
        return
    
    # Fix placeholder images
    print("\n🔧 Fixing placeholder images...")
    products, fixed_count = fix_product_images(products)
    print(f"   Fixed {fixed_count} products with new images")
    
    # Generate additional products if needed
    if len(products) < 300:
        new_products = generate_additional_products(len(products), 300)
        products.extend(new_products)
        print(f"   Added {len(new_products)} new products")
    
    # Save updated products
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Done! Total products: {len(products)}")
    print(f"   Saved to: {json_path}")
    print("\n💡 Next step: Run 'npm run seed' in the server directory to update database")


if __name__ == "__main__":
    main()
