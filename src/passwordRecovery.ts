export type PasswordResetRequestResult = "submitted" | "preview";
export type PasswordResetUpdateResult = "updated" | "preview";

// This adapter keeps the recovery UI usable until token delivery and password updates exist on the server.
export const passwordRecovery = {
  requestResetLink: async (_email: string): Promise<PasswordResetRequestResult> => "preview",
  setNewPassword: async (_token: string, _password: string): Promise<PasswordResetUpdateResult> => "preview"
};
