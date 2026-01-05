const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');


router.post('/subscribe', async (req, res) => {
    try {
        const { username, planName, subscriptionDuration, price, dataLimit } = req.body;

        
        if (!username || !planName || !subscriptionDuration) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Missing required fields: username, planName, or subscriptionDuration'
            });
        }

        

        const newSubscription = new Subscription({
            username,
            planName,
            price: price || 0, 
            dataLimit: dataLimit || 'N/A',
            validity: parseInt(subscriptionDuration),
            subscriptionStatus: 'Active'
        });

        
        await newSubscription.save();

        
        res.status(201).json({
            username: newSubscription.username,
            planName: newSubscription.planName,
            subscriptionStatus: 'Success',
            message: 'Recharge successful!'
        });

    } catch (error) {
        console.error('Subscription Error:', error);
        res.status(500).json({
            username: req.body.username || 'Unknown',
            planName: req.body.planName || 'Unknown',
            subscriptionStatus: 'Failed',
            message: 'Server error processing subscription'
        });
    }
});

module.exports = router;
