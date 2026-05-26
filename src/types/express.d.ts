import { user_role } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            registerData?: {
                username: string;
                email: string;
                passwordHash: string;
                role: user_role;
                fullName?: string;
                phone?: string;
            };
            user?: {
                userId: string;
                email: string;
                role: user_role;
                username: string;
            };
        }
    }
}

export { };