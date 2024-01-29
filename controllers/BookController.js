const bookModel = require("../models/data");
const fs = require("fs");

class BookController {
  // Menampilkan semua jenis buku
  static async index(req, res) {
    try {
      const books = bookModel;
      return res.status(200).json({
        message: "Success",
        data: books,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // Menampilkan buku berdasarkan id
  static async show(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(422).json({
          message: "Masukkan id buku yang diinginkan.",
          data: [],
        });
      }

      const book = bookModel.find((item) => item.id === id);
      if (!book) {
        return res.status(404).json({
          message: "Data tidak ditemukan.",
          data: [],
        });
      }

      return res.status(200).json({
        message: "Success",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // Menampilkan buku berdasarkan jenis bukunya
  static async showJenis(req, res) {
    try {
      const jenis = req.params.jenis;

      if (!jenis) {
        return res.status(422).json({
          message: "Masukkan jenis buku yang diinginkan.",
          data: [],
        });
      }

      const book = bookModel.filter(
        (item) => item.type.toLowerCase() === jenis.toLowerCase()
      );

      if (!book) {
        return res.status(404).json({
          message: "Jenis buku tidak ditemukan.",
          data: [],
        });
      }

      return res.status(200).json({
        message: "Success",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // 	Mengubah nama buku
  static async update(req, res) {
    try {
      const books = bookModel;
      const id = req.params.id;
      const payloads = req.body;
      const filePath = "./models/data.js";

      const existData = books.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      if (!existData) {
        return res.status(404).json({
          message: "id buku tidak ditemukan.",
          data: [],
        });
      }

      const newData = books.map((item) => {
        if (parseInt(item.id) === parseInt(id)) {
          return { ...item, name: payloads.name };
        }
        return item;
      });

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fs.writeFileSync(
        filePath,
        "module.exports = " + JSON.stringify(newData, null, 2) + ";"
      );

      return res.status(200).json({
        message: "Success",
        data: newData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // Menambah buku baru
  static async create(req, res) {
    try {
      const books = bookModel;
      const payloads = req.body;
      const filePath = "./models/data.js";

      const target = books.reduce(
        (max, current) => (current.id > max.id ? current : max),
        books[0]
      );

      books.push({
        id: parseInt(target.id) + 1,
        ...payloads,
      });

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fs.writeFileSync(
        filePath,
        "module.exports = " + JSON.stringify(books, null, 2) + ";"
      );

      return res.status(201).json({
        message: "Success",
        data: books,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // Menampilkan semua buku kecuali buku yang telah dihapus berdasarkan id
  static async destroy(req, res) {
    try {
      const books = bookModel;
      const id = req.params.id;
      const filePath = "./models/data.js";

      const existData = books.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      if (!existData) {
        return res.status(404).json({
          message: "id buku tidak ditemukan.",
          data: [],
        });
      }

      const newData = books.filter(
        (item) => parseInt(item.id) !== parseInt(id)
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fs.writeFileSync(
        filePath,
        "module.exports = " + JSON.stringify(newData, null, 2) + ";"
      );

      return res.status(200).json({
        message: "Success",
        data: newData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = BookController;
