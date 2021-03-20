// file: checkForCity.js 
function checkForCity(inputText) {
  const CITYinput = /^https?:\/\//gi
  return CITYinput.test(inputText)
}
export { checkForCity }