import crypto from 'crypto';
export const getPassword = async (plainText, salt) => {
    const password = await crypto.scryptSync(plainText, salt, 32).toString('hex');
    return password;
}