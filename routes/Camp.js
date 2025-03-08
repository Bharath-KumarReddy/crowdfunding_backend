const express = require('express');
const router = express.Router();

const {createCampaign,getAllCampaigns} = require('../controllers/campaignController')

router.post('/createcamp',createCampaign);
router.get('/allcamps',getAllCampaigns);


module.exports = router;