// const http = require('http');
const fs = require('fs');



// const index =fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('dummy.json', 'utf-8'));
const products = data.products;


// // const index2 = index.JSON()
// // console.log(product)


// const server = http.createServer((req,res) => {
//     console.log("server started")

//     // const params = req.url.split('/')
//     // console.log(params)

//     if(req.url.startsWith('/product')){
//         const params = req.url.split('/')
//         console.log(params)
//         const productId = params[2]
//         res.setHeader("content-type","text/html");
//         let modifiedIndex = index.replace("**title**",products[productId].title)
//         .replace("**price**",products[productId].price)
//         .replace("**rating**",products[productId].rating)
//         .replace("**url**",products[productId].thumbnail);
//         res.end(modifiedIndex);
//         return;
//     }

//     switch(req.url){
//         case '/':
//             res.setHeader("content-type","text/html");
//             res.end(index);
//             break;
//         case '/api':
//             res.setHeader("content-type","application/json");
//             res.end(JSON.stringify(data));
//             break;
//         default:
//             break;
//     }
// });

// server.listen(8088)






const express = require('express');


//bodyParser
const server = express();
server.use(morgan('defualt'));
server.use(express.static('public'));

server.use(express.json());
//universal middleware
// server.use('/',(req,res,next) => {
//     console.log('universal middleware')
//     console.log(req.method, req.ip ,req.hostname, new Date() , req.get('user-agent'))   // Universal middleware can be used for whole application such as user login can be done
//     next()                                          // trought middleware authorized users can be alloweed and others cannot   
// })



//rout middleware       specified for some perticular routs we need
const auth = (req,res,next) => {
    console.log("authentication middleware")
    if(req.body.password=='123'){
        console.log("user is authorized")
        next()
    }else{
        console.log("user is not authorized")
        res.sendStatus(401);
    }
}

server.get('/',auth,(req,res)=>{
    res.send("<h1>hello world get</h1>")
    // res.sendFile('C:/Users/chpra/Desktop/NodeApp/index.html')
    // res.json(products)
})


server.post('/',(req,res)=>{
    res.send("<h1>hello world post</h1>")
})

server.delete('/',(req,res)=>{
    res.send("<h1>hello world delete</h1>")
})

server.patch('/',(req,res)=>{
    res.send("<h1>hello world patch</h1>")
})

server.put('/',(req,res)=>{
    res.send("<h1>hello world put</h1>")
})

server.listen(8088,() => {
    console.log('server started')
})
