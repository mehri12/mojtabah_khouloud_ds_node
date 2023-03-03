const express=require('express');
const app=express();
const student_router=require('./routers/students')
const port=3000;
app.use(express.json());

app.use('/api/student',student_router);





app.listen(port,()=>console.log(`student api running on ${port}`));