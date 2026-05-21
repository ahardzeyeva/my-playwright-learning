type Credentials = {
    email: string;
    password: string;
    role?: string;
};
export const validUser: Credentials = {
    email: "john@test.com",
    password: "secret123"
};
export function getLoginUrl(env: string): string {
    return `https://${env}.example.com/login`
}
