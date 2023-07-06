import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

import { RecordNotFound } from 'src/exceptions/api-exceptions';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return user;
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.prisma.user.findFirst({ where: { id } });
        return user;
    }

    async createUser(data: any): Promise<User | undefined> {
        const newUser = this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                profile: {
                    create: {
                        name: data.name,
                    }
                }
            }
        });

        return newUser;
    }



    async updateRefreshToken({ userId, plainToken }): Promise<User> {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: plainToken,
            },
        });

        if (!user) {
            throw new RecordNotFound('User not found');
        }
        // const hashedToken = await this.hashPassword(plainToken);
        // user.refreshToken = plainToken;
        // await user.save();
        return user;
    }
}
