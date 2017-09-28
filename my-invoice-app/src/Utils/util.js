export function getInvoiceList() {
  let invoiceListSize = window.localStorage.length;
  let invoiceList = [];
  let result = {error:false,
                list: invoiceList};
  for (let i = 0; i < invoiceListSize; i++) {
      let invoiceKey = localStorage.key(i);
    try {
      invoiceList[i] = JSON.parse(localStorage.getItem(invoiceKey));
    } catch (e) {
      //console.log(e);
      result.error = true;
      //return false;
    }
  }
  console.log(result);
  return result;
}
