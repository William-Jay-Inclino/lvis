/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const apollo_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const gateway_1 = __webpack_require__(7);
const jsonwebtoken_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(9);
const file_upload_module_1 = __webpack_require__(21);
const file_upload_system_module_1 = __webpack_require__(31);
const getToken = (authToken) => {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length > 2) {
        throw new common_1.UnauthorizedException('Invalid token');
    }
    return match[1];
};
const decodeToken = (tokenString) => {
    const decoded = (0, jsonwebtoken_1.verify)(tokenString, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        throw new common_1.UnauthorizedException('Invalid token');
    }
    return decoded;
};
function handleAuth({ req }) {
    try {
        if (req.headers.authorization) {
            const token = getToken(req.headers.authorization);
            const decoded = decodeToken(token);
            console.log('decode', decoded);
            return {
                user: decoded,
                authorization: req.headers.authorization
            };
        }
    }
    catch (error) {
        throw new common_1.UnauthorizedException('Invalid token');
    }
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloGatewayDriver,
                server: {
                    context: handleAuth
                },
                gateway: {
                    supergraphSdl: new gateway_1.IntrospectAndCompose({
                        subgraphs: [
                            {
                                name: 'system',
                                url: process.env.SYSTEM_URL,
                            },
                            {
                                name: 'warehouse',
                                url: process.env.WAREHOUSE_URL,
                            },
                        ],
                    }),
                    buildService({ url }) {
                        return new gateway_1.RemoteGraphQLDataSource({
                            url,
                            willSendRequest({ request, context }) {
                                request.http.headers.set('user', context.user ? context.user : null);
                                request.http.headers.set('authorization', context.authorization ? context.authorization : null);
                            },
                        });
                    },
                },
            }),
            auth_module_1.AuthModule,
            file_upload_module_1.FileUploadModule,
            file_upload_system_module_1.FileUploadSystemModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@apollo/gateway");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(5);
const auth_controller_1 = __webpack_require__(10);
const auth_service_1 = __webpack_require__(12);
const axios_1 = __webpack_require__(13);
const jwt_1 = __webpack_require__(15);
const local_strategy_1 = __webpack_require__(19);
const passport_1 = __webpack_require__(18);
const config_1 = __webpack_require__(4);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: '10h' }
            }),
            axios_1.HttpModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy]
    })
], AuthModule);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(5);
const express_1 = __webpack_require__(11);
const auth_service_1 = __webpack_require__(12);
const local_auth_guard_1 = __webpack_require__(17);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        console.log('logging in');
        return this.authService.login(req.user);
    }
    test_get(req) {
        return 'hello';
    }
    test_post(req) {
        return 'hello';
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('test-get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test_get", null);
__decorate([
    (0, common_1.Post)('test-post'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test_post", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(5);
const axios_1 = __webpack_require__(13);
const rxjs_1 = __webpack_require__(14);
const jwt_1 = __webpack_require__(15);
const types_1 = __webpack_require__(16);
let AuthService = class AuthService {
    constructor(jwtService, httpService) {
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validateUser(username, password) {
        console.log('AuthService: validateUser()', username, password);
        const user = await this.findByUserName(username);
        console.log('user', user);
        if (user && user.password === password) {
            if (user.status === types_1.USER_STATUS.INACTIVE) {
                throw new common_1.UnauthorizedException('User is Inactive');
            }
            if (user.deleted_at) {
                console.log('User is deleted at: ', user.deleted_at);
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id };
        console.log('login user', user);
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
    async findByUserName(username) {
        const query = `
            query{
                getUserByUserName(username: "${username}") {
                    id
                    username
                    password
                    status
                    role
                    permissions
                    deleted_at
                    user_employee {
                        employee {
                            id
                            is_budget_officer
                            is_finance_manager
                            total_pending_approvals
                        }
                    }
                }
            }
        `;
        console.log('query', query);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(process.env.API_GATEWAY_URL, { query }).pipe((0, rxjs_1.catchError)((error) => {
            throw error;
        })));
        console.log('data', data);
        if (!data || !data.data || !data.data.getUserByUserName) {
            throw new common_1.UnauthorizedException("Unauthorized User");
        }
        console.log('data.data.getUserByUserName', data.data.getUserByUserName);
        return data.data.getUserByUserName;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ROLE = exports.USER_STATUS = void 0;
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS[USER_STATUS["ACTIVE"] = 1] = "ACTIVE";
    USER_STATUS[USER_STATUS["INACTIVE"] = 2] = "INACTIVE";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
var ROLE;
(function (ROLE) {
    ROLE["USER"] = "USER";
    ROLE["ADMIN"] = "ADMIN";
})(ROLE || (exports.ROLE = ROLE = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const passport_1 = __webpack_require__(18);
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
}
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(18);
const passport_local_1 = __webpack_require__(20);
const auth_service_1 = __webpack_require__(12);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        console.log('local.strategy.ts - validate()', username, password);
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadModule = void 0;
const common_1 = __webpack_require__(5);
const file_upload_service_1 = __webpack_require__(22);
const file_upload_controller_1 = __webpack_require__(26);
let FileUploadModule = class FileUploadModule {
};
exports.FileUploadModule = FileUploadModule;
exports.FileUploadModule = FileUploadModule = __decorate([
    (0, common_1.Module)({
        providers: [file_upload_service_1.FileUploadService],
        controllers: [file_upload_controller_1.FileUploadController]
    })
], FileUploadModule);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadService = void 0;
const common_1 = __webpack_require__(5);
const fs = __webpack_require__(23);
const path = __webpack_require__(24);
const config_1 = __webpack_require__(25);
let FileUploadService = class FileUploadService {
    async getFilePath(filename, destination) {
        const filePath = path.resolve(config_1.UPLOADS_PATH, destination, filename);
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filename}`);
        }
        return filePath;
    }
    async saveFileLocally(file, destination) {
        const uploadDir = path.join(config_1.UPLOADS_PATH, destination);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const uniqueFilename = Date.now() + '_' + file.originalname;
        const filePath = path.join(uploadDir, uniqueFilename);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }
    async saveFilesLocally(files, destination) {
        const savedFilePaths = [];
        for (const file of files) {
            const filePath = await this.saveFileLocally(file, destination);
            savedFilePaths.push(filePath);
        }
        return savedFilePaths;
    }
    async deleteFileLocally(filename, destination) {
        if (!filename || filename.trim() === "")
            return;
        const filePath = path.join('uploads', destination, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        else {
            console.error(`File not found: ${filename}`);
        }
    }
    async deleteFilesLocally(filenames, destination) {
        for (const filename of filenames) {
            await this.deleteFileLocally(filename, destination);
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMPLOYEE_UPLOAD_PATH = exports.MEQS_UPLOAD_PATH = exports.UPLOADS_PATH = exports.MAX_FILE_SIZE = void 0;
exports.MAX_FILE_SIZE = 5 * 1024 * 1024;
exports.UPLOADS_PATH = 'uploads';
exports.MEQS_UPLOAD_PATH = 'warehouse/meqs';
exports.EMPLOYEE_UPLOAD_PATH = 'system/employee';


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FileUploadController_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadController = void 0;
const common_1 = __webpack_require__(5);
const platform_express_1 = __webpack_require__(27);
const express_1 = __webpack_require__(11);
const single_file_type_validation_pipe_1 = __webpack_require__(28);
const multiple_file_type_validation_pipe_1 = __webpack_require__(30);
const config_1 = __webpack_require__(25);
const file_upload_service_1 = __webpack_require__(22);
let FileUploadController = FileUploadController_1 = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
        this.logger = new common_1.Logger(FileUploadController_1.name);
    }
    async getSingleFileMEQS(filename, res) {
        try {
            const destination = config_1.MEQS_UPLOAD_PATH;
            const filePath = await this.fileUploadService.getFilePath(filename, destination);
            res.sendFile(filePath);
        }
        catch (error) {
            this.logger.error('Error retrieving single file:', error.message);
        }
    }
    async uploadSingleFileMEQS(file) {
        try {
            const destination = config_1.MEQS_UPLOAD_PATH;
            const savedFilePath = await this.fileUploadService.saveFileLocally(file, destination);
            this.logger.log('File saved at:', savedFilePath);
            return { success: true, data: savedFilePath };
        }
        catch (error) {
            this.logger.error('Error uploading single file:', error.message);
        }
    }
    async uploadMultipleFileMEQS(files) {
        try {
            const destination = config_1.MEQS_UPLOAD_PATH;
            const savedFilePaths = await this.fileUploadService.saveFilesLocally(files, destination);
            this.logger.log('Files saved at:', savedFilePaths);
            return { success: true, data: savedFilePaths };
        }
        catch (error) {
            this.logger.error('Error uploading multiple files:', error.message);
        }
    }
    async deleteSingleFileMEQS(filename) {
        try {
            const destination = config_1.MEQS_UPLOAD_PATH;
            await this.fileUploadService.deleteFileLocally(filename, destination);
            this.logger.log('File deleted:', filename);
            return { success: true, data: `File deleted: ${filename}` };
        }
        catch (error) {
            this.logger.error('Error deleting single file:', error.message);
        }
    }
    async deleteMultipleFilesMEQS(filePaths) {
        console.log('deleteMultipleFilesMEQS', filePaths);
        try {
            const destination = config_1.MEQS_UPLOAD_PATH;
            const deletePromises = filePaths.map(filePath => {
                const parts = filePath.split('/');
                const filename = parts[parts.length - 1];
                console.log('filename to delete', filename);
                this.fileUploadService.deleteFileLocally(filename, destination);
            });
            await Promise.all(deletePromises);
            this.logger.log('Files deleted:', filePaths);
            return { success: true, data: `Files deleted: ${filePaths.join(', ')}` };
        }
        catch (error) {
            this.logger.error('Error deleting files:', error.message);
        }
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Get)('/meqs/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Response !== "undefined" && Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "getSingleFileMEQS", null);
__decorate([
    (0, common_1.Post)('/meqs/single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new single_file_type_validation_pipe_1.SingleFileTypeValidationPipe(config_1.MAX_FILE_SIZE))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadSingleFileMEQS", null);
__decorate([
    (0, common_1.Post)('/meqs/multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)(new multiple_file_type_validation_pipe_1.MultipleFileTypeValidationPipe(config_1.MAX_FILE_SIZE))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadMultipleFileMEQS", null);
__decorate([
    (0, common_1.Delete)('/meqs/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteSingleFileMEQS", null);
__decorate([
    (0, common_1.Delete)('/meqs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteMultipleFilesMEQS", null);
exports.FileUploadController = FileUploadController = FileUploadController_1 = __decorate([
    (0, common_1.Controller)('/api/v1/file-upload/warehouse'),
    __metadata("design:paramtypes", [typeof (_a = typeof file_upload_service_1.FileUploadService !== "undefined" && file_upload_service_1.FileUploadService) === "function" ? _a : Object])
], FileUploadController);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SingleFileTypeValidationPipe = void 0;
const common_1 = __webpack_require__(5);
const file_type_1 = __webpack_require__(29);
let SingleFileTypeValidationPipe = class SingleFileTypeValidationPipe {
    constructor(maxSizeInBytes) {
        this.maxSizeInBytes = maxSizeInBytes;
    }
    async transform(value) {
        const { mime } = await (0, file_type_1.fromBuffer)(value.buffer);
        const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
        if (!MIME_TYPES.includes(mime)) {
            throw new common_1.BadRequestException("The image should be either jpeg, jpg, or png.");
        }
        if (value.size > this.maxSizeInBytes) {
            throw new common_1.BadRequestException(`File size exceeds the maximum limit of ${this.maxSizeInBytes / (1024 * 1024)} MB.`);
        }
        return value;
    }
};
exports.SingleFileTypeValidationPipe = SingleFileTypeValidationPipe;
exports.SingleFileTypeValidationPipe = SingleFileTypeValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], SingleFileTypeValidationPipe);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("file-type");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultipleFileTypeValidationPipe = void 0;
const common_1 = __webpack_require__(5);
const file_type_1 = __webpack_require__(29);
let MultipleFileTypeValidationPipe = class MultipleFileTypeValidationPipe {
    constructor(maxSizeInBytes) {
        this.maxSizeInBytes = maxSizeInBytes;
    }
    async transform(files) {
        for (const file of files) {
            await this.validateFile(file);
        }
        return files;
    }
    async validateFile(file) {
        const { mime } = await (0, file_type_1.fromBuffer)(file.buffer);
        const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
        if (!MIME_TYPES.includes(mime)) {
            throw new common_1.BadRequestException(`File "${file.originalname}" should be either jpeg, jpg, or png.`);
        }
        if (file.size > this.maxSizeInBytes) {
            throw new common_1.BadRequestException(`File "${file.originalname}" size exceeds the maximum limit of ${this.maxSizeInBytes} kb.`);
        }
    }
};
exports.MultipleFileTypeValidationPipe = MultipleFileTypeValidationPipe;
exports.MultipleFileTypeValidationPipe = MultipleFileTypeValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], MultipleFileTypeValidationPipe);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadSystemModule = void 0;
const common_1 = __webpack_require__(5);
const file_upload_system_service_1 = __webpack_require__(32);
const file_upload_system_controller_1 = __webpack_require__(33);
let FileUploadSystemModule = class FileUploadSystemModule {
};
exports.FileUploadSystemModule = FileUploadSystemModule;
exports.FileUploadSystemModule = FileUploadSystemModule = __decorate([
    (0, common_1.Module)({
        providers: [file_upload_system_service_1.FileUploadSystemService],
        controllers: [file_upload_system_controller_1.FileUploadSystemController]
    })
], FileUploadSystemModule);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadSystemService = void 0;
const common_1 = __webpack_require__(5);
const fs = __webpack_require__(23);
const path = __webpack_require__(24);
const config_1 = __webpack_require__(25);
let FileUploadSystemService = class FileUploadSystemService {
    async getFilePath(filename, destination) {
        const filePath = path.resolve(config_1.UPLOADS_PATH, destination, filename);
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filename}`);
        }
        return filePath;
    }
    async saveFileLocally(file, destination) {
        const uploadDir = path.join(config_1.UPLOADS_PATH, destination);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const uniqueFilename = Date.now() + '_' + file.originalname;
        const filePath = path.join(uploadDir, uniqueFilename);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }
    async saveFilesLocally(files, destination) {
        const savedFilePaths = [];
        for (const file of files) {
            const filePath = await this.saveFileLocally(file, destination);
            savedFilePaths.push(filePath);
        }
        return savedFilePaths;
    }
    async deleteFileLocally(filename, destination) {
        if (!filename || filename.trim() === "")
            return;
        const filePath = path.join('uploads', destination, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        else {
            console.error(`File not found: ${filename}`);
        }
    }
    async deleteFilesLocally(filenames, destination) {
        for (const filename of filenames) {
            await this.deleteFileLocally(filename, destination);
        }
    }
};
exports.FileUploadSystemService = FileUploadSystemService;
exports.FileUploadSystemService = FileUploadSystemService = __decorate([
    (0, common_1.Injectable)()
], FileUploadSystemService);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FileUploadSystemController_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadSystemController = void 0;
const common_1 = __webpack_require__(5);
const platform_express_1 = __webpack_require__(27);
const express_1 = __webpack_require__(11);
const single_file_type_validation_pipe_1 = __webpack_require__(34);
const config_1 = __webpack_require__(25);
const file_upload_system_service_1 = __webpack_require__(32);
let FileUploadSystemController = FileUploadSystemController_1 = class FileUploadSystemController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
        this.logger = new common_1.Logger(FileUploadSystemController_1.name);
    }
    async getSingleFileEmployee(filename, res) {
        try {
            const destination = config_1.EMPLOYEE_UPLOAD_PATH;
            const filePath = await this.fileUploadService.getFilePath(filename, destination);
            res.sendFile(filePath);
        }
        catch (error) {
            this.logger.error('Error retrieving single file:', error.message);
        }
    }
    async uploadSingleFileEmployee(file) {
        try {
            const destination = config_1.EMPLOYEE_UPLOAD_PATH;
            const savedFilePath = await this.fileUploadService.saveFileLocally(file, destination);
            this.logger.log('File saved at:', savedFilePath);
            return { success: true, data: savedFilePath };
        }
        catch (error) {
            this.logger.error('Error uploading single file:', error.message);
        }
    }
    async deleteSingleFileEmployee(filename) {
        try {
            const destination = config_1.EMPLOYEE_UPLOAD_PATH;
            await this.fileUploadService.deleteFileLocally(filename, destination);
            this.logger.log('File deleted:', filename);
            return { success: true, data: `File deleted: ${filename}` };
        }
        catch (error) {
            this.logger.error('Error deleting single file:', error.message);
        }
    }
    async deleteMultipleFilesEmployee(filePaths) {
        console.log('deleteMultipleFilesEmployee', filePaths);
        try {
            const destination = config_1.EMPLOYEE_UPLOAD_PATH;
            const deletePromises = filePaths.map(filePath => {
                const parts = filePath.split('/');
                const filename = parts[parts.length - 1];
                console.log('filename to delete', filename);
                this.fileUploadService.deleteFileLocally(filename, destination);
            });
            await Promise.all(deletePromises);
            this.logger.log('Files deleted:', filePaths);
            return { success: true, data: `Files deleted: ${filePaths.join(', ')}` };
        }
        catch (error) {
            this.logger.error('Error deleting files:', error.message);
        }
    }
};
exports.FileUploadSystemController = FileUploadSystemController;
__decorate([
    (0, common_1.Get)('/employee/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Response !== "undefined" && Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FileUploadSystemController.prototype, "getSingleFileEmployee", null);
__decorate([
    (0, common_1.Post)('/employee/single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new single_file_type_validation_pipe_1.SingleFileTypeValidationPipe(config_1.MAX_FILE_SIZE))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], FileUploadSystemController.prototype, "uploadSingleFileEmployee", null);
__decorate([
    (0, common_1.Delete)('/employee/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadSystemController.prototype, "deleteSingleFileEmployee", null);
__decorate([
    (0, common_1.Delete)('/employee'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileUploadSystemController.prototype, "deleteMultipleFilesEmployee", null);
exports.FileUploadSystemController = FileUploadSystemController = FileUploadSystemController_1 = __decorate([
    (0, common_1.Controller)('/api/v1/file-upload/system'),
    __metadata("design:paramtypes", [typeof (_a = typeof file_upload_system_service_1.FileUploadSystemService !== "undefined" && file_upload_system_service_1.FileUploadSystemService) === "function" ? _a : Object])
], FileUploadSystemController);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SingleFileTypeValidationPipe = void 0;
const common_1 = __webpack_require__(5);
const file_type_1 = __webpack_require__(29);
let SingleFileTypeValidationPipe = class SingleFileTypeValidationPipe {
    constructor(maxSizeInBytes) {
        this.maxSizeInBytes = maxSizeInBytes;
    }
    async transform(value) {
        const { mime } = await (0, file_type_1.fromBuffer)(value.buffer);
        const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
        if (!MIME_TYPES.includes(mime)) {
            throw new common_1.BadRequestException("The image should be either jpeg, jpg, or png.");
        }
        if (value.size > this.maxSizeInBytes) {
            throw new common_1.BadRequestException(`File size exceeds the maximum limit of ${this.maxSizeInBytes / (1024 * 1024)} MB.`);
        }
        return value;
    }
};
exports.SingleFileTypeValidationPipe = SingleFileTypeValidationPipe;
exports.SingleFileTypeValidationPipe = SingleFileTypeValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], SingleFileTypeValidationPipe);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const dotenv_1 = __webpack_require__(35);
async function bootstrap() {
    try {
        (0, dotenv_1.config)();
    }
    catch (error) {
        console.error('Error loading .env file');
        console.error(error);
        process.exit(1);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = process.env.API_GATEWAY_PORT || 3000;
    await app.listen(port, async () => {
        console.log(`Running API in NODE ${process.env.NODE_ENV} on ${await app.getUrl()}`);
    });
}
bootstrap();

})();

/******/ })()
;