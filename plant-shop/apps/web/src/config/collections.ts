export const shopLink=(category:string,q='')=>`/cua-hang?category=${encodeURIComponent(category)}${q?'&q='+encodeURIComponent(q):''}`;
export const collections=[
 {id:'cay',label:'Cây xanh & bonsai',icon:'leaf',href:'/cay-canh',image:'/assets/images/cat-indoor.jpg',intro:'Một góc xanh, nhiều cách sống.',groups:[{title:'Theo không gian',items:['Cây nội thất','Cây văn phòng','Cây để bàn','Cây ban công']},{title:'Theo phong cách',items:['Bonsai','Cây mix quà biếu','Sen đá','Cây thủy sinh']}],category:'Cây cảnh'},
 {id:'hoa',label:'Hoa tươi & quà tặng',icon:'gift',href:'/hoa-qua-tang',image:'/assets/images/flower-bouquet.jpg',intro:'Để những điều khó nói được nở hoa.',groups:[{title:'Theo dịp',items:['Sinh nhật','Khai trương','Cảm ơn','Chúc mừng']},{title:'Theo thiết kế',items:['Bó hoa','Giỏ hoa','Lan hồ điệp','Chậu quà biếu']}],category:'Hoa & quà tặng'},
 {id:'vat-tu',label:'Chậu & vật tư',icon:'grid',href:'/chau-vat-tu',image:'/assets/images/cat-pots.jpg',intro:'Từ chiếc chậu vừa vặn đến bộ rễ khỏe.',groups:[{title:'Chậu & phụ kiện',items:['Chậu sứ','Chậu nhựa','Combo 2 chậu','Combo 3 chậu','Combo 5 chậu']},{title:'Chăm cây mỗi ngày',items:['Đất trồng','Phân bón','Kích rễ','Dụng cụ','Lưới che nắng','Tre & cây chống']}],category:'Chậu & vật tư'},
 {id:'dich-vu',label:'Cảnh quan & dịch vụ',icon:'sun',href:'/dich-vu',image:'/assets/images/cat-services.jpg',intro:'Mang thiên nhiên vào từng công trình.',groups:[{title:'Thiết kế & thi công',items:['Sân vườn & biệt thự','Văn phòng','Trường học','Đường phố']},{title:'Chăm sóc & đổi cây',items:['Duy trì cảnh quan','Chăm sóc định kỳ','Thu cây cũ, đổi cây mới','Tư vấn tại không gian']}],category:''},
 {id:'thu-vien',label:'Vườn cây & cẩm nang',icon:'home',href:'/thu-vien',image:'/assets/images/cat-outdoor.jpg',intro:'Hiểu cây hơn. Chăm cây tốt hơn.',groups:[{title:'Khám phá',items:['Album vườn cây','Video kích thước sản phẩm','Cách trồng & chăm sóc','Đóng hàng & giao nhận']},{title:'Câu chuyện',items:['Cảm hứng không gian','Đối tác hệ sinh thái','Truyền thông công ty','Bài hát & karaoke']}],category:''}
];
export function collectionItemHref(c:typeof collections[number],item:string){
 if(c.category) return shopLink(c.category,item);
 if(item==='Đối tác hệ sinh thái')return '/doi-tac';
 if(item==='Truyền thông công ty'||item==='Bài hát & karaoke')return '/truyen-thong';
 return c.id==='dich-vu'?'/dich-vu?need='+encodeURIComponent(item):'/thu-vien';
}
