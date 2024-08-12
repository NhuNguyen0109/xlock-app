export interface ItemType {
  name: string;
  site: string;
  description: string;
  enc_credentials: string;
  logo_url: string;
  id: string;
  added_at: string;
  updated_at: string;
  type: string;
  order?: string;
}

export interface ShareItemType extends ItemType {
  shared_at: string;
  shared_by: {
    id: string;
    username: string;
    email: string;
  };
}

type AccountType = ItemType | ShareItemType;

export default AccountType;
