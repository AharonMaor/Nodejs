const express = require('express');
const router = express.Router();
const Costs = require('../models/costs');
const Users = require('../models/users');
const {request} = require("express");

//Function to add the imaginary user
async function insertUser() {
    const newUser = new Users ({
        id : 123123,
        first_name: 'moshe',
        last_name: 'israeli',
        birthday: 'January, 10th, 1990'

    })

    newUser.save();
};

insertUser();



//POST method for "addcost"
router.post('/addcost/:user_id/:year/:month/:day/:description/:category/:sum', (req, res, next) =>{
    const {user_id, year, month, day, description, category ,sum} = req.params;
    if ( !user_id || !year || !month || !day || !description || !category || !sum)
    {
        console.log(user_id, year, month, day, description, category ,sum);
    }

    const newCost = new Costs({
        user_id: user_id,
        year:year,
        month:month,
        day:day,
        description:description ,
        category:category,
        sum:sum
    });


    try
    {
        newCost.save();
        res.send(newCost);
    }
    catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});


//GET method for "/report"
router.get('/report/:user_id/:month/:year',function(req,res){
    const{user_id, month, year} = req.params;

    if (!user_id || !month || !year)
    {
        console.log(user_id, month, year);
    }

    const report = {};
    const categories = [
        'food',
        'health',
        'housing',
        'sport',
        'education',
        'transportation',
        'other'
    ] ;
    Costs.find({user_id, month, year}, (err, costs) => {
        if(err)
        {
            console.log(err);
            res.sendStatus(500);
        }
        else
        {
            categories.forEach(cat => {
                report[cat] = []
                });

            costs.forEach((cost) => {
                const category = cost.category;
                report[category] = [];
                report[category].push("{day:" + cost.day + ", description:" + cost.description + ", sum:" + cost.sum +"}");

            });

            console.log(report);
            res.json(report);
        }
    });
});


//GET method for "/about"
router.get('/about', (req, res) => {
    const developers = [
        { firstname: 'Maor', lastname: 'Aharon', id: '208253625', email: 'maorrr188@gmail.com' },
        { firstname: 'Or', lastname: 'Jerbi', id: '318851177', email: 'or1212400@gmail.com' },
        { firstname: 'Dayana', lastname: 'Pergament', id: '315522201', email: 'pdayana1996@gmail.com' }
    ];
    res.json(developers)
});


module.exports = router;