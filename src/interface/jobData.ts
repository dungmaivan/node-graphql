export interface Mail {
  // from: string;
  email: string;
  subject: string;
  [key: string]: any;
  token?: string;
  username: string;
  title?: string;
  descripton?: string;
  endDate?: Date;
}
