const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Location, Image, Post, User } = require('../../db/models');
const { Op } = require('sequelize')

router.get('/:id', asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const business = await Location.findByPk(id, {
        include: [Image, { model: Post, include: { model: User, include: { model: Image, where: { locationId: id } } } }]
    });
    const businessInfo = {
        businessInfo: { ...business.toJSON() },
        allImages: business.Images,
        posts: business.Posts
    }
    businessInfo.posts = businessInfo.posts.map(post => {
        post = post.toJSON()
        post.images = post.User.Images;
        delete post.User.Images;
        post.user = post.User
        delete post.User
        return post
    })

    delete businessInfo.businessInfo.Images
    delete businessInfo.businessInfo.Posts

    res.json(businessInfo)
}))

module.exports = router
