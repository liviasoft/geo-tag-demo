const getSignalEMFColor = (totalExpRatio) => {
  let iconFile, color;
  switch (true) {
    case (!totalExpRatio || totalExpRatio <= 0): {
        iconFile = "pin"
        color = 'secondary';
        break;
      }
    case (totalExpRatio < 0.54): {
        iconFile = "1"
        color = 'info lighten-2';
        break;
      }
    case (totalExpRatio < 0.56 && totalExpRatio >= 0.54): {
        iconFile = "2"
        color = 'info';
        break;
      }
    case (totalExpRatio < 0.58 && totalExpRatio >= 0.56): {
        iconFile = "3"
        color = 'info darken-2';
        break;
      }
    case (totalExpRatio < 0.6 && totalExpRatio >= 0.58): {
        iconFile = "4"
        color = 'success lighten-2';
        break;
      }
    case (totalExpRatio < 0.62 && totalExpRatio >= 0.6): {
        iconFile = "5"
        color = 'success';
        break;
      }
    case (totalExpRatio < 0.64 && totalExpRatio >= 0.62): {
        iconFile = "6"
        color = 'success darken-2';
        break;
      }
    case (totalExpRatio < 0.66 && totalExpRatio >= 0.64): {
        iconFile = "7"
        color = 'error lighten-4';
        break;
      }
    case (totalExpRatio < 0.68 && totalExpRatio >= 0.66): {
        iconFile = "8"
        color = 'error lighten-2';
        break;
      }
    case (totalExpRatio < 0.7 && totalExpRatio >= 0.68): {
        iconFile = "9"
        color = 'error';
        break;
      }
    case (totalExpRatio < 0.72 && totalExpRatio >= 0.7): {
        iconFile = "10"
        color = 'error darken-2';
        break;
      }
    case (totalExpRatio >= 0.72): {
        iconFile = "10"
        color = 'error darken-2';
        break;
      }   
    default: {
      iconFile = 'pin'
      color = 'secondary'
      break;
    }
  }
  console.log({iconFile, color});
  return {iconFile, color};
}

export default {
  getSignalEMFColor
}