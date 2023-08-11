const Report = require("../models/Reports.model");

module.exports.reportsController = {
    
    createReport: async (req, res) => {
        const data = await Report.create({
            user: req.user.id,
            post: req.params.id
        })
        res.json(data)
    },
    getUserReports: async (req, res) => {
        const data = await Report.findById(req.user.id)
        res.json(data)
    },

    deleteReport: async (req, res) => {
        const data = await Report.findByIdAndRemove(req.params.id)
        res.json(data)
    },
}