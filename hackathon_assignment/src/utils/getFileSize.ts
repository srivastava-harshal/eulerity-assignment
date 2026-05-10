export async function getFileSize(url: string): Promise<number> {
     try {
          const res = await fetch(url, { method: 'HEAD' });
          const size = res.headers.get('content-length');
          return size ? parseInt(size, 10) : 0;
     } catch {
          return 0;
     }
};
