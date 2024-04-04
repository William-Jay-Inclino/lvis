/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/__common__/config.ts":
/*!***************************************************!*\
  !*** ./apps/api-gateway/src/__common__/config.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MEQS_UPLOAD_PATH = exports.UPLOADS_PATH = exports.MAX_FILE_SIZE = void 0;
exports.MAX_FILE_SIZE = 5 * 1024 * 1024;
exports.UPLOADS_PATH = 'uploads';
exports.MEQS_UPLOAD_PATH = 'warehouse/meqs';


/***/ }),

/***/ "./apps/api-gateway/src/__common__/types.ts":
/*!**************************************************!*\
  !*** ./apps/api-gateway/src/__common__/types.ts ***!
  \**************************************************/
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

/***/ "./apps/api-gateway/src/app.module.ts":
/*!********************************************!*\
  !*** ./apps/api-gateway/src/app.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const gateway_1 = __webpack_require__(/*! @apollo/gateway */ "@apollo/gateway");
const jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/api-gateway/src/auth/auth.module.ts");
const file_upload_module_1 = __webpack_require__(/*! ./file-upload/file-upload.module */ "./apps/api-gateway/src/file-upload/file-upload.module.ts");
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
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),

/***/ "./apps/api-gateway/src/auth/auth.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.controller.ts ***!
  \******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api-gateway/src/auth/auth.service.ts");
const local_auth_guard_1 = __webpack_require__(/*! ./guards/local-auth.guard */ "./apps/api-gateway/src/auth/guards/local-auth.guard.ts");
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

/***/ "./apps/api-gateway/src/auth/auth.module.ts":
/*!**************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/api-gateway/src/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api-gateway/src/auth/auth.service.ts");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const local_strategy_1 = __webpack_require__(/*! ./strategies/local.strategy */ "./apps/api-gateway/src/auth/strategies/local.strategy.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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

/***/ "./apps/api-gateway/src/auth/auth.service.ts":
/*!***************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.service.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const types_1 = __webpack_require__(/*! ../__common__/types */ "./apps/api-gateway/src/__common__/types.ts");
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

/***/ "./apps/api-gateway/src/auth/guards/local-auth.guard.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/auth/guards/local-auth.guard.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
}
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/api-gateway/src/auth/strategies/local.strategy.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/auth/strategies/local.strategy.ts ***!
  \****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./apps/api-gateway/src/auth/auth.service.ts");
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

/***/ "./apps/api-gateway/src/file-upload/file-upload.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/api-gateway/src/file-upload/file-upload.controller.ts ***!
  \********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const express_1 = __webpack_require__(/*! express */ "express");
const single_file_type_validation_pipe_1 = __webpack_require__(/*! ./pipes/single-file-type-validation.pipe */ "./apps/api-gateway/src/file-upload/pipes/single-file-type-validation.pipe.ts");
const multiple_file_type_validation_pipe_1 = __webpack_require__(/*! ./pipes/multiple-file-type-validation.pipe */ "./apps/api-gateway/src/file-upload/pipes/multiple-file-type-validation.pipe.ts");
const config_1 = __webpack_require__(/*! ../__common__/config */ "./apps/api-gateway/src/__common__/config.ts");
const file_upload_service_1 = __webpack_require__(/*! ./file-upload.service */ "./apps/api-gateway/src/file-upload/file-upload.service.ts");
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

/***/ "./apps/api-gateway/src/file-upload/file-upload.module.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/file-upload/file-upload.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_upload_service_1 = __webpack_require__(/*! ./file-upload.service */ "./apps/api-gateway/src/file-upload/file-upload.service.ts");
const file_upload_controller_1 = __webpack_require__(/*! ./file-upload.controller */ "./apps/api-gateway/src/file-upload/file-upload.controller.ts");
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

/***/ "./apps/api-gateway/src/file-upload/file-upload.service.ts":
/*!*****************************************************************!*\
  !*** ./apps/api-gateway/src/file-upload/file-upload.service.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const config_1 = __webpack_require__(/*! ../__common__/config */ "./apps/api-gateway/src/__common__/config.ts");
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

/***/ "./apps/api-gateway/src/file-upload/pipes/multiple-file-type-validation.pipe.ts":
/*!**************************************************************************************!*\
  !*** ./apps/api-gateway/src/file-upload/pipes/multiple-file-type-validation.pipe.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_type_1 = __webpack_require__(/*! file-type */ "file-type");
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

/***/ "./apps/api-gateway/src/file-upload/pipes/single-file-type-validation.pipe.ts":
/*!************************************************************************************!*\
  !*** ./apps/api-gateway/src/file-upload/pipes/single-file-type-validation.pipe.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_type_1 = __webpack_require__(/*! file-type */ "file-type");
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

/***/ "@apollo/gateway":
/*!**********************************!*\
  !*** external "@apollo/gateway" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@apollo/gateway");

/***/ }),

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/axios":
/*!********************************!*\
  !*** external "@nestjs/axios" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "file-type":
/*!****************************!*\
  !*** external "file-type" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("file-type");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
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
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/api-gateway/src/app.module.ts");
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
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