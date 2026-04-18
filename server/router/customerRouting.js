const express = require('express');
const router = express.Router();
const axios = require('axios');

// ✅ FIXED PATH
const Customer = require('../modal/customerModel');

// 🔹 GET Shopify Customers (Direct)
router.get('/shopify-customers', async (req, res) => {
    try {
        const response = await axios.get(
            `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/customers.json`,
            {
                headers: {
                    'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data.customers);
    } catch (err) {
        console.log("Shopify Error:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Sync Shopify → MongoDB
router.get('/sync-customers', async (req, res) => {
    try {
        console.log("STORE:", process.env.SHOPIFY_STORE);

        const response = await axios.get(
            `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/customers.json`,
            {
                headers: {
                    'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN
                }
            }
        );

        const customers = response.data.customers;

        console.log("Customers fetched:", customers.length);

        const formatted = customers.map(c => ({
            customerId: c.id,
            firstName: c.first_name,
            lastName: c.last_name,
            email: c.email,
            phone: c.phone,
            city: c.default_address?.city,
            state: c.default_address?.province_code,
            country: c.default_address?.country_code,
            zip: c.default_address?.zip,
            totalOrders: c.orders_count,
            totalSpent: parseFloat(c.total_spent || 0)
        }));

        // ✅ Better: clear + insert
        await Customer.deleteMany();
        await Customer.insertMany(formatted);

        res.json({
            message: 'Customers synced successfully',
            count: formatted.length
        });

    } catch (err) {
        console.log("SYNC ERROR:", err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get Customers from MongoDB
router.get('/customers', async (req, res) => {
    try {
        const data = await Customer.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;