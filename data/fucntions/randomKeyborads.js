const {randomKeys} = require("../settings.js")


module.exports.randomKeyborads = (bot, user, chatId) => {
    let message = `Отлично! Ставка сделана ${user.c_coin_to_game} выберете одну из кнопок\nВ случии выигрыша вы получите 2x от суммы которой вы поставили\nВ случии проигриша вы потеряете столько к-коинов сколько поставили.`
    let keys = []
    let keywords = ["a", "A", "b", "B", "c", "C", "d", "D", "i", "I"] 

    function getRandomInt(max){
        return Math.floor(Math.random() * max)
    }


    function getKeys (i){
        let nubmer = 0
        while (nubmer < i) {
            keys.push([{text: `${keywords[getRandomInt(9)]}${getRandomInt(100)}`, callback_data: `K${nubmer}`}])
            nubmer+=1
        }
    }
    getKeys(randomKeys)
    const keyborad = {
        reply_markup: JSON.stringify({
            inline_keyboard: keys
        })
    }

    bot.sendMessage(chatId, message, keyborad)
    
}
