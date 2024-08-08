export default interface ShareItemType {
  item_id: string;
  recipient: {
    email: string;
  };
}

export interface ResponseShareItemType {
  type: string;
  enc_credentials: string;
  enc_pri: string;
  recipient_pub: string;
}

export interface CreateShareItem {
  item_id: string;
  enc_credentials: string;
  recipient: {
    email: string;
  };
}

export interface ResponseCreateShareItem {}
