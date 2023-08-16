const Group = require("../models/Group.model");
const GroupPost = require("../models/GroupPost.model");

module.exports.groupPostController = {
    createPost: async(req, res) => {
        const data = await GroupPost.create({
            group: req.params.id,
            text: req.body.text,
            image: req.files,
        });

        const newData = await Group.findByIdAndUpdate(
            req.params.id, {
                $push: { posts: data._id}
            },
            { new: true },
        ).populate("posts");

        res.json(data);
    },
    allGroupPosts: async (req, res) => {
    const data = await GroupPost.find().populate("group");
    res.json(data);
    },
    getPostId: async(req, res) => {
        const data = await Group.findById(req.params.id).populate('posts')
        res.json(data);
    }
}