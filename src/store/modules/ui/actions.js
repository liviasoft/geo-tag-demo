export default {
  showToast(context, { show, sclass = "", message = "", timeout = 1000 }) {
    return new Promise(resolve => {
      context.commit("showToast", { show, sclass, message, timeout });
      resolve(timeout);
    });
  }
}