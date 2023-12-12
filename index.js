const http = require('http');
const fs = require('fs');
const { stringify } = require('querystring');


const index =fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('dummy.json', 'utf-8'));
const product = data.products[0];

// const index2 = index.JSON()
// console.log(product)

const server = http.createServer((req,res) => {
    console.log("server started")

    if(req.url)

    switch(req.url){
        case '/':
            res.setHeader("content-type","text/html");
            res.end(index);
            break;
        case '/api':
            res.setHeader("content-type","application/json");
            res.end(JSON.stringify(data));
            break;
        case '/product':
            res.setHeader("content-type","text/html");
            let modifiedIndex = index.replace("**title**",product.title)
            .replace("**price**",product.price)
            .replace("**rating**",product.rating)
            .replace("**url**",product.thumbnail);
            res.end(modifiedIndex);
            break;
        default:
            break;
    }
});

server.listen(8088)