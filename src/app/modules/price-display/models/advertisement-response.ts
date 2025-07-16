export interface AdvertisementResponse {
  id: number;
  name: string; // بدل title
  mediaUrl: string;
  duration: number;
  type?: 'image' | 'video';
}
