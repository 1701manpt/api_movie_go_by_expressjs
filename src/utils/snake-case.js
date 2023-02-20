function snakeCase(input) {
   if (typeof input !== 'string') {
      input = JSON.stringify(input)
   }
   let snakeStr = ''
   let isKeyStarted = false
   let isKeyEnded = true
   let first = ''
   let second = ''
   for (let i = 0; i < input.length; i++) {
      const prevSymb = input[i - 1]
      const isFormatting = /[":,[\]}{]/.test(prevSymb)
      // accumulate last two syntactic symbols we encountered
      if (isFormatting) {
         if (second && second !== first) first = second
         second = prevSymb
      }
      // getting previous two of those symbols
      const prevTwo = first + second
      if (!isKeyStarted) {
         // if key name is not here
         // checking if key name was started
         isKeyStarted = prevTwo === '{"' || prevTwo === ',"'
         // switching isKeyEnded flag accordingly
         isKeyEnded = !isKeyStarted
      } else {
         // if key name is started, we need to know when it ended
         isKeyEnded = prevTwo === '":'
         // switching isKeyStarted flag accordingly
         isKeyStarted = !isKeyEnded
      }
      // The last block is for doing actual transformation,
      // which will be performed only against key names and
      // letters in upper case
      if (isKeyStarted && /[A-Z]/.test(input[i])) {
         snakeStr = snakeStr + '_' + input[i].toLowerCase()
      } else {
         snakeStr = snakeStr + input[i]
      }
   }
   return JSON.parse(snakeStr)
}

module.exports = snakeCase
