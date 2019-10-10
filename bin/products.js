
const utils = require("./utils"),
fs = require("fs"),
path = require("path"),
glob = require("glob"),
template = require("mustache"),
utf8 = "utf-8",
productTemplate = fs.readFileSync("../site/src/html/templates/product.template.html", utf8);

module.exports = {

    buildProductPages: function (defaultPage) {

        return new Promise(function (resolve, reject) {

            glob("../site/src/api/products/*.json", function (er, files) {

                for (let i = 0; i < files.length; i++) {

                    let json = utils.readJSON(files[i], utf8);

                    json = Object.assign({}, defaultPage, json);

                    json.slug = "product/" + utils.makeSlug(json.Name);
                    json.body = template.render(productTemplate, json);

                    utils.createFile("../site/src/pages/" + json.slug + ".json", JSON.stringify(json), true);

                }

                resolve();

            });

        });

    }

};