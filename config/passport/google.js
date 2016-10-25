global["GoogleKey"] = "AIzaSyBzblvTfnRrpg33LBDzqiMXPqY7dmpwaCk";
global["GoogleclientId"] = "256755864068-n7jfdtk0t742rfia870ai6qmiq0bnfg4.apps.googleusercontent.com";
global["GoogleclientSecret"] = "18kFTxnphlgMoE_pAaaJ_dac";

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
