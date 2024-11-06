const User = require("./models/userModel");
const Movie = require("./models/movieModel");

User.belongsToMany(Movie, { through: "UserFavorites", as: "favorites" });
Movie.belongsToMany(User, { through: "UserFavorites", as: "favoritedBy" });

User.belongsToMany(Movie, { through: "UserWatchlist", as: "watchlist" });
Movie.belongsToMany(User, { through: "UserWatchlist", as: "watchlistedBy" });
