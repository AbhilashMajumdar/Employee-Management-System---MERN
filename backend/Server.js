const server = require('./App');

const PORT = process.env.PORT;

server.listen(PORT, (err)=>{
    if(err){
        console.log('Error while connecting with server ', err);
    }
    console.log(`Server is running on port no : ${PORT}`);
})