
const UserDetails = require('../models/user-details.model')
const User = require('../models/user.model')


const createUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, additionalPhoneNumber, address, region, city} = req.body;

        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).send({ error: 'User not found' });
        // }

        const userDetails = new UserDetails({
            firstName,
            lastName,
            phoneNumber,
            additionalPhoneNumber,
            address,
            region,
            city,
            // user: userId
        });

        await userDetails.save();
        res.status(201).send(userDetails);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getUserDetailsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const userDetails = await UserDetails.findOne({ user: userId }).populate('user');
        if (!userDetails) {
            return res.status(404).send({ error: 'User details not found' });
        }

        res.status(200).send(userDetails);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const userDetails = await UserDetails.findOneAndUpdate(
            { user: userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!userDetails) {
            return res.status(404).send({ error: 'User details not found' });
        }

        res.status(200).send(userDetails);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        const userDetails = await UserDetails.findOneAndDelete({ user: userId });
        if (!userDetails) {
            return res.status(404).send({ error: 'User details not found' });
        }

        res.status(200).send({ message: 'User details deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createUserDetails,
    getUserDetailsByUserId,
    updateUserDetails,
    deleteUserDetails
};
