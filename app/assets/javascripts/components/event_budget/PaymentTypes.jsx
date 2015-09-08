export default {
  getPaymentDisplay(methodId) {
    switch(methodId) {
      case 1:
        return "Credit";
        break;
      case 2:
        return "Debit";
        break;
      case 3:
        return "Check";
        break;
      default: return "";
    }
  }
}
