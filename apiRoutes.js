
//get

const express = require('express');
const router = express.Router();
const data = require('../dishModel');

router.get('/dishes', (req, res) => {
    try {
        const { category, price, name, isVegetarian} = req.query;

        let filteredDishes= data 
        .filter(
            (dish) =>
                !category || dish.category.toLowerCase() === category.toLowerCase(),
        )
        .filter((dish)=> !price || dish.price <= parseFloat(price))
        .filter(
        (dish) => !name || dish.name.toLowerCase().includes(name.toLowerCase()),
        )
        .filter(
            (dish) => isVegetarian === undefined ||
            dish.isVegetarian === isVegetarian,
        );

        return filteredDishes.length === 0
        ? res.status(404).json({
            status: 404,
            message:'No Dish found matching the criteria',
        })
        :res.status(200).json({
            status: 200,
            message: 'retrieved dishes successfuly',
            data: filteredDishes,
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
})

//post

router.post('/dishes', (req,res) => {
    try {
        const { name, price, category, isVegetarian} = req.body || {};

        if(!name || !price || !category) {
            return res.status(400).json({
                status:400,
                message:'Bad Request: Name, Price, and Category are required',
            })
        }

        const newItem = {id: data.length + 1, name, price, category, isVegetarian};
        data.push(newItem);
        res.status(201).json({
            status: 201,
            message:'dish created successfully',
            data:newItem,
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});





// Put

router.put ('/dish/:id',( req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            return res.status(404).json({
                status:404,
                message:`Dish with ID ${id} not found`,
            });
        }

        data[index] = { id, ...req.body};
        res.status(200).json({
            status:200,
            message: 'Dish updated successfully',
            data:data[index],
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



//delete

router.delete('/dishes/:id', (req, res) =>{
    try {
        const id = parseInt(req.params.id);
        const index = data.findIndex((d) => d.id === id);

        if (index === -1) {
            return res.status(404).json({
                status: 404,
                message: `dish with ID ${id} not found`,
            });
        }

        data.splice(index, 1);
        res.status(204).send();
    } catch(error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;