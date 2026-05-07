export async function getVacationDecision(userInput) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Gemini API anahtarı bulunamadı. Lütfen .env dosyanızı kontrol edin.");
  }

  const prompt = "Sen bir Seyahat/Tatil Karar Motorusun.\n" +
"Amacın: Kullanıcıdan aldığın dinamik destinasyon ve rota bilgilerini; belirtilen bütçe, lokasyon ve aktivite kriterlerine göre analiz ederek bir artı-eksi tablosu oluşturman ve nihai bir öneride bulunman.\n" +
"Kullanıcı sana farklı tatil konseptleri için çeşitli seçenekler sunabilir. Görevin, tüm bu seçenekler arasından kullanıcının bütçe ve beklentilerine göre en optimize olan rotayı seçmek ve önermektir.\n" +
"Destinasyonları/rotaları bütçe uyumluluğu, lokasyon avantajı ve aktivite çeşitliliği bazında (1-10 arası) puanla.\n" +
"Seçilen nihai rotaya dair kararını mantıklı, kriterlere dayalı gerekçelerle detaylı olarak destekle.\n\n" +
"Kullanıcı Girdileri:\n" +
"- Bütçe: " + userInput.budget + "\n" +
"- Gidilecek Ay/Dönem: " + userInput.month + "\n" +
"- Kişi Sayısı: " + userInput.peopleCount + "\n" +
"- Aktivite Tercihleri: " + userInput.activities + "\n" +
"- Alternatif Rotalar: " + userInput.routes + "\n\n" +
"Lütfen analizini SADECE JSON formatında döndür. JSON Şeması:\n" +
"{\n" +
"  \"rotalar\": [\n" +
"    {\n" +
"      \"isim\": \"Rota İsmi\",\n" +
"      \"puanlar\": {\n" +
"        \"butce\": 8,\n" +
"        \"lokasyon\": 9,\n" +
"        \"aktivite\": 7\n" +
"      },\n" +
"      \"artilar\": [\"artı 1\", \"artı 2\"],\n" +
"      \"eksiler\": [\"eksi 1\", \"eksi 2\"]\n" +
"    }\n" +
"  ],\n" +
"  \"nihai_karar\": {\n" +
"    \"secilen_rota\": \"Seçilen Rota İsmi\",\n" +
"    \"gerekce\": \"Seçim gerekçesinin detaylı açıklaması.\"\n" +
"  }\n" +
"}";

  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API isteği başarısız oldu.");
    }

    const data = await response.json();
    const textResult = data.candidates[0].content.parts[0].text;
    
    return JSON.parse(textResult);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
