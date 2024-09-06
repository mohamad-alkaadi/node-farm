//using templates
const http = require("http")
const url = require("url")
const fs = require("fs")

const replaceTemplate = require("./modules/replaceTemplate")

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("")
    console.log(cardsHtml)
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

    res.end(output)

    //Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(data)

    //Not Found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    })
    res.end("<h1>page not found!</h1>")
  }
})

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000")
})
