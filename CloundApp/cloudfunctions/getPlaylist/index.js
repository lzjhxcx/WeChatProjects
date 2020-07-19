// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lzjhtest-zflyt',
  traceUser: true
})

const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'
// 云函数入口函数
const playlistCollection = db.collection('playlist')

let MAX_LIMIT = 10

exports.main = async (event, context) => {
  //const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks= []
  for (let a = 0;a < batchTimes; a++) {
    let promise = playlistCollection.skip(a * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  } 
 
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc,cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
 
 const playlist =await rp(URL).then((res) => {
   return JSON.parse(res).result
 })
  const newData=[]
  for (let x = 0, len1 = playlist.length;x < len1;x++) {
    let flag=true
    for (let y = 0, len2 = list.data.length;y< len2;y++) {
      if (playlist[x].id === list.data[y].id){
        flag = false
        break
      }
    }
    if (flag===true){
      newData.push(playlist[x])
    }
  }
  for (let i = 0, len = newData.length;i < len; i++){
    await playlistCollection.add({
      data:{
        ...newData[i],
        createTime: db.serverDate(),
      }
    }).then((res)=>{
      console.log('插入成功')
    }).catch((err)=>{
      console.error('插入失败')
    })
  }
  return newData.length
}