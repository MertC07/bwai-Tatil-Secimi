import { useState } from 'react';
import { Palmtree, Map, PlaneTakeoff, Compass, Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { getVacationDecision } from './gemini';

function App() {
  const [formData, setFormData] = useState({
    budget: '',
    month: '',
    peopleCount: '2',
    activities: '',
    routes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.budget || !formData.routes) {
      setError("Lütfen en azından bütçe ve rota seçeneklerini doldurun.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const decision = await getVacationDecision(formData);
      setResult(decision);
    } catch (err) {
      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Palmtree size={64} color="var(--ocean-base)" className="animate-pulse" />
        </div>
        <h1>Tatil Karar Motoru</h1>
        <p>Bütçenizi, beklentilerinizi ve alternatif rotalarınızı girin, yapay zeka sizin için en mükemmel tatili seçsin.</p>
      </header>

      {!result && !loading && (
        <form className="glass-card animate-fade-in" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Toplam Bütçe</label>
              <input
                type="text"
                name="budget"
                className="form-input"
                placeholder="Örn: 50.000 TL veya 2.000$"
                value={formData.budget}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Gidilecek Ay / Dönem</label>
              <input
                type="text"
                name="month"
                className="form-input"
                placeholder="Örn: Ağustos sonu, Kurban Bayramı"
                value={formData.month}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kişi Sayısı</label>
              <select 
                name="peopleCount" 
                className="form-select"
                value={formData.peopleCount}
                onChange={handleInputChange}
              >
                <option value="1">1 Kişi (Solo)</option>
                <option value="2">2 Kişi (Çift)</option>
                <option value="3">3 Kişi</option>
                <option value="4">4 Kişi</option>
                <option value="5+">5+ Kişi (Grup/Aile)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Aktivite Tercihleri</label>
              <input
                type="text"
                name="activities"
                className="form-input"
                placeholder="Örn: Deniz kum güneş, tarihi yerler, kamp, doğa yürüyüşü..."
                value={formData.activities}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Aklınızdaki Alternatif Rotalar</label>
            <textarea
              name="routes"
              className="form-input"
              rows="3"
              placeholder="Örn: 1. Seçenek Fethiye (Ölüdeniz), 2. Seçenek Kaş, 3. Seçenek Karadağ (Budva)"
              value={formData.routes}
              onChange={handleInputChange}
              required
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          {error && (
            <div className="form-group" style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Sparkles size={20} />
              En İyi Rotayı Analiz Et
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="loader-container animate-fade-in">
          <Compass className="loader-icon animate-spin" />
          <p className="loader-text">Rotalar analiz ediliyor, bütçeler hesaplanıyor...</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          {/* Winner Card */}
          <div className="glass-card winner-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <PlaneTakeoff size={48} color="var(--sand-base)" />
            </div>
            <label className="form-label">NİHAİ KARAR</label>
            <h2>{result.nihai_karar.secilen_rota}</h2>
            <div className="winner-reason">
              {result.nihai_karar.gerekce}
            </div>
          </div>

          <h3 style={{ marginBottom: '1.5rem', color: 'var(--ocean-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Map size={24} />
            Rota Analizleri & Karşılaştırma
          </h3>
          
          <div className="grid grid-cols-2">
            {result.rotalar.map((rota, index) => (
              <div key={index} className="glass-card">
                <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--ocean-dark)', borderBottom: '2px solid var(--ocean-pale)', paddingBottom: '0.5rem' }}>
                  {rota.isim}
                </h4>
                
                <div className="tags" style={{ marginBottom: '1.5rem' }}>
                  <span className="tag tag-score">Bütçe Uyum: {rota.puanlar.butce}/10</span>
                  <span className="tag tag-score">Lokasyon: {rota.puanlar.lokasyon}/10</span>
                  <span className="tag tag-score">Aktivite: {rota.puanlar.aktivite}/10</span>
                </div>

                <div className="grid" style={{ gap: '1rem', gridTemplateColumns: '1fr' }}>
                  <div>
                    <h5 style={{ color: '#065f46', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={16} /> Avantajlar
                    </h5>
                    <ul className="pros-list">
                      {rota.artilar.map((arti, i) => (
                        <li key={i}>{arti}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: '#991b1b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <AlertCircle size={16} /> Dezavantajlar
                    </h5>
                    <ul className="cons-list">
                      {rota.eksiler.map((eksi, i) => (
                        <li key={i}>{eksi}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-secondary" onClick={() => setResult(null)}>
              Yeni Bir Karar Başlat
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
