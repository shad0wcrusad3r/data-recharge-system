import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const plan = state?.plan;
    const username = localStorage.getItem('username');

    const [cardNumber, setCardNumber] = useState('');
    const [processing, setProcessing] = useState(false);

    if (!plan) {
        return <div className="container"><h2>No Plan Selected. <button onClick={() => navigate('/plans')}>Go Back</button></h2></div>;
    }

    const handlePayment = async () => {
        if (!cardNumber) {
            alert('Enter fake card details!');
            return;
        }

        setProcessing(true);

        try {
            const response = await fetch('http://localhost:5000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    planName: plan.planName,
                    subscriptionDuration: plan.validity,
                    price: plan.price,
                    dataLimit: plan.dataLimit
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/bill', {
                    state: {
                        success: true,
                        data: { ...data, price: plan.price, date: new Date().toLocaleString() }
                    }
                });
            } else {
                alert('Payment Failed: ' + data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Payment Error');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="container">
            <h2>Payment Gateway</h2>
            <div className="plan-card" style={{ margin: '20px auto', float: 'none', width: '300px' }}>
                <h3>Payment for: {plan.planName}</h3>
                <p className="price">Amount: ₹{plan.price}</p>

                <input
                    type="text"
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
                />

                <button onClick={handlePayment} disabled={processing}>
                    {processing ? 'Processing...' : `Pay ₹${plan.price}`}
                </button>
            </div>
        </div>
    );
}

export default Payment;
