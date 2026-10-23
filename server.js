const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');
const app = express();

// ✅ Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: '*'
}))



mongoose
  .connect('mongodb://localhost:27017/mernstackapp')
  .then(() => console.log('DB connected successfully.'))
  .catch((err) => console.error('DB connection error:', err));

app.post('/addtask', async (req, res) => {
  const { todo } = req.body;

  try {
    const newData = new TaskSchema({
      todo: todo,          // ✅ corrected field name
    });
    await newData.save();

    // ✅ await the find and return data
    const allTasks = await TaskSchema.find();
    return res.status(201).json(allTasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get('/gettasks',async(req,res)=>{
  try{
    return res.json(await TaskSchema.find())
  }
  catch(err){
    console.log(err)
  }
})

app.delete('/delete/:id', async(req, res) => {
  try {
    await TaskSchema.findByIdAndDelete(req.params.id);   // ✅ consistent name
    return res.json(await TaskSchema.find());            // ✅ consistent name
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });   // ✅ always respond
  }
});


// app.delete('/delete/:id', async(req,res)=>{
//   try{

    
//     await TeskSchema.findByIdAndDelete(req.params.id);
//     return res.json(await TaskSchema.find())
//   }
//   catch(err){
//     console.log(err)
//   }
// })


app.listen(5000, () => {
  console.log('Server running on port 3000...');
});