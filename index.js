const http = require('http');
const fs = require('fs');



const index =fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('dummy.json', 'utf-8'));
const products = data.products;

// const index2 = index.JSON()
// console.log(product)


const server = http.createServer((req,res) => {
    console.log("server started")

    // const params = req.url.split('/')
    // console.log(params)

    if(req.url.startsWith('/product')){
        const params = req.url.split('/')
        console.log(params)
        const productId = params[2]
        res.setHeader("content-type","text/html");
        let modifiedIndex = index.replace("**title**",products[productId].title)
        .replace("**price**",products[productId].price)
        .replace("**rating**",products[productId].rating)
        .replace("**url**",products[productId].thumbnail);
        res.end(modifiedIndex);
    }

    switch(req.url){
        case '/':
            res.setHeader("content-type","text/html");
            res.end(index);
            break;
        case '/api':
            res.setHeader("content-type","application/json");
            res.end(JSON.stringify(data));
            break;
        default:
            break;
    }
});

server.listen(8088)