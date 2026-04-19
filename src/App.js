import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const properties = [
  { id: 1, title: "Luxurious Apartments", image: "https://images.trvl-media.com/lodging/38000000/37890000/37888000/37887920/fe83f49e.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill", description: "A beautiful luxury apartment in the heart of the city.", price: "₹30 Lacs", type: "Apartment", beds: 3, baths: 2, sqft: 1200 },
  { id: 2, title: "Cozy Family House", image: "https://www.pufikhomes.com/wp-content/uploads/2018/05/family-home-in-colorado-pufikhomes-1.jpg", description: "A cozy family home with a spacious backyard.", price: "₹25 Lacs", type: "House", beds: 4, baths: 3, sqft: 2100 },
  { id: 3, title: "Modern Studio", image: "https://calbizjournal.com/wp-content/uploads/2024/05/13e55a706ba0bb014a6d6be3f54d2131.jpg", description: "A modern studio apartment perfect for singles or couples.", price: "₹60 Lacs", type: "Studio", beds: 1, baths: 1, sqft: 550 },
  { id: 4, title: "Spacious Villa", image: "https://tranio.com/photos/adt/561c2570/21973532/1310x814.jpg", description: "A spacious villa with stunning views and luxurious amenities.", price: "₹1 Crore", type: "Villa", beds: 5, baths: 4, sqft: 4500 },
  { id: 5, title: "Charming Cottage", image: "https://i.ytimg.com/vi/yhviEfRrGDI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCJ2tzk9bIpvhduX05zCYWPGs48Tw", description: "A charming cottage in a quiet neighborhood.", price: "₹50 Lacs", type: "Cottage", beds: 2, baths: 2, sqft: 900 },
  { id: 6, title: "Penthouse Suite", image: "https://st.hzcdn.com/simgs/pictures/decks/penthouse-rooftop-mia-rao-design-img~d62100800dc49f31_4-1432-1-c73d4c0.jpg", description: "A stunning penthouse with a private rooftop terrace.", price: "₹2 Crores", type: "Penthouse", beds: 4, baths: 3, sqft: 3200 },
];

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const HomeIcon = () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />;
const MenuIcon = () => <Icon d="M3 12h18 M3 6h18 M3 18h18" />;
const CloseIcon = () => <Icon d="M18 6L6 18 M6 6l12 12" />;
const BedIcon = () => <Icon d="M2 4v16 M2 8h18a2 2 0 0 1 2 2v10 M2 17h20 M6 8v9" size={16} />;
const BathIcon = () => <Icon d="M9 6 C9 3 15 3 15 6 M4 12h16 M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" size={16} />;
const AreaIcon = () => <Icon d="M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z" size={16} />;
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12 19.79 19.79 0 0 1 1.58 3.44a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
const MailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const MapIcon = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />;

const TagIcon = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01" />;
const CheckIcon = () => <Icon d="M20 6L9 17l-5-5" />;
const StarIcon = () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const ArrowRight = () => <Icon d="M5 12h14 M12 5l7 7-7 7" />;

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ivory: #F8F4EE;
    --cream: #EDE8DF;
    --warm-brown: #8B6F47;
    --deep-brown: #3D2B1A;
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --blue-accent: #2563EB;
    --dark: #1A1208;
    --text-muted: #7A6B5A;
    --card-bg: #FFFFFF;
    --shadow: 0 4px 24px rgba(61,43,26,0.10);
    --shadow-lg: 0 12px 48px rgba(61,43,26,0.16);
    --radius: 16px;
    --radius-sm: 10px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--ivory); color: var(--deep-brown); }

  /* NAV */
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(248,244,238,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--cream); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 68px; }
  .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .nav-logo-icon { width: 38px; height: 38px; background: var(--gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }
  .nav-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--deep-brown); letter-spacing: 0.01em; }
  .nav-logo-text span { color: var(--gold); }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link { padding: 8px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; color: var(--text-muted); cursor: pointer; border: none; background: none; transition: all 0.2s; }
  .nav-link:hover, .nav-link.active { background: var(--cream); color: var(--deep-brown); }
  .nav-cta { padding: 9px 20px; border-radius: 8px; background: var(--gold); color: white; font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; transition: all 0.2s; }
  .nav-cta:hover { background: var(--warm-brown); }
  .nav-mobile-btn { display: none; background: none; border: none; cursor: pointer; color: var(--deep-brown); }
  @media(max-width:768px) { .nav-links { display: none; } .nav-mobile-btn { display: flex; } }

  /* MOBILE DRAWER */
  .mobile-drawer { position: fixed; inset: 0; z-index: 200; background: rgba(26,18,8,0.5); }
  .mobile-drawer-inner { position: absolute; right: 0; top: 0; bottom: 0; width: 280px; background: var(--ivory); padding: 24px; display: flex; flex-direction: column; gap: 8px; }
  .drawer-close { align-self: flex-end; background: none; border: none; cursor: pointer; color: var(--deep-brown); margin-bottom: 16px; }
  .drawer-link { padding: 14px 16px; border-radius: 10px; font-size: 1rem; font-weight: 500; color: var(--deep-brown); cursor: pointer; border: none; background: none; text-align: left; transition: background 0.2s; }
  .drawer-link:hover { background: var(--cream); }

  /* HERO */
  .hero { background: linear-gradient(135deg, var(--deep-brown) 0%, #6B4226 60%, var(--warm-brown) 100%); padding: 90px 32px 70px; text-align: center; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(201,168,76,0.2); border: 1px solid rgba(201,168,76,0.4); color: var(--gold-light); padding: 6px 16px; border-radius: 100px; font-size: 0.8rem; font-weight: 500; margin-bottom: 24px; }
  .hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem, 6vw, 4.5rem); font-weight: 300; color: white; line-height: 1.1; margin-bottom: 16px; }
  .hero h1 em { font-style: italic; color: var(--gold-light); }
  .hero-sub { color: rgba(255,255,255,0.65); font-size: 1.05rem; max-width: 480px; margin: 0 auto 40px; line-height: 1.6; }
  .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .hero-btn-primary { padding: 14px 32px; background: var(--gold); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
  .hero-btn-primary:hover { background: var(--gold-light); color: var(--deep-brown); transform: translateY(-1px); }
  .hero-btn-secondary { padding: 14px 32px; background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .hero-btn-secondary:hover { background: rgba(255,255,255,0.14); }
  .hero-stats { display: flex; justify-content: center; gap: 48px; margin-top: 60px; flex-wrap: wrap; }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--gold-light); font-weight: 600; }
  .hero-stat-label { color: rgba(255,255,255,0.5); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; }

  /* FILTER BAR */
  .filter-bar { background: white; border-bottom: 1px solid var(--cream); padding: 16px 32px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .filter-chip { padding: 7px 18px; border-radius: 100px; font-size: 0.85rem; font-weight: 500; cursor: pointer; border: 1.5px solid var(--cream); background: white; color: var(--text-muted); transition: all 0.18s; }
  .filter-chip:hover { border-color: var(--gold); color: var(--warm-brown); }
  .filter-chip.selected { background: var(--gold); border-color: var(--gold); color: white; }
  .filter-label { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-right: 4px; }

  /* SECTION */
  .section { padding: 64px 32px; max-width: 1200px; margin: 0 auto; }
  .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; color: var(--deep-brown); }
  .section-title span { color: var(--gold); }
  .section-subtitle { color: var(--text-muted); font-size: 0.95rem; margin-top: 6px; }
  .section-link { display: flex; align-items: center; gap: 6px; color: var(--gold); font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; background: none; }
  .section-link:hover { color: var(--warm-brown); }

  /* PROPERTY GRID */
  .property-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
  .property-card { background: var(--card-bg); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); transition: all 0.3s; cursor: pointer; border: 1px solid var(--cream); }
  .property-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .property-img-wrap { position: relative; height: 200px; overflow: hidden; }
  .property-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .property-card:hover .property-img-wrap img { transform: scale(1.06); }
  .property-type-badge { position: absolute; top: 14px; left: 14px; background: rgba(26,18,8,0.75); backdrop-filter: blur(8px); color: white; padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em; }
  .property-price-badge { position: absolute; bottom: 14px; right: 14px; background: var(--gold); color: white; padding: 6px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; }
  .property-body { padding: 18px 20px; }
  .property-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; color: var(--deep-brown); margin-bottom: 6px; }
  .property-desc { font-size: 0.87rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 14px; }
  .property-meta { display: flex; gap: 14px; flex-wrap: wrap; border-top: 1px solid var(--cream); padding-top: 14px; }
  .property-meta-item { display: flex; align-items: center; gap: 5px; font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
  .property-meta-item svg { color: var(--warm-brown); }
  .property-actions { display: flex; gap: 8px; margin-top: 14px; }
  .btn-book { flex: 1; padding: 10px; border-radius: 8px; background: var(--gold); color: white; border: none; font-weight: 600; font-size: 0.87rem; cursor: pointer; transition: background 0.2s; }
  .btn-book:hover { background: var(--warm-brown); }
  .btn-contact { flex: 1; padding: 10px; border-radius: 8px; background: white; color: var(--deep-brown); border: 1.5px solid var(--cream); font-weight: 500; font-size: 0.87rem; cursor: pointer; transition: all 0.2s; }
  .btn-contact:hover { border-color: var(--gold); color: var(--gold); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(26,18,8,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: white; border-radius: var(--radius); width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); }
  .modal-header { padding: 24px 24px 0; display: flex; justify-content: space-between; align-items: center; }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 600; color: var(--deep-brown); }
  .modal-close { background: var(--cream); border: none; border-radius: 8px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--deep-brown); }
  .modal-body { padding: 24px; }
  .modal-img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px; }

  /* FORMS */
  .form-grid { display: grid; gap: 16px; }
  .form-grid-2 { grid-template-columns: 1fr 1fr; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 0.85rem; font-weight: 600; color: var(--deep-brown); }
  .form-input, .form-textarea, .form-select { width: 100%; padding: 11px 14px; border: 1.5px solid var(--cream); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.93rem; color: var(--deep-brown); background: var(--ivory); transition: border-color 0.2s; outline: none; }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); background: white; }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-submit { width: 100%; padding: 14px; background: var(--gold); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s; margin-top: 4px; }
  .form-submit:hover { background: var(--warm-brown); }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .success-msg { background: #d1fae5; color: #065f46; padding: 12px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; display: flex; align-items: center; gap: 8px; margin-top: 12px; }

  /* SELL FORM PAGE */
  .page-header { background: linear-gradient(to right, var(--deep-brown), var(--warm-brown)); padding: 48px 32px; text-align: center; }
  .page-header h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300; color: white; }
  .page-header p { color: rgba(255,255,255,0.65); margin-top: 8px; }
  .form-card { background: white; border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 36px; max-width: 680px; margin: -32px auto 48px; position: relative; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 40px; align-items: start; }
  @media(max-width:768px) { .contact-grid { grid-template-columns: 1fr; } .form-grid-2 { grid-template-columns: 1fr; } }
  .contact-info-card { background: var(--deep-brown); border-radius: var(--radius); padding: 36px; color: white; }
  .contact-info-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; margin-bottom: 8px; }
  .contact-info-card p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.6; margin-bottom: 28px; }
  .contact-info-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
  .contact-info-icon { width: 40px; height: 40px; background: rgba(201,168,76,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--gold-light); flex-shrink: 0; }
  .contact-info-text { font-size: 0.88rem; color: rgba(255,255,255,0.75); line-height: 1.5; }
  .contact-info-label { font-weight: 600; color: white; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
  .form-card-white { background: white; border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--cream); padding: 32px; }

  /* AUTH PAGES */
  .auth-wrap { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 32px 20px; background: linear-gradient(135deg, var(--ivory) 0%, var(--cream) 100%); }
  .auth-card { background: white; border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 40px; width: 100%; max-width: 420px; }
  .auth-logo { text-align: center; margin-bottom: 28px; }
  .auth-logo h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--deep-brown); }
  .auth-logo p { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }
  .auth-divider { text-align: center; margin: 16px 0; color: var(--text-muted); font-size: 0.85rem; position: relative; }
  .auth-divider::before, .auth-divider::after { content: ''; position: absolute; top: 50%; width: 40%; height: 1px; background: var(--cream); }
  .auth-divider::before { left: 0; }
  .auth-divider::after { right: 0; }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 0.88rem; color: var(--text-muted); }
  .auth-switch button { background: none; border: none; color: var(--gold); font-weight: 600; cursor: pointer; padding: 0; font-size: 0.88rem; }

  /* PAYMENT */
  .payment-wrap { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 32px 20px; background: var(--ivory); }
  .payment-card { background: white; border-radius: var(--radius); box-shadow: var(--shadow-lg); width: 100%; max-width: 460px; overflow: hidden; }
  .payment-header { background: linear-gradient(135deg, var(--deep-brown), var(--warm-brown)); padding: 28px 32px; color: white; }
  .payment-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; }
  .payment-header p { color: rgba(255,255,255,0.65); margin-top: 4px; font-size: 0.9rem; }
  .payment-body { padding: 32px; }
  .amount-display { background: var(--ivory); border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .amount-display span { color: var(--text-muted); font-size: 0.85rem; }
  .amount-display strong { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--deep-brown); }
  .card-visual { background: linear-gradient(135deg, #3D2B1A, #6B4226); border-radius: 12px; padding: 20px; margin-bottom: 24px; color: white; }
  .card-chip { width: 36px; height: 28px; background: linear-gradient(135deg, var(--gold), var(--gold-light)); border-radius: 5px; margin-bottom: 20px; }
  .card-number { font-family: monospace; font-size: 1.1rem; letter-spacing: 0.12em; margin-bottom: 16px; opacity: 0.9; }
  .card-info { display: flex; justify-content: space-between; font-size: 0.75rem; opacity: 0.7; }

  /* GATEWAY */
  .gateway-wrap { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 32px; background: var(--ivory); }
  .gateway-card { background: linear-gradient(145deg, #0f0c29, #302b63, #24243e); border-radius: var(--radius); box-shadow: 0 20px 60px rgba(0,0,0,0.4); width: 100%; max-width: 440px; padding: 40px; color: white; }
  .gateway-icon { width: 60px; height: 60px; background: rgba(201,168,76,0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 24px; }
  .gateway-card h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; margin-bottom: 6px; }
  .gateway-card p { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 32px; }
  .gateway-input { width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: white; font-size: 1rem; outline: none; margin-bottom: 16px; font-family: 'DM Sans', sans-serif; }
  .gateway-input::placeholder { color: rgba(255,255,255,0.35); }
  .gateway-input:focus { border-color: var(--gold); }
  .gateway-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: var(--deep-brown); border: none; border-radius: 10px; font-size: 1rem; font-weight: 700; cursor: pointer; }
  .metamask-note { color: rgba(255,255,255,0.35); font-size: 0.8rem; text-align: center; margin-top: 14px; }

  /* PROFILE */
  .profile-wrap { max-width: 800px; margin: 0 auto; padding: 40px 24px; }
  .profile-banner { background: linear-gradient(135deg, var(--deep-brown), var(--warm-brown)); height: 160px; border-radius: var(--radius) var(--radius) 0 0; position: relative; }
  .profile-avatar { width: 90px; height: 90px; border-radius: 50%; background: var(--gold); border: 4px solid white; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: white; position: absolute; bottom: -45px; left: 32px; }
  .profile-card { background: white; border-radius: 0 0 var(--radius) var(--radius); box-shadow: var(--shadow); padding: 60px 32px 32px; }
  .profile-name { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--deep-brown); }
  .profile-meta { display: flex; gap: 24px; flex-wrap: wrap; margin: 12px 0 28px; }
  .profile-meta-item { display: flex; align-items: center; gap: 6px; font-size: 0.87rem; color: var(--text-muted); }
  .profile-props h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: var(--deep-brown); margin-bottom: 16px; padding-top: 24px; border-top: 1px solid var(--cream); }
  .profile-prop-item { background: var(--ivory); border-radius: 10px; padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
  .profile-prop-title { font-weight: 600; color: var(--deep-brown); font-size: 0.95rem; }
  .profile-prop-price { color: var(--gold); font-weight: 700; }

  /* TOAST */
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--deep-brown); color: white; padding: 14px 20px; border-radius: 10px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 500; box-shadow: var(--shadow-lg); z-index: 999; animation: slideIn 0.3s ease; }
  .toast-icon { color: var(--gold-light); }
  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* MISC */
  .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
  .empty-state svg { color: var(--cream); margin-bottom: 12px; }
  .tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 6px; background: rgba(201,168,76,0.12); color: var(--warm-brown); font-size: 0.78rem; font-weight: 600; }
`;

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast">
      <span className="toast-icon"><CheckIcon /></span>
      {message}
    </div>
  );
}

// ─── PROPERTY CARD ──────────────────────────────────────────────────────────
function PropertyCard({ prop, onBook, onContact }) {
  return (
    <div className="property-card">
      <div className="property-img-wrap">
        <img src={prop.image} alt={prop.title} onError={e => { e.target.src = "https://placehold.co/400x200/EDE8DF/8B6F47?text=Property"; }} />
        <span className="property-type-badge">{prop.type}</span>
        <span className="property-price-badge">{prop.price}</span>
      </div>
      <div className="property-body">
        <div className="property-title">{prop.title}</div>
        <div className="property-desc">{prop.description}</div>
        <div className="property-meta">
          <span className="property-meta-item"><BedIcon />{prop.beds} Beds</span>
          <span className="property-meta-item"><BathIcon />{prop.baths} Baths</span>
          <span className="property-meta-item"><AreaIcon />{prop.sqft} sqft</span>
        </div>
        <div className="property-actions">
          <button className="btn-book" onClick={() => onBook(prop)}>Book Now</button>
          <button className="btn-contact" onClick={onContact}>Contact</button>
        </div>
      </div>
    </div>
  );
}

// ─── LISTINGS PAGE ───────────────────────────────────────────────────────────
function ListingsPage({ setPage, setBookProperty }) {
  const [filter, setFilter] = useState("All");
  const types = ["All", "Apartment", "House", "Villa", "Studio", "Penthouse", "Cottage"];
  const filtered = filter === "All" ? properties : properties.filter(p => p.type === filter);

  const handleBook = (prop) => { setBookProperty(prop); setPage("payment"); };
  const handleContact = () => setPage("contact");

  return (
    <>
      <div className="filter-bar">
        <span className="filter-label">Filter by:</span>
        {types.map(t => (
          <button key={t} className={`filter-chip ${filter === t ? "selected" : ""}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="section">
        <div className="section-header">
          <div>
            <div className="section-title">Available <span>Properties</span></div>
            <div className="section-subtitle">{filtered.length} properties found</div>
          </div>
          <button className="section-link" onClick={() => setPage("sell")}>
            List Your Property <ArrowRight />
          </button>
        </div>
        <div className="property-grid">
          {filtered.map(p => <PropertyCard key={p.id} prop={p} onBook={handleBook} onContact={handleContact} />)}
        </div>
      </div>
    </>
  );
}

// ─── BOOKING MODAL ───────────────────────────────────────────────────────────
function BookingModal({ property, onClose, showToast }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setSubmitted(true);
    showToast("Booking request sent successfully!");
    setTimeout(onClose, 1800);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Book — {property.title}</div>
          <button className="modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="modal-body">
          <img src={property.image} className="modal-img" alt={property.title} onError={e => { e.target.src = "https://placehold.co/560x200/EDE8DF/8B6F47?text=Property"; }} />
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span className="tag"><TagIcon /> {property.price}</span>
            <span className="tag"><BedIcon /> {property.beds} Beds</span>
            <span className="tag"><BathIcon /> {property.baths} Baths</span>
          </div>
          {!submitted ? (
            <div className="form-grid">
              <div className="form-grid form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Visit Date</label>
                <input className="form-input" type="date" value={form.date} onChange={e => set("date", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Message (optional)</label>
                <textarea className="form-textarea" value={form.message} onChange={e => set("message", e.target.value)} placeholder="Any specific requirements..." rows={3} />
              </div>
              <button className="form-submit" onClick={handleSubmit} disabled={!form.name || !form.email || !form.phone}>Confirm Booking</button>
            </div>
          ) : (
            <div className="success-msg"><CheckIcon /> Booking confirmed! Our agent will contact you shortly.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SELL PAGE ───────────────────────────────────────────────────────────────
function SellPage({ showToast }) {
  const [form, setForm] = useState({ title: "", desc: "", price: "", location: "", beds: "", baths: "", stories: "", size: "", year: "", type: "sell" });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setDone(true);
    showToast("Property listed successfully!");
  };

  return (
    <>
      <div className="page-header">
        <h1>List Your Property</h1>
        <p>Sell or rent your property to thousands of buyers</p>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div className="form-card">
          {done ? (
            <div className="success-msg" style={{ fontSize: "1rem", padding: "20px" }}>
              <CheckIcon /> Your property has been listed! Our team will verify and publish it shortly.
            </div>
          ) : (
            <div className="form-grid" style={{ gap: "18px" }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
                {["sell", "rent"].map(t => (
                  <button key={t} className={`filter-chip ${form.type === t ? "selected" : ""}`} onClick={() => set("type", t)} style={{ textTransform: "capitalize" }}>{t === "sell" ? "🏷 Sell" : "🔑 Rent"}</button>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input className="form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g., Modern 3BHK Apartment" />
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Describe your property..." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. 5000000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input className="form-input" value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, State" />
                </div>
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <input className="form-input" type="number" value={form.beds} onChange={e => set("beds", e.target.value)} placeholder="3" />
                </div>
                <div className="form-group">
                  <label className="form-label">Bathrooms</label>
                  <input className="form-input" type="number" value={form.baths} onChange={e => set("baths", e.target.value)} placeholder="2" />
                </div>
                <div className="form-group">
                  <label className="form-label">Size (sq ft)</label>
                  <input className="form-input" type="number" value={form.size} onChange={e => set("size", e.target.value)} placeholder="1500" />
                </div>
                <div className="form-group">
                  <label className="form-label">Year Built</label>
                  <input className="form-input" type="number" value={form.year} onChange={e => set("year", e.target.value)} placeholder="2020" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Upload Images</label>
                <input className="form-input" type="file" accept="image/*" multiple />
              </div>
              <button className="form-submit" onClick={handleSubmit} disabled={!form.title || !form.price || !form.location}>
                {form.type === "sell" ? "List for Sale" : "List for Rent"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ showToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => { setSent(true); showToast("Message sent! We'll be in touch soon."); };

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <div className="section-title">Get in <span>Touch</span></div>
          <div className="section-subtitle">We'd love to hear from you</div>
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-info-card">
          <h3>Prime Estate</h3>
          <p>Your trusted partner for finding the perfect home in India.</p>
          {[
            { icon: <PhoneIcon />, label: "Phone", text: "+91 98765 43210\n+91 80000 12345" },
            { icon: <MailIcon />, label: "Email", text: "hello@primeestate.in\nsupport@primeestate.in" },
            { icon: <MapIcon />, label: "Office", text: "Sharmaji Towers, MI Road\nJaipur, Rajasthan 302001" },
          ].map((item, i) => (
            <div key={i} className="contact-info-item">
              <div className="contact-info-icon">{item.icon}</div>
              <div>
                <div className="contact-info-label">{item.label}</div>
                <div className="contact-info-text" style={{ whiteSpace: "pre-line" }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-card-white">
          {sent ? (
            <div className="success-msg" style={{ fontSize: "1rem", padding: "20px" }}>
              <CheckIcon /> Thanks! We'll get back to you within 24 hours.
            </div>
          ) : (
            <div className="form-grid" style={{ gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-textarea" value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell us how we can help..." style={{ minHeight: "150px" }} />
              </div>
              <button className="form-submit" onClick={handleSubmit} disabled={!form.name || !form.email || !form.message}>Send Message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, showToast }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => { showToast("Logged in successfully!"); setPage("listings"); };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <h2>Welcome Back</h2>
          <p>Login to your Prime Estate account</p>
        </div>
        <div className="form-grid" style={{ gap: "14px" }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={form.username} onChange={e => set("username", e.target.value)} placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" />
          </div>
          <button className="form-submit" onClick={handleSubmit} disabled={!form.username || !form.password}>Login</button>
        </div>
        <div className="auth-switch">
          Don't have an account? <button onClick={() => setPage("signup")}>Sign up here</button>
        </div>
      </div>
    </div>
  );
}

// ─── SIGNUP PAGE ──────────────────────────────────────────────────────────────
function SignupPage({ setPage, showToast }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", mobile: "", email: "", address: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => { showToast("Account created successfully!"); setPage("login"); };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <h2>Create Account</h2>
          <p>Join Prime Estate today</p>
        </div>
        <div className="form-grid" style={{ gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="First" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Last" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Mobile</label>
            <input className="form-input" value={form.mobile} onChange={e => set("mobile", e.target.value)} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="form-textarea" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Your address..." rows={3} />
          </div>
          <button className="form-submit" onClick={handleSubmit} disabled={!form.firstName || !form.email || !form.mobile}>Create Account</button>
        </div>
        <div className="auth-switch">
          Already have an account? <button onClick={() => setPage("login")}>Login here</button>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
function PaymentPage({ property, showToast, setPage }) {
  const [form, setForm] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setDone(true);
    showToast("Payment successful! 🎉");
    setTimeout(() => setPage("listings"), 2000);
  };

  const displayNum = form.number ? form.number.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• ••••";

  return (
    <div className="payment-wrap">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Secure Payment</h2>
          <p>{property ? `Booking: ${property.title}` : "Complete your booking"}</p>
        </div>
        <div className="payment-body">
          {done ? (
            <div className="success-msg" style={{ fontSize: "1rem", padding: "20px", justifyContent: "center" }}>
              <CheckIcon /> Payment successful! Redirecting...
            </div>
          ) : (
            <>
              {property && (
                <div className="amount-display">
                  <span>Amount Due</span>
                  <strong>{property.price}</strong>
                </div>
              )}
              <div className="card-visual">
                <div className="card-chip" />
                <div className="card-number">{displayNum}</div>
                <div className="card-info">
                  <span>{form.name || "CARD HOLDER"}</span>
                  <span>{form.expiry || "MM/YY"}</span>
                </div>
              </div>
              <div className="form-grid" style={{ gap: "14px" }}>
                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input className="form-input" value={form.name} onChange={e => set("name", e.target.value.toUpperCase())} placeholder="FULL NAME" />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="form-input" value={form.number} onChange={e => set("number", e.target.value.replace(/\D/g, "").slice(0, 16))} placeholder="1234 5678 9012 3456" maxLength={16} style={{ fontFamily: "monospace", letterSpacing: "0.1em" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Expiry (MM/YY)</label>
                    <input className="form-input" value={form.expiry} onChange={e => set("expiry", e.target.value)} placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input className="form-input" type="password" value={form.cvv} onChange={e => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" maxLength={3} />
                  </div>
                </div>
                <button className="form-submit" onClick={handleSubmit} disabled={!form.name || form.number.length < 16 || !form.expiry || form.cvv.length < 3}>Pay Now</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GATEWAY PAGE ─────────────────────────────────────────────────────────────
function GatewayPage({ showToast }) {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const handlePay = () => {
    if (typeof window.ethereum !== "undefined") {
      setMsg("Connecting to MetaMask...");
      showToast("MetaMask transaction initiated!");
    } else {
      setMsg("⚠️ MetaMask not detected. Please install MetaMask to use crypto payments.");
    }
  };

  return (
    <div className="gateway-wrap">
      <div className="gateway-card">
        <div className="gateway-icon">⟠</div>
        <h2>Crypto Payment</h2>
        <p>Pay securely with Ethereum via MetaMask</p>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          Contract: <span style={{ color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>0x5B38Da6a701c...C4</span>
        </div>
        <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "6px", display: "block", textTransform: "uppercase", letterSpacing: "0.08em" }}>Amount (ETH)</label>
        <input className="gateway-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" type="number" step="0.001" />
        <button className="gateway-btn" onClick={handlePay}>Connect Wallet & Pay</button>
        {msg && <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", textAlign: "center", marginTop: "16px", lineHeight: 1.5 }}>{msg}</p>}
        <p className="metamask-note">Powered by Web3.js · Requires MetaMask</p>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const user = { name: "Vansh Sharma", email: "vansh28sharma2005@gmail.com", phone: "+91 7982332659", location: "Jaipur, Rajasthan" };
  return (
    <div className="profile-wrap">
      <div style={{ position: "relative", marginBottom: "60px" }}>
        <div className="profile-banner" />
        <div className="profile-avatar">{user.name[0]}</div>
      </div>
      <div className="profile-card">
        <div className="profile-name">{user.name}</div>
        <div className="profile-meta">
          <span className="profile-meta-item"><MailIcon /> {user.email}</span>
          <span className="profile-meta-item"><PhoneIcon /> {user.phone}</span>
          <span className="profile-meta-item"><MapIcon /> {user.location}</span>
        </div>
        <div className="profile-props">
          <h3>Your Listed Properties</h3>
          {[
            { title: "Cozy Apartment, Vaishali Nagar", price: "₹32 Lacs" },
            { title: "Spacious House, Mansarovar", price: "₹58 Lacs" },
          ].map((p, i) => (
            <div key={i} className="profile-prop-item">
              <div className="profile-prop-title">{p.title}</div>
              <div className="profile-prop-price">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
  return (
    <div className="hero">
      <div className="hero-badge"><StarIcon /> India's Most Trusted Real Estate Platform</div>
      <h1>Find Your<br /><em>Dream Home</em></h1>
      <p className="hero-sub">Affordable homes, luxury villas, and modern studios — all at prices that make sense.</p>
      <div className="hero-actions">
        <button className="hero-btn-primary" onClick={() => setPage("listings")}>
          Browse Properties <ArrowRight />
        </button>
        <button className="hero-btn-secondary" onClick={() => setPage("sell")}>List Your Property</button>
      </div>
      <div className="hero-stats">
        {[["500+", "Properties"], ["12K+", "Happy Clients"], ["8+", "Cities"], ["15yr", "Experience"]].map(([n, l]) => (
          <div key={l} className="hero-stat"><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [bookProperty, setBookProperty] = useState(null);

  const showToast = (msg) => setToast(msg);

  const navLinks = [
    { key: "listings", label: "Properties" },
    { key: "sell", label: "Sell / Rent" },
    { key: "contact", label: "Contact" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("home")}>
          <div className="nav-logo-icon"><HomeIcon /></div>
          <div className="nav-logo-text">Prime <span>Estate</span></div>
        </div>
        <div className="nav-links">
          {navLinks.map(l => (
            <button key={l.key} className={`nav-link ${page === l.key ? "active" : ""}`} onClick={() => setPage(l.key)}>{l.label}</button>
          ))}
          <button className="nav-link" onClick={() => setPage("gateway")}>⟠ Crypto</button>
          <button className="nav-cta" onClick={() => setPage("login")}>Login</button>
          <button className="nav-link" onClick={() => setPage("signup")}>Sign Up</button>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(true)}><MenuIcon /></button>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-inner" onClick={e => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setMobileOpen(false)}><CloseIcon /></button>
            {[...navLinks, { key: "gateway", label: "⟠ Crypto" }, { key: "login", label: "Login" }, { key: "signup", label: "Sign Up" }].map(l => (
              <button key={l.key} className="drawer-link" onClick={() => { setPage(l.key); setMobileOpen(false); }}>{l.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* PAGES */}
      <main>
        {page === "home" && (
          <>
            <HeroSection setPage={setPage} />
            <ListingsPage setPage={setPage} setBookProperty={setBookProperty} />
          </>
        )}
        {page === "listings" && <ListingsPage setPage={setPage} setBookProperty={p => { setBookProperty(p); setPage("payment"); }} />}
        {page === "sell" && <SellPage showToast={showToast} />}
        {page === "contact" && <ContactPage showToast={showToast} />}
        {page === "login" && <LoginPage setPage={setPage} showToast={showToast} />}
        {page === "signup" && <SignupPage setPage={setPage} showToast={showToast} />}
        {page === "payment" && <PaymentPage property={bookProperty} showToast={showToast} setPage={setPage} />}
        {page === "gateway" && <GatewayPage showToast={showToast} />}
        {page === "profile" && <ProfilePage />}
      </main>

      {/* BOOKING MODAL (from listings page Book button) */}
      {bookProperty && page !== "payment" && (
        <BookingModal property={bookProperty} onClose={() => setBookProperty(null)} showToast={showToast} />
      )}

      {/* FOOTER */}
      <footer style={{ background: "var(--deep-brown)", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "24px", fontSize: "0.85rem", marginTop: "auto" }}>
        © 2025 Prime Estate — Sharmaji Construction. All rights reserved.
      </footer>

      {/* TOAST */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
