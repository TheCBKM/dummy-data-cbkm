const { LoremIpsum } = require("lorem-ipsum");
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5555
const serverAddress = PORT === 5555 ? "http://localhost:5555/" : "https://dummy-data-cbkm.herokuapp.com/"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const fmnames = require("./american_names/firstnames_m.json")
const ffnames = require("./american_names/firstnames_f.json")
const surnames = require("./american_names/surnames.json")
const lenfmnames = fmnames.length
const lenffnames = ffnames.length
const lensurnames = surnames.length

const customType = ['paragraph', 'sentence', 'word', 'name', 'phone', 'pic', 'number', 'bool']

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 16,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

// Available

app.post('/available', (req, res) => {
    res.send({
        success: true,
        data: 'available'
    })
})

app.get('/available', (req, res) => {
    res.send({
        success: true,
        data: 'available'
    })
})


// Paragraphs

app.post('/getParagraphs/:wait?', (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.body.count) || 1
            if (req.body.array) {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateParagraphs(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateParagraphs(count)
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

app.get('/getParagraphs/:count?/:option?/:wait?', (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.params.count) || 1
            if (req.params.option == "array") {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateSentences(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateSentences(count)
            })

        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})


//Sentences


app.post('/getSentences/:wait?', (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.body.count) || 1
            if (req.body.array) {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateSentences(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateParagraphs(count)
            })

        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

app.get('/getSentences/:count?/:option?/:wait?', (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {

            let count = Number(req.params.count) || 1
            if (req.params.option == "array") {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateParagraphs(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateParagraphs(count)
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})


//Words

app.post('/getWords/:wait?', (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.body.count) || 1
            if (req.body.array) {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateWords(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateWords(count)
            })

        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

app.get('/getWords/:count?/:option?/:wait?', async (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.params.count) || 1
            if (req.params.option == "array") {
                data = []
                for (i = 0; i < count; i++) {
                    data.push(lorem.generateWords(1))
                }
                return res.send({
                    success: true,
                    data
                })
            }
            res.send({
                success: true,
                data: lorem.generateWords(count)
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)

})

//names
app.get("/getNames/:count?/:gender?/:wait?", (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.params.count) || 1
            let data = []
            for (i = 0; i < count; i++) {
                let name = req.params.gender === 'f' ? ffnames : req.params.gender === 'm' ? fmnames : random(1) ? fmnames : ffnames
                data.push(`${name[random(name.length)]} ${surnames[random(lensurnames)]}`)
            }
            res.send({
                success: true,
                data: data.length > 1 ? data : data[0]
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})


app.post("/getNames/:wait?", (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            let count = Number(req.body.count) || 1
            let data = []
            for (i = 0; i < count; i++) {
                let name = req.body.gender === 'f' ? ffnames : req.body.gender === 'm' ? fmnames : random(1) ? fmnames : ffnames
                data.push(`${name[random(name.length)]} ${surnames[random(lensurnames)]}`)
            }
            res.send({
                success: true,
                data: data.length > 1 ? data : data[0]
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

//Pics
app.get("/getPic/:width?/:height?/:wait?", (req, res) => {
    const wait = Number(req.params.wait) || 0
    setTimeout(() => {
        try {
            var width = req.params.width || 200
            var height = req.params.height || width
            res.redirect(`https://picsum.photos/${width}/${height}`)
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

app.post("/getPic/:wait?", (req, res) => {
    const wait = Number(req.params.wait) || 0
    setTimeout(() => {
        try {
            var width = req.body.width || 200
            var height = req.body.height || width
            var count = req.body.count || 1
            var data = []
            for (var i = 0; i < count; i++)
                data.push(`${serverAddress}getPic/${width}/${height}`)
            res.send({
                success: true,
                data: data.length > 1 ? data : data[0]
            })
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

//coustom
app.post("/coustom/:wait?", (req, res) => {
    const wait = Number(req.params.wait) || 0

    setTimeout(() => {
        try {
            obj = req.body
            keys = Object.keys(obj)
            len = keys.length
            result = {}
            for (i = 0; i < len; i++) {
                console.log("for")
                type = obj[keys[i]].type ? String(obj[keys[i]].type).toLowerCase() : obj[keys[i]]
                option = obj[keys[i]].option || null
                if (customType.includes(type))
                    result[keys[i]] = getValue(type, option || { count: 1 })
                else
                    result[keys[i]] = 'invalid type ' + type

            }
            res.send(result)
        } catch (error) {
            res.send({
                success: false,
                error
            })
        }
    }, wait)
})

function random(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getValue(type, option = { count: 1 }) {
    let count = Number(option.count) || 1
    console.log(option)

    switch (type) {
        case 'sentence':
            var max = 8
            var min = 4
            if (Number(option.max) && Number(option.min) && option.min <= option.max) {
                console.log("ok")
                max = option.max
                min = option.min
            }
            else {

            }
            return new LoremIpsum({
                wordsPerSentence: {
                    min,
                    max
                }
            }).generateSentences(count)

        case 'paragraph':
            var max = 16
            var min = 8
            if (Number(option.max) && Number(option.min) && option.min <= option.max) {
                console.log("ok")
                max = option.max
                min = option.min
            }
            else {

            }
            return new LoremIpsum({
                sentencesPerParagraph: {
                    min,
                    max
                }
            }).generateParagraphs(count)

        case 'word':
            return new LoremIpsum().generateWords(count)
        case "name":
            var data = []
            for (var i = 0; i < count; i++) {
                let name = option.gender === 'f' ? ffnames : option.gender === 'm' ? fmnames : random(1) ? fmnames : ffnames
                data.push(`${name[random(name.length)]} ${surnames[random(lensurnames)]}`)
            }
            return data.length > 1 ? data : data[0] || ""
        case 'phone':
            return random(9999999999, 1000000000)
        case 'pic':
            var width = option.width || 200
            var height = option.height || width
            var data = []
            for (var i = 0; i < count; i++)
                data.push(`${serverAddress}getPic/${width}/${height}`)
            console.log(data)
            return data.length > 1 ? data : data[0] || ""

        case 'number':
            var max = 99
            var min = 10
            if (Number(option.max) && Number(option.min) && option.min <= option.max) {
                max = option.max
                min = option.min
                return random(max, min)
            }
        case 'bool':
            return random(1) ? true : false

        default:
            return new LoremIpsum().generateWords(1)

    }

}
const server = app.listen(PORT, () => {
    console.log("serving on " + PORT)


});


// {
//     "paragraphs": {
//       "type": "paragraph",
//       "option": {
//         "max": 16,
//         "min": 4
//       }
//     },
//     "sentence": {
//       "type": "sentence",
//       "option": {
//         "max": 8,
//         "min": 4
//       }
//     },
//     "word": "word",
//     "name": {
//       "type": "name",
//       "option": {
//         "gender": "m"
//       }
//     },
//     "phone": "phone",
//     "pic": {
//       "type": "pic",
//       "option": {
//         "width": 300,
//         "height": 400
//       }
//     },
//     "number": {
//       "type": "number",
//       "option": {
//         "max": 10000,
//         "min": 100
//       }
//     },
//     "bool": "bool"
//   }