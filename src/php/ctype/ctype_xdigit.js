module.exports = function ctype_xdigit (text) {
  //  discuss at: http://locutusjs.io/php/ctype_xdigit/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: setlocale
  //   example 1: ctype_xdigit('01dF');
  //   returns 1: true

  if (typeof text !== 'string') {
    return false
  }
  // BEGIN REDUNDANT
  // ensure setup of localization variables takes place
  this.setlocale('LC_ALL', 0)
  // END REDUNDANT
  return text.search(this.locutus.locales[this.locutus.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1
}
