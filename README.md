# 🏖️ Tatil Karar Motoru (AI Travel Decision Engine)

Yapay zeka destekli bu web uygulaması, kullanıcıların tatil rotalarını bütçe, lokasyon ve aktivite beklentilerine göre analiz eder. Aday rotalar arasından en mantıklı kararı vererek artı ve eksi yönleriyle birlikte kullanıcıya sunar.

![Uygulama Görünümü](https://img.shields.io/badge/UI-Glassmorphism-0077B6?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 🎯 Projenin Amacı
İnsanların tatil planlarken yaşadığı "nereye gitsek?" kararsızlığını ortadan kaldırmayı hedefler. Kullanıcı; elindeki bütçeyi, gitmek istediği dönemi, kişi sayısını, yapmak istediği aktiviteleri ve aklındaki alternatif rotaları sisteme girer. Sistem, **Google Gemini AI** kullanarak bu verileri analiz eder ve her bir rota için 10 üzerinden puanlamalar (Bütçe Uyum, Lokasyon, Aktivite) yapar. En mantıklı seçeneği "Nihai Karar" olarak detaylı gerekçesiyle açıklar.

## ✨ Özellikler
- **🤖 Yapay Zeka Analizi:** Gemini 2.5 Flash modeli ile yapılandırılmış (structured) JSON çıktıları üreterek detaylı analiz.
- **🎨 Premium Tasarım:** Okyanus mavisi ve kum renklerinden oluşan, "Glassmorphism" (cam efekti) barındıran kullanıcı dostu arayüz.
- **📊 Puanlama & Karşılaştırma:** Alternatif rotalar için otomatik hesaplanan skor kartları, avantajlar (artılar) ve dezavantajlar (eksiler) tablosu.
- **⚡ Hızlı Altyapı:** Vite ve React ile oluşturulmuş anında tepki veren mimari.

## 🛠️ Kurulum ve Çalıştırma

Projeyi bilgisayarınızda yerel olarak çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın
```bash
git clone <repo-url>
cd bwai-tatil-secimi
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini (Environment Variables) Ayarlayın
Projenin kök dizininde (package.json'ın bulunduğu dizin) bir `.env` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:
```env
VITE_GEMINI_API_KEY=sizin_api_anahtariniz_buraya
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## 🚀 Geliştirme Aşamaları

1. **Planlama ve Altyapı Kurulumu:** 
   - Proje Vite (React şablonu) ile başlatıldı.
   - UI ikonları için `lucide-react` paketi projeye dahil edildi.
2. **Tasarım Sisteminin İnşası:** 
   - CSS değişkenleri kullanılarak `Ocean Blue` ve `Sand` renk paleti oluşturuldu.
   - Glassmorphism stiline sahip kartlar, input formları ve animasyonlar eklendi.
3. **Arayüz (UI) Geliştirimi:** 
   - Kullanıcı girdileri için (Bütçe, Ay/Dönem, Kişi Sayısı vb.) duyarlı (responsive) bir form hazırlandı.
   - Karar verildikten sonra sonuçları göstermek için Result Dashboard (Nihai karar kartı ve detaylı analiz kartları) tasarlandı.
4. **AI Entegrasyonu:** 
   - `gemini.js` servisi oluşturularak `fetch` API ile Google Gemini'a bağlantı kuruldu.
   - Sistemin doğru davranması için "Sistem Promptu" oluşturuldu ve yanıtların kesinlikle `application/json` formatında dönmesi (Structured Output) sağlandı.
5. **Test & Optimizasyon:** 
   - API yanıt gecikmeleri için modern bir yükleme ekranı (Loader) eklendi.
   - Hata yönetimi (API Key eksikliği veya ağ hataları) UI üzerinde kullanıcıya gösterilecek şekilde düzenlendi.

## 📜 Lisans
Bu proje açık kaynaklıdır ve MIT lisansı altında paylaşılmaktadır. İstediğiniz gibi kullanabilir ve geliştirebilirsiniz.
