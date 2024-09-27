export interface ITokenPayload {
  id: string;
  role: string;
  email: string;
}

export interface IPayload {
  payload: ITokenPayload;
}
