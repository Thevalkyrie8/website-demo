import type { CSSProperties } from 'react';
export function Icon({name, size=20, style}: {name:string;size?:number;style?:CSSProperties}) {
 const paths:Record<string,React.ReactNode>={
 search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
 bag:<><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
 user:<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
 menu:<path d="M4 6h16M4 12h16M4 18h16"/>, close:<path d="m6 6 12 12M18 6 6 18"/>,
 down:<path d="m6 9 6 6 6-6"/>,right:<path d="m9 5 7 7-7 7"/>,arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>,
 leaf:<><path d="M20 3C7 2 2 9 5 16s16 4 15-13Z"/><path d="m3 21 13-13"/></>,heart:<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
 plus:<path d="M12 5v14M5 12h14"/>,check:<path d="m5 12 4 4L19 6"/>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
 sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/></>,
 drop:<path d="M12 2C10 6 5 10 5 15a7 7 0 0 0 14 0c0-5-5-9-7-13Z"/>,
 gift:<><path d="M3 8h18v5H3zM5 13v8h14v-8M12 8v13"/><path d="M12 8C2 8 5-1 10 4l2 4c10 0 7-9 2-4l-2 4"/></>,
 truck:<><path d="M1 5h13v12H1zM14 10h5l4 4v3h-9"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/></>,
 chat:<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/>,
 bolt:<path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z"/>,home:<><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></>,
 grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 play:<path d="m8 4 12 8-12 8V4Z"/>,filter:<><path d="M4 6h16M7 12h10M10 18h4"/></>,pin:<><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>};
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]||paths.leaf}</svg>;
}
