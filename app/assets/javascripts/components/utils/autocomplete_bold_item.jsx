var AutocompleteBoldItem = {
  formatMatchedCharacters: function(name, term) {
    return name.replace(new RegExp('(^|)(' + term + ')(|$)','ig'), '$1<b>$2</b>$3');
  }
}
