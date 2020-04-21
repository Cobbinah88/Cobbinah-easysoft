const router = require('express').Router();
const { MongoClient } = require('mongodb');MongoClient;


const todo = require('./todolist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

let employeedb;
let todoCollection;

const Connect = async () => {  
    await client.connect(); 
    employeedb = client.db('employeedb');
    todoCollection = employeedb.collection('todo');

};
Connect();

const createMany = async (data) => {
    try{
        const result = await todoCollection.insertMany(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally {}
}

const createTodo = async (data) => {
    try{
        const result = await todoCollection.insertOne(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally{}
}

const getAll = async () => {
    try {
        const result = await todoCollection.find({}).toArray();
        return result;
    } catch (error) {
        console.log(error)
    }
    finally{}
}

const employees = [
    {
        name: "Eshun Cobbinah",
        id: "1738",
        position: "Secretary",
    },
    {
        name: "Richmond Agyei",
        id: "1739",
        position: "Accountant",
    },
    {
        name: "Vaselisa Addo",
        id: "1740",
        position: "Cleaner",
    },
    {
        name: "Silas Oppong",
        id: "1741",
        position: "IT Manager",
    }
]


router.get('/', (req, res)=>{
    res.render('Home', {
        title:'home',
    })
});

router.get('/employeelist',  (req, res)=>{
    res.render('employee', {
        title:'Employees',
        employees
    })
    
});

router.get('/todolist', async (req, res)=>{
   const todolist = await getAll();
    res.render('todo',{
       todolist
   })
   
});
     
router.get('/createMany', async (req, res)=>{
    const todolist = await createMany(todo)
    res.redirect('/todolist')
 });
      
module.exports = router;