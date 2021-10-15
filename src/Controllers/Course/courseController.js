const Course = require('../../Models/Course/courseModel');
const User = require('../../Models/User/userModel')
module.exports = {
    index: async (req, res, next) => {
        const courses = await Course.find({});
        res.status(200).json(courses);
    },
    newCourse: async (req, res, next) => {
        console.log(req.body)
        const newCourse = new Course(req.body);

        try {
            const course = await newCourse.save();
            res.status(200).json(course);
        } catch (e) {
            console.log(e);
            res.status(500).json({ sucess: false });
        }
    },
    getCourse: async (req, res, next) => {
        console.log(req.body)
        const course = await Course.find({ Code: req.body.code }).populate("participants")
        res.status(200).json({ course })

    }
    ,
    addParticipant: async (req, res, next) => {

        const courseCode = req.body.code;
        const participants = req.body.participants;
        var codes = participants.values();

        const course = await Course.findOneAndUpdate({ code: courseCode }, { $push: { 'participants': participants } })
        const courseId = course._id
        for (let user of codes) {

            const userTemp = await User.findOneAndUpdate({ _id: user }, { $push: { 'courses': courseId } })
        }

        res.status(200).json({ course });

    }





















}