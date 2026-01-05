const mongoose = require('mongoose');
const Subscription = require('./models/Subscription');

mongoose.connect('mongodb://localhost:27017/mobile_recharge', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    
    console.log('Checking "subscriptions" collection...');

    try {
        const counts = await Subscription.countDocuments();
        console.log(`Total Subscriptions found: ${counts}`);

        if (counts > 0) {
            const subs = await Subscription.find();
            console.log('--- Data ---');
            console.log(JSON.stringify(subs, null, 2));
        } else {
            console.log('No subscriptions found. Note: Mongoose creates the collection "subscriptions" (plural, lowercase) automatically.');
        }
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        mongoose.connection.close();
    }
}).catch(err => {
    console.error('Connection Error:', err);
});
