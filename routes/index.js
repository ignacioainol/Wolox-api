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
        const { data: photos } = await axios.get('https://jsonplaceholder.typicode.com/photos');
        if (req.query) {
            const { data: albums } = await axios.get('https://jsonplaceholder.typicode.com/albums');
            const userId = req.query.userId;
            const albumsByUserId = albums.filter(album => album.userId === parseInt(userId));
            const photosByAlbumUser = [];
            photos.forEach(photo => {
                albumsByUserId.forEach(album => {
                    if (photo.albumId === album.id) {
                        photo.userId = userId;
                        photosByAlbumUser.push(photo);
                    }
                });
            });
            if (photosByAlbumUser.length > 0) {
                res.status(200).send(photosByAlbumUser);
            } else {
                res.status(404).send(`No hay fotos para el usuario de id ${userId}`);
            }
        }
        res.status(200).json(photos);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//obtener todos los albums
router.get('/api/albums', async (req, res) => {
    try {
        const { data: albums } = await axios.get('https://jsonplaceholder.typicode.com/albums');
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
        res.status(500).send(error);
    }
});


module.exports = router;