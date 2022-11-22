class Utils {
  static makePayload(data, navigator) {
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
