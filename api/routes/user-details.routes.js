module.exports = (app) => {
    const UserDetails = require('../controllers/user-details.controller');
    app.post('/userDetails', UserDetails.createUserDetails);
    app.get('/userDetails/:userId', UserDetails.getUserDetailsByUserId);
    app.put('/userDetails/:userId', UserDetails.updateUserDetails);
    app.delete('/userDetails/:userId', UserDetails.deleteUserDetails);
}
