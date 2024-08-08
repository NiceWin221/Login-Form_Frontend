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
      userID: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Movie saved successfully",
      data: newBookmark,
    });
    console.log(newBookmark);
  } catch (err) {
    console.error("Error saving movie:", err); // Log the error for debugging

    // Respond with a generic error message and status code
    res.status(500).json({ message: "Failed to save movie" });
  }
};

const getSavedMovie = async (req, res) => {
  try {
    const savedMovie = await Bookmark.findAll({ where: { userID: req.user.id } });
    if (savedMovie.length === 0) {
      return res.status(404).json({ message: "No saved movies!" });
    }
    const movies = savedMovie.map((movie) => ({
      imdbID: movie.imdbID,
      title: movie.title,
      poster: movie.poster,
      plot: movie.plot,
      director: movie.director,
      actor: movie.actor,
    }));
    res.json({ movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveMovie, getSavedMovie };
