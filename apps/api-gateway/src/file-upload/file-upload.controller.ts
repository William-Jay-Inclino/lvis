// file-upload.controller.ts

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SingleFileTypeValidationPipe } from './pipes/single-file-type-validation.pipe';
import { MultipleFileTypeValidationPipe } from './pipes/multiple-file-type-validation.pipe';
import { MAX_FILE_SIZE, MEQS_UPLOAD_PATH } from '../__common__/config';
import { FileUploadService } from './file-upload.service';

@Controller('/api/v1/file-upload/warehouse')
export class FileUploadController {

    private readonly logger = new Logger(FileUploadController.name);

    constructor(private readonly fileUploadService: FileUploadService) { }

    @Get('/meqs/:filename')
    async getSingleFileMEQS(@Param('filename') filename: string, @Res() res: Response) {
        try {
            const destination = MEQS_UPLOAD_PATH;
            const filePath = await this.fileUploadService.getFilePath(filename, destination);

            (res as any).sendFile(filePath);
        } catch (error) {
            this.logger.error('Error retrieving single file:', error.message);
            throw new HttpException({ success: false, data: `Failed to retrieve single file: ${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/meqs/single')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingleFileMEQS(
        @UploadedFile(new SingleFileTypeValidationPipe(MAX_FILE_SIZE)) file: Express.Multer.File,
    ) {
        try {
            const destination = MEQS_UPLOAD_PATH;
            const savedFilePath = await this.fileUploadService.saveFileLocally(file, destination);
            this.logger.log('File saved at:', savedFilePath);
            return { success: true, data: savedFilePath };
        } catch (error) {
            this.logger.error('Error uploading single file:', error.message);
            throw new HttpException({ success: false, data: `Failed to upload single file: ${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/meqs/multiple')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadMultipleFileMEQS(
        @UploadedFiles(new MultipleFileTypeValidationPipe(MAX_FILE_SIZE)) files: Express.Multer.File[],
    ) {
        try {
            const destination = MEQS_UPLOAD_PATH;
            const savedFilePaths = await this.fileUploadService.saveFilesLocally(files, destination);
            this.logger.log('Files saved at:', savedFilePaths);
            return { success: true, data: savedFilePaths };
        } catch (error) {
            this.logger.error('Error uploading multiple files:', error.message);
            throw new HttpException({ success: false, data: `Failed to upload multiple files: ${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/meqs/:filename')
    async deleteSingleFileMEQS(@Param('filename') filename: string) {
        try {
            const destination = MEQS_UPLOAD_PATH;
            await this.fileUploadService.deleteFileLocally(filename, destination);
            this.logger.log('File deleted:', filename);
            return { success: true, data: `File deleted: ${filename}` };
        } catch (error) {
            this.logger.error('Error deleting single file:', error.message);
            throw new HttpException({ success: false, data: `Failed to delete single file: ${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/meqs')
    async deleteMultipleFilesMEQS(@Body() filenames: string[]) {
        try {
            const destination = MEQS_UPLOAD_PATH;
            const deletePromises = filenames.map(filename =>
                this.fileUploadService.deleteFileLocally(filename, destination)
            );
            await Promise.all(deletePromises);
            this.logger.log('Files deleted:', filenames);
            return { success: true, data: `Files deleted: ${filenames.join(', ')}` };
        } catch (error) {
            this.logger.error('Error deleting files:', error.message);
            throw new HttpException(
                { success: false, data: `Failed to delete files: ${error.message}` },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
