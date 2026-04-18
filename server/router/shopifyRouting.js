let express = require("express");
let router = express.Router();
let axios = require("axios");

// Shopify config
const SHOP = "inventory-test-sandhya.myshopify.com";
const STOREFRONT_TOKEN = "d8b2ea556003e45ae4e5be82f9170b82";

router.get("/shopify-products", async (req, res) => {
    const query = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }`;

    try {
        const response = await axios.post(
            `https://${SHOP}/api/2024-01/graphql.json`,
            { query },
            {
                headers: {
                    "X-Shopify-Storefront-Access-Token": "d8b2ea556003e45ae4e5be82f9170b82",
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data.data.products.edges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Shopify products" });
    }
});

module.exports = router;