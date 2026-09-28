// Supply the shop-owned public URLs before activating real contact channels.
export const contactChannels=[
 {id:'zalo',label:'Zalo',mark:'Z',color:'#0866ff',url:process.env.NEXT_PUBLIC_ZALO_URL||'',hosts:['zalo.me','oa.zalo.me']},
 {id:'whatsapp',label:'WhatsApp',mark:'W',color:'#168548',url:process.env.NEXT_PUBLIC_WHATSAPP_URL||'',hosts:['wa.me','api.whatsapp.com']},
 {id:'facebook',label:'Facebook',mark:'f',color:'#1877f2',url:process.env.NEXT_PUBLIC_FACEBOOK_URL||'',hosts:['facebook.com','www.facebook.com','m.me']}
];
export function verifiedContactUrl(channel:typeof contactChannels[number]){try{const u=new URL(channel.url);return u.protocol==='https:'&&channel.hosts.includes(u.hostname)?u.href:''}catch{return ''}}
