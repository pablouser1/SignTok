class Utils {
  static makePayload(data, navigator) {
    if (data === null) {
      return JSON.stringify({
        status: "error",
        data: "There was an error processing your request! Is your URL valid?"
      })
    }

    return JSON.stringify({
      status: "ok",
      data: {
        ...data,
        navigator
      }
    })
  }
}

module.exports = Utils;
