require('dotenv').config();
const express = require('express');
const cors = require('cors');
const disableBrowserCache = require('./middleware/headers.middleware');
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(disableBrowserCache);

app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
