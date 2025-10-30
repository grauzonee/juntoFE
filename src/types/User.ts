export type User = {
    id: string;
    username: string;
    description: string;
    email: string;
    token?: string;
    avatarUrl?: string;
    interests: string[];
    createdAt: Date;
}
