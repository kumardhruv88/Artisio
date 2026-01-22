import fetch from 'node-fetch';

const verify = async () => {
    try {
        console.log('Fetching products from API...');
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data = await res.json();
        console.log(`✅ Success! API returned ${data.length} products.`);

        if (data.length > 0) {
            console.log('Sample Product:', data[0].name);
        }
    } catch (err) {
        console.error('❌ Verification Failed:', err.message);
    }
};

verify();
