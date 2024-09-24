export interface Message {
  id: string;
  content: string;
  from_chatbot: boolean;
}

export interface MessageForm {
    id?: string;
    content: string;
    from_chatbot: boolean;
}

export interface LoginResponse {
  access_token?: string;
}
