// const fs = require('fs')
//
// const read = ()=>{
//     return new Promise(((resolve, reject) => {
//         fs.readFile('../config.json','utf-8',(err,data)=>{
//             if(err){
//                 reject(err)
//             }
//             resolve(JSON.parse(data))
//         })
//     }))
// }
//
// const write = async (data) => {
//     return new Promise(((resolve, reject) => {
//         fs.writeFile('../config.json', JSON.stringify(data, null, 2), {encoding: 'utf-8'}, (err) => {
//             if (err) {
//                 console.log(err)
//                 reject({status: 'error'})
//             }
//             resolve({status: 'ok'})
//         })
//     }))
// }
//
// const addCompany = async ({name,Account_Sid,Auth_Token,APP_SID,voice_assistant_number,hidden_number,dispatcher_numbers,numbers_available})=>{
//     const file = await read()
//     const data = await file
//     data.accounts.push({
//         "name":name,
//         "Account_Sid":Account_Sid ,
//         "Auth_Token": Auth_Token,
//         "APP_SID": APP_SID,
//         "voice_assistant_number": voice_assistant_number,
//         "hidden_number": hidden_number,
//         "dispatcher_numbers": dispatcher_numbers,
//         "numbers_available": numbers_available
//     })
//     console.log(data)
//     const result = await write(data)
//     return await result
// }
//
// module.exports = addCompany
