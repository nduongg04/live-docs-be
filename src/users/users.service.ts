import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { User, UserDocument } from './schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findOneById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async deleteAll() {
        return this.userModel.deleteMany({}).exec();
    }

    async findByIds(ids: string[]) {
        const objectIds = ids
            .map((id) => {
                try {
                    const objectId = new Types.ObjectId(id);
                    return objectId;
                } catch (error) {
                    return null;
                }
            })
            .filter((objectId) => objectId !== null);

        return this.userModel.find({
            _id: {
                $in: objectIds,
            },
        });
    }

    async findByEmails(emails: string[]) {
        return this.userModel.find({
            email: {
                $in: emails,
            },
        });
    }
}
