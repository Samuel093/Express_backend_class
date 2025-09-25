import fs from "fs"


// fs.writeFile("express.txt", "write something", (err)=>{
//   if(err){
//     console.log('error writing file')
//   }
//   console.log("file written successfully")
// })

// FileSystem Methods
// 1. writeFile
// 2. writeFileSync
// 3. readFile
// 4. readFileSync


// fs.readFile("express.txt", "utf8", (err, data)=>{
//  if(err){
//     console.log("couldn't read file", err.message)
//  }
//  console.log(data)
// })

// fs.writeFile("index.html", "<h1>example</h1>", (err)=> {
//   if(err){
//     console.log("error occurred")
//   }
//   console.log("file written successfully")
//   fs.readFile("index.html", "utf8", (err, data)=>{
//     if(err){
//       console.log("error reading file")
//     }
//     fs.writeFile("index2.html", data, (err)=>{
//       if(err){
//         console.log("error writting 2nd file")
//       }
//       console.log("2nd file written successfully")
//     })
//   })
// })


import os from "os"

// console.log(os.freemem())
// console.log(os.totalmem())
// console.log(os.platform())



import http from "http"

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
    res.end("Home Page")
 }
     if(req.url === "/about"){
    res.end("About Page")
 }
      if(req.url === "/contact"){
    res.end("Contact Page")
 }
})

const PORT = 3000



server.listen(PORT, ()=>{
  console.log(`server listen on port ${PORT}`)
})