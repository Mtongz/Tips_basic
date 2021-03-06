let LcApp = require('./lcApp');

let app = new LcApp()
app.staticDir = "/abc"

app.on('/',(req,res)=>{
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("<h1>这是首页</h1><img src='./abc/cxk.jpg'>")
})

app.on("/gnxw",(req,res)=>{
    res.setHeader("content-type","text/html;charset=utf-8");
    if(req.pathObj.base=="index"){
        res.end("这是国内新闻首页")
    }else{
        res.end("这是国内新闻其他页面")
    }
    
})

app.on('/movies',(req,res)=>{
    let movies = [
         {
            name:"雪暴",
            brief:"电影《雪暴》讲述了在一座极北的边陲小镇，一伙穷凶极恶、作案手法老到的悍匪为抢夺黄金，打劫运金车，并借助大雪掩盖了所有犯罪痕迹。为了探求真相，警察王康浩暗地里搜集证据，熟悉地形，终于在一场灾难级的暴雪降临时，与谋财害命的悍匪发生了惊心动魄的正面对决……",
            author:"张震",
            stars:["小明","TFBOY","蔡徐坤"]
         },{
             name:"少年的你",
             brief:"陈念（周冬雨 饰）是一名即将参加高考的高三学生，同校女生胡晓蝶（张艺凡 饰）的跳楼自杀让她的生活陷入了困顿之中。胡晓蝶死后，陈念遭到了以魏莱（周也 饰）为首的三人组的霸凌，魏莱虽然表面上看来是乖巧的优等生，实际上却心思毒辣，胡晓蝶的死和她有着千丝万缕的联系。",
             author:"周冬雨",
             stars:[
                 {
                    name:"蔡徐坤",
                    gender:"男"
                 },{
                    name:"范冰冰",
                    gender:"女"
                 },{
                    name:"李晨",
                    gender:"男"
                 }
             ]
         }
     ]
     let index = req.pathObj.base;
     if(index==0){
        res.render(movies[index],'./template/index0.html')
     }else{
        res.render(movies[index],'./template/index1.html')
     }
     
})








app.run(80,()=>{
    console.log("服务器已启动：","http://127.0.0.1")

})