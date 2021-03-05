const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./business.js');

// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Location } = require('../../db/models');
const { Op } = require('sequelize')
const sequelize = require('sequelize')
router.get(
  '/set-token-cookie',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

router.get('/search', asyncHandler(async (req, res) => {

  let business = req.query.business;
  let location = req.query.location;
  let coord = req.query.coord
  let lng = 0;
  let lat = 0;
  let lngRange = 10000; //.33
  let latRange = 10000;
  if(coord !== 'NoLocation') {
    coord = req.query.coord.split(',')
     lng = Number(coord[0])
     lat = Number(coord[1])
     latRange = .33;
     lngRange = .33;
  }

  let list = await Location.findAll({
    where: {
      coordinates: {
        [Op.and]: [{ lng: { [Op.between]: [lng-lngRange/2, lng+lngRange/2] } },
        { lat: { [Op.between]: [lat-latRange/2, lat+latRange/2] } }
        ]
      },
      [Op.or]:[{name:{[Op.iLike]: `%${business}%`}}]
    },
    limit: 10
  })

  list = list.map(el => el.toJSON())

  let center = {lng: 0, lat: 0}
  if(coord === 'NoLocation') {
    if(list.length > 0) {
      center = {lng: list[0].coordinates.lng, lat: list[0].coordinates.lat}
    }
  } else {
    center = {lng, lat}
  }
  return res.json({searchResultBusinesses:list, searchCenter:center});
}));

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/business', businessRouter);

module.exports = router;
