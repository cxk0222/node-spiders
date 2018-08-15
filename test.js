const request = require('request')
const cheerio = require('cheerio')

const log = function() {
  console.log.apply(console, arguments)
}

function Book() {
  this.name = ''
  this.author = ''
  this.coverUrl = ''
}

const bookFromLi = function(li) {
  const book = new Book()
  const e = cheerio.load(li)

  book.name = e('.more-meta .title').text().trim()
  book.author = e('.more-meta .author').text().trim()
  book.coverUrl = e('.cover img').attr('src')

  return book
}


const saveBook = function(books) {
  const fs = require('fs')
  const path = 'books.txt'
  const s = JSON.stringify(books, null, 2)
  fs.writeFile(path, s, function(error) {
    if (error !== null) {
      log('*** 写入文件错误', error)
    } else {
      log('--- 保存成功')
    }
  })
}

const booksFromUrl = function(url) {
  request(url, function(error, response, body) {
    if (error === null && response.statusCode == 200) {
      // console.log(body)
      const e = cheerio.load(body)
      const books = []
      const bookLis = e('.list-col.list-col5.list-express.slide-item li')
      for (let i = 0; i < bookLis.length; i++) {
        let element = bookLis[i]
        const li = e(element).html()
        const b = bookFromLi(li)
        books.push(b)
      }
      saveBook(books)
    } else {
      log('*** ERROR 请求失败', error)
    }
  })
}

const __main = function() {
  const url = 'https://book.douban.com/'
  booksFromUrl(url)
}

__main()

