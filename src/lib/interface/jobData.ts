export interface Mail {
  email: string;
  subject: string;
  [key: string]: any;
  token?: string;
  username: string;
  title?: string;
  descripton?: string;
  endDate?: Date;
}
