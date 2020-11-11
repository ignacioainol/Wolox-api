const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//routes
app.use(require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Running on port 3000');
})