const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/all", controller.allAccess);

    app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/mod", [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get("/api/all/user", controller.getUser)

    app.get("/api/user/:id", controller.getSingleUser);

    app.post("/api/user", controller.createUser);

    app.put("/api/user/:id", controller.editUser);
};