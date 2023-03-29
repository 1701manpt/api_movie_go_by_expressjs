const openai = require("~/openai/config")

const createImage = async ({ description = 'Hello', size = '256x256' }) => {
    const response = await openai.createImage({
        prompt: description,
        n: 1,
        size: size,
    })

    return response.data
}

module.exports = createImage