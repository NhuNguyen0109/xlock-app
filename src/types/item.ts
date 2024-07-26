export default interface ItemType {
  id: string;
  name: string;
  url?: string;
  description?: string;
  credentials: string;
  password: string;
  added_time: string;
  updated_time: string;
  imageUrl?: string;
  account?: string;
  shared?: string;
}
