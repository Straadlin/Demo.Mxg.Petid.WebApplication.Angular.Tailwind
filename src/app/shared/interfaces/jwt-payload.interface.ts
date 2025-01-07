export interface JwtPayload {
  jti: string;
  sid: string;
  role: string;
  prm: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
