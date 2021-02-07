const express = require('express')
const app = express()

app.use(express.json());

app.post('/feedbackform', (req, res) => {
    res.writeHead(200, {'content-type': 'text/js'})
    const {firstName, lastName, email, dateVisted, dish, page, rating, comments } = req.body;
    res.write(`<h1>${firstName}</h1>
    <h2>${firstName}</h2><h3>${lastName}</h3><h4>${email}</h4><h5>${dateVisted}</h5><h6>${dish}</h6>
            <div>${page}</div><div>${rating}</div><div>${comments}</div>`);
  })

//   firstName: Gary
// lastName: Hyman
// email: tarbadalitha@gmail.com
// dateVisted: 2021-02-05
// dish: pizza
// page: home.html
// rating: 10
// comments: nice