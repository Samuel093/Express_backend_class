// import fs from "fs"


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


// import os from "os"

// console.log(os.freemem())
// console.log(os.totalmem())
// console.log(os.platform())

// const os = require('os');

// console.log("System Report:");
// console.log("----------------");
// console.log(`OS Type: ${os.type()}`);
// console.log(`Platform: ${os.platform()}`);
// console.log(`Architecture: ${os.arch()}`);
// console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
// console.log(`Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
// console.log(`Number of CPUs: ${os.cpus().length}`);
// console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} hours`);
// console.log(`Home Directory: ${os.homedir()}`);

// User Info
// console.log(os.userInfo());
// { uid: 501, gid: 20, username: 'john', homedir: '/Users/john', shell: '/bin/zsh' }

// Assigment on os module

// Get memory info (in GB)
// const totalMemoryGB = os.totalmem() / (1024 ** 3);
// const freeMemoryGB = os.freemem() / (1024 ** 3);

// Get OS info
// const osName = os.type()   // "Windows_NT"
// const osVersion = os.release()   // OS version

// Print results
// console.log(`The total memory of this machine is ${totalMemoryGB.toFixed(2)}GB.`);
// console.log(`The operating system of the machine is ${osName} ${osVersion}.`);
// console.log(`The free memory of this machine is ${freeMemoryGB.toFixed(2)}GB.`);




// import http from "http"




// const server = http.createServer((req, res)=>{
//     if(req.url === "/"){
//     res.end("Home Page")
//  }
//      if(req.url === "/about"){
//     res.end("About Page")
//  }
//       if(req.url === "/contact"){
//     res.end("Contact Page")
//  }
//        if(req.url === "/blog"){
//     res.end("Blog Page")
//  }
// })


// const PORT = 3000



// server.listen(PORT, ()=>{
//   console.log(`server listen on port ${PORT}`)
// })

import express from "express"

// initialize express

const app = express()

app.get("/", (req, res)=>{
  res.send("Home Page")
})

app.get("/about", (req, res)=>{
  res.send("About Page")
})

app.get("/contact", (req, res)=>{
  res.send("Contact Page")
})

const PORT = 4000

app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`)
})