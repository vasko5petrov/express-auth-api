const ONE_HOUR = 1000 * 60 * 60;
const TWELVE_HOURS = ONE_HOUR * 12;

// Verification email
export const EMAIL_VERIFICATION_TIMEOUT = TWELVE_HOURS;

// sha1 -> 160 bits / 8 = 20 bytes * 2 (hex) = 40 bytes
export const EMAIL_VERIFICATION_TOKEN_BYTES = 40;

// sha256 -> 256 bits / 8 = 32 bytes * 2 (hex) = 64 bytes
export const EMAIL_VERIFICATION_SIGNATURE_BYTES = 64;