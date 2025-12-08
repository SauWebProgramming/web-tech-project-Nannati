# 🎬 CineMax - Interactive Movie Library (SPA)

 Bu proje, ISE-201 Web Teknolojileri dersi için geliştirilmiştir.

## 🌟 Özellikler

### ✅ Zorunlu İşlevler (Tümü Uygulandı)

- **📋 Liste/Grid Görünümü**: Tüm filmler modern kart tasarımıyla grid düzeninde gösterilir
- **🔍 Arama ve Filtreleme**: 
  - Film adına göre gerçek zamanlı arama
  - Kategoriye göre filtreleme (Aksiyon, Bilim Kurgu, Dram, vb.)
  - Yıla göre filtreleme (2024, 2023, 2010'lar, 2000'ler)
- **📱 Detay Sayfası**: Filme tıklandığında dinamik modal ile detaylar gösterilir (SPA yaklaşımı)
- **❤️ Favorilerim**: localStorage kullanılarak tarayıcıda saklanır, ayrı "Favorilerim" sayfası

### 🎯 Teknik Özellikler

- ✅ Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Tamamen duyarlı tasarım (Responsive) - Mobil, tablet, masaüstü uyumlu
- ✅ CSS Flexbox ve Grid kullanımı
- ✅ Modern JavaScript (ES6+)
  - `const` ve `let` kullanımı (NO `var`)
  - Arrow functions (`=>`)
  - `async/await` ve Promises
  - Template literals
- ✅ Fetch API ile yerel JSON dosyasından veri çekme
- ✅ localStorage ile veri yönetimi
- ✅ Single Page Application (SPA) - Hash-based routing
- ✅ Hamburger menü (mobil cihazlar için)

## 🎨 Tasarım

- Netflix-inspired dark theme
- Modern ve minimalist arayüz
- Smooth animasyonlar ve geçişler
- Hero section (featured movie)
- Interactive hover effects
- Özel scrollbar tasarımı

## 📁 Proje Yapısı

```
web_cur/
├── index.html          # Ana HTML dosyası (Semantic HTML5)
├── styles.css          # Stil dosyası (CSS3, Flexbox, Grid, Responsive)
├── app.js              # JavaScript dosyası (ES6+, Fetch, SPA)
├── movies.json         # Film verileri (30 adet film)
└── README.md           # Proje dokümantasyonu
```

## 🚀 Kurulum ve Çalıştırma

### Seçenek 1: Live Server (Önerilen)

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd web_cur
```

2. VS Code'da Live Server uzantısı ile çalıştırın:
   - VS Code'da projeyi açın
   - `index.html` dosyasına sağ tıklayın
   - "Open with Live Server" seçeneğini tıklayın

### Seçenek 2: Python HTTP Server

```bash
# Python 3.x
python -m http.server 8000

# Tarayıcıda açın: http://localhost:8000
```

### Seçenek 3: Node.js HTTP Server

```bash
# npx ile (kurulum gerektirmez)
npx http-server

# Veya global kurulum
npm install -g http-server
http-server
```

## 📖 Kullanım

### Ana Sayfa
- Hero section'da öne çıkan film gösterilir
- Arama çubuğundan film arayabilirsiniz
- Kategori ve yıl filtrelerini kullanabilirsiniz
- Film kartlarına tıklayarak detayları görüntüleyebilirsiniz

### Filmler Sayfası
- Tüm filmler liste halinde görüntülenir
- Arama ve filtreleme özellikleri kullanılabilir

### Favorilerim Sayfası
- Favori olarak işaretlediğiniz filmler burada listelenir
- Kalp ikonuna tıklayarak film ekleyip çıkarabilirsiniz
- Veriler tarayıcınızda localStorage ile saklanır

### Film Detayları
- Film kartına tıklandığında modal açılır
- Film özeti, oyuncular, yönetmen bilgileri görüntülenir
- Modal'dan da favorilere eklenebilir

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Amaç |
|-----------|------|
| HTML5 | Semantic yapı, form validasyonu |
| CSS3 | Flexbox, Grid, Media Queries, Animations |
| JavaScript ES6+ | `const/let`, arrow functions, `async/await` |
| Fetch API | JSON verilerini asenkron olarak yükleme |
| localStorage | Favori filmleri tarayıcıda saklama |
| Hash Routing | SPA navigasyonu (#home, #movies, #favorites) |
| Google Fonts | Poppins font ailesi |

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🎯 Proje Gereksinimleri Karşılama Durumu

### ✅ HTML5 & CSS3
- [x] Anlamsal HTML kullanımı
- [x] Duyarlı Tasarım (Media Queries)
- [x] CSS Flexbox ve Grid

### ✅ Modern JavaScript (ES6+)
- [x] `const` ve `let` kullanımı
- [x] Arrow Functions
- [x] `async/await` ve Promise

### ✅ Asenkron JavaScript
- [x] `fetch()` API kullanımı
- [x] JSON verisi işleme ve DOM'a basma

### ✅ Veri Yönetimi
- [x] localStorage kullanımı
- [x] Yerel JSON dosyası ile veri yönetimi

### ✅ SPA İşlevleri
- [x] Dinamik sayfa yükleme (hash-based routing)
- [x] Modal ile detay gösterimi (ayrı HTML sayfası yok)
- [x] Arama ve filtreleme
- [x] Favoriler sistemi

## 🌐 GitHub Pages Deployment

Proje, GitHub Pages üzerinden canlı olarak yayınlanmıştır:

**Canlı Demo**: [GitHub Pages URL buraya eklenecek]

### Deployment Adımları

1. GitHub'da repository oluşturun
2. Settings > Pages bölümüne gidin
3. Source: "Deploy from a branch" seçin
4. Branch: "main" ve root "/" seçin
5. Save butonuna tıklayın
6. Birkaç dakika içinde siteniz yayınlanacaktır

## 📊 Veri Yapısı (movies.json)

```json
{
  "id": 1,
  "title": "Film Adı",
  "year": 2024,
  "genre": "Kategori",
  "rating": 8.5,
  "duration": "120 dk",
  "director": "Yönetmen",
  "cast": "Oyuncular",
  "description": "Film açıklaması",
  "poster": "Poster URL",
  "backdrop": "Backdrop URL"
}
```

## 🎓 Öğrenim Çıktıları

Bu proje ile kazanılan beceriler:

- ✅ Semantic HTML5 yapısı oluşturma
- ✅ Modern CSS teknikleri (Flexbox, Grid, Animations)
- ✅ Responsive web tasarımı
- ✅ JavaScript ile DOM manipülasyonu
- ✅ Asenkron programlama (Fetch API, async/await)
- ✅ SPA (Single Page Application) konsepti
- ✅ localStorage ile veri yönetimi
- ✅ Git version control ve GitHub kullanımı
- ✅ Modern web development best practices

## 👨‍💻 Geliştirici

- **Ad Soyad**: [Natnael Nigussu Tilahun]
- **Öğrenci No**: [B231200574]
- **Ders**: ISE-201 Web Teknolojileri
- **Yıl**: 2025

## 📝 Lisans

Bu proje eğitim amaçlıdır ve ISE-201 Web Teknolojileri dersi için geliştirilmiştir.

## 🙏 Teşekkürler

Bu projeyi geliştirirken kullanılan kaynaklar:

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Unsplash](https://unsplash.com/) - Görsel içerikler için

---

**Not**: Proje tamamen statik HTML, CSS ve JavaScript kullanılarak geliştirilmiştir. Sunucu taraflı bir teknoloji (PHP, Node.js, vb.) kullanılmamıştır.

