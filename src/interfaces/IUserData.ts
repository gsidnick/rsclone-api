export default interface IUserData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    isActivated: boolean;
  };
}
