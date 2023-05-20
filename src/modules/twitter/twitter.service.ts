import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

import { RecordNotFound } from 'src/exceptions/api-exceptions';

@Injectable()
export class TwitterService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return user;
    }


}
