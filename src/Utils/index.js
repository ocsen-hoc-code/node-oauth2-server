import crypto from 'crypto';
export const getPassword = async (plainText, salt) => {
    return await crypto.scryptSync(plainText, salt, 32).toString('hex');
}