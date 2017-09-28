export function getInvoiceList() {
  let invoiceListSize = window.localStorage.length;
  let invoiceList = [];
  for (let i = 0; i < invoiceListSize; i++) {
      let invoiceKey = localStorage.key(i);
    try {
      invoiceList[i] = JSON.parse(localStorage.getItem(invoiceKey));
    } catch (e) {
      //console.log(e);
      return false;
    }
  }
  console.log(invoiceList)
  return invoiceList;
}
