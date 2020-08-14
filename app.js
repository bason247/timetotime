const express = require('express')
const app = express()
const port = process.env.PORT || 3000




var rp = require('request-promise')
const axios = require('axios')
var cheerio = require('cheerio'); // Basically jQuery for node.js
const { request } = require('http');
// const link = 'https://www.amazon.com/Just-girl-who-loves-Dogs/dp/B0846KWSGQ/ref=mp_s_a_1_14?dchild=1&keywords=girls%20love%20shirt&qid=1595510189&sprefix=girls%20love&sr=8-14&fbclid=IwAR1PuR7LiX0-qhVSfcjus0DpHpiw5ofHLPo-6IDK8hhHkSCMnz78y7csIHY'


app.get('',async (req,res) => {
    // let url = 
     
        var link = req.query.link;
        if(link !== null){
        var text =  await axios.get(link).then((res) => {
            const $ = cheerio.load(res.data);
            const LinkImg =  $('.imgTagWrapper').children('img').attr('src')
            const cutLink1 = LinkImg.slice(LinkImg.indexOf("%7C"),LinkImg.length)
            const cutLink2 = cutLink1.slice(cutLink1.indexOf("%7C",3)+3,cutLink1.indexOf(".png")+4)
            const LinkResult = 'https://m.media-amazon.com/images/I/'+cutLink2
            return LinkResult           
        }).catch(err => {
            res.send(err)
        })
        await res.send(text)
    
 
    }


 

})

app.listen(port)