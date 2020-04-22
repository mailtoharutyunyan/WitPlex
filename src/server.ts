import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import HomeController from './controllers/home/home-controller'
import AuthenticationController from "./controllers/authentication/authentication-controller";

const app = new App({
    port: 3003,
    controllers: [
        new HomeController(),
        new AuthenticationController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()
