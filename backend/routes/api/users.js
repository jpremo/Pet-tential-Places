const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const formidable = require('express-formidable');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const { AWS_KEY_ID, AWS_SECRET_KEY, BUCKET_NAME } = process.env;
AWS.config.update({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1'
})

const s3Bucket = new AWS.S3({ params: { Bucket: BUCKET_NAME } })

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

//adding picture
router.post(
  '/photos',
  formidable(),
  asyncHandler(async (req, res) => {
    const { photo } = req.files;
    const uid = uuidv4()
    const file = fs.readFileSync(photo.path)
    const ext = photo.name.split('.')[1]
    const info = {
      Bucket: BUCKET_NAME,
      Key: `app-data/${uid}.${ext}`, // File name you want to save as in S3
      Body: file
    };
    await s3Bucket.upload(info, async function (err, data) {
      if (err) {
        throw err;
      }
    }).promise();
    return res.json({
      link: `https://${BUCKET_NAME}.s3.amazonaws.com/app-data/${uid}.${ext}`
    });
  })
);

module.exports = router;
