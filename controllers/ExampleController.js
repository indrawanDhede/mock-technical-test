class ExampleController {

  static async index(req, res) {
    return res.status(200).json({
      message: "Okay",
      data: {
        id: 1,
        name: "Example"
      }
    })
  }

}

module.exports = ExampleController;