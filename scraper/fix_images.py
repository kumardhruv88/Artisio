import json
import os

# Curated high-quality food images by category (royalty-free from Unsplash)
# These are direct Unsplash URLs that work without API
STATIC_IMAGES = {
    "Coffee": [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800",
        "https://images.unsplash.com/photo-1504627298434-2119d6928e93?w=800",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
        "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
    ],
    "Chocolate": [
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800",
        "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800",
        "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800",
    ],
    "Honey & Preserves": [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
        "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=800",
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800",
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800",
        "https://images.unsplash.com/photo-1474654424859-b0c476d02082?w=800",
    ],
    "Oils & Vinegars": [
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800",
        "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=800",
        "https://images.unsplash.com/photo-1612187245498-51c73d74aba9?w=800",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
    ],
    "Tea": [
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800",
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800",
    ],
    "Spices": [
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
        "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800",
        "https://images.unsplash.com/photo-1599909533538-04435c228808?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=800",
    ],
    "Cheese": [
        "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800",
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800",
        "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?w=800",
        "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800",
        "https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=800",
    ],
    "Bakery": [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
        "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800",
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800",
    ],
    "Nuts & Snacks": [
        "https://images.unsplash.com/photo-1536591375623-4be0da0bc9e8?w=800",
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800",
        "https://images.unsplash.com/photo-1541990257-4f5832a3f5c0?w=800",
        "https://images.unsplash.com/photo-1606050627694-c75b1d7d3b2d?w=800",
        "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=800",
    ],
    "Pasta & Grains": [
        "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=800",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800",
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800",
    ],
    "Condiments": [
        "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800",
        "https://images.unsplash.com/photo-1585672840563-f2af2ced55c9?w=800",
        "https://images.unsplash.com/photo-1592417817038-d13fd7342ef6?w=800",
        "https://images.unsplash.com/photo-1576856497337-4f2be24683da?w=800",
    ],
    "Beverages": [
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
        "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800",
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800",
        "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800",
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800",
    ],
}

def is_placeholder(image_url):
    """Check if image is a placeholder"""
    if not image_url:
        return True
    placeholder_patterns = [
        "placeholder",
        "via.placeholder",
        "placehold"
    ]
    return any(pattern in image_url.lower() for pattern in placeholder_patterns)

def fix_product_images():
    """Fix products with placeholder images"""
    json_path = "../server/seeds/scraped_products.json"
    
    # Read existing products
    with open(json_path, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    print(f"📦 Loaded {len(products)} products")
    
    # Track counts
    placeholder_count = 0
    fixed_count = 0
    category_counters = {}
    
    # Fix products with placeholder images
    for product in products:
        category = product.get('category', 'Coffee')
        images = product.get('images', [])
        
        # Initialize counter for this category
        if category not in category_counters:
            category_counters[category] = 0
        
        if images and is_placeholder(images[0]):
            placeholder_count += 1
            
            # Get static images for this category
            static_images = STATIC_IMAGES.get(category, STATIC_IMAGES['Coffee'])
            
            # Rotate through available images
            idx = category_counters[category] % len(static_images)
            new_image = static_images[idx]
            
            # Update product image
            product['images'] = [new_image]
            category_counters[category] += 1
            fixed_count += 1
            print(f"  ✅ Fixed: {product['name'][:40]}")
    
    # Save updated products
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\n📊 Summary:")
    print(f"   Total products: {len(products)}")
    print(f"   Placeholder images found: {placeholder_count}")
    print(f"   Images fixed: {fixed_count}")
    print(f"   Real images from Unsplash: {len(products) - placeholder_count}")
    print(f"\n✅ Updated file saved!")
    print(f"\n💡 Next: Run 'npm run seed' to update database")

if __name__ == "__main__":
    print("=== FIX PLACEHOLDER IMAGES ===\n")
    fix_product_images()
