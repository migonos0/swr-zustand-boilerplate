export type RestEndpoint = {
  originalUrl: string;
  dynamicOriginalUrl?: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
};
