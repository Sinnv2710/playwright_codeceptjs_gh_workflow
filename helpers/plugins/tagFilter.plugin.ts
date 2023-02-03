const event = require('codeceptjs').event

export function filterTag(tag: String) {
  return tag.replace('@', '')
}

module.exports = function () {
  event.dispatcher.on(event.test.before, function (test) {
    const tags: [string] = test.tags
    tags.forEach((e: string) => {
      let tag = filterTag(e)

      if (tag === 'SG' || tag === 'HK') {
        process.env.COUNTRY = tag
        return
      }
    })

    console.log(process.env.COUNTRY)
  })

  event.dispatcher.on(event.test.after, function (test) {
    const { I } = inject()
  })
}
