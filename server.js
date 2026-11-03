
const express = require("express");

const app = express();

const PORT = 3000;


// TASK 1: Initialize Express Application

app.use(express.json());

let students = [];

app.get("/", (req, res) => {
    res.send("Student Records API is running!");
});


// TASK 2: Create Student Records (POST API)

app.post("/api/students", (req, res) => {

    const { id, name, email, course, age } = req.body;

    if (
        id === undefined || id === null ||
        !name || !email || !course ||
        age === undefined || age === null
    ) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    const existingStudent = students.find(
        student => student.id === id
    );

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = {
        id,
        name,
        email,
        course,
        age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});


// TASK 3: Retrieve Student Records (GET API)

app.get("/api/students", (req, res) => {

    res.status(200).json({
        message: "All student records retrieved successfully",
        students: students
    });
});

app.get("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(
        student => student.id === studentId
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student retrieved successfully",
        student: student
    });
});


// TASK 4: Update Student Details (PUT API)

app.put("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === studentId
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (
        !name || !email || !course ||
        age === undefined || age === null
    ) {
        return res.status(400).json({
            message: "Name, email, course and age are mandatory"
        });
    }

    students[studentIndex] = {
        id: studentId,
        name,
        email,
        course,
        age
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[studentIndex]
    });
});


// TASK 5: Delete Student Records (DELETE API)

app.delete("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === studentId
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// ERROR HANDLING

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});


// START SERVER

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
