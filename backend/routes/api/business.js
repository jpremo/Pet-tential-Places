const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Location, Image, Post, User } = require('../../db/models');
const { Op } = require('sequelize')

router.get('/:id', asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const business = await Location.findByPk(id, {
        include: [Image, { model: Post, include: { model: User, include: { model: Image, where: {locationId: id} } } }]
    });
    res.json({ id, business })
}))

module.exports = router
