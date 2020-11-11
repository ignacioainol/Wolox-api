const { Router } = require('express');
const router = Router();
const axios = require('axios').default;

router.get('/api/users', async (req, res) => {
    try {
        const users = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.status(200).json(users.data);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;