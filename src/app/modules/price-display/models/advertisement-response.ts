export interface AdvertisementResponse {
  id: number;
  title: string;
  mediaUrl: string;
  duration: number;
  type: 'image' | 'video'; // لتحديد نوع الملف
}
