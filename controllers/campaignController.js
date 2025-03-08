const Campaign = require('../model/Campaign');

module.exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goal } = req.body;

    if (!title || !description || !goal) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCampaign = new Campaign({ title, description, goal });
    await newCampaign.save();

    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
