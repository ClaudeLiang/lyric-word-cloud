const request = require('request')
const cheerio = require('cheerio')
const nodejieba = require("nodejieba");
const BASE_URL = 'https://www.90lrc.cn'
// const MAIN_URL = '/geshou/100360.html'
const MAIN_URL = '/geshou/101009.html'

class WordsStore {
    constructor() {
        this.lyrics = ''
        this.words = []
        this.prepareData().catch(err => {
            console.error(err)
        })
    }

    async prepareData() {
        const data = await this.getData(MAIN_URL)
        await this.parse(data)
        this.words = await this.cutWords()
        console.log('prepare finish')
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
        const parr = []
        $('li>a').each((idx, elm) => {
            const songUrl = $(elm).attr('href')
            if (songUrl.indexOf('geci') === -1) {
                return
            }
            parr.push(this.getData(songUrl).then(lyric => {
                const $$ = cheerio.load(lyric)
                const text = $$('#txt').text()
                return Promise.resolve(text)
            }))
        })
        console.log(parr.length)
        ;(await Promise.all(parr)).map(text => {
            console.log(text)
            this.lyrics += text
        })
    }

    async cutWords() {
        const result = nodejieba.extract(this.lyrics, 500)
        return result.map(e => {
            return {
                name: e.word,
                value: e.weight * 1000
            }
        })
    }

    async getWords() {
        return this.words
    }
}

module.exports = new WordsStore