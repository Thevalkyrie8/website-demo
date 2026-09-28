import {StoreProduct} from './catalog';
export const facetGroups=[
 {key:'theme',label:'Theo chủ đề',options:['Trang trí nhà','Góc làm việc','Quà tặng','Chăm sóc cây']},
 {key:'season',label:'Gợi ý theo mùa',options:['Quanh năm','Mùa xuân','Mùa hè','Mùa thu','Mùa đông']},
 {key:'size',label:'Theo kích thước',options:['Nhỏ · dưới 40 cm','Vừa · 40–79 cm','Lớn · từ 80 cm','Vật tư / phụ kiện']},
 {key:'color',label:'Theo màu sắc',options:['Xanh lá','Trắng','Hồng','Nâu đất','Nhiều màu']},
 {key:'use',label:'Theo công năng',options:['Trang trí nội thất','Để bàn','Làm quà tặng','Trồng & chăm cây']},
 {key:'price',label:'Theo khoảng giá',options:['Dưới 200.000đ','200.000–500.000đ','Trên 500.000đ']},
 {key:'stock',label:'Tình trạng',options:['Còn hàng','Liên hệ đặt trước']}
] as const;
export type FacetKey=typeof facetGroups[number]['key'];export type Selection=Partial<Record<FacetKey,string[]>>;
// Curated demonstration tags, not claims about live seasonal availability.
const tags:Record<string,{theme:string[];season:string[];size:string[];color:string[];use:string[]}>= {
 'PS-CAY-001':{theme:['Trang trí nhà'],season:['Quanh năm','Mùa xuân','Mùa hè'],size:['Vừa · 40–79 cm'],color:['Xanh lá'],use:['Trang trí nội thất']},
 'PS-CAY-002':{theme:['Trang trí nhà','Góc làm việc'],season:['Quanh năm','Mùa hè'],size:['Vừa · 40–79 cm'],color:['Xanh lá'],use:['Trang trí nội thất']},
 'PS-CAY-003':{theme:['Trang trí nhà','Góc làm việc'],season:['Quanh năm','Mùa xuân'],size:['Lớn · từ 80 cm'],color:['Xanh lá'],use:['Trang trí nội thất']},
 'PS-HOA-001':{theme:['Quà tặng','Trang trí nhà'],season:['Quanh năm','Mùa xuân','Mùa đông'],size:['Vừa · 40–79 cm'],color:['Trắng','Xanh lá'],use:['Làm quà tặng','Trang trí nội thất']},
 'PS-CAY-004':{theme:['Góc làm việc','Trang trí nhà'],season:['Quanh năm','Mùa hè'],size:['Nhỏ · dưới 40 cm'],color:['Xanh lá'],use:['Để bàn','Trang trí nội thất']},
 'PS-VTU-001':{theme:['Chăm sóc cây','Trang trí nhà'],season:['Quanh năm','Mùa thu'],size:['Vật tư / phụ kiện'],color:['Nâu đất','Trắng'],use:['Trồng & chăm cây']},
 'PS-CAY-005':{theme:['Góc làm việc'],season:['Quanh năm','Mùa xuân'],size:['Vừa · 40–79 cm'],color:['Xanh lá'],use:['Trang trí nội thất']},
 'PS-CAY-006':{theme:['Góc làm việc','Quà tặng'],season:['Quanh năm','Mùa hè','Mùa thu'],size:['Nhỏ · dưới 40 cm'],color:['Xanh lá','Nhiều màu'],use:['Để bàn','Làm quà tặng']},
 'PS-VTU-002':{theme:['Chăm sóc cây'],season:['Quanh năm','Mùa thu'],size:['Vật tư / phụ kiện'],color:['Nâu đất'],use:['Trồng & chăm cây']},
 'PS-VTU-003':{theme:['Chăm sóc cây'],season:['Quanh năm','Mùa xuân'],size:['Vật tư / phụ kiện'],color:[],use:['Trồng & chăm cây']},
 'PS-CAY-007':{theme:['Trang trí nhà','Góc làm việc'],season:['Quanh năm','Mùa xuân'],size:['Lớn · từ 80 cm'],color:['Xanh lá'],use:['Trang trí nội thất']},
 'PS-HOA-002':{theme:['Quà tặng'],season:['Mùa xuân','Mùa thu','Mùa đông'],size:['Vừa · 40–79 cm'],color:['Hồng'],use:['Làm quà tặng']}
};
export function facetValues(p:StoreProduct,key:FacetKey,price=p.price):readonly string[]{if(key==='price')return [price<200000?'Dưới 200.000đ':price<=500000?'200.000–500.000đ':'Trên 500.000đ'];if(key==='stock')return [(p.stock??0)>0?'Còn hàng':'Liên hệ đặt trước'];return tags[p.sku||'']?.[key]||[]}
export function matchesFacets(p:StoreProduct,selection:Selection,price=p.price){return Object.entries(selection).every(([key,values])=>!values?.length||values.some(v=>facetValues(p,key as FacetKey,price).includes(v)))}
