const TelegramBotApi = require('node-telegram-bot-api')
const {token, commands, admins, randomKeys} = require("./data/settings.js")
const bot = new TelegramBotApi(token, { polling: true })
const users = require('./data/base/users.json')
const groups = require('./data/base/groups.json')
const {randomKeyborads} = require("./data/fucntions/randomKeyborads.js")
const {startKeyboard, creatorCommands, helpKeyboardGameProfile} = require("./data/fucntions/keyboards.js")

const fs = require('fs');

function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

setInterval(() => {
    require('fs').writeFileSync('./data/base/users.json', JSON.stringify(users, null, '\t'))
}, 9000)

setInterval(() => {
    require('fs').writeFileSync('./data/base/groups.json', JSON.stringify(groups, null, '\t'))
}, 9000)


bot.setMyCommands(commands)

bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            username: msg.from.username,
            nick: "Не установлено",
            c_coin: 20,
            vip: "Нету",
            played: 0,
            c_coin_to_game: 0
            
        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})

bot.on("chat_member_updated", msg => {
    groups.push({
        group: {
            id: msg.chat?.id,
            firts_name: msg.chat?.first_name,
            last_name: msg.chat?.last_name,
            invite_link: msg.chat?.invite_link
        }
    })
})

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

function getPrice (msg) {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let text = msg.text

    switch (typeof(text)) {
        case "number":
            if(text < 1){
                bot.sendMessage(chatId, "Ваша ставка ниже одного!")
            }else{
                bot.removeListener("message", getPrice);
                user.c_coin_to_game = text
                randomKeyborads(bot, user, chatId)
                break;
            }


        case "string":
            bot.sendMessage(chatId, "Введите число!")
            
            break;
    
        default:
            break;
    }

};

function send_current_message(messageID, user, msg, chatId){
    switch (messageID) {
        case "menu":
            bot.sendMessage(chatId, `Привет ${msg.chat?.first_name}!\nВ нашем боте ты сможешь поиграть в протатип игры Cnady Crush\n Ты можешь разговаривать в чате и при этом одновремено играть в нашем боте!\nТак же для админов групп есть уникальное предложения нажмите кнопку "Для админов...".\nИграй в ивенты будь в топе, удачи! `, startKeyboard)

            break;
        case "balance":
            bot.sendMessage(chatId, `Привет ${user.username}!\nТвоё игровое имя ${user.nick}\nУ тебя ${user.c_coin} к-коинов\nVIP статус ${user.vip}\nСыграно игр ${user.played}\nЕсли у тебя на балансе не осталось к-коинов, не волнуйся! к-коины каждый день возобновляются вы получаете 20 к-коинов в день, что бы получать больше перейди в магазин и купи ферму по лучше\nЧто бы изминить игровое имя введите команду ИМЯ Новое имя Пример:ИМЯ Алексей`, helpKeyboardGameProfile)

            break;
        case "top":
            bot.sendMessage(chatId, `Топ в разработке...`, helpKeyboardGameProfile)
            break;

        case "game":
            bot.sendMessage(chatId, `Что бы начать играть вы должны сделать ставку, введите её`)
            bot.on("message", getPrice);
        
            break;
        case "vip":
            bot.sendMessage(chatId, `Вип статус пока что можно получить только если вы админ группы, перейдите по разделу админы что бы узнать подробнее. Ведь именно вы можете получить его ;D`, helpKeyboardGameProfile)
        
            break;
        case "admin":
            bot.sendMessage(chatId, `Если вы добровольно добовляйте бота в свою группу то вы получаете получаете vip статус в этом боте и 100 тысяч к-коинов, я разработчик который пишет ботов и сайты уже более 5 лет ну и не только) Будет ещё куча ботов в которых вы получите вип статус при добовление его в группу и постояно использовать\nЧто бы получить такую возможность напишите мне на один из аккаунтов @Vladimir003 @HesoyamiJs напишите туда о том что вы хотите добавить в группу этого бота ну и напишите что за группа. Спасибо :D`, helpKeyboardGameProfile)
        
            break;
        case "shop":
            bot.sendMessage(chatId, `Магазин в разработке...`, helpKeyboardGameProfile)
        
            break;

        case "creator":
            bot.sendMessage(chatId, `Здравствуйте хозяин! Что вы хотите сделать?`, creatorCommands)
        
            break;
        default:
            break;
    }
}




// function getForm (msg) {
//     var user = users.filter(x => x.id === msg.from.id)[0]
//     let chatId = msg.chat.id
//     let message = `Отлично! Пост был успешно отправлен на модерацию`
//     let text = msg.text


//     bot.sendMessage(chatId, message);
//     bot.removeListener("message", getForm);
// };
// bot.on("message", getForm);

// for(let i in admins){
//     switch (chatId) {
//         case admins[i]: 

//             break
//         default:
//             break;
//     }
// }


bot.on("message", msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let text = msg.text

    
    switch (text) {
        case "/menu": 
            send_current_message("menu", user, msg, chatId)
            break
        case "/balance": 
            send_current_message("balance", user, msg, chatId)
            break
        case "/top":
            send_current_message("top", user, msg, chatId)
            break

        case "/creator":
            for(let i in admins){
                switch (chatId) {
                    case admins[i]: 
                        send_current_message("menu", user, msg, chatId)
                        break
                    default:
                        break;
                }
            }
            break

        default:
            break;
    }



})

bot.onText(/ИМЯ/, msg => {
    let chatId = msg.chat.id
    let text = msg.text.replace("ИМЯ", "")
    var user = users.filter(x => x.id === msg.from.id)[0]

    bot.sendMessage(chatId, `Имя было успешно изменино на ${text}`, helpKeyboardGameProfile)
    user.nick = text
})

bot.onText(/VIP/, msg => {
    let chatId = msg.chat.id
    let text = msg.text.replace("VIP", "")

    let user = users.filter(u => u.nick === text)[0]
    for(let i in admins){
        switch (chatId) {
            case admins[i]:
                if(user == undefined){
                    bot.sendMessage(chatId, "Бот не смог найти пользователя, возможно это потому что игровой ник введен не правельно")
                }else{
                    bot.sendMessage(chatId, `Бот успешно выдал пользователю ${user.nick} VIP статус и 100 тысяч к-коинов`)
                    user.c_coin += 100000
                    user.vip = "Активен"
                }
                break
            default:
                bot.sendMessage(chatId, "Вы не создатель")
        }
    }

    bot.sendMessage(chatId, "Пользователь успешно был назначен VIP")


})

bot.on("callback_query", msg => {
    let chatId = msg.from.id
    let data = msg.data
    var user = users.filter(x => x.id === msg.from.id)[0]
    
    switch (data) {
        case "helpKeyboardGameProfile1":
            send_current_message("game", user, msg, chatId)
            break;
        case "helpKeyboardGameProfile2":
            send_current_message("balance", user, msg, chatId)
            break;
        case "helpKeyboardGameProfile3":
            send_current_message("menu", user, msg, chatId)
            break;
        case "startKeyboard1":
            send_current_message("balance", user, msg, chatId)
            break;
        case "startKeyboard2":
            send_current_message("top", user, msg, chatId)
            break;
        case "startKeyboard3":
            send_current_message("shop", user, msg, chatId)
            break;
        case "startKeyboard4":
            send_current_message("vip", user, msg, chatId)
            break;
        case "startKeyboard5":
            send_current_message("admin", user, msg, chatId)
            break;
        case "creatorCommands1":
            bot.sendMessage(chatId, "Для того что бы назначить vip напишите VIP игровой ник пользователя")
            break;
        default:
            break;
    }
    

})


bot.on("callback_query", msg => {
    let chatId = msg.from.id
    let data = msg.data
    var user = users.filter(x => x.id === msg.from.id)[0]

    if(user.c_coin_to_game != 0){
        let randomKey = getRandomInt(randomKeys)
        if(data == `K${randomKey}`){
            bot.sendMessage(chatId, `Вы угадали! На ваш счёт было зачислено ${user.c_coin_to_game*2} к-коинов\nваш баланс ${user.c_coin}`)
            user.c_coin_to_game = 0
            user.c_coin += user.c_coin_to_game*2
            user.played += 1
        }else{
            bot.sendMessage(chatId, `Ваша ставка не зашла( Вы проиграли ${user.c_coin_to_game} к-коинов\nваш баланс ${user.c_coin} к-коинов, попробуйте ещё раз`)
            user.c_coin_to_game = 0
            user.c_coin -= user.c_coin_to_game
            user.played += 1
        }

        
    }else{
        bot.sendMessage(chatId, "Не возможно сделать пустую ставку")
    }

})

bot.on("polling_error", console.log);