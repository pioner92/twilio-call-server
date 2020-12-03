// const fs = require('fs')
//
// const read = () => {
//     return new Promise(((resolve, reject) => {
//         fs.readFile('../config.json', 'utf-8', (error, data) => {
//             if (error) {
//                 console.log(error)
//                 reject(error)
//             }
//             resolve(JSON.parse(data))
//         })
//     }))
// }
//
// const write = async (data, name) => {
//     return new Promise(((resolve, reject) => {
//         if (data && name) {
//             let newData = {}
//             let filterData = data.accounts.filter((el) => el.name !== name)
//             newData.accounts = filterData
//             fs.writeFile('../config.json',
//                 JSON.stringify(newData, null, 2), {encoding: 'utf-8'}, (err) => {
//                     if (err) {
//                         console.log(err)
//                         reject({status: 'error'})
//                     }
//                     resolve({status: 'ok'})
//                 })
//         } else {
//             reject({status: 'error'})
//         }
//     }))
// }
//
// const deleteCompany = async (name) => {
//     let file = await read()
//     let result = await write(await file, name)
//     return await result
// }
//
// module.exports = deleteCompany
//
//
