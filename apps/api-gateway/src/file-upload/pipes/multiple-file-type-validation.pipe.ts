import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { fromBuffer } from "file-type";
import { Express } from 'express';

@Injectable()
export class MultipleFileTypeValidationPipe implements PipeTransform {

    constructor(private readonly maxSizeInBytes: number) {}

    async transform(files: Express.Multer.File[]) {
        for (const file of files) {
            await this.validateFile(file);
        }
        return files;
    }

    private async validateFile(file: Express.Multer.File): Promise<void> {
        const { mime } = await fromBuffer(file.buffer);
        const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

        if (!MIME_TYPES.includes(mime)) {
            throw new BadRequestException(
                `File "${file.originalname}" should be either jpeg, jpg, or png.`
            );
        }

        // Validate file size
        if (file.size > this.maxSizeInBytes) {
            throw new BadRequestException(
                `File "${file.originalname}" size exceeds the maximum limit of ${this.maxSizeInBytes} kb.`
            );
        }
    }
}
