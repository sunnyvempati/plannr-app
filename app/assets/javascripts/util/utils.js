var Utils = (function () {
  return {
    //convert ISO date (Bing it) to US date (MM/DD/YYYY)
    isoDateToUsFormat: function (isoDate ) {
      var retDate;
      var separator = "/";
      if (!!isoDate) {
        var d = new Date(isoDate);
        var mm = d.getMonth() + 1;
        var dd = d.getDate() + 1;
        var yyyy = d.getFullYear();
        retDate = "".concat(mm,separator,dd,separator,yyyy);
      }else {
        retDate = "";
      }
      return retDate;
    }

    // postToServer: function(url, data) {
    //   var result = {}
    //   $.post(url, data, function(result) {
    //     result = {success: true, results: result}
    //   }).fail(function(result){
    //     result = {success: false, results: result}
    //   })
    // }
  }

}());