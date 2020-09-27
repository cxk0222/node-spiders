# node-spiders


## 一、需要的模块

```javascript
// 发送请求
const request = require('request')
// 处理 dom 结构
const cheerio = require('cheerio')
```

## 二、 创建一个类当模板（保存你想要得到的信息）
```javascript
function Movie() {
  this.name = ''
  this.score = 0
  this.quote = ''
  this.ranking = 0
  this.coverUrl = ''
}
```

## 三、发送 http 请求
```javascript
const moviesFromUrl = function(url) {
  request(url, function(error, response, body) {
    if (error === null && response.statusCode == 200) {
      log('*** SUCC 请求成功')
      // ...
    } else {
      log('*** ERROR 请求失败', error)
    }
  })
}
```

## 四、处理 dom ，获取标签中的文本信息或属性
```javascript
const movieFromDiv = function(div) {
  const movie = new Movie()
  const e = cheerio.load(div)

  movie.name = e('.title').text()
  movie.score = e('.rating_num').text()
  movie.quote = e('.inq').text()

  const pic = e('.pic')
  movie.ranking = pic.find('em').text()
  movie.coverUrl = pic.find('img').attr('src')

  return movie
}
```

## 五、保存到本地
```javascript
const saveMovie = function(movies) {
  const fs = require('fs')
  // 可以改变的文件名
  const path = 'douban.txt'
  const s = JSON.stringify(movies, null, 2)
  fs.writeFile(path, s, function(error) {
    if (error !== null) {
      log('*** 写入文件错误', error)
    } else {
      log('--- 保存成功')
    }
  })
}
```

## 六、创建一个入口函数并执行
```javascript
const __main = function() {
  const url = 'https://movie.douban.com/top250'
  moviesFromUrl(url)
}
	
__main()
```

## 七、抓取的结果（图片与处理后的json文件）
![imgs](/douban-img.png)
![json](/douban-json.png)
