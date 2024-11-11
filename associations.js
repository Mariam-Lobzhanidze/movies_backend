const User = require("./models/userModel");
const Movie = require("./models/movieModel");
const UserFavorites = require("./models/userFavorites");
const UserWatchlist = require("./models/userWatchList");

User.belongsToMany(Movie, { through: UserFavorites, as: "favorites", foreignKey: "userId" });
Movie.belongsToMany(User, { through: UserFavorites, as: "favoritedBy", foreignKey: "movieId" });

//
User.belongsToMany(Movie, { through: UserWatchlist, as: "watchlist", foreignKey: "userId" });
Movie.belongsToMany(User, { through: UserWatchlist, as: "watchlistedBy", foreignKey: "movieId" });
