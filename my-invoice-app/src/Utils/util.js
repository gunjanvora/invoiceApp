export function getInvoiceList() {
  let invoiceListSize = window.localStorage.length;
  let invoiceList = [];
  for (let i = 0; i < invoiceListSize; i++) {
      let invoiceKey = localStorage.key(i);
      invoiceList[i] = JSON.parse(localStorage.getItem(invoiceKey));
  }
  console.log(invoiceList)
  return invoiceList;
}
