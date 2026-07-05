import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "mc_admin_session";

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_JWT_SECRET belum diset. Tambahkan environment variable ADMIN_JWT_SECRET (string acak yang panjang)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: { sub: string; username: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { sub: string; username: string };
  } catch {
    return null;
  }
}
