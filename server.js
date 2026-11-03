const express = require("express");

const app = express();

const PORT = 3000;


app.use(express.json());


let students = [];


app.get("/", (req, res) => {
    res.send("Student Records API is running!");
});



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



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});