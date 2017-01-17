// global["GoogleclientId"] = "1062269407794-i114uc8qupien017gd1aemd5bc88i618.apps.googleusercontent.com"; // OG
// global["GoogleKey"] = "AIzaSyBzblvTfnRrpg33LBDzqiMXPqY7dmpwaCk";
 // global["GoogleclientSecret"] = "M4zqmRFKLugMxRZcpXDmj7jZ"; // OG

//  global["GoogleKey"] = "AIzaSyBzblvTfnRrpg33LBDzqiMXPqY7dmpwaCk";
//  global["GoogleclientId"] = "1062269407794-i114uc8qupien017gd1aemd5bc88i618.apps.googleusercontent.com";
//  global["GoogleclientSecret"] = "M4zqmRFKLugMxRZcpXDmj7jZ";

 global["GoogleKey"] = "AIzaSyBzblvTfnRrpg33LBDzqiMXPqY7dmpwaCk";
 global["GoogleclientId"] = "1062269407794-imvp331g9e4dfets6sgkp8sn0ardccim.apps.googleusercontent.com";
 global["GoogleclientSecret"] = "jjrWoJ5dKU4iAUgk1kvgsZIX";
passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        callbackURL: global["env"].realHost + "/api/user/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.googleAccessToken = accessToken;
        profile.googleRefreshToken = refreshToken;
        return cb(profile);
    }
));
