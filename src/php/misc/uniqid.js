module.exports = function uniqid (prefix, more_entropy) {
  //  discuss at: http://locutusjs.io/php/uniqid/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Kankrelune (http://www.webfaktory.info/)
  //        note: Uses an internal counter (in locutus global) to avoid collision
  //        test: skip
  //   example 1: uniqid();
  //   returns 1: 'a30285b160c14'
  //   example 2: uniqid('foo');
  //   returns 2: 'fooa30285b1cd361'
  //   example 3: uniqid('bar', true);
  //   returns 3: 'bara20285b23dfd1.31879087'

  if (typeof prefix === 'undefined') {
    prefix = ''
  }

  var retId
  var formatSeed = function (seed, reqWidth) {
    seed = parseInt(seed, 10)
      .toString(16) // to hex str
    if (reqWidth < seed.length) {
      // so long we split
      return seed.slice(seed.length - reqWidth)
    }
    if (reqWidth > seed.length) {
      // so short we pad
      return Array(1 + (reqWidth - seed.length))
        .join('0') + seed
    }
    return seed
  }

  // BEGIN REDUNDANT
  if (!this.locutus) {
    this.locutus = {}
  }
  // END REDUNDANT
  if (!this.locutus.uniqidSeed) {
    // init seed with big random int
    this.locutus.uniqidSeed = Math.floor(Math.random() * 0x75bcd15)
  }
  this.locutus.uniqidSeed++

  // start with prefix, add current milliseconds hex string
  retId = prefix
  retId += formatSeed(parseInt(new Date()
    .getTime() / 1000, 10), 8)
  // add seed hex string
  retId += formatSeed(this.locutus.uniqidSeed, 5)
  if (more_entropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10)
      .toFixed(8)
      .toString()
  }

  return retId
}
