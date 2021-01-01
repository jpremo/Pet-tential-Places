const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Location, Image, Post, User } = require('../../db/models');
const { Op } = require('sequelize')
const { formatDistance } = require('date-fns')
const { requireAuth } = require('../../utils/auth.js');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const validatePost = [
    check("body")
    //   .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Please type a review."),
    check("title")
    //   .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Please provide a title."),
    handleValidationErrors,
  ];

router.get('/:id(\\d+)/', asyncHandler(async (req, res) => {
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
    // console.log('req.session \n', req.session, req)
    delete businessInfo.businessInfo.Images
    delete businessInfo.businessInfo.Posts
    console.log(businessInfo)
    res.json(businessInfo)
}))

router.get('/recent', asyncHandler(async (req, res) => {
    let businesses = await Location.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']]
    });
    businesses = businesses.map((el) => el.toJSON())

    let popularBusinesses = await Location.findAll({
        limit: 10,
        order: [['reviewNumber', 'DESC']]
    });
    popularBusinesses = popularBusinesses.map((el) => el.toJSON())
    // const businessInfo = {
    //     businessInfo: { ...business.toJSON() },
    //     allImages: business.Images.map((el) => {
    //         el = el.toJSON()
    //         el.timeStamp = formatDistance(el.updatedAt, new Date()) + ' ago'
    //         el.username = el.User.username
    //         delete el.User
    //         return el
    //     }),
    //     posts: business.toJSON().Posts
    // }
    // // console.log('business posts', business.Posts)
    // for(let i = 0; i < businessInfo.posts.length; i++) {
    //     let post = businessInfo.posts[i]
    //     const images = await Image.findAll( { where: {userId: post.userId, locationId:id}})
    //     post.images = images;
    //     post.user = post.User
    //     post.timeStamp = formatDistance(post.updatedAt, new Date()) + ' ago'
    //     delete post.User
    //     businessInfo.posts[i] = post
    // }
    // // console.log('req.session \n', req.session, req)
    // delete businessInfo.businessInfo.Images
    // delete businessInfo.businessInfo.Posts
    // console.log(businessInfo)
    res.json({businessList: businesses, popularBusinessList: popularBusinesses})
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const businessInfo = {
        userId: req.body.userId,
        address: req.body.address,
        name: req.body.name,
        coordinates: req.body.position,
        description: req.body.description,
        businessCategory: null,
        petCategory: null,
        reviewNumber: 0,
        averageRating: 0
    }

    let newBusiness = await Location.create(businessInfo)


    // const imgArr = []
    for(let i = 0; i < req.body.images.length; i++) {
        const image = req.body.images[i];
        // if(!image[1]) image[1] = ' '
        const imageInfo = {
            title: image[1],
            url: image[0],
            userId: businessInfo.userId,
            locationId: newBusiness.id,
        }
        // console.log('\n Image Info \n', imageInfo)
        let newImage = await Image.create(imageInfo)
        // imgArr.push(newImage.toJSON())
    }
    // newPost = newPost.toJSON()
    // newPost.images = imgArr;
    // newPost.user = await User.findByPk(req.body.userId)
    // newPost.user = newPost.user.toJSON()
    // // console.log('\n New Post \n', newPost)
    res.json(newBusiness)
}))

router.post('/posts', requireAuth, validatePost, asyncHandler(async (req, res) => {
    const userInfo = {
        userId: req.body.userId,
        locationId: req.body.locationId,
        title: req.body.title,
        body: req.body.body,
        rating: req.body.rating
    }
    let newPost = await Post.create(userInfo)
    const imgArr = []
    for(let i = 0; i < req.body.images.length; i++) {
        const image = req.body.images[i];
        // if(!image[1]) image[1] = ' '
        const imageInfo = {
            title: image[1],
            url: image[0],
            userId: req.body.userId,
            locationId: req.body.locationId,
        }
        console.log('\n Image Info \n', imageInfo)
        let newImage = await Image.create(imageInfo)
        imgArr.push(newImage.toJSON())
    }
    newPost = newPost.toJSON()
    newPost.images = imgArr;
    newPost.user = await User.findByPk(req.body.userId)
    newPost.user = newPost.user.toJSON()
    // console.log('\n New Post \n', newPost)
    res.json(newPost)
}))

router.put('/posts', requireAuth, validatePost, asyncHandler(async (req, res) => {
    const userInfo = {
        userId: req.body.userId,
        locationId: req.body.locationId,
        title: req.body.title,
        body: req.body.body,
        rating: req.body.rating
    }
    let newPost = await Post.findByPk(req.body.postId)
    newPost.updatedAt = new Date();
    newPost.userId = req.body.userId;
    newPost.locationId = req.body.locationId;
    newPost.title = req.body.title;
    newPost.body = req.body.body;
    newPost.rating = req.body.rating;
    await newPost.save()
    console.log('user stuff \n', userInfo.userId, userInfo.locationId)
    const oldImages = await Image.findAll({where: {userId:userInfo.userId, locationId: userInfo.locationId}})
    console.log('oldImages \n', oldImages)
    for(let i = 0; i < oldImages.length; i++) {
        await oldImages[i].destroy()
    }
    const imgArr = []
    for(let i = 0; i < req.body.images.length; i++) {
        const image = req.body.images[i];
        // if(!image[1]) image[1] = ' '
        const imageInfo = {
            title: image[1],
            url: image[0],
            userId: req.body.userId,
            locationId: req.body.locationId,
        }
        console.log('\n Image Info \n', imageInfo)
        let newImage = await Image.create(imageInfo)
        imgArr.push(newImage.toJSON())
    }
    newPost = newPost.toJSON()
    newPost.images = imgArr;
    newPost.user = await User.findByPk(req.body.userId)
    newPost.user = newPost.user.toJSON()
    // console.log('\n New Post \n', newPost)
    res.json(newPost)
}))


module.exports = router
