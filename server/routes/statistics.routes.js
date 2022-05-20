const { Router } = require('express');
const { getStatistics } = require('../controller/statistics.controller');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', catcher(getStatistics));

module.exports = router;
