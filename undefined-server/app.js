/**** External libraries ****/
const express = require('express'); // The express.js library for writing the API
const bodyParser = require('body-parser'); // Parse all JSON in incoming requests automatically
const morgan = require('morgan'); // Log out all http requests to the console
const cors = require('cors');

/**** Configuration ****/
const appName = 'Express API Template';
const port = process.env.PORT || 8080; // Pick either port 8080 or the port in the PORT env variable.
const app = express(); // Get the express app.

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all http requests to the console
app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.

/**** Test data ****/
const data = [
    {
        id: 0,
        title: 'Pizza',
        description: 'Pizza is nice',
        ingredients: ['tomato', 'cheese'],
        cooking_time: 30
    },
    {
        id: 1,
        title: 'Baked potatoes with fried eggs',
        description: 'Served with baked beans',
        ingredients: ['cheese', 'potatoes', 'eggs', 'beans'],
        cooking_time: 60
    },
    {
        id: 2,
        title: 'Vegetable quiche',
        description: 'With grated courgette and cheese',
        ingredients: ['cheese', 'courgette'],
        cooking_time: 70
    }
];

/**** Routes ****/

// Return all recipes in data
app.get('/api/recipes', (req, res) => res.json(data));
// Return the recipe in data with its id equal to ':id' in the route below.
app.get('/api/recipes/:id', (req, res) =>
    res.json(data.find(e => e.id === Number(req.params.id)))
);

app.post('/api/recipes', (req, res) => {
    const title = req.body.title;
    const desc = req.body.description;

    const newRecipe = {
        title: title,
        description: desc
    };

    data.push(newRecipe);
    res.json({ msg: 'Recipe added', newRecipe: newRecipe });
});

// TODO: Example of doing a PUT
// TODO: Example of doing a DELETE?

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
