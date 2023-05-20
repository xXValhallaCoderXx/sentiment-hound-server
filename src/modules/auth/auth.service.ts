import * as bcrypt from 'bcrypt';
import {
    Injectable, UnauthorizedException, HttpException, HttpStatus,
    BadRequestException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PostgresErrorCode } from 'src/exceptions/db-exceptions';
import { InvalidCredentials } from 'src/exceptions/api-exceptions';


@Injectable()
export class AuthService {
    constructor(private configService: ConfigService, private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(user): Promise<any> {
        const { id, email } = user;
        const { accessToken, refreshToken } = await this.getTokens(id, email);

        await this.usersService.updateRefreshToken({
            userId: id,
            plainToken: refreshToken,
        });
        return { accessToken, refreshToken, email };
    }


    async registerUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync({ payload }),
        };
    }


    async registerAccount(data: any) {
        const hashedPassword = await this.hashSecret(data.password);

        try {
            const newUser = await this.usersService.createUser({
                ...data,
                password: hashedPassword,
            });

            const newTokens = await this.getTokens(newUser.id, newUser.email);
            await this.usersService.updateRefreshToken({
                userId: newUser.id,
                plainToken: newTokens.refreshToken,
            });

            return {
                type: 'success',
                error: null,
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    accessToken: newTokens.accessToken,
                    refreshToken: newTokens.refreshToken,
                },
            };
        } catch (err) {
            if (err.parent.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    'User with that email already exists',
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async hashSecret(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    public async verifySecret({ hashed, plain }) {
        const isPasswordMatching = await bcrypt.compare(plain, hashed);

        if (!isPasswordMatching) {
            throw new Error();
        }
    }

    public async getTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_SECRET_EXPIRY'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_SECRET'),
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const user = await this.usersService.findByEmail(email);
            await this.verifySecret({
                hashed: user.password,
                plain: pass,
            });
            return user;
        } catch {
            throw new InvalidCredentials();
        }
    }
}