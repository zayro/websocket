// =================================================================
// Config Expres  ==================================================
// ================================================================= 


const express = require('express')
const app = express();
const fileUpload = require('express-fileupload')

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(fileUpload());

// RUTA INICIAL
app.get('/', function (req, res) {

    const domain = req.headers.host;

    res.json({
        documentacion: `http://${domain}/api-docs/`,
        api: `http://${domain}/api/v1/`,
        message: 'Bienvenido al Api'

    })
})


// Route Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    return true;
});

// Route Not Found
// Handle 404
app.use(function (req, res) {
    res.status(404).json({"response": "404: Page not Found"});
});

// Handle 500
app.use(function (error, req, res, next) {
    res.send('500: Internal Server Error', 500);
});

// Route Handle Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});


app.listen(5000, () => {
    console.log(`API REST corriendo en el puerto 5000`)
  })