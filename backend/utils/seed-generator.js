'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fs = require('fs')
const fetch = require('node-fetch');

let users

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomArr = (arr) => {
  return arr[getRandom(0, arr.length - 1)]
}
const getCatBreed = () => {
  const breedInfo = [
    { id: 'abys', name: 'Abyssinian' },
    { id: 'aege', name: 'Aegean' },
    { id: 'abob', name: 'American Bobtail' },
    { id: 'acur', name: 'American Curl' },
    { id: 'asho', name: 'American Shorthair' },
    { id: 'awir', name: 'American Wirehair' },
    { id: 'amau', name: 'Arabian Mau' },
    { id: 'amis', name: 'Australian Mist' },
    { id: 'bali', name: 'Balinese' },
    { id: 'bamb', name: 'Bambino' },
    { id: 'beng', name: 'Bengal' },
    { id: 'birm', name: 'Birman' },
    { id: 'bomb', name: 'Bombay' },
    { id: 'bslo', name: 'British Longhair' },
    { id: 'bsho', name: 'British Shorthair' },
    { id: 'bure', name: 'Burmese' },
    { id: 'buri', name: 'Burmilla' },
    { id: 'cspa', name: 'California Spangled' },
    { id: 'ctif', name: 'Chantilly-Tiffany' },
    { id: 'char', name: 'Chartreux' },
    { id: 'chau', name: 'Chausie' },
    { id: 'chee', name: 'Cheetoh' },
    { id: 'csho', name: 'Colorpoint Shorthair' },
    { id: 'crex', name: 'Cornish Rex' },
    { id: 'cymr', name: 'Cymric' },
    { id: 'cypr', name: 'Cyprus' },
    { id: 'drex', name: 'Devon Rex' },
    { id: 'dons', name: 'Donskoy' },
    { id: 'lihu', name: 'Dragon Li' },
    { id: 'emau', name: 'Egyptian Mau' },
    { id: 'ebur', name: 'European Burmese' },
    { id: 'esho', name: 'Exotic Shorthair' },
    { id: 'hbro', name: 'Havana Brown' },
    { id: 'hima', name: 'Himalayan' },
    { id: 'jbob', name: 'Japanese Bobtail' },
    { id: 'java', name: 'Javanese' },
    { id: 'khao', name: 'Khao Manee' },
    { id: 'kora', name: 'Korat' },
    { id: 'kuri', name: 'Kurilian' },
    { id: 'lape', name: 'LaPerm' },
    { id: 'mcoo', name: 'Maine Coon' },
    { id: 'mala', name: 'Malayan' },
    { id: 'manx', name: 'Manx' },
    { id: 'munc', name: 'Munchkin' },
    { id: 'nebe', name: 'Nebelung' },
    { id: 'norw', name: 'Norwegian Forest Cat' },
    { id: 'ocic', name: 'Ocicat' },
    { id: 'orie', name: 'Oriental' },
    { id: 'pers', name: 'Persian' },
    { id: 'pixi', name: 'Pixie-bob' },
    { id: 'raga', name: 'Ragamuffin' },
    { id: 'ragd', name: 'Ragdoll' },
    { id: 'rblu', name: 'Russian Blue' },
    { id: 'sava', name: 'Savannah' },
    { id: 'sfol', name: 'Scottish Fold' },
    { id: 'srex', name: 'Selkirk Rex' },
    { id: 'siam', name: 'Siamese' },
    { id: 'sibe', name: 'Siberian' },
    { id: 'sing', name: 'Singapura' },
    { id: 'snow', name: 'Snowshoe' },
    { id: 'soma', name: 'Somali' },
    { id: 'sphy', name: 'Sphynx' },
    { id: 'tonk', name: 'Tonkinese' },
    { id: 'toyg', name: 'Toyger' },
    { id: 'tang', name: 'Turkish Angora' },
    { id: 'tvan', name: 'Turkish Van' },
    { id: 'ycho', name: 'York Chocolate' }
  ]
  const breed = randomArr(breedInfo)
  return breed
}

const getCatImage = async (breed) => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'b07ebe63-3b58-4285-a374-10aa6a74e158'
    },
    method: 'GET'
  })
  const data = await res.json()
  if(data[0]) return data[0].url
  return "https://image.freepik.com/free-vector/404-error-web-template-with-mad-cat_23-2147763345.jpg"
}

let postNumber = 100;

const generateCatPost = async (id) => {
  const breed = await getCatBreed()
  const images = []
  const imNum = getRandom(1, 5)
  const catAdjectives = ['Kitty Cat', 'Chonkzilla', 'Floofykin', 'Meowy Meowy Cat', 'Cat', 'Kitten']
  const catPrefixes = ['Purry', 'Happy', 'Lazy', 'Goofy', 'Funny', 'Silly', 'Adorable', 'Cute']
  for (let i = 0; i < imNum; i++) {
    const url = await getCatImage(breed.id)
    images.push({url, title:`${randomArr(catPrefixes)} ${randomArr(catAdjectives)}`, locationId:id, userId:2})
  }

  const catRelated = ['Kitty', 'Cat', 'Chonker', 'Meowser', 'Catnip', 'Purr Purr']
  const addressSuffix = ['Ln.', 'St.', 'Ct.', 'Blvd.', 'Rd.']
  const businessArr = ['Pizzeria', 'Ice Cream Parlor', 'Repairs', 'Auto Dealer', 'Restaurant', 'Lawn Care']
  let extraInfo = {
    businessCategory: randomArr(businessArr),
    catbreed: breed
  }
  const businessInfo = {
    id,
    userId: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    address: `${getRandom(100, 10000)} ${randomArr(catRelated)} ${randomArr(addressSuffix)}`,
    name: `${randomArr(catRelated)} ${extraInfo.businessCategory}`,
    businessCategory: null,
    petCategory: null,
    coordinates: JSON.stringify({ lat: getRandom(392629, 393201) / 10000, lng: getRandom(-767587, -764449) / 10000, zoom: getRandom(12, 18) })
  }

  const postNum = getRandom(1, 25)
  const posts = []
  const adjectives = [['Awful', 'Abysmal', 'Terrible'], ['Bad', 'Lacking', 'Not-Fun'], ['Mediocre', 'Average', 'Solid'],
['Great', 'Nice', 'Good'], ['Fantastic', 'Exquisite', 'Divine']]
  const catSuffixes = ['Here!', 'Alert', 'Resides Here', 'Floofs about this place']
  const businessSuffixes = ['Service', 'Spot', 'Place']
  const userNumArr = []
  for (let i = 3; i < 101; i++) {
    userNumArr.push(i)
  }
  for (let i = 0; i < postNum; i++) {
    const userId = userNumArr.splice(getRandom(0, userNumArr.length-1),1)[0]
    const rating = getRandom(1, 5)
    const adj = adjectives[rating-1][getRandom(0,2)]
    let mid
    let end
    if(getRandom(0,1)) {
      mid = extraInfo.businessCategory
      end = randomArr(businessSuffixes)
    } else {
      mid = randomArr(catAdjectives)
      end = randomArr(catSuffixes)
    }
    const title = `${adj} ${mid} ${end}`
    const post = {
      title,
      userId,
      id: postNumber,
      rating,
      locationId:id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    }
    posts.push(post)
    postNumber++

    const imNum = getRandom(1, 5)

    for (let i = 0; i < imNum; i++) {
      const url = await getCatImage(breed.id)
      const title = `${randomArr(catPrefixes)} ${randomArr(catAdjectives)}`
      images.push({url, title, locationId:id, userId})
    }
  }

  const averageReview = posts.reduce((acc,el) => acc+el.rating, 0)/posts.length
  businessInfo.averageRating = averageReview;
  businessInfo.reviewNumber = posts.length;
  const finalObj = { businessInfo, images, extraInfo, posts }
//   console.log(finalObj)
  return finalObj
}

// console.log(generateCatPost(5))

const makeUsers = async () => {
    const users = []
    for(let i = 3; i<=105; i++) {
        const profileImage = await getCatImage(getCatBreed().id)
        users.push({
            id: i,
            email: faker.internet.email(),
            username: faker.internet.userName(),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
            profileImage
        })
    }
    return users
}


const writeIt = async () => {
    users = await makeUsers()
    let data = []
    for(let i = 1; i <=50; i++) {
        const val = await generateCatPost(i)
        data.push(val)
    }
    let businessSeeder = []
    let postSeeder = []
    let imageSeeder = []
    data.forEach((el) => {
       businessSeeder.push(el.businessInfo)
       postSeeder.push(...el.posts)
       imageSeeder.push(...el.images)
    })

    fs.writeFileSync('./seed-data.json', JSON.stringify({businessSeeder, postSeeder, imageSeeder, userSeeder: users}))
}

writeIt()
