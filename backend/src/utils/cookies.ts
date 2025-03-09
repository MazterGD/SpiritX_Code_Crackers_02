import {CookieOptions, Response} from "express";

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string
};

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure: false, //true on production
}

const getAccessTokenCookieOptions: CookieOptions = ({
    ...defaults,
    expires: new Date(Date.now() + 10 * 60 * 1000),
});

const getRefreshTokenCookieOptions: CookieOptions = ({
    ...defaults,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    path: "auth/refresh"
});
export const setAuthCookies = ({res, accessToken, refreshToken}: Params) => {
    res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions)
        .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions);
}