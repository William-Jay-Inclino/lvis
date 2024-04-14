import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { fromBuffer } from "file-type"
import { Express } from 'express'

@Injectable()
export class SingleFileTypeValidationPipe implements PipeTransform {

    constructor(private readonly maxSizeInBytes: number) {}

    async transform(value: Express.Multer.File) {
        const { mime } = await fromBuffer(value.buffer)
        const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"]

        if (!MIME_TYPES.includes(mime)) {
        throw new BadRequestException(
            "The image should be either jpeg, jpg, or png."
        )
        }

        // Validate file size
        if (value.size > this.maxSizeInBytes) {
            throw new BadRequestException(
            `File size exceeds the maximum limit of ${this.maxSizeInBytes / (1024 * 1024)} MB.`
            );
        }

        return value
    }
}