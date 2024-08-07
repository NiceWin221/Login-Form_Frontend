const Bookmark = require("../model/Bookmark");

const saveMovie = async (req, res) => {
  try {
    const { imdbID, title, poster, plot, director, actor } = req.body;
    const newBookmark = await Bookmark.create({
      imdbID: imdbID,
      title: title,
      poster: poster,
      plot: plot,
      director: director,
      actor: actor,
    });
    res.status(201).json({
      success: true,
      message: "Movie saved successfully",
      data: newBookmark,
    });
  } catch (err) {
    console.error("Error saving movie:", err); // Log the error for debugging

    // Respond with a generic error message and status code
    res.status(500).json({ message: "Failed to save movie" });
  }
};

module.exports = saveMovie;
