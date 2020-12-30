const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Location, Image, Post, User } = require('../../db/models');
const { Op } = require('sequelize')
const { formatDistance } = require('date-fns')

router.get('/:id', asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const business = await Location.findByPk(id, {
        include: [{ model: Image, include: User }, { model: Post, include: { model: User} }]
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
        posts: business.toJSON().Posts
    }
    // console.log('business posts', business.Posts)
    for(let i = 0; i < businessInfo.posts.length; i++) {
        let post = businessInfo.posts[i]
        const images = await Image.findAll( { where: {userId: post.userId, locationId:id}})
        post.images = images;
        post.user = post.User
        post.timeStamp = formatDistance(post.updatedAt, new Date()) + ' ago'
        delete post.User
        businessInfo.posts[i] = post
    }

    delete businessInfo.businessInfo.Images
    delete businessInfo.businessInfo.Posts
    console.log(businessInfo)
    res.json(businessInfo)
}))

module.exports = router
