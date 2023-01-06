
module.exports.startKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Мой профиль...', callback_data: `startKeyboard1` }],
            [{ text: 'Топ...', callback_data: `startKeyboard2` }],
            [{ text: 'Магазин...', callback_data: `startKeyboard3` }],
            [{ text: 'Для VIP...', callback_data: `startKeyboard4` }],
            [{ text: 'Для админов...', callback_data: `startKeyboard5` }],

        ]
    })
}

module.exports.helpKeyboardGameProfile = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Играть...', callback_data: `helpKeyboardGameProfile1` }],
            [{ text: 'Профиль...', callback_data: `helpKeyboardGameProfile2` }],
            [{ text: 'Меню...', callback_data: `helpKeyboardGameProfile3` }]
        ]
    })
}

module.exports.creatorCommands = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Назначить VIP', callback_data: `creatorCommands1` }]
        ]
    })
}