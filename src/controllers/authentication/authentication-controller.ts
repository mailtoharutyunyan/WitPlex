import IControllerBase from "../../interfaces/IControllerBase.interface";
import * as express from 'express';
import AuthenticationService from "../../service/authentication-service";
import ResponseManager from "../../manager/response-manager";
import { Request, Response } from "express";
import RegisterValidator from "../../validator/auth-validator";
import ValidationResult from "../../middleware/token-result";


class AuthenticationController implements IControllerBase {

    public path = '/auth';
    public router = express.Router();
    private authService: AuthenticationService;
    private responseHandler: ResponseManager;

    constructor() {
        this.initRoutes();
        this.authService = new AuthenticationService();
    }

    initRoutes(): any {
        this.router.post(this.path + '/register', RegisterValidator, ValidationResult, this.registerNewUser);
        this.router.post(this.path + '/login', this.login);
    }

    private registerNewUser = async (req: Request, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        await this.authService.register(req.body, this.responseHandler);
    };

    private login = async (req: Request, res: Response) => {
        this.responseHandler = ResponseManager.getResponseHandler(res);
        await this.authService.login(req.body.username, req.body.password, this.responseHandler);
    }

}

export default AuthenticationController;
