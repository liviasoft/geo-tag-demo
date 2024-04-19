const toFixedDecimals = (number, digits) => {
  if(isNaN(number)) return "";
  return (Math.floor(number * (10 * digits))) / (10 * digits) 
}

export default toFixedDecimals