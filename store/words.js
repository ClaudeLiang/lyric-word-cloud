const request = require('request')
const cheerio = require('cheerio')
const BASE_URL = 'https://www.90lrc.cn'
const MAIN_URL = '/geshou/100360.html'

class WordsStore {
    constructor() {
        this.prepareData()
    }

    async prepareData() {
        // const data = await this.getData(MAIN_URL)
        // console.log(data)
        // await this.parse(data)
        const lyric = await this.getData('/geci/105537.html')
        const $$ = cheerio.load(lyric)
        const text = $$('#txt').text()
        console.log(text)
    }

    async getData(url) {
        return new Promise((resolve, reject) => {
            request(BASE_URL + url, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
                }
            }, (err, resp, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return
                }
                if (resp.statusCode !== 200) {
                    reject(resp.statusCode)
                    return
                }
                resolve(body)
            })
        })
    }

    async parse(data) {
        const $ = cheerio.load(data)
        $('li>a').each(async (idx, elm) => {
            const songUrl = $(elm).attr('href')
            console.log(songUrl)
            const lyric = await this.getData(songUrl)
            const $$ = cheerio.load(lyric)
            const text = $$('txt').text()
            console.log(text)
        })
    }
}

module.exports = new WordsStore