Formsy.addValidationRule('isCurrency', function (values, value) {
  if (!!value) {
    var formattedValue = value.toString().replace('$','').replace(/,/g,'');
    return !isNaN(formattedValue);
  } else {
    return true;
  }
});
