import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';

const CustomerRetention = () => {
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const [offers, setOffers] = useState({
        freeMonth: false,
        discount3Months: false,
        loyaltyPoints: false,
        premiumFeatures: false,
        exclusiveAddons: false,
    });

    const handleOfferChange = (event) => {
        setOffers({ ...offers, [event.target.name]: event.target.checked });
    };

    const handleSendOffers = () => {
        // Handle sending offers logic here (e.g., API call)
        console.log("Sending Offers:", { email, issue, offers });
    };

    return (
        <div className="min-h-screen"> 
            <Paper elevation={0} className="p-8 rounded-lg max-w-2xl mx-auto"
            sx={{
    backgroundColor:'transparent', 
    color:'white',
  }}> 
                <Typography variant="h5" className="mb-4 text-[white] font-bold text-left">Customer Retention</Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 text-gray-400"
                />
                <TextField
                    label="Issue"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="mb-6 text-gray-400"
                />

                <Typography variant="h6" className="mb-2 text-[white] font-semibold">Special Offers</Typography>
                <div className="mb-6 space-y-2"> {/* Spacing between checkboxes */}
                    <FormControlLabel
                        control={<Checkbox name="freeMonth" checked={offers.freeMonth} onChange={handleOfferChange} />}
                        label="Enjoy a free subscription for 1 month on us!"
                    />
                    <FormControlLabel
                        control={<Checkbox name="discount3Months" checked={offers.discount3Months} onChange={handleOfferChange} />}
                        label="Enjoy a 20% discount on your subscription for the next 3 months."
                    />
                    <FormControlLabel
                        control={<Checkbox name="loyaltyPoints" checked={offers.loyaltyPoints} onChange={handleOfferChange} />}
                        label="Receive loyalty points to redeem on your next bill or for exclusive rewards."
                    />
                    <FormControlLabel
                        control={<Checkbox name="premiumFeatures" checked={offers.premiumFeatures} onChange={handleOfferChange} />}
                        label="Enjoy access to premium features like faster speeds or extra data for 2 weeks at no additional cost."
                    />
                    <FormControlLabel
                        control={<Checkbox name="exclusiveAddons" checked={offers.exclusiveAddons} onChange={handleOfferChange} />}
                        label="Enjoy exclusive add-ons such as streaming services or additional storage space at no extra cost for a limited time."
                    />
                </div>

                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleSendOffers}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Send Offers
                </Button>
            </Paper>
        </div>
    );
};

export default CustomerRetention;