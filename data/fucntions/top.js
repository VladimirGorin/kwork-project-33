let users = require("../base/users.json")

let usersNicksDict = []
let usersCoinsDict = []
let topUsers = []

for(let i in users){
    usersNicksDict.push(users[i].nick)
    usersCoinsDict.push(users[i].c_coin)
}

function get_top_users(i){

    let nubmer = 1
    while(nubmer < i){
        let maxValue = Math.max.apply(null, usersCoinsDict)
        let indexOfMaxValue = usersCoinsDict.indexOf(maxValue)

        topUsers.push({id:nubmer, nick:usersNicksDict[indexOfMaxValue], c_coin:usersCoinsDict[indexOfMaxValue]})
        usersCoinsDict.splice()
        nubmer++
    }

}

get_top_users(11)

let use = ['1', '2', '3',"4","5",'6', '7', '8',"9","10"]
let use2 = use.splice(3, 3)
console.log(use2)

console.log(topUsers)