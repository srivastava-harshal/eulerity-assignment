export function formatSize(bytes: number) {
     if (!bytes) return '0 KB';

     const kb = bytes / 1024;
     const mb = kb / 1024;

     return mb >= 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
};
