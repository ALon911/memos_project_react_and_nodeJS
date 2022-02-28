const express = require('express');
const memoRoutes = require('./routes/memoRoutes');

const router = express.Router();

router.use('/', memoRoutes);
module.exports = router;