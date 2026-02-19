const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const cacheMiddleware = require('../middleware/cache.middleware');

router.get('/', cacheMiddleware, OrderController.getOrders);
router.get('/:id', OrderController.getOrderById);

module.exports = router;
