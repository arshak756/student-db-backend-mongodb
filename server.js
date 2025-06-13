const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mohammedarshak793:UYnF%5E%23_Uk%23.2%245Y@cluster0.kgevxcb.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
  grade: String
});

const Student = mongoose.model('Student', studentSchema);


app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});


app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});


app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(student);
});


app.put('/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});


app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
