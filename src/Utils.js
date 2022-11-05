class Utils {
  static verify_fp() {
    // TODO, add proper verify fp method
    return "verify_68b8ccfa65726db8b3db0cc07821d696";
  }

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
