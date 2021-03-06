### 静态服务器定义

能够根据需要请求的文件，原封不动的将服务器磁盘中的数据直接返回给到浏览器。

1. 根据设定的目录，判断用户是否请求的文件时静态文件

```
//解析路径
let urlObj = path.parse(req.url)
//判断是否请求静态文件
urlObj.dir=='/static'
```

2. 从磁盘读取静态文件并返回

```
//根据请求的后缀名，返回文件的类型
res.setHeader("content-type",getContentType(urlObj.ext))
//从服务器磁盘中读取文件，并输出到响应对象中
let rs = fs.createReadStream('./static/'+urlObj.base)
rs.pipe(res)
```

3. 如何 根据后缀名返回文件类型

```
function getContentType(extName){
    switch(extName){
        case ".jpg":
            return "image/jpeg";
        case ".html":
            return "text/html;charset=utf-8";
        case ".js":
            return "text/javascript;charset=utf-8";
        case ".json":
            return "text/json;charset=utf-8";
        case ".gif":
            return "image/gif";
        case ".css":
            return "text/css"
    }
}
```

#### 完整案例

```
//引入http模块
let http = require('http');
//创建server对象
let server = http.createServer()
//引入path模块
let path = require('path')
//引入文件模块
let fs = require('fs')
//监听客户端发送过来的请求
//req请求对象包含了请求的相关的信息
//res对象用于响应内容，可以通过这个对象帮助我们快速实现HTTP响应
server.on('request',function(req,res){
    //解析路径
    let urlObj = path.parse(req.url)
    //识别请求的路径
    //console.log(urlObj)
    //进入首页，返回首页的内容
    if(req.url=="/"){
        res.setHeader("content-type","text/html;charset=utf-8")
        res.end(`<link rel="stylesheet" href="./static/style.css"><h1>首页</h1><img src='./static/cxk.jpg'>`)
    }else if(urlObj.dir=='/static'){
        res.setHeader("content-type",getContentType(urlObj.ext))
        let rs = fs.createReadStream('./static/'+urlObj.base)
        rs.pipe(res)
    }else{
        
        res.setHeader("content-type","text/html;charset=utf-8")
        res.end("<h1>404页面找不到</h1>")
    }
    
})


function getContentType(extName){
    switch(extName){
        case ".jpg":
            return "image/jpeg";
        case ".html":
            return "text/html;charset=utf-8";
        case ".js":
            return "text/javascript;charset=utf-8";
        case ".json":
            return "text/json;charset=utf-8";
        case ".gif":
            return "image/gif";
        case ".css":
            return "text/css"
    }
}



//启动服务器，监听服务端口
server.listen(80,function(){
    console.log("服务已启动：http:127.0.0.1")
})
```

