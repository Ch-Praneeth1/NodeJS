const fs = require('fs');
const data = JSON.parse(fs.readFileSync('dummy.json', 'utf-8'));
const products = data.products;
const express = require('express');
const morgan = require('morgan');
const { send } = require('process');



const server = express();

//body parser
server.use(express.json());
server.use(morgan('defualt'));
server.use(express.static('public'));



// C R U D   create read  update delete


//create  post 
server.post('/products',(req,res)=>{
    const product = req.body
    products.push(product)
    res.send(products)
})

//read  GET  /products
server.get('/products',(req,res)=>{
    res.send(products)
});

//read  GET  /products/id

server.get('/products/:id',(req,res) => {
    const id = +req.params.id
    // console.log(id)
    const product = products.find(p =>p.id===id )
    // console.log(product)
    res.send(product)
});

//update PUT /products/id                    put detlets the whole thing and replace it with the new info we sent
server.put('/products/:id',(req,res)=>{
    const id = +req.params.id
    const productIndex = products.findIndex(p => p.id===id)
    products.splice(productIndex,1,{...req.body, id:id})
    // console.log(productIndex)
    // res.send(products[productIndex])
    res.send(products)
})

//update PATCH /products/id               patch replaces the value for what we sent and other values remains the same 
server.patch('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id===id);
    const product = products[productIndex];
    products.splice(productIndex,1,{...product,...req.body})
    // console.log(productIndex)
    // res.send(products[productIndex])
    res.send(products)
})



// delete   DELETE    /products/:id
server.delete('/products/:id',(req,res)=>{
    // res.send("<h1>hello world delete</h1>")
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id===id);
    const product = products[productIndex];
    products.splice(productIndex,1)
    res.send(products)
})





server.listen(8088,() => {
    console.log('server started')
})