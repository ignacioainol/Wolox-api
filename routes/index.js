const { Router } = require('express');
const router = Router();
const axios = require('axios').default;

//obtener todos los usuarios
router.get('/api/users', async (req, res) => {
    try {
        const users = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.status(200).json(users.data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//obtener todas las fotos
router.get('/api/photos', async (req, res) => {
    try {
        const photos = await axios.get('https://jsonplaceholder.typicode.com/photos');
        res.status(200).json(photos.data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//obtener todos los albums
router.get('/api/albums', async (req, res) => {
    const { data: albums } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    try {
        if (req.query) {
            if (req.query.userId) {
                const userId = req.query.userId;
                const albumsPerUserId = albums.filter(album => album.userId === parseInt(userId));

                if (albumsPerUserId.length > 0) {
                    res.send(albumsPerUserId);
                } else {
                    res.status(404).send(`No hay albumes del usuario con id ${userId}`);
                }
            }
        }

        res.status(200).json(albums);
    } catch (error) {

    }
});

//Obtener albumes por id de user
// router.get('/api/albums/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const albumsByUserId = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
//         res.status(200).json(albumsByUserId.data);
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = router;