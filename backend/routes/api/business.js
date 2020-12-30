const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Location, Image, Post, User } = require('../../db/models');
const { Op } = require('sequelize')
const { formatDistance } = require('date-fns')

router.get('/:id', asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const business = await Location.findByPk(id, {
        include: [{ model: Image, include: User }, { model: Post, include: { model: User, include: { model: Image, where: { locationId: id } } } }]
    });
    const businessInfo = {
        businessInfo: { ...business.toJSON() },
        allImages: business.Images.map((el) => {
            el = el.toJSON()
            el.timeStamp = formatDistance(el.updatedAt, new Date()) + ' ago'
            el.username = el.User.username
            delete el.User
            return el
        }),
        posts: business.Posts
    }
    businessInfo.posts = businessInfo.posts.map(async post => {
        post = post.toJSON()
        if (!post.User) {
            res = await User.findByPk(post.userId, { include: { model: Image, where: { locationId: id } } })
            post.User = res.toJSON()
        }
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
