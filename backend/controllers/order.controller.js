const OrderModel = require('../models/order.model');
const redisClient = require('../config/redis');

const OrderController = {
    getOrders: async (req, res) => {
        let { page, limit, status, from, to, search } = req.query;

        page = Math.max(parseInt(page) || 1, 1);
        limit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);

        let filteredOrders = [...OrderModel.getAll()];

        if (status && status !== 'All') {
            filteredOrders = filteredOrders.filter(o => o.DocStatus === status);
        }

        if (from && to) {
            filteredOrders = filteredOrders.filter(o => {
                const date = new Date(o.DocDate);
                return date >= new Date(from) && date <= new Date(to);
            });
        }

        if (search) {
            const searchLower = search.toLowerCase().trim();
            filteredOrders = filteredOrders.filter(o =>
                (o.CardName && o.CardName.toLowerCase().includes(searchLower)) ||
                (o.DocNum && o.DocNum.toString().includes(searchLower))
            );
        }

        filteredOrders.sort((a, b) => new Date(b.DocDate) - new Date(a.DocDate));

        const total = filteredOrders.length;
        const startIndex = (page - 1) * limit;
        const paginatedOrders = filteredOrders.slice(startIndex, startIndex + limit);

        res.json({
            data: paginatedOrders,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    },

    getOrderById: async (req, res) => {
        const id = parseInt(req.params.id);

        const cacheKey = `order:${id}`;
        if (redisClient.isOpen) {
            try {
                const cached = await redisClient.get(cacheKey);
                if (cached) {
                    console.log('Cache Hit (Detail):', cacheKey);
                    return res.json(JSON.parse(cached));
                }
            } catch (err) {
                console.error('Redis GET error:', err);
            }
        }

        const order = OrderModel.getById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (redisClient.isOpen) {
            try {
                console.log('Cache Miss (Detail):', cacheKey);
                await redisClient.setEx(cacheKey, 300, JSON.stringify(order));
            } catch (err) {
                console.error('Redis SET error:', err);
            }
        }

        res.json(order);
    }
};

module.exports = OrderController;
