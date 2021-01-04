'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fs = require('fs')

let users = [
  {
    id: 2,
    email: 'Clair_Kuhlman96@gmail.com',
    username: 'Assunta0',
    hashedPassword: '$2a$10$bDANrmfOG7MhiLyX1nl9qO8/6hAAiSk.Stl1lFo.M3GjBahVA6mGO'
  },
  {
    id: 3,
    email: 'Meggie77@gmail.com',
    username: 'Dedric87',
    hashedPassword: '$2a$10$hHo/PVh/2AWXzMjm4EVYfuh5pH3a281latC95o6I3Pm9D0hFPbFP.'
  },
  {
    id: 4,
    email: 'Layla.Runolfsson60@gmail.com',
    username: 'Hassie.Harber',
    hashedPassword: '$2a$10$54fb5rP9BASCjjb4hSRdLesp7HPItqwMdSj/jLXMVfg/Ffw7bIxuW'
  },
  {
    id: 5,
    email: 'Charles_Gibson74@hotmail.com',
    username: 'Pearl71',
    hashedPassword: '$2a$10$KJUwCmwgegnt8eWQliYSduQUIQXjbhvQX3TDCiEJfiHh4OejB4eOK'
  },
  {
    id: 6,
    email: 'Woodrow_OKon@hotmail.com',
    username: 'Shanon96',
    hashedPassword: '$2a$10$IPi43zJwvcfkoMMVafEijeryCvDnZ/2eIXyrzyh9NDVqYom8in5Om'
  },
  {
    id: 7,
    email: 'Daisy.Mante@gmail.com',
    username: 'Dale_Spencer86',
    hashedPassword: '$2a$10$MJyIuqDmBlsQNvyum8pfgOl9U/qQEiXFoTcXcttn38qnmS.1OsWHa'
  },
  {
    id: 8,
    email: 'Humberto_Heathcote@hotmail.com',
    username: 'Lera_Spencer97',
    hashedPassword: '$2a$10$yxeCXfdyGuPbf1Jxw/kpDOfAM36t2LQDT8LII6Nf6E9MuOvG1mIha'
  },
  {
    id: 9,
    email: 'Dawson_Oberbrunner18@hotmail.com',
    username: 'Golda42',
    hashedPassword: '$2a$10$I5U83EKb1oSVVk3Dt0Y90.yd/0sKFc.fJtVKnsrbMNd70eIe5C6yy'
  },
  {
    id: 10,
    email: 'Dora64@hotmail.com',
    username: 'Godfrey47',
    hashedPassword: '$2a$10$jE7nUlosV3oGvYQ.TPnGf.0sa8ZxlJVOkA7YEE7SNdIpWNCSlrw0a'
  },
  {
    id: 11,
    email: 'Ernestine.Hyatt70@yahoo.com',
    username: 'Chanelle_Balistreri2',
    hashedPassword: '$2a$10$FYgvLcFnrffdwADKfR7jkeT3Pkj1gT8IEfx/V2TVsPMZ1PKDBRpjS'
  },
  {
    id: 12,
    email: 'Jordyn_Crist18@yahoo.com',
    username: 'Brandt_Barrows',
    hashedPassword: '$2a$10$EVwwrtYgKGnRx/TJamrTVucrBcGl6nGtiDI3CUgoynpZy9mLk7rPa'
  },
  {
    id: 13,
    email: 'Roman_Hansen@hotmail.com',
    username: 'Annette_Rosenbaum',
    hashedPassword: '$2a$10$XnxBSz7pPTWHylzZqN9J0O7CJirsbL6fHvWIP5QDtpjAIcpGA3PbO'
  },
  {
    id: 14,
    email: 'Nils82@yahoo.com',
    username: 'Albert_Beahan35',
    hashedPassword: '$2a$10$SHtcO4HyGWgoSAaIvY89nuSFzkvW7eqxBKjsIKEE1C2yI197IYfc.'
  },
  {
    id: 15,
    email: 'Sarina87@gmail.com',
    username: 'Archibald.Mayer3',
    hashedPassword: '$2a$10$.1pJ1cpCUZwQWGet4X1oQeS6KT1RoRqRvIivKlvBq8uE5ObDKxoFi'
  },
  {
    id: 16,
    email: 'Tanner58@gmail.com',
    username: 'Willy80',
    hashedPassword: '$2a$10$XK4FzPh7rgMfjXa6669n6OYD1IWylr/9Ar5XIFf9Q.PKEY5B9qbTm'
  },
  {
    id: 17,
    email: 'Aleen.Heidenreich76@gmail.com',
    username: 'Norma96',
    hashedPassword: '$2a$10$R0EFxu/PrXS2GjlAgjmqzeBZTZVKitGJ5ElkjalLYjcHASTD4Q9bu'
  },
  {
    id: 18,
    email: 'Daryl.Auer@gmail.com',
    username: 'Favian82',
    hashedPassword: '$2a$10$cOU5D0CLL9jjO3SM.P4bwumIZhs4vfBsuOxSg18KdkD21Nhg7VW5u'
  },
  {
    id: 19,
    email: 'Francisca9@gmail.com',
    username: 'Hattie_Heaney',
    hashedPassword: '$2a$10$yeReVXDkuv37R1vVS7KLu.DHCmq9cRCiFGaofr8L4F0QsAmm01KsG'
  },
  {
    id: 20,
    email: 'Brielle_Parker79@gmail.com',
    username: 'Myriam_Olson90',
    hashedPassword: '$2a$10$S2Cqb9zcLb5K7d1wwf9DxemVl11JvNXyrFZgkS2Ddk4A8hTNHhV8a'
  },
  {
    id: 21,
    email: 'Larissa.Frami@gmail.com',
    username: 'Amira.Bayer',
    hashedPassword: '$2a$10$ms6N577CufBwEUEfIFYyCOdZZbREX8bsm8KdN/YyCQrc/yuVKhWje'
  },
  {
    id: 22,
    email: 'Serenity50@hotmail.com',
    username: 'Ariane96',
    hashedPassword: '$2a$10$Y4nPkSGZ.McBJktpkon2L.a26dgDSfz4OTHul1Gnf8.jMFuDPYs6a'
  },
  {
    id: 23,
    email: 'Rusty_Stiedemann@yahoo.com',
    username: 'Myrtle91',
    hashedPassword: '$2a$10$Qc7tRB2hMoYwPyjfbkbCh.FEuCeUbgHm0kE3IxdirioHHvYoay/V2'
  },
  {
    id: 24,
    email: 'Larry.Blanda@hotmail.com',
    username: 'Bria_Walter75',
    hashedPassword: '$2a$10$JmD11tcCeg1S7.j1xNivH.zOBfhEo1Jv76cYodOQqNKtvVsGDLLo6'
  },
  {
    id: 25,
    email: 'Elinore.Jenkins74@gmail.com',
    username: 'Arne_Wintheiser',
    hashedPassword: '$2a$10$ejfT1Ik4TO6XGHoMG.S7deJ.krOIQSIWe3bEAzgNwoo2yOTEiGKxa'
  },
  {
    id: 26,
    email: 'Ramiro97@gmail.com',
    username: 'Amanda61',
    hashedPassword: '$2a$10$qVNjUwFN0jJNH4S93SsBCugeJJEjW9oFb48daEEVOVh2fE0BCz6IG'
  },
  {
    id: 27,
    email: 'Dorris82@hotmail.com',
    username: 'Archibald_Beatty',
    hashedPassword: '$2a$10$2nwP77UR1PwAtHkBZ9Fbp.QFKXxQiS/4t/4bvfh8/X8a6W2oPWEwi'
  },
  {
    id: 28,
    email: 'Angelica_Schneider54@yahoo.com',
    username: 'Arlo_Keeling25',
    hashedPassword: '$2a$10$igb7/lW5RnVl4.f7yHVbeuwIQIlc7ZRZgmXMQj3vdBs8u9WHAkY/y'
  },
  {
    id: 29,
    email: 'Dorothea_Daniel90@hotmail.com',
    username: 'Angela47',
    hashedPassword: '$2a$10$nh0NcsTeCZOsyPGmRFiwsuPRsjT9MGdvSrz0cmOdXZwkdEEG07NjO'
  },
  {
    id: 30,
    email: 'Antonette70@hotmail.com',
    username: 'Ulises_Willms50',
    hashedPassword: '$2a$10$yM9Jn/G5r9wbHqORYGlKh.n3M9nUhIBvORK7ZC9z7lTbN/eUs3JHC'
  },
  {
    id: 31,
    email: 'Oren_Gusikowski21@yahoo.com',
    username: 'Terrill74',
    hashedPassword: '$2a$10$V2gI1IcVK5ARIwcTsA/lH.c..ApN6sQMwMBcyP6/oPOAP36pi5VDK'
  },
  {
    id: 32,
    email: 'Stefanie_Nienow37@yahoo.com',
    username: 'Orpha_Becker56',
    hashedPassword: '$2a$10$hQlpAB0At6Cd6FzAu2SiX.a.8965Zrd4WbNs4kOgiRoHdAGZxMvVC'
  },
  {
    id: 33,
    email: 'Chaim_Kling0@yahoo.com',
    username: 'Darwin17',
    hashedPassword: '$2a$10$S0SNNtkjydmsQF.1cIqFhu3ZyNMpJKGklx2xEe9wr2s.9kXZR629m'
  },
  {
    id: 34,
    email: 'Abagail26@yahoo.com',
    username: 'Toni70',
    hashedPassword: '$2a$10$TJ5lb.tHAfzG3eBRdUnlieVK8MO8wRHPJ9VkRgNV0D5001.jxyvdi'
  },
  {
    id: 35,
    email: 'Delores83@hotmail.com',
    username: 'Dakota.Schulist',
    hashedPassword: '$2a$10$RVBP.GnQ7HL1sFukDyzin.yz2SGpEuoFDNOb54Aavo4Vzc/exXmjK'
  },
  {
    id: 36,
    email: 'Antonina90@gmail.com',
    username: 'Peter_Beer19',
    hashedPassword: '$2a$10$BDrdNEpTm8/efHYl1FbcOudN9GNznjsjJmm/6I6b0KWwV8dv7aMR.'
  },
  {
    id: 37,
    email: 'Reagan.Ledner36@hotmail.com',
    username: 'Charles_Rosenbaum',
    hashedPassword: '$2a$10$rBQjoje3MjwU0loJPGh78uaATgSs9nDoq2/PptZ1Nh9Kt0OVS17Yq'
  },
  {
    id: 38,
    email: 'Bulah7@gmail.com',
    username: 'Laney_Langworth81',
    hashedPassword: '$2a$10$zXAs1us1Caj7qHKj/g7h7.iOt7wqc0QKa4wNitCGY7SlHUTcRSzYu'
  },
  {
    id: 39,
    email: 'Isaias_Heller79@hotmail.com',
    username: 'Jerome_Zulauf',
    hashedPassword: '$2a$10$TADDLlFR3G97jwSBmUK1UOn8cir1aWutHF0QqFVLuZKKolmbzCYte'
  },
  {
    id: 40,
    email: 'Jada15@hotmail.com',
    username: 'Alfonzo_Koch45',
    hashedPassword: '$2a$10$zle4URsDuRQIyuGIjovmVOiMA.fgEW/0fpxU4smFxcJ4KrXe6fp6O'
  },
  {
    id: 41,
    email: 'Uriah27@yahoo.com',
    username: 'Billie79',
    hashedPassword: '$2a$10$VFK.WLL09yb3BJqJ/LTgie2i1invDRUtLFNW7bnIQTOjPamKvEl06'
  },
  {
    id: 42,
    email: 'Watson34@hotmail.com',
    username: 'Rebekah_Morar84',
    hashedPassword: '$2a$10$jWVmf9Al6IzbcN4Tal870OB7H93kY4X9u6sAoxkCSJ3GrbeEFyRg6'
  },
  {
    id: 43,
    email: 'Yolanda.Lueilwitz27@hotmail.com',
    username: 'Christina_Blick46',
    hashedPassword: '$2a$10$Mt2Wog/D61Dfg4SedEVFa.h/2qE1eC4cEJaluHmYC3vtlXaChxBee'
  },
  {
    id: 44,
    email: 'Dolly_Mueller@yahoo.com',
    username: 'Romaine.DuBuque',
    hashedPassword: '$2a$10$TsCms0BZN7lsX60HOnsR3ek.cWWkSuKME1Yrco2u44JcjKK6x3sJK'
  },
  {
    id: 45,
    email: 'Lorenza_Stroman41@gmail.com',
    username: 'Ricky.Berge34',
    hashedPassword: '$2a$10$y45WaU0F06GARyyUxGGGgeHEY8ShT.oHH.ZLdSVk2ijzvd8S72OOK'
  },
  {
    id: 46,
    email: 'Beulah.Breitenberg1@gmail.com',
    username: 'Maryam64',
    hashedPassword: '$2a$10$ye.//mucdkooNcP3meSxkulm/MYUGCfb1kDgOutoPzYx2tk0EiRce'
  },
  {
    id: 47,
    email: 'Elsie60@gmail.com',
    username: 'Cecilia_Roberts',
    hashedPassword: '$2a$10$T0vkeQnPkPK2NrApN3FYY.FB./tC8DBmEKThLdxUJzsTTPlW6BPZa'
  },
  {
    id: 48,
    email: 'Melvin_Miller87@yahoo.com',
    username: 'Kianna.Leuschke48',
    hashedPassword: '$2a$10$UEwsapUi21hnJzzHgxMVpuO8kGFLjmcdAfHS2yot3bGd4NtQ/CNom'
  },
  {
    id: 49,
    email: 'Bertram.Hermiston@gmail.com',
    username: 'Davion_Schiller',
    hashedPassword: '$2a$10$eDHyusdj6iYkBk5ttoClXObqc4NdCBcBOhZ1z53BmVWcC8t.o8j5q'
  },
  {
    id: 50,
    email: 'Halie16@hotmail.com',
    username: 'Iliana_Auer53',
    hashedPassword: '$2a$10$Nl2n73xCgEv8Zd1euR53y.8vDt3f2Doqbk7r1Gu0iFNjTrziI2Qg6'
  },
  {
    id: 51,
    email: 'Emmanuelle_Huel@gmail.com',
    username: 'Melvina63',
    hashedPassword: '$2a$10$dhMWi3UgQ8k8lI7Biosr4.zdcqwac/ptU7frmaNrHLbbUpq0SqZ6O'
  },
  {
    id: 52,
    email: 'Vince38@yahoo.com',
    username: 'Emmalee.Legros82',
    hashedPassword: '$2a$10$PrSQ/1F5AOBq5aIEyIOurOk8djBa5gFTvlM0OfTFi5R5r4NpXPhny'
  },
  {
    id: 53,
    email: 'Camila67@yahoo.com',
    username: 'Taya57',
    hashedPassword: '$2a$10$6tCA3AgkwnjakociInqp4.p6rJxF6RVtBgM.2FeCRfy7DT789nH32'
  },
  {
    id: 54,
    email: 'Maybell.Kuvalis27@hotmail.com',
    username: 'Lexi39',
    hashedPassword: '$2a$10$WknZT8PouV.ZOkggyol7UO9XfnqDDDFjY8PX4Qxn3qlVMc1vqMb7K'
  },
  {
    id: 55,
    email: 'Amira_Nienow@hotmail.com',
    username: 'Gail.Volkman',
    hashedPassword: '$2a$10$wdVQpWTzaVr2RWEXj0KveekQ0bwSdK9d2ee676KtsDVA4VLSSbStm'
  },
  {
    id: 56,
    email: 'Colten.Crist83@yahoo.com',
    username: 'Zena_McGlynn',
    hashedPassword: '$2a$10$xJn979.d4/sVF87jjM/4De.fjPw.QI0v/m5d4yCz6vgLTFFLOkY4q'
  },
  {
    id: 57,
    email: 'Bridgette_Hackett66@gmail.com',
    username: 'Eldridge.Weissnat47',
    hashedPassword: '$2a$10$c2crWweqTKdUxvbTDMafJumgR2oEYmSsBvdx.KVVhLDf1Luf9vii.'
  },
  {
    id: 58,
    email: 'Kyler_Quitzon@gmail.com',
    username: 'Birdie_Kuhn2',
    hashedPassword: '$2a$10$uFqok1/KptvEgXwTAHXlvOVwjRpejm5ytk1Y7SExxcXIYGHJSeLv6'
  },
  {
    id: 59,
    email: 'Carey.Shanahan99@yahoo.com',
    username: 'Katelynn.Marvin',
    hashedPassword: '$2a$10$tv0.lRbunzHcawFqrJqU8.tSWheHcskCRkeTDGTuijgcJJ1gcaeNW'
  },
  {
    id: 60,
    email: 'Jasper.Jenkins92@gmail.com',
    username: 'Alvah_Bartoletti33',
    hashedPassword: '$2a$10$Z3RLEC5oqHbED4MhSZYFQeAgHK4JHDQ0RFTQbTqARCmaM6OuXEfkO'
  },
  {
    id: 61,
    email: 'Marcos_Metz40@hotmail.com',
    username: 'Jaylen_Hessel79',
    hashedPassword: '$2a$10$qgryb8MX4wwdm7BJurAIK.MG02ZuTBAa9qV9PdF/qkEXS7pdcVHlW'
  },
  {
    id: 62,
    email: 'Dillon_Lubowitz@hotmail.com',
    username: 'Jerome62',
    hashedPassword: '$2a$10$Rnk91A5AmLHr8pOpX7LlAOq6g348OVaYHIjQbWzjTM4U0xHf1sjxa'
  },
  {
    id: 63,
    email: 'Manuel_Murray@hotmail.com',
    username: 'Bernita_Medhurst56',
    hashedPassword: '$2a$10$HLAGcQKAyKRWtH4hGWdieOfXB6RYcN6Ne0pgCTASTHBQo//rSSRV2'
  },
  {
    id: 64,
    email: 'Jaclyn40@hotmail.com',
    username: 'Rocky_Schimmel',
    hashedPassword: '$2a$10$a9u7wKbSZEw1/HLxXrU7teffm1ZMQbZ3c26ATKwJS1YDjDbzI0RY6'
  },
  {
    id: 65,
    email: 'Bradford_Graham28@gmail.com',
    username: 'Rosina.Pollich3',
    hashedPassword: '$2a$10$n.wZYF7j8BPprgOczw1HxOQpT.nzU6EO9imSmMznico7UMoWNyoJ6'
  },
  {
    id: 66,
    email: 'Taya.Donnelly72@yahoo.com',
    username: 'Hubert_Vandervort',
    hashedPassword: '$2a$10$D1NhUGBbRfXNAAMZoCo/5OsP7ElkwoY2e45TdCMlNG0ui3Gezw.Lu'
  },
  {
    id: 67,
    email: 'Bette.Schaefer18@yahoo.com',
    username: 'Collin.Crist28',
    hashedPassword: '$2a$10$bA6jnXjmyM7/zZ4K4ZskguhmGLpQoh8JeOC700vkfe2KX6yJcozFS'
  },
  {
    id: 68,
    email: 'Manuela.Herzog86@gmail.com',
    username: 'Sydney_Rau',
    hashedPassword: '$2a$10$c6vBJc76FsklclU9K9JRFuL7glw1O8N8aUdc7rAibMqDMrpzaX1c.'
  },
  {
    id: 69,
    email: 'Alphonso.Langosh7@yahoo.com',
    username: 'Bertram86',
    hashedPassword: '$2a$10$oSPxNQHLavDZMsAqpTPWV.VzShvCcU.RZxlccdjXlpEMtgpUJL1gS'
  },
  {
    id: 70,
    email: 'Myrtice_Kessler29@gmail.com',
    username: 'Destiney21',
    hashedPassword: '$2a$10$kqTgGRLN/rvZwmAX4ZSxiudk32GiGgQ8H4GcRcuGQCF7u7vaDoU7a'
  },
  {
    id: 71,
    email: 'Hugh_Heathcote@yahoo.com',
    username: 'Noemi.Lind',
    hashedPassword: '$2a$10$ATskCkiSfdqT1xmQBBRT8.5jTRI2CGZsUBcrVbigiJJObkMxkygVa'
  },
  {
    id: 72,
    email: 'Rae_White@yahoo.com',
    username: 'Bria8',
    hashedPassword: '$2a$10$S/cPp8SihdpVeOgXG4AbPe0yGps8eOCELaOTMvcwMknAXeAvS3aAO'
  },
  {
    id: 73,
    email: 'Kylie.Towne86@yahoo.com',
    username: 'Kacie.Kohler85',
    hashedPassword: '$2a$10$TVMqPNezkN6H1hUV9v5qzeHbbJHzRr1pzI5Rp1YiVLmqltS0i.sHW'
  },
  {
    id: 74,
    email: 'Christop35@hotmail.com',
    username: 'Reva_Davis56',
    hashedPassword: '$2a$10$N9MLCINGqmt7nCS6Lf6H0uIsW/IGIvcCI0YVZA937cLzqHDbJh.Ty'
  },
  {
    id: 75,
    email: 'Drake44@gmail.com',
    username: 'Tina_Kilback5',
    hashedPassword: '$2a$10$JmNwaQtWton/aP2GL28kp.8cFCd3hjjSmiyzLNIbCbmyPEtUdCzfi'
  },
  {
    id: 76,
    email: 'Sophie.Stroman@hotmail.com',
    username: 'Cordell91',
    hashedPassword: '$2a$10$d0s48IAROL9M/OC1RJekYePHtssI9p3RrSFcEITiW6Bwl5WkqT/eu'
  },
  {
    id: 77,
    email: 'Kiara14@hotmail.com',
    username: 'Lue_Runolfsdottir39',
    hashedPassword: '$2a$10$Erye8k/lik5j6o5J2OJCPOBsPslT7W8mK93HkRZ0ZQteZIHaTk3m.'
  },
  {
    id: 78,
    email: 'Elenor_McClure@gmail.com',
    username: 'Theodore_Raynor',
    hashedPassword: '$2a$10$fnuNRMPykxJ8o./SMxzYueb4k1E6CmcTRQcpdBqH8vyr7s8oUyzI2'
  },
  {
    id: 79,
    email: 'Sandy_Padberg@gmail.com',
    username: 'Camylle_Blick',
    hashedPassword: '$2a$10$uQvrdwFirvA8xh0vmO.5B.dBCnxYon4d70bv2aJ2CYukLNJsH6QFK'
  },
  {
    id: 80,
    email: 'Reid.Grant24@gmail.com',
    username: 'Carol.Medhurst42',
    hashedPassword: '$2a$10$wiufMhBf5tYdDkFlzXueiudlMHEZ4hqKV2XMqTd6W53mACbeMu0s.'
  },
  {
    id: 81,
    email: 'Barbara22@gmail.com',
    username: 'Estell.Jacobson',
    hashedPassword: '$2a$10$2aqEk3d.jnPfGuuT3f1iCesE.aXQ4y1CLMQSWb6iDzyYhfJOQ/ZPi'
  },
  {
    id: 82,
    email: 'Jalen63@gmail.com',
    username: 'Monserrate.Schumm65',
    hashedPassword: '$2a$10$qDPWaGi8o38sOY738OOaXes51jnaVcm6I3wx55gqhvsKY/ttFVsxe'
  },
  {
    id: 83,
    email: 'Monserrat_Jones@gmail.com',
    username: 'Jaden.Nienow86',
    hashedPassword: '$2a$10$NnvT0cekWndRdLNq4RFMD.EE1eRmvaLNlmJaZX.7Uie3ZJbiy0OTK'
  },
  {
    id: 84,
    email: 'Efren68@yahoo.com',
    username: 'Skyla13',
    hashedPassword: '$2a$10$TJrIOuWV9kdsnxIU0pSaXOK/BO9XqQ7kBwbgqKTV7npRvrTYY3clG'
  },
  {
    id: 85,
    email: 'Joana.Rosenbaum32@hotmail.com',
    username: 'Amya.Schmeler',
    hashedPassword: '$2a$10$d.rG8eJcJruJW0njRWC3f.mbqXXKBIE7/GOVDqini9hzA9/yDkRyG'
  },
  {
    id: 86,
    email: 'Sigmund_Thiel@gmail.com',
    username: 'Laurence63',
    hashedPassword: '$2a$10$pHwprPgxA2tYSCUz8vBnz.uPaQOufKoJVlJHSrXNpMMaH4OHezrle'
  },
  {
    id: 87,
    email: 'Holden_Schoen@yahoo.com',
    username: 'Robb_Mertz',
    hashedPassword: '$2a$10$Rjtyh7O04rLBjBMT/f87KOm6XDBdDF2F1h2hAnl80XhQlby3gxoEa'
  },
  {
    id: 88,
    email: 'Mckenzie62@gmail.com',
    username: 'Katheryn_Quigley1',
    hashedPassword: '$2a$10$YpfHwfFvQWn73XydRXQiQe7zrAE/D5roG56i7GhXq1ef1O6CIJlC6'
  },
  {
    id: 89,
    email: 'Bo25@yahoo.com',
    username: 'Hayden.Cremin11',
    hashedPassword: '$2a$10$bgErTxyAmXVkNFdeh3/U.eMVCYlMUo8eOCdzfULUrSNG.EtEHP9xK'
  },
  {
    id: 90,
    email: 'Eleonore_Rau20@hotmail.com',
    username: 'Connie.Price',
    hashedPassword: '$2a$10$NEaYiqFVSCoQvzjmW9sW/.nql5QgoStEmXMPnO9WlpJQIkV8k6uPW'
  },
  {
    id: 91,
    email: 'Loma19@yahoo.com',
    username: 'Thelma40',
    hashedPassword: '$2a$10$JOABxa4c0jIAABEIZCZcsunylgfX7UlbRoatD/x.vS1A0LIgQJY5q'
  },
  {
    id: 92,
    email: 'Colleen_Hackett0@hotmail.com',
    username: 'Chester58',
    hashedPassword: '$2a$10$fdH9IikSGV/YiHFVWOKtX.SIGN04SHfgqd3S/GSrj5vtqJ12.qRiq'
  },
  {
    id: 93,
    email: 'Roosevelt.Ondricka@hotmail.com',
    username: 'Augustus.Reinger9',
    hashedPassword: '$2a$10$UVxwoXC6TEIFBWVQbPmEJuBzfnIcRKc4ytx37ZC5Ra5U7QwRiEBu6'
  },
  {
    id: 94,
    email: 'Abdul_OHara@yahoo.com',
    username: 'Horacio.Reynolds',
    hashedPassword: '$2a$10$BLoDmJKrMABP1PK9OxtadufI0STHS20WgNgcvFKeKcLB5bPgCQAva'
  },
  {
    id: 95,
    email: 'Sandra_Weimann94@yahoo.com',
    username: 'Lonzo92',
    hashedPassword: '$2a$10$rsVdzB6VBzu/5Il5l.uKTet5e0hJ5vN0IhP8XAZkK6KvwuK/iBuZy'
  },
  {
    id: 96,
    email: 'Oswald81@gmail.com',
    username: 'Chaz51',
    hashedPassword: '$2a$10$LpTgNXQk5hdsAFmaBtlOF.mMycmQ3guinuZ6SXkmjAcAGLkT3BwFK'
  },
  {
    id: 97,
    email: 'Collin94@gmail.com',
    username: 'Anabelle93',
    hashedPassword: '$2a$10$pU857ILkpEFJZuSaSYKCXeV4fe7zOjph3p8gB1Ngbo6spzuR2uiCe'
  },
  {
    id: 98,
    email: 'May_Yost@gmail.com',
    username: 'Gavin_Green',
    hashedPassword: '$2a$10$Uf5p.gZaCdmTuqIEE.DhL.BVvNNTiUx9GWLZJDp5lQ.DJAA4oTXiy'
  },
  {
    id: 99,
    email: 'Heath_Moore59@gmail.com',
    username: 'Jeremy.Daniel32',
    hashedPassword: '$2a$10$S0HqB1lsIFIfhUG1yrJYXuBCewrw.3I.fV6FcDFALdlN4aVQj6pCG'
  },
  {
    id: 100,
    email: 'Donna.Gutmann@yahoo.com',
    username: 'Cordelia5',
    hashedPassword: '$2a$10$X9oX5eV6rDXLULxitWTmS.Yrn9bpPIh/xTh8E8tIQFebYODfE5C6a'
  },
  {
    id: 101,
    email: 'Price48@yahoo.com',
    username: 'Roberto_Schroeder76',
    hashedPassword: '$2a$10$EjYLF43lW8w.F4HmfbraJO3A/jx9.BBKdMHCVVfAeBeSFSdq2DFw6'
  }
]

const businesses = []

// for(let i = 2; i <102; i++) {
//   users.push({
//     id: i,
//     email: faker.internet.email(),
//     username: faker.internet.userName(),
//     hashedPassword: bcrypt.hashSync(faker.internet.password()),
//     profileImage: faker.internet.avatar()
//   })
// }

const fetch = require('node-fetch');
const { writeFile } = require("fs");
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
  return randomArr(breedInfo)
}

const getCatImage = async (breed) => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search?breed_ids=beng', {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'b07ebe63-3b58-4285-a374-10aa6a74e158'
    },
    method: 'GET'
  })
  const data = await res.json()
  return data[0].url
}

let postNumber = 100;

const generateCatPost = async (id) => {
  const breed = getCatBreed()
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
  for (let i = 0; i < postNum; i++) {
    const userId = getRandom(3, 101)
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
  businessInfo.averageReview = averageReview;
  businessInfo.reviewNumber = posts.length;
  const finalObj = { businessInfo, images, extraInfo, posts }
//   console.log(finalObj)
  return finalObj
}

// console.log(generateCatPost(5))

const makeUsers = async () => {
    const users = []
    for(let i = 3; i<=105; i++) {
        const profileImage = await getCatImage(getCatBreed())
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
    for(let i = 1; i <=100; i++) {
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

    // console.log(data)
    fs.writeFileSync('./seed-data.json', JSON.stringify({businessSeeder, postSeeder, imageSeeder, userSeeder: users}))
    // fs.writeFileSync('./seed-data.txt', [1,2])
}
// fs.promises.writeFile('./seed-data.txt', data, 'utf8' )
writeIt()
