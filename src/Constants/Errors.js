const IyziPaymentErrors = {
    // 3d payment oluşturulurken dönen kodlar
    6001: "Ödeme bilgileri güvenlik denetimini geçemedi",
    5099: "3D Secure işlemi oluşturulurken hata oluştu",
    5115: "Bu ödemenin durumu 3dsecure için geçerli değil",
    // 3d secure hataları
    0: "3-D Secure imzası geçersiz",
    1: "Hatalı kod girildi",
    2: "Kart sahibi veya bankası sisteme kayıtlı değil",
    3: "Kartın bankası sisteme kayıtlı değil",
    4: "Doğrulama denemesi, kart sahibi sisteme daha sonra kayıt olmayı seçmiş",
    5: "Doğrulama yapılamıyor",
    6: "3-D Secure hatası",
    7: "Sistem hatası",
    8: "Bilinmeyen kart no",

    // 3d  Ödemeden dönen kodlar
    10051: "Kart limiti yetersiz",
    10005: "İşlem onaylanmadı",
    10012: "Geçersiz işlem",
    10041: "Kayıp kart, karta el koyunuz",
    10043: "Çalıntı kart, karta el koyunuz",
    10054: "Katrınızın vadesi dolmuştur",
    10084: "CVC2 bilgisi hatalı",
    10057: "Kart sahibi bu işlemi yapamaz. Detaylar için bankanızla iletişime geçin.",
    10058: "Terminalin bu işlemi yapmaya yetkisi yok",
    10034: "Dolandırıcılık şüphesi",
    10093: "Kartınız e-ticaret işlemlerine kapalıdır.Bankanızla iletişime geçin",
    10201: "Bankanız bu kart için işleme izin vermedi",
    10202: "Ödeme işlemi esnasında genel bir hata oluştu",
    10203: "Bu işlem önceden onaylanmış bulunmaktadır",
    10204: "Ödeme işlemi esnasında genel bir hata oluştu",
    10205: "E-posta geçerli formata değil",
    10206: "CVC uzunluğu geçersiz",
    10207: "Bankanızdan onay alınız",
    10208: "Üye işyeri kategori kodu hatalı",
    10209: "Kartınız bloke edilmiştir",
    10210: "Hatalı CAVV bilgisi",
    10211: "Hatalı ECI bilgisi",
    10212: "CVC2 yanlış girme deneme sayısı aşıldı",
    10213: "BIN bulunamadı",
    10214: "İletişim veya sistem hatası",
    10215: "Geçersiz kart numarası",
    10216: "Kartınız bağlı oldu banka bulunamadı",
    10217: "Banka kartları sadece 3D Secure işleminde kullanılabilir",
    10218: "Banka kartları ile taksit yapılamaz",
    10219: "Bankaya gönderilen istek zaman aşımına uğradı",
    10220: "Ödeme alınamadı",
    10221: "Terminal yurtdışı kartlara kapalı",
    10222: "Terminal taksitli işleme kapalı",
    10223: "İşlem gün sonu yapılmalı",
    10224: "Para çekme limiti aşılmış",
    10225: "Kısıtlı kart",
    10226: "İzin verilen PIN giriş sayısı aşılmış",
    10227: "Geçersiz PIN",
    10228: "Banka veya terminal işlem yapamıyor",
    10229: "Son kullanma tarihi geçersiz",
    10230: "İstek bankadan hata aldı",
    10231: "Satış tutarı ödül puanından düşük olamaz",
    10232: "Geçersiz tutar",
    10233: "Geçersiz kart tipi",
    10234: "Yetersiz ödül puanı",
    10235: "American Express kart hatası",
    10236: "Ödeme işlemi esnasında genel bir hata oluştu",
}
export default IyziPaymentErrors;