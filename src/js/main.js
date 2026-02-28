const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px" 
});

const initHeroSlider = () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; 

  const nextSlide = () => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  let autoSlide = setInterval(nextSlide, slideInterval);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(autoSlide);
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      autoSlide = setInterval(nextSlide, slideInterval);
    });
  });
};

// --- WIZARD RESERVATION LOGIC ---
const wizardContainer = document.querySelector('.wizard-container');
if (wizardContainer) {
  let currentStepIndex = 1;
  const totalSteps = 3;
  const nextBtns = document.querySelectorAll('.next-btn');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const confirmBtn = document.querySelector('.confirm-btn');
  const steps = document.querySelectorAll('.wizard-step');
  const indicators = document.querySelectorAll('.step-indicator');
  const updateWizard = (newIndex) => {
    steps.forEach(step => step.classList.remove('active'));
    document.querySelector(`#step-${newIndex}`).classList.add('active');
    indicators.forEach(ind => {
      if (parseInt(ind.getAttribute('data-step')) <= newIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  };

  nextBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStepIndex < totalSteps) { currentStepIndex++; updateWizard(currentStepIndex); } }));
  prevBtns.forEach(btn => btn.addEventListener('click', () => { if (currentStepIndex > 1) { currentStepIndex--; updateWizard(currentStepIndex); } }));
  if(confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      steps.forEach(step => step.classList.remove('active'));
      document.querySelector('#step-success').classList.add('active');
      indicators.forEach(ind => ind.classList.add('active'));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  
  const sectionsToReveal = document.querySelectorAll('.about-section, .signature-dishes, .reservation-section, .dish-card');
  sectionsToReveal.forEach((section) => revealObserver.observe(section));

  const hero = document.querySelector('.hero');
  const pageHero = document.querySelector('.page-hero');
  setTimeout(() => {
    if (hero) hero.classList.add('load-complete');
    if (pageHero) pageHero.classList.add('load-complete');
  }, 100);

  const filterBtns = document.querySelectorAll('.filter-btn');
  const dishCards = document.querySelectorAll('.menu-section .dish-card');
  if (filterBtns.length > 0 && dishCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        dishCards.forEach(card => {
          card.classList.remove('appear');
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hide');
            setTimeout(() => card.classList.add('appear'), 50); 
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  initHeroSlider(); 

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const translations = {
    en: {
      nav_home: "Home", nav_menu: "Menu", nav_reservation: "Reservation", nav_contact: "Contact us",
      hero_title: "TASTE<br>UNIQUE FOOD", hero_subtitle: "Order food with home delivery or take away", explore_btn: "Full Menu Explore &rarr;",
      menu_page_title: "Our Menu", menu_page_subtitle: "Discover our culinary masterpieces",
      filter_all: "All", filter_starters: "Starters", filter_mains: "Main Courses", filter_desserts: "Desserts", filter_drinks: "Drinks", btn_add_cart: "Add to Cart",
      calamari_title: "Crispy Calamari", calamari_desc: "Golden crispy calamari with special tartar sauce and lemon slices.",
      caprese_title: "Caprese Salad", caprese_desc: "Buffalo mozzarella, vine tomatoes and balsamic vinegar.",
      salmon_title: "Grilled Salmon", salmon_desc: "Fresh salmon, asparagus and special lemon sauce.",
      steak_title: "Beef Steak", steak_desc: "Dry-aged ribeye with truffle mashed potatoes.",
      pizza_title: "Italian Pizza", pizza_desc: "Special tomato sauce, buffalo mozzarella and fresh basil.",
      pasta_title: "Truffle Pasta", pasta_desc: "Handmade fettuccine with black truffle mushroom cream.",
      lava_title: "Chocolate Lava Cake", lava_desc: "Hot chocolate lava with vanilla ice cream.",
      sunset_title: "Sunset Cocktail", sunset_desc: "Our signature cocktail prepared with special syrups and fresh fruits.",
      latte_title: "Caramel Iced Latte", latte_desc: "Cold-brewed espresso, milk and caramel syrup.",
      res_page_title: "Book a Table", res_page_subtitle: "Secure your spot for an unforgettable experience",
      step_1_title: "1. Date & Time", step_2_title: "2. Details", step_3_title: "3. Contact", res_confirm_btn: "Confirm Reservation",
      contact_page_title: "Get in Touch", contact_page_subtitle: "We'd love to hear from you",
      contact_form_title: "Feedback & Support", contact_desc: "We value your experience! Please use the form below to share your suggestions, report a complaint, or send us your feedback.", contact_btn: "Send Message",
      ph_name: "Your Name", ph_email: "Your Email", ph_subject: "Select Subject", opt_suggestion: "Suggestion", opt_complaint: "Complaint", opt_other: "Other", ph_message: "Please describe your experience or suggestion in detail...",
      info_title: "Contact Information", info_location: "Location", open_maps: "Open in Google Maps &rarr;", info_phone: "Phone & WhatsApp", chat_wa: "Chat on WhatsApp", info_email: "Email", info_hours: "Opening Hours",
      hours_week: "<strong>Mon - Fri:</strong> 11:00 AM - 10:00 PM", hours_weekend: "<strong>Sat - Sun:</strong> 12:00 PM - 11:00 PM",
      footer_desc: "Experience the art of fine dining where every plate tells a story of passion and excellence.", footer_explore: "Explore", footer_visit: "Visit Us", footer_hours: "Hours", footer_mon_fri: "Mon - Fri: 11am - 10pm", footer_sat_sun: "Sat - Sun: 12pm - 11pm", footer_rights: "&copy; 2026 Rimberio. Powered by <strong>Collabify.ai</strong>.",
      // CART TRANSLATIONS
      cart_title: "Your Cart", cart_total: "Total:", cart_checkout: "Checkout", cart_empty: "Your cart is empty.",
      cart_added: "✓ Added",
      // INDEX PAGE ABOUT & SIGNATURE TRANSLATIONS
      about_subtitle: "Since 1998",
      about_title: "Art of Cooking",
      about_desc: "At Rimberio, we don't just serve food; we leave a work of art on your plate. We combine fresh produce from local farmers with traditional techniques.",
      about_btn: "Discover Our Story",
      sig_subtitle: "Our Specialities",
      sig_title: "Signature Dishes"
    },
    tr: {
      nav_home: "Ana Sayfa", nav_menu: "Menü", nav_reservation: "Rezervasyon", nav_contact: "İletişim",
      hero_title: "EŞSİZ LEZZETLERİ<br>KEŞFEDİN", hero_subtitle: "Eve sipariş verin veya gelip alın", explore_btn: "Tüm Menüyü İncele &rarr;",
      menu_page_title: "Menümüz", menu_page_subtitle: "Mutfak başyapıtlarımızı keşfedin",
      filter_all: "Tümü", filter_starters: "Başlangıçlar", filter_mains: "Ana Yemekler", filter_desserts: "Tatlılar", filter_drinks: "İçecekler", btn_add_cart: "Sepete Ekle",
      calamari_title: "Çıtır Kalamar", calamari_desc: "Özel tartar sos ve limon dilimleri eşliğinde altın rengi çıtır kalamar.",
      caprese_title: "Caprese Salatası", caprese_desc: "Manda mozzarellası, salkım domates ve balzamik sirke.",
      salmon_title: "Izgara Somon", salmon_desc: "Taze somon, kuşkonmaz ve özel limon sosu.",
      steak_title: "Dana Antrikot", steak_desc: "Dinlendirilmiş antrikot, trüflü patates püresi ile.",
      pizza_title: "İtalyan Pizza", pizza_desc: "Özel domates sosu, manda mozzarellası ve taze fesleğen.",
      pasta_title: "Trüflü Makarna", pasta_desc: "El yapımı fettuccine, siyah trüf mantarı kreması ile.",
      lava_title: "Çikolatalı Sufle", lava_desc: "Sıcak çikolata şelalesi ve vanilyalı dondurma.",
      sunset_title: "Sunset Kokteyl", sunset_desc: "Özel şuruplar ve taze meyvelerle hazırlanan imza kokteylimiz.",
      latte_title: "Karamel Iced Latte", latte_desc: "Soğuk demlenmiş espresso, süt ve karamel şurubu.",
      res_page_title: "Masa Ayırtın", res_page_subtitle: "Unutulmaz bir deneyim için yerinizi ayırtın",
      step_1_title: "1. Tarih & Saat", step_2_title: "2. Detaylar", step_3_title: "3. İletişim", res_confirm_btn: "Rezervasyonu Onayla",
      contact_page_title: "Bize Ulaşın", contact_page_subtitle: "Sizden haber almaktan mutluluk duyarız",
      contact_form_title: "Geri Bildirim & Destek", contact_desc: "Deneyiminize değer veriyoruz! Önerilerinizi paylaşmak, şikayetinizi bildirmek veya geri bildirim göndermek için aşağıdaki formu kullanın.", contact_btn: "Mesaj Gönder",
      ph_name: "Adınız", ph_email: "E-posta Adresiniz", ph_subject: "Konu Seçin", opt_suggestion: "Öneri / Teklif", opt_complaint: "Şikayet", opt_other: "Diğer", ph_message: "Lütfen deneyiminizi veya önerinizi detaylıca açıklayın...",
      info_title: "İletişim Bilgileri", info_location: "Konum", open_maps: "Google Haritalar'da Aç &rarr;", info_phone: "Telefon & WhatsApp", chat_wa: "WhatsApp'tan Yazın", info_email: "E-posta", info_hours: "Çalışma Saatleri",
      hours_week: "<strong>Pzt - Cum:</strong> 11:00 - 22:00", hours_weekend: "<strong>Cmt - Paz:</strong> 12:00 - 23:00",
      footer_desc: "Her tabağın tutku ve mükemmellik hikayesini anlattığı ince yemek sanatını deneyimleyin.", footer_explore: "Keşfet", footer_visit: "Bizi Ziyaret Edin", footer_hours: "Çalışma Saatleri", footer_mon_fri: "Pzt - Cum: 11:00 - 22:00", footer_sat_sun: "Cmt - Paz: 12:00 - 23:00", footer_rights: "&copy; 2026 Rimberio. <strong>communitydevs group</strong> tarafından hazırlandı.",
      // CART TRANSLATIONS
      cart_title: "Sepetiniz", cart_total: "Toplam:", cart_checkout: "Ödeme Yap", cart_empty: "Sepetiniz boş.",
      cart_added: "✓ Eklendi",
      // INDEX PAGE ABOUT & SIGNATURE TRANSLATIONS
      about_subtitle: "1998'den Beri",
      about_title: "Aşçılık Sanatı",
      about_desc: "Rimberio olarak sadece yemek sunmuyoruz; tabağınıza bir sanat eseri bırakıyoruz. Yerel çiftçilerden gelen taze ürünleri, geleneksel tekniklerle birleştiriyoruz.",
      about_btn: "Hikayemizi Keşfedin",
      sig_subtitle: "Özel Lezzetlerimiz",
      sig_title: "İmza Yemeklerimiz"
    },
    ru: {
      nav_home: "Главная", nav_menu: "Меню", nav_reservation: "Бронь", nav_contact: "Контакты",
      hero_title: "ПОПРОБУЙТЕ<br>УНИКАЛЬНУЮ ЕДУ", hero_subtitle: "Закажите еду с доставкой на дом или на вынос", explore_btn: "Смотреть все меню &rarr;",
      menu_page_title: "Наше Меню", menu_page_subtitle: "Откройте для себя наши кулинарные шедевры",
      filter_all: "Все", filter_starters: "Закуски", filter_mains: "Горячие блюда", filter_desserts: "Десерты", filter_drinks: "Напитки", btn_add_cart: "В корзину",
      calamari_title: "Хрустящие кальмары", calamari_desc: "Золотистые хрустящие кальмары с особым соусом тартар и дольками лимона.",
      caprese_title: "Салат Капрезе", caprese_desc: "Сыр моцарелла буффало, помидоры на ветке и бальзамический уксус.",
      salmon_title: "Лосось на гриле", salmon_desc: "Свежий лосось, спаржа и особый лимонный соус.",
      steak_title: "Стейк из говядины", steak_desc: "Выдержанный антрекот с картофельным пюре с трюфелями.",
      pizza_title: "Итальянская пицца", pizza_desc: "Особый томатный соус, моцарелла буффало и свежий базилик.",
      pasta_title: "Трюфельная паста", pasta_desc: "Феттучини ручной работы с кремом из черного трюфеля.",
      lava_title: "Шоколадный фондан", lava_desc: "Горячий шоколадный фондан с ванильным мороженым.",
      sunset_title: "Коктейль Сансет", sunset_desc: "Наш фирменный коктейль с особыми сиропами и свежими фруктами.",
      latte_title: "Карамельный Айс Латте", latte_desc: "Эспрессо холодного заваривания, молоко и карамельный сироп.",
      res_page_title: "Забронировать стол", res_page_subtitle: "Забронируйте место для незабываемых впечатлений",
      step_1_title: "1. Дата и Время", step_2_title: "2. Детали", step_3_title: "3. Контакты", res_confirm_btn: "Подтвердить",
      contact_page_title: "Связаться с нами", contact_page_subtitle: "Мы будем рады услышать от вас",
      contact_form_title: "Отзывы и Поддержка", contact_desc: "Мы ценим ваш опыт! Пожалуйста, используйте форму ниже, чтобы поделиться своими предложениями, сообщить о жалобе или оставить отзыв.", contact_btn: "Отправить",
      ph_name: "Ваше имя", ph_email: "Ваш Email", ph_subject: "Выберите тему", opt_suggestion: "Предложение", opt_complaint: "Жалоба", opt_other: "Другое", ph_message: "Пожалуйста, подробно опишите ваш опыт или предложение...",
      info_title: "Контакты", info_location: "Локация", open_maps: "Открыть в Google Maps &rarr;", info_phone: "Телефон и WhatsApp", chat_wa: "Написать в WhatsApp", info_email: "Эл. почта", info_hours: "Часы работы",
      hours_week: "<strong>Пн - Пт:</strong> 11:00 - 22:00", hours_weekend: "<strong>Сб - Вс:</strong> 12:00 - 23:00",
      footer_desc: "Почувствуйте искусство изысканной кухни, где каждое блюдо рассказывает историю страсти и мастерства.", footer_explore: "Исследовать", footer_visit: "Приходите к нам", footer_hours: "Часы работы", footer_mon_fri: "Пн - Пт: 11:00 - 22:00", footer_sat_sun: "Сб - Вс: 12:00 - 23:00", footer_rights: "&copy; 2026 Rimberio. Разработано <strong>communitydevs group</strong>.",
      // CART TRANSLATIONS
      cart_title: "Ваша корзина", cart_total: "Итого:", cart_checkout: "Оформить заказ", cart_empty: "Ваша корзина пуста.",
      cart_added: "✓ Добавлено",
      // INDEX PAGE ABOUT & SIGNATURE TRANSLATIONS
      about_subtitle: "С 1998 года",
      about_title: "Искусство кулинарии",
      about_desc: "В Rimberio мы не просто подаем еду; мы оставляем произведение искусства на вашей тарелке. Мы сочетаем свежие продукты от местных фермеров с традиционными методами.",
      about_btn: "Узнать нашу историю",
      sig_subtitle: "Наши фирменные блюда",
      sig_title: "Фирменные блюда"
    }
  };

  const langOptions = document.querySelectorAll('.lang-dropdown a');
  const currentLangBtn = document.getElementById('current-lang');
  const updateContent = (langCode) => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[langCode] && translations[langCode][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[langCode][key];
        } else {
          el.innerHTML = translations[langCode][key];
        }
      }
    });
  };

  const initCart = () => {
    if (!document.getElementById('cart-sidebar')) {
      const cartHTML = `
        <div class="cart-overlay" id="cart-overlay"></div>
        <div class="cart-sidebar" id="cart-sidebar">
          <div class="cart-header">
            <h2 data-i18n="cart_title">Your Cart</h2>
            <button class="close-cart" id="close-cart">&times;</button>
          </div>
          <div class="cart-items" id="cart-items"></div>
          <div class="cart-footer">
            <div class="cart-total">
              <span data-i18n="cart_total">Total:</span>
              <span id="cart-total-price">$0.00</span>
            </div>
            <button class="btn-outline checkout-btn" id="checkout-btn" data-i18n="cart_checkout">Checkout</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    let cart = JSON.parse(localStorage.getItem('rimberio_cart')) || [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartBtns = document.querySelectorAll('.cart-btn'); 
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartBtns.forEach(btn => {
      btn.style.position = 'relative';
      if(!btn.querySelector('.cart-badge')) {
        btn.innerHTML += `<span class="cart-badge">${cart.length}</span>`;
      }
    });

    const openCart = () => {
      cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
      renderCart();
    };

    const closeCart = () => {
      cartSidebar.classList.remove('active');
      cartOverlay.classList.remove('active');
    };

    cartBtns.forEach(btn => btn.addEventListener('click', openCart));
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    const updateCartBadge = () => {
      cartBtns.forEach(btn => {
        const badge = btn.querySelector('.cart-badge');
        if(badge) {
          badge.innerText = cart.length;
        }
      });
    };

    const renderCart = () => {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      const currentLang = localStorage.getItem('rimberio_lang') || 'en';

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; margin-top:50px; color:#999;" data-i18n="cart_empty">Your cart is empty.</p>`;
        updateContent(currentLang); 
      } else {
        cart.forEach((item, index) => {
          total += item.price * item.quantity;
          let itemTitle = item.defaultTitle;
          if (item.titleKey && translations[currentLang] && translations[currentLang][item.titleKey]) {
              itemTitle = translations[currentLang][item.titleKey];
          }

          cartItemsContainer.innerHTML += `
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px;">
              <img src="${item.imgSrc}" alt="${itemTitle}" style="width:65px; height:65px; object-fit:cover; border-radius:6px;">
              <div style="flex:1;">
                <h4 style="font-size:0.95rem; margin-bottom:3px; color:var(--text-dark);">${itemTitle}</h4>
                <div style="color:var(--primary-color); font-weight:700;">$${item.price.toFixed(2)}</div>
                <div style="display:flex; align-items:center; gap:10px; margin-top:8px;">
                  <button class="qty-btn minus" data-index="${index}" style="border:1px solid #ddd; background:#fff; width:28px; height:28px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;">-</button>
                  <span style="font-size:0.9rem; font-weight:600;">${item.quantity}</span>
                  <button class="qty-btn plus" data-index="${index}" style="border:1px solid #ddd; background:#fff; width:28px; height:28px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
                </div>
              </div>
              <button class="remove-item" data-index="${index}" style="color:#ff4757; background:none; border:none; cursor:pointer; font-size:1.5rem; padding:0 10px;">&times;</button>
            </div>
          `;
        });
      }
      cartTotalPrice.innerText = `$${total.toFixed(2)}`;

      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          saveAndRender();
        });
      });

      document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          if (e.target.classList.contains('plus')) {
            cart[idx].quantity += 1;
          } else if (e.target.classList.contains('minus')) {
            cart[idx].quantity -= 1;
            if (cart[idx].quantity < 1) cart.splice(idx, 1); 
          }
          saveAndRender();
        });
      });
      
      updateContent(currentLang); 
    };

    const saveAndRender = () => {
      localStorage.setItem('rimberio_cart', JSON.stringify(cart));
      updateCartBadge();
      renderCart();
    };

    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.dish-card');
        if(!card) return;

        const titleEl = card.querySelector('h3');
        const titleKey = titleEl.getAttribute('data-i18n'); 
        const defaultTitle = titleEl.innerText; 
        const priceText = card.querySelector('.dish-price').innerText;
        const price = parseFloat(priceText.replace('$', ''));
        const imgSrc = card.querySelector('img').src;

        const existingItemIndex = cart.findIndex(item => item.titleKey === titleKey || item.defaultTitle === defaultTitle);

        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cart.push({ titleKey, defaultTitle, price, imgSrc, quantity: 1 });
        }

        saveAndRender();

        const currentLang = localStorage.getItem('rimberio_lang') || 'en';
        const addedText = translations[currentLang]?.cart_added || '✓ Added';

        const originalText = btn.innerHTML;
        btn.innerHTML = addedText; 
        btn.style.backgroundColor = 'var(--text-dark)';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 1200);
      });
    });

    checkoutBtn.addEventListener('click', () => {
      if(cart.length === 0) return;
      
      const currentLang = localStorage.getItem('rimberio_lang') || 'en';
      let msg = "Redirecting to secure payment... (Backend integration needed)";
      if(currentLang === 'tr') msg = "Güvenli ödeme sayfasına yönlendiriliyorsunuz... (Backend entegrasyonu gerekli)";
      if(currentLang === 'ru') msg = "Перенаправление на безопасную оплату... (Требуется интеграция с бэкендом)";
      
      alert(msg);
    });
  };

  if (currentLangBtn && langOptions.length > 0) {
    const savedLang = localStorage.getItem('rimberio_lang') || 'en';
    
    const setActiveLang = (langCode) => {
      langOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang') === langCode) {
          opt.classList.add('active');
          currentLangBtn.innerHTML = `${langCode.toUpperCase()} <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>`;
        }
      });
      updateContent(langCode);
    };

    setActiveLang(savedLang);

    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault(); 
        const selectedLang = option.getAttribute('data-lang');
        localStorage.setItem('rimberio_lang', selectedLang);
        setActiveLang(selectedLang);
      });
    });
  }

  initCart();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});