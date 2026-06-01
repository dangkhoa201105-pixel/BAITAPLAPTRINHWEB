const { useState } = React;

const productsData = [
  {
    id: '1',
    name: 'Sneaker X',
    category: 'Giày thể thao',
    price: 1290000,
    badge: 'Mới',
    image: 'https://images.unsplash.com/photo-1519741492600-25e1f634f6bb?auto=format&fit=crop&w=900&q=80',
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['Đen', 'Trắng', 'Be'],
    description: 'Sneaker X mang thiết kế năng động với chất liệu nhẹ và đế êm ái. Phù hợp cho chạy bộ, gym và streetwear.',
  },
  {
    id: '2',
    name: 'Áo Hoodie',
    category: 'Áo khoác',
    price: 890000,
    badge: 'Hot',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Xám', 'Nâu'],
    description: 'Áo hoodie mềm mại, giữ nhiệt tốt và có mũ. Kiểu dáng tối giản, dễ phối đồ hàng ngày.',
  },
  {
    id: '3',
    name: 'Quần Jogger',
    category: 'Quần',
    price: 650000,
    badge: 'Bán chạy',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Xám', 'Đen', 'Xanh'],
    description: 'Quần jogger co giãn tốt, phù hợp vận động nhẹ và phong cách đường phố năng động.',
  },
  {
    id: '4',
    name: 'Mũ Snapback',
    category: 'Phụ kiện',
    price: 320000,
    badge: 'Khuyến mãi',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    sizes: ['One Size'],
    colors: ['Đen', 'Trắng'],
    description: 'Mũ snapback phong cách streetwear, có thể điều chỉnh kích thước dễ dàng.',
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

function App() {
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [quantity, setQuantity] = useState(1);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.price, 0);

  function addToCart(product, qty = 1) {
    setCart((currentCart) => {
      const existing = currentCart[product.id] || { ...product, quantity: 0 };
      return {
        ...currentCart,
        [product.id]: {
          ...existing,
          quantity: existing.quantity + qty,
        },
      };
    });
    setDrawerOpen(true);
  }

  function updateQuantity(productId, delta) {
    setCart((currentCart) => {
      const item = currentCart[productId];
      if (!item) return currentCart;
      const nextQuantity = item.quantity + delta;
      if (nextQuantity <= 0) {
        const { [productId]: removed, ...rest } = currentCart;
        return rest;
      }
      return {
        ...currentCart,
        [productId]: { ...item, quantity: nextQuantity },
      };
    });
  }

  function removeCartItem(productId) {
    setCart((currentCart) => {
      const { [productId]: removed, ...rest } = currentCart;
      return rest;
    });
  }

  function openProductModal(product) {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
  }

  function closeProductModal() {
    setSelectedProduct(null);
  }

  function handleAddToCartFromModal() {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quantity);
    closeProductModal();
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 3200);
    event.target.reset();
  }

  return (
    <>
      <header className="header">
        <div className="topbar">
          <div className="topbar-links">
            <a href="#">store finder</a>
            <a href="#">help</a>
            <a href="#">order tracker</a>
            <a href="#" className="topbar-member">become a member</a>
          </div>
          <div className="topbar-locale">
            <span>🇻🇳</span>
          </div>
        </div>

        <div className="header-inner">
          <div className="site-brand">
            <div className="logo-mark">A</div>
            <div>
              <div>ADIDAS</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Collabs archive</div>
            </div>
          </div>

          <nav className="main-nav">
            <ul className="nav-list">
              <li><a href="#products">SHOES</a></li>
              <li><a href="#products">MEN</a></li>
              <li><a href="#products">WOMEN</a></li>
              <li><a href="#products">KIDS</a></li>
              <li><a href="#products">SPORTS</a></li>
              <li><a href="#products">BRANDS</a></li>
              <li><a href="#products">OUTLET</a></li>
            </ul>
          </nav>

          <div className="main-actions">
            <div className="search-wrapper">
              <input type="search" placeholder="Search" aria-label="Search" />
            </div>
            <button className="icon-btn" type="button" aria-label="Account">👤</button>
            <button className="icon-btn" type="button" aria-label="Wishlist">♡</button>
            <button className="icon-btn cart-btn" type="button" onClick={() => setDrawerOpen(true)} aria-label="Cart">
              🛒<span>{totalQuantity}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <span className="hero-label">New season drop</span>
          <h1 className="hero-title">Phong cách thể thao mới cho cuộc sống hàng ngày</h1>
          <p className="hero-copy">Khám phá bộ sưu tập giày, áo và phụ kiện mới nhất. Thêm vào giỏ hàng, chọn size và màu sắc ngay trong vài bước.</p>
          <button className="btn-primary" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
            Mua sắm ngay
          </button>
        </section>

        <section className="products-section" id="products">
          <div className="section-headline">
            <div>
              <h2>Sản phẩm nổi bật</h2>
              <p>Chọn ngay mẫu ưa thích và thêm vào giỏ hàng để trải nghiệm mua sắm nhanh chóng.</p>
            </div>
            <button className="btn-secondary" onClick={() => setDrawerOpen(true)}>
              Xem giỏ hàng
            </button>
          </div>

          <div className="products-grid">
            {productsData.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-image" onClick={() => openProductModal(product)}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-main">
                  <span className="product-badge">{product.badge}</span>
                  <div className="product-title">{product.name}</div>
                  <div className="product-meta">{product.category} · {product.colors.length} màu</div>
                  <div className="product-price-row">
                    <div className="product-price">{formatCurrency(product.price)}</div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-secondary" type="button" onClick={() => openProductModal(product)}>
                      Chi tiết
                    </button>
                    <button className="btn-primary" type="button" onClick={() => addToCart(product)}>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-card">
            <div>
              <h2 className="newsletter-title">Nhận ưu đãi độc quyền</h2>
              <p className="newsletter-copy">Đăng ký để nhận mã giảm giá, thông tin khuyến mãi và bộ sưu tập mới nhất trên email.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Nhập email của bạn" required />
              <button className="btn-primary" type="submit">Đăng ký miễn phí</button>
            </form>
            <p className={`newsletter-note ${newsletterSuccess ? 'visible' : ''}`}>
              Cảm ơn bạn! Email đã được đăng ký.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>PRODUCTS</h3>
            <a href="#">Footwear</a>
            <a href="#">Clothing</a>
            <a href="#">Accessories</a>
            <a href="#">New Arrivals</a>
          </div>
          <div className="footer-column">
            <h3>SPORTS</h3>
            <a href="#">Running</a>
            <a href="#">Training</a>
            <a href="#">Basketball</a>
            <a href="#">Football</a>
          </div>
          <div className="footer-column">
            <h3>COMPANY</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Stories</a>
          </div>
          <div className="footer-column">
            <h3>SUPPORT</h3>
            <a href="#">Help</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 adidas Vietnam clone. Built with React.</p>
          <p>Giao diện mẫu cho website thương mại điện tử.</p>
        </div>
      </footer>

      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="cart-panel">
          <div className="cart-header">
            <div>
              <h3>Giỏ hàng</h3>
              <p style={{ color: 'var(--muted)', margin: '6px 0 0' }}>{totalQuantity} sản phẩm</p>
            </div>
            <button className="close-button" type="button" onClick={() => setDrawerOpen(false)} aria-label="Đóng giỏ hàng">
              ✕
            </button>
          </div>

          <div className="cart-items-list">
            {totalQuantity === 0 ? (
              <p style={{ color: 'var(--muted)' }}>Giỏ hàng trống. Thêm sản phẩm để tiếp tục.</p>
            ) : (
              Object.values(cart).map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="cart-item-title">{item.name}</p>
                    <p className="cart-item-meta">{item.category}</p>
                    <p className="cart-item-meta">{formatCurrency(item.price)}</p>
                    <div className="cart-item-actions">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button type="button" onClick={() => removeCartItem(item.id)}>Xóa</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Tổng tiền</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Thanh toán</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <button className="btn-primary" type="button" disabled={totalQuantity === 0} onClick={() => {
              if (totalQuantity > 0) {
                alert('Thanh toán thành công. Cảm ơn bạn!');
                setCart({});
                setDrawerOpen(false);
              }
            }}>
              {totalQuantity === 0 ? 'Giỏ trống' : 'Tiến hành thanh toán'}
            </button>
          </div>
        </div>
      </aside>

      {selectedProduct && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', zIndex: 40, display: 'grid', placeItems: 'center', padding: '24px' }} onClick={closeProductModal}>
          <div className="product-modal" style={{ width: '100%', maxWidth: '900px', background: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(15, 23, 42, 0.15)' }} onClick={(event) => event.stopPropagation()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '440px' }}>
              <div style={{ position: 'relative' }}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '32px', display: 'grid', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div>
                    <p style={{ margin: 0, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '0.82rem' }}>{selectedProduct.category}</p>
                    <h2 style={{ margin: '12px 0 10px', fontSize: '2rem' }}>{selectedProduct.name}</h2>
                  </div>
                  <button className="close-button" type="button" onClick={closeProductModal} aria-label="Đóng chi tiết">✕</button>
                </div>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{selectedProduct.description}</p>
                <p style={{ fontSize: '1.35rem', fontWeight: 800 }}>{formatCurrency(selectedProduct.price)}</p>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Size</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedProduct.sizes.map((size) => (
                        <button key={size} type="button" className="btn-secondary" style={{ padding: '10px 14px', minWidth: '58px', borderRadius: '18px', borderColor: size === selectedSize ? 'var(--text)' : 'transparent' }} onClick={() => setSelectedSize(size)}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px', fontWeight: 700 }}>Màu sắc</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedProduct.colors.map((color) => (
                        <button key={color} type="button" className="btn-secondary" style={{ padding: '10px 14px', minWidth: '70px', borderRadius: '18px', borderColor: color === selectedColor ? 'var(--text)' : 'transparent' }} onClick={() => setSelectedColor(color)}>
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button className="btn-secondary" type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                    <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
                    <button className="btn-secondary" type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button className="btn-primary" type="button" onClick={handleAddToCartFromModal}>
                    Thêm {quantity} vào giỏ
                  </button>
                  <button className="btn-secondary" type="button" onClick={() => addToCart(selectedProduct)}>
                    Thêm 1 vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
