// each file in javascript is treated as a module
// each file(module) have access to a variable called module
// form it we can use the export property

// it is now called an anonymous function because it does not have a name

module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%ID%}/g, product.id)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%FROM%}/g, product.from)
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
  }
  return output
}

// to use it in a js file we use '''require("./modules/replaceTemplate")''' on the top
// then assign it to a variable in any name we like
// then we use the variable like a function
// ex:
// const replaceTemplate = require("./modules/replaceTemplate")
// then we can use it like this
// replaceTemplate(tempCard, el)

// or
// const x = require("./modules/replaceTemplate")
// x(tempCard, el)

// the same
