const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

const server = http.createServer( (req, res) =>{

// if(req.url === '/'){
//     fs.readFile(path.join( __dirname, 'pages', 'about.html'), (err, data) => {
//         if(err){
//             throw err
//         }
//         res.writeHead(200, {
//             'Content-Type': 'text/html' 
//         })
//         res.end(data)
//     })
// }
//     console.log(req.url);

let filePath = path.join(__dirname, 'pages', req.url === '/' ? 'about.html' : req.url); 
const ext = path.extname(filePath); 
let contentType = 'text/html'

switch (ext){
    case '.css' : 
    contentType = 'text/css'
    break
    case '.js' :
    contentType = 'text/javascript'
    break
    default : 
    contentType = 'text/html'
}

if(!ext){
    filePath += '.html'
}



    fs.readFile(filePath, (err, content) => {
        if(err){
            fs.readFile(path.join(__dirname, 'pages', 'error.html'), (err, data) => {
                if(err){
                    res.writeHead(500); 
                    res.end('error'); 
                }else{
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data); 
                }
            })
        }else{
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })
})

server.listen(3000, () =>{
        console.log('server has been started');
        
})