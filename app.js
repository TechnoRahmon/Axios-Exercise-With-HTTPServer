
const http = require('http')
const fs = require('fs')
const axios = require('axios')


console.log('Server is running at port 8080 . . .');

const server  = http.createServer(async (req, res ) =>{
            const headers = { 'Content-Type':'text/html'}
            switch (req.url ) {
                case '/':
                    res.writeHead(200,headers )
                    fs.readFile('view/home.html', (err, data )=>{

                        res.write(data)
                        res.end();
                    })
                    break;
                
                case '/save':
                    console.log(req.headers.url);
                    try {
                        const config= { responseType : "stream"}
                        let resp = await axios.get(req.headers.url, config)
                        resp.data.pipe(fs.createWriteStream('image.jpg') ) // save the image in the disck
                        res.writeHead(200,headers )
                        res.write('Your Image Has Been Saved!, Press OK to Reload The Page To see the Image!')
                        res.end()
                    } catch (error) {
                        res.writeHead(400,headers )
                        res.write('Your URl is invalid, PLease Enter Valid URl Image')
                        res.end()
                    }
                    break;


                    case '/image':
                        //console.log(req.headers.url);
                            res.writeHead(200,{"Content-Type":"image/jpg"} )
                            fs.readFile('image.jpg', (err, data )=>{
                                if ( !err ){
                                    res.write(data)
                                    res.end();   
                                }
                                 res.end();   

                            })
            
                        break;

                default:
                    res.writeHead(200,headers )
                    fs.readFile('view/404.html', (err, data )=>{

                        res.write(data)
                        res.end();
                    })
                    break;
            }

}).listen(8080)