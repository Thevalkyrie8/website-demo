import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';

const products = [
  {
    id: 1,
    slug: 'cay-luoi-ho',
    name: 'Cây lưỡi hổ',
    category: 'cay-canh',
    price: 190000,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'Cây xanh thanh thoát, dễ chăm sóc, thích hợp đặt ban công, văn phòng và phòng khách.',
    size: ['S', 'M'],
    badges: ['Phổ biến', 'Dễ sống'],
  },
  {
    id: 2,
    slug: 'cay-truc',
    name: 'Cây trúc',
    category: 'cay-canh',
    price: 260000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    description: 'Thiết kế hiện đại, lọc bụi và tạo góc xanh mát cho không gian sống.',
    size: ['M', 'L'],
    badges: ['Màu đẹp', 'Hấp dẫn'],
  },
  {
    id: 3,
    slug: 'chau-sứ',
    name: 'Chậu sứ trắng',
    category: 'chau-vat-tu',
    price: 180000,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    description: 'Chậu sứ cao cấp, bền đẹp cho chậu cây cảnh hoặc cây phát tài.',
    size: ['S', 'M', 'L'],
    badges: ['Bền bỉ', 'Mẫu mới'],
  },
  {
    id: 4,
    slug: 'dung-cu-trong-cay',
    name: 'Bộ dụng cụ trồng cây',
    category: 'chau-vat-tu',
    price: 320000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'Bộ dụng cụ gồm xẻng, kéo, bình tưới và đất trồng tiện lợi cho người mới bắt đầu.',
    size: ['M'],
    badges: ['Năng suất', 'Tiện dụng'],
  },
  {
    id: 5,
    slug: 'bo-hoa-tinh-yeu',
    name: 'Bó hoa tình yêu',
    category: 'hoa-qua-tang',
    price: 450000,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
    description: 'Bó hoa tươi được thiết kế cho lễ tình nhân, sinh nhật hoặc tặng bạn bè.',
    size: ['S', 'M'],
    badges: ['Hot', 'Tươi mới'],
  },
  {
    id: 6,
    slug: 'hop-qua-cay-xanh',
    name: 'Hộp quà cây xanh',
    category: 'hoa-qua-tang',
    price: 590000,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
    description: 'Quà tặng ý nghĩa với chậu cây và giấy gói sang trọng, phù hợp mọi dịp.',
    size: ['M', 'L'],
    badges: ['Quà tặng', 'Có sẵn'],
  },
];

const categories = {
  'cay-canh': 'Cây cảnh',
  'chau-vat-tu': 'Chậu & vật tư',
  'hoa-qua-tang': 'Hoa & quà tặng',
};

const featureHighlights = [
  {
    title: 'Thiết kế xanh cho không gian sống',
    description: 'Tối ưu góc nhà, văn phòng và quán cà phê với cây cảnh tạo cảm giác thư giãn và hiện đại.',
    icon: '🌿',
  },
  {
    title: 'Tư vấn chuyên nghiệp',
    description: 'Đội ngũ của GreenNest hỗ trợ chọn cây theo ánh sáng, không gian và phong cách nội thất.',
    icon: '🧑‍🌾',
  },
  {
    title: 'Giao hàng nhanh',
    description: 'Đóng gói cẩn thận, giao đúng hẹn đến tận nơi và hỗ trợ chăm sóc cây sau mua.',
    icon: '🚚',
  },
  {
    title: 'Quà tặng ý nghĩa',
    description: 'Tặng cây cảnh, chậu decor và hộp quà sinh nhật, chúc mừng, tri ân với thiết kế đẹp mắt.',
    icon: '🎁',
  },
];

const categoryHighlights = [
  { name: 'Cây cảnh', slug: 'cay-canh', description: 'Tươi mát và dễ chăm sóc', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80' },
  { name: 'Chậu & vật tư', slug: 'chau-vat-tu', description: 'Phụ kiện tối ưu không gian', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80' },
  { name: 'Hoa & quà tặng', slug: 'hoa-qua-tang', description: 'Tạo sự ngọt ngào và ý nghĩa', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80' },
];

const testimonials = [
  {
    name: 'Nguyễn Minh',
    text: 'Mình mua 3 cây cho văn phòng và cảm thấy không gian sáng hơn rất nhiều. Sản phẩm đẹp, cây khỏe và đúng như mô tả.',
  },
  {
    name: 'Hà Trang',
    text: 'GreenNest tư vấn rất nhiệt tình. Mình chọn bộ quà làm quà tặng bạn thân và đều rất ưng ý.',
  },
  {
    name: 'Lâm Anh',
    text: 'Chậu và dụng cụ trồng cây rất tiện, giao hàng nhanh và đóng gói rất cẩn thận.',
  },
];

const aboutMetrics = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '40k+', label: 'Sản phẩm đã giao' },
  { value: '98%', label: 'Khách hàng quay lại' },
];

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    title: 'Cây xanh cho mọi không gian',
    description: 'Sản xuất, thương mại và dịch vụ cây cảnh tại Lâm Đồng.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    title: 'Vườn ươm và vật tư xanh',
    description: 'Cây cảnh, chậu và vật tư được chọn lọc cho nhà ở, văn phòng và công trình.',
  },
  {
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
    title: 'Đồng hành cùng không gian đẹp',
    description: 'Tư vấn, cung cấp và chăm sóc giải pháp xanh theo nhu cầu của bạn.',
  },
];

const featuredTabs = {
  bestseller: {
    label: 'Bestseller',
    products: [products[0], products[1], products[2], products[3]],
  },
  newArrivals: {
    label: 'New Arrivals',
    products: [products[4], products[1], products[3], products[5]],
  },
  sale: {
    label: 'Sale',
    products: [products[2], products[0], products[5], products[3]],
  },
};

const siteUrl = 'https://greennest.vn';
const seoPages = {
  '/': { title: 'GreenNest | Cây cảnh, chậu decor và quà tặng xanh', description: 'GreenNest cung cấp cây cảnh, chậu decor, vật tư trồng cây và quà tặng xanh cho nhà ở, văn phòng tại Đà Nẵng.' },
  '/cua-hang': { title: 'Cửa hàng cây cảnh và phụ kiện | GreenNest', description: 'Khám phá cây cảnh, chậu decor, dụng cụ trồng cây và hộp quà xanh được tuyển chọn bởi GreenNest.' },
  '/cay-canh': { title: 'Cây cảnh trong nhà và văn phòng | GreenNest', description: 'Mua cây cảnh dễ chăm sóc, phù hợp phòng khách, ban công và văn phòng tại GreenNest.' },
  '/chau-vat-tu': { title: 'Chậu cây và vật tư trồng cây | GreenNest', description: 'Chọn chậu cây, đất trồng và dụng cụ chăm sóc cây chất lượng cho không gian sống xanh.' },
  '/hoa-qua-tang': { title: 'Hoa và quà tặng xanh | GreenNest', description: 'Hoa tươi, bó hoa và hộp quà cây xanh tinh tế cho sinh nhật, lễ kỷ niệm và những dịp đặc biệt.' },
  '/dich-vu': { title: 'Dịch vụ thiết kế và chăm sóc cây cảnh | GreenNest', description: 'GreenNest tư vấn cảnh quan, thi công nội thất xanh và chăm sóc cây định kỳ cho nhà ở, văn phòng.' },
  '/thu-vien': { title: 'Thư viện không gian xanh | GreenNest', description: 'Xem cảm hứng trang trí nhà ở, văn phòng và các góc xanh với cây cảnh GreenNest.' },
  '/bai-viet': { title: 'Bài viết chăm sóc cây cảnh | GreenNest', description: 'Mẹo chăm cây trong nhà, chọn cây theo ánh sáng và trang trí không gian sống từ GreenNest.' },
  '/gioi-thieu': { title: 'Giới thiệu GreenNest | Cửa hàng cây cảnh', description: 'Tìm hiểu GreenNest, cửa hàng cây cảnh và phụ kiện trồng cây dành cho không gian sống hiện đại.' },
  '/lien-he': { title: 'Liên hệ GreenNest | Cây cảnh tại Đà Nẵng', description: 'Liên hệ GreenNest để được tư vấn cây cảnh, quà tặng xanh và dịch vụ thiết kế không gian xanh.' },
};

function SeoHead() {
  const location = useLocation();
  const product = location.pathname.startsWith('/san-pham/')
    ? products.find((item) => item.slug === decodeURIComponent(location.pathname.split('/').pop()))
    : null;
  const page = product
    ? { title: `${product.name} | GreenNest`, description: product.description }
    : seoPages[location.pathname] || { title: 'GreenNest | Không gian sống xanh', description: 'Cây cảnh, chậu decor và quà tặng xanh cho không gian sống hiện đại.' };
  const noIndex = ['/gio-hang', '/dat-hang', '/admin-album'].includes(location.pathname);
  const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '' : location.pathname}`;

  useEffect(() => {
    document.title = page.title;
    const setMeta = (name, content, attribute = 'name') => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    setMeta('description', page.description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:type', product ? 'product' : 'website', 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:site_name', 'GreenNest', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);
    const structuredData = product
      ? { '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, image: [product.image], sku: `GN-${product.id}`, brand: { '@type': 'Brand', name: 'GreenNest' }, offers: { '@type': 'Offer', url: canonicalUrl, priceCurrency: 'VND', price: product.price, availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
      : { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'CÔNG TY TNHH SX TM DV ĐÀ LẠT NEW', url: siteUrl, description: page.description, address: { '@type': 'PostalAddress', streetAddress: 'Thôn Tân Lợi', addressLocality: 'Xã Đinh Văn Lâm Hà', addressRegion: 'Tỉnh Lâm Đồng', addressCountry: 'VN' } };
    let script = document.head.querySelector('script[data-greennest-schema]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.greennestSchema = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [canonicalUrl, noIndex, page.description, page.title, product]);

  return null;
}

function formatPrice(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

function getCartItems() {
  try {
    const items = JSON.parse(localStorage.getItem('green-nest-cart') || '[]');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveCartItems(items) {
  localStorage.setItem('green-nest-cart', JSON.stringify(items));
}

function useCart() {
  const [cart, setCart] = useState(() => getCartItems());

  useEffect(() => {
    saveCartItems(cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const updateQty = (id, nextQty) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, nextQty) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  return { cart, addToCart, removeFromCart, updateQty };
}

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{categories[product.category]}</span>
          <span className="product-stock">{product.stock > 0 ? `${product.stock} còn hàng` : 'Hết hàng'}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-badges">
          {product.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <div className="buttons-row">
            <Link to={`/san-pham/${product.slug}`} className="secondary-btn">
              Chi tiết
            </Link>
            <button type="button" onClick={() => onAddToCart(product)}>
              Thêm giỏ
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CatalogPage({ category = 'all' }) {
  const [query, setQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'available' ? product.stock > 0 : product.stock > 0 && product.stock <= 10);
      const matchesSize = sizeFilter === 'all' || product.size.includes(sizeFilter);

      return matchesCategory && matchesQuery && matchesStock && matchesSize;
    });
  }, [category, query, stockFilter, sizeFilter]);

  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <div>
          <span className="eyebrow">Cửa hàng</span>
          <h1>{category === 'all' ? 'Sản phẩm GreenNest' : categories[category]}</h1>
        </div>
        <div className="catalog-controls">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
          />
          <select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="available">Còn hàng</option>
            <option value="low">Sắp hết</option>
          </select>
          <select value={sizeFilter} onChange={(event) => setSizeFilter(event.target.value)}>
            <option value="all">Tất cả size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
      </section>

      <section className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        ) : (
          <p className="empty-state">Không tìm thấy sản phẩm phù hợp.</p>
        )}
      </section>
    </main>
  );
}

function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="page-shell">
        <h1>Sản phẩm không tồn tại</h1>
        <Link to="/cua-hang" className="primary-btn">Quay về cửa hàng</Link>
      </main>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 2);

  return (
    <main className="page-shell product-detail-page">
      <section className="product-detail">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-content">
          <span className="eyebrow premium-eyebrow">{categories[product.category]}</span>
          <h1>{product.name}</h1>
          <div className="detail-price-row">
            <p className="product-price-detail">{formatPrice(product.price)}</p>
            <span className="status-chip">{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-badges">
            {product.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          <ul className="detail-features">
            <li><strong>Kho hàng:</strong> {product.stock} sản phẩm</li>
            <li><strong>Kích thước:</strong> {product.size.join(', ')}</li>
            <li><strong>Vận chuyển:</strong> Giao hàng trong 24-48 giờ</li>
            <li><strong>Bảo hành:</strong> Tư vấn chăm sóc sau mua</li>
          </ul>

          <div className="buttons-row">
            <button type="button" onClick={() => addToCart(product)}>
              Thêm vào giỏ
            </button>
            <Link to="/cua-hang" className="secondary-btn">Tiếp tục mua</Link>
          </div>
        </div>
      </section>

      <section className="product-detail-info">
        <div className="benefit-box">
          <h3>Vì sao chọn sản phẩm này?</h3>
          <p>
            Sản phẩm được tuyển chọn kỹ lưỡng, mang đến sự cân bằng giữa kiểu dáng hiện đại, độ bền cao và hiệu quả chăm sóc không gian sống.
          </p>
        </div>

        <div className="benefit-box">
          <h3>Chăm sóc sau mua</h3>
          <p>
            GreenNest đồng hành với bạn từ khâu tư vấn, lựa chọn đến cách chăm sóc cây đúng cách để giữ sản phẩm luôn đẹp và bền lâu.
          </p>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header compact-header">
            <div>
              <span className="eyebrow">Có thể bạn quan tâm</span>
              <h2>Sản phẩm cùng danh mục</h2>
            </div>
          </div>
          <div className="featured-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function RevealSection({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-section ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {heroSlides.map((slide, index) => (
        <div key={slide.title} className={`slide-item ${index === activeSlide ? 'is-active' : ''}`}>
          <img src={slide.image} alt={slide.title} />
          <div className="slide-overlay">
            <span>{slide.title}</span>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="slider-dots" aria-label="Slide navigation">
        {heroSlides.map((slide, index) => (
          <button
            key={`${slide.title}-dot`}
            type="button"
            className={index === activeSlide ? 'dot active' : 'dot'}
            onClick={() => setActiveSlide(index)}
            aria-label={`Chuyển tới slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const [activeTab, setActiveTab] = useState('bestseller');
  const { addToCart } = useCart();
  const activeCollection = featuredTabs[activeTab];

  return (
    <main>
      <section className="company-hero">
        <RevealSection className="company-hero-slider" delay={60}>
          <HeroSlider />
          <div className="company-hero-content">
            <span className="hero-badge">Chi nhánh Lâm Đồng</span>
            <h1>CÔNG TY TNHH SX TM DV ĐÀ LẠT NEW</h1>
            <p>Địa chỉ: Thôn Tân Lợi, Xã Đinh Văn Lâm Hà, Tỉnh Lâm Đồng, Việt Nam</p>
            <div className="hero-actions">
              <Link to="/cua-hang" className="primary-btn">Xem cửa hàng</Link>
              <Link to="/lien-he" className="secondary-btn">Liên hệ công ty</Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <RevealSection className="feature-showcase" delay={80}>
        <Link to="/dich-vu" className="feature-card">
          <span className="feature-icon">🌿</span>
          <h3>Dịch vụ cây xanh</h3>
          <p>Tư vấn cảnh quan, thi công và chăm sóc cây cho nhà ở, văn phòng.</p>
        </Link>
        <Link to="/cua-hang" className="feature-card">
          <span className="feature-icon">🛒</span>
          <h3>Cửa hàng</h3>
          <p>Khám phá sản phẩm cây cảnh, chậu, vật tư và quà tặng xanh.</p>
        </Link>
        {categoryHighlights.map((category) => (
          <Link key={category.slug} to={`/${category.slug}`} className="feature-card">
            <span className="feature-icon">{category.slug === 'cay-canh' ? '🌱' : category.slug === 'chau-vat-tu' ? '🪴' : '💐'}</span>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </RevealSection>

      <RevealSection className="tab-section" delay={120}>
        <div className="section-header compact-header horizontal-header">
          <div>
            <span className="eyebrow">Cửa hàng</span>
            <h2>Trang trí không gian theo phong cách của bạn</h2>
          </div>
          <div className="tabs-row" aria-label="Danh mục sản phẩm">
            {Object.entries(featuredTabs).map(([key, value]) => (
              <button
                key={key}
                type="button"
                className={activeTab === key ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab(key)}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        <div className="featured-grid tab-grid">
          {activeCollection.products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-header" delay={120}>
        <div>
          <span className="eyebrow">Danh mục nổi bật</span>
          <h2>Chọn sản phẩm phù hợp với phong cách của bạn</h2>
        </div>
      </RevealSection>

      <RevealSection className="category-showcase" delay={140}>
        {categoryHighlights.map((category) => (
          <Link key={category.slug} to={`/${category.slug}`} className="category-card">
            <img src={category.image} alt={category.name} />
            <div className="category-card-content">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </RevealSection>

      <RevealSection className="about-section" delay={150}>
        <div className="about-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80"
            alt="Không gian GreenNest"
          />
        </div>

        <div className="about-content">
          <span className="eyebrow">Về chúng tôi</span>
          <h2>Đưa thiên nhiên vào mọi không gian sống</h2>
          <p>
            GreenNest là thương hiệu chuyên về cây cảnh và phụ kiện không gian xanh, mang đến những giải pháp thiết kế sống xanh cho căn nhà, văn phòng và quà tặng ý nghĩa. Chúng tôi tin rằng mỗi góc nhỏ có thể trở thành nơi thư giãn, sáng tạo và tràn đầy năng lượng tích cực.
          </p>
          <p>
            Từ việc chọn cây phù hợp với ánh sáng, phong cách nội thất đến tư vấn chăm sóc sau mua, GreenNest luôn đặt trải nghiệm khách hàng lên hàng đầu.
          </p>

          <div className="about-metrics">
            {aboutMetrics.map((stat) => (
              <div key={stat.label} className="about-metric">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="promo-banner" delay={160}>
        <div className="promo-copy">
          <span className="eyebrow">Khuyến mãi đặc biệt</span>
          <h2>Giảm 15% cho đơn hàng từ 1.000.000đ</h2>
          <p>Áp dụng cho cây cảnh, chậu decor và quà tặng trong tháng này.</p>
        </div>
        <Link to="/cua-hang" className="primary-btn">Mua ngay</Link>
      </RevealSection>

      <RevealSection className="cta-banner" delay={170}>
        <div>
          <span className="eyebrow">GreenNest Care</span>
          <h2>Để không gian sống của bạn luôn xanh tươi và thư giãn</h2>
        </div>
        <Link to="/cua-hang" className="primary-btn">Xem bộ sưu tập</Link>
      </RevealSection>

      <RevealSection className="testimonial-section" delay={180}>
        <div className="section-header">
          <div>
            <span className="eyebrow">Khách hàng nói gì</span>
            <h2>Đánh giá từ những người đã trải nghiệm</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p>“{item.text}”</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}

function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page-shell cart-page">
      <h1>Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <div className="empty-block">
          <p>Giỏ hàng đang trống.</p>
          <Link to="/cua-hang" className="primary-btn">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{formatPrice(item.price)}</p>
                </div>
                <div className="cart-item-actions">
                  <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Tổng tiền: <strong>{formatPrice(total)}</strong></p>
            <Link to="/dat-hang" className="primary-btn">Đặt hàng</Link>
          </div>
        </>
      )}
    </main>
  );
}

function CheckoutPage() {
  const { cart, removeFromCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    cart.forEach((item) => removeFromCart(item.id));
  };

  if (submitted) {
    return (
      <main className="page-shell">
        <h1>Đặt hàng thành công</h1>
        <p>Cảm ơn {form.name}. Chúng tôi sẽ gọi lại cho bạn sớm nhất.</p>
        <Link to="/" className="primary-btn">Về trang chủ</Link>
      </main>
    );
  }

  return (
    <main className="page-shell checkout-page">
      <h1>Thông tin đặt hàng</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Họ tên
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Số điện thoại
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Địa chỉ giao hàng
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </label>
        <div className="checkout-summary">
          <p>Tổng thanh toán: <strong>{formatPrice(total)}</strong></p>
          <button type="submit" disabled={cart.length === 0}>Xác nhận đặt hàng</button>
        </div>
      </form>
    </main>
  );
}

function ServicesPage() {
  return (
    <main className="page-shell">
      <h1>Dịch vụ của GreenNest</h1>
      <div className="info-grid">
        <article>
          <h3>Tư vấn cảnh quan</h3>
          <p>Thiết kế không gian xanh theo phong cách bạn yêu thích.</p>
        </article>
        <article>
          <h3>Chăm sóc cây</h3>
          <p>Hỗ trợ cắt tỉa, thay chậu và tưới nước định kỳ.</p>
        </article>
        <article>
          <h3>Thi công nội thất xanh</h3>
          <p>Lắp đặt chậu cây, vách xanh và các phụ kiện decor.</p>
        </article>
      </div>
    </main>
  );
}

function GalleryPage() {
  const [images, setImages] = useState(() => JSON.parse(localStorage.getItem('greennest-album-images') || '[]'));

  useEffect(() => {
    localStorage.setItem('greennest-album-images', JSON.stringify(images));
  }, [images]);

  const addSampleImage = () => {
    const next = `https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80&t=${Date.now()}`;
    setImages((current) => [next, ...current].slice(0, 6));
  };

  return (
    <main className="page-shell">
      <h1>Thư viện ảnh</h1>
      <button type="button" onClick={addSampleImage}>Thêm ảnh mẫu</button>
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={`${image}-${index}`} src={image} alt={`Ảnh thư viện ${index + 1}`} />
          ))
        ) : (
          <p>Chưa có ảnh nào trong thư viện.</p>
        )}
      </div>
    </main>
  );
}

function PostsPage() {
  return (
    <main className="page-shell">
      <h1>Bài viết</h1>
      <div className="info-grid">
        <article>
          <h3>5 mẹo chăm cây trong nhà</h3>
          <p>Giữ không gian xanh luôn tươi tốt trong mùa nắng nóng.</p>
        </article>
        <article>
          <h3>Chọn cây theo phong cách nội thất</h3>
          <p>Chọn chậu và cây phù hợp với từng góc sống của bạn.</p>
        </article>
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-shell">
      <h1>Giới thiệu</h1>
      <p>
        GreenNest là cửa hàng chuyên cung cấp cây cảnh, phụ kiện trồng cây và quà tặng sáng tạo.
      </p>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="page-shell">
      <h1>Liên hệ</h1>
      <div className="contact-box">
        <h2>CÔNG TY TNHH SX TM DV ĐÀ LẠT NEW</h2>
        <p>Địa chỉ: Thôn Tân Lợi, Xã Đinh Văn Lâm Hà, Tỉnh Lâm Đồng, Việt Nam</p>
      </div>
    </main>
  );
}

function AdminAlbumPage() {
  return <GalleryPage />;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand">GreenNest</span>
        <p>Không gian sống xanh cho mọi ngôi nhà và văn phòng.</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Menu</h4>
          <Link to="/">Trang chủ</Link>
          <Link to="/cua-hang">Cửa hàng</Link>
          <Link to="/dich-vu">Dịch vụ</Link>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <Link to="/gioi-thieu">Giới thiệu</Link>
          <Link to="/bai-viet">Bài viết</Link>
          <Link to="/lien-he">Liên hệ</Link>
        </div>
      </div>

      <div className="footer-contact">
        <h4>Liên hệ</h4>
        <p>CÔNG TY TNHH SX TM DV ĐÀ LẠT NEW</p>
        <p>Thôn Tân Lợi, Xã Đinh Văn Lâm Hà, Tỉnh Lâm Đồng, Việt Nam</p>
      </div>
    </footer>
  );
}

function AppLayout() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  return (
    <div className="app-shell">
      <SeoHead />
      <header className="topbar">
        <Link to="/" className="brand">
          GreenNest
        </Link>
        <nav className="nav">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/cua-hang">Cửa hàng</NavLink>
          <NavLink to="/dich-vu">Dịch vụ</NavLink>
          <NavLink to="/thu-vien">Thư viện</NavLink>
          <NavLink to="/bai-viet">Bài viết</NavLink>
          <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
          <NavLink to="/lien-he">Liên hệ</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/gio-hang" className="cart-link">Giỏ hàng ({itemCount})</Link>
        </div>
      </header>

      <div key={location.pathname} className="route-page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cua-hang" element={<CatalogPage category="all" />} />
          <Route path="/cay-canh" element={<CatalogPage category="cay-canh" />} />
          <Route path="/chau-vat-tu" element={<CatalogPage category="chau-vat-tu" />} />
          <Route path="/hoa-qua-tang" element={<CatalogPage category="hoa-qua-tang" />} />
          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/dat-hang" element={<CheckoutPage />} />
          <Route path="/dich-vu" element={<ServicesPage />} />
          <Route path="/thu-vien" element={<GalleryPage />} />
          <Route path="/bai-viet" element={<PostsPage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/admin-album" element={<AdminAlbumPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
