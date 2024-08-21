export interface User {
  name?: string | null | undefined;
  username?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
  accessToken?: string | null | undefined;
}

export type UserInfo = {
	"id": string,
	"password": string,
	"is_superuser": false,
	"username": string,
	"email": string,
	"role": string,
	"is_staff": boolean,
	"is_active": boolean,
	"date_joined": string,
	"groups": [],
	"user_permissions": []
}
