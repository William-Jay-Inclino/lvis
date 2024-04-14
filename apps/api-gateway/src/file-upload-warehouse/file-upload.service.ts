import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UPLOADS_PATH } from '../__common__/config';

@Injectable()
export class FileUploadService {

    async getFilePath(filename: string, destination: string): Promise<string> {
        const filePath = path.resolve(UPLOADS_PATH, destination, filename);

        // Check if the file exists before attempting to retrieve its path
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filename}`)
            //   throw new Error(`File not found: ${filename}`);
        }

        return filePath;
    }

    async saveFileLocally(file: Express.Multer.File, destination: string): Promise<string> {
        const uploadDir = path.join(UPLOADS_PATH, destination); // Specify your desired upload directory

        // Create the uploads directory and its parent directories if they don't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate a unique filename
        const uniqueFilename = Date.now() + '_' + file.originalname;

        // Construct the full path to save the file
        const filePath = path.join(uploadDir, uniqueFilename);

        // Write the file to the local storage
        fs.writeFileSync(filePath, file.buffer);

        // Return the path to the saved file
        return filePath;
    }


    async saveFilesLocally(files: Express.Multer.File[], destination: string): Promise<string[]> {
        const savedFilePaths: string[] = [];

        for (const file of files) {
            const filePath = await this.saveFileLocally(file, destination);
            savedFilePaths.push(filePath);
        }

        return savedFilePaths;
    }

    async deleteFileLocally(filename: string, destination: string): Promise<void> {

        if (!filename || filename.trim() === "") return

        const filePath = path.join('uploads', destination, filename);

        // Check if the file exists before attempting to delete
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            // Handle file not found scenario
            console.error(`File not found: ${filename}`)
            // throw new Error(`File not found: ${filename}`);
        }
    }

    async deleteFilesLocally(filenames: string[], destination: string): Promise<void> {
        for (const filename of filenames) {
            await this.deleteFileLocally(filename, destination);
        }
    }

}
