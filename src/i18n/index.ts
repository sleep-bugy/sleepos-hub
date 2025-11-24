import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        features: "Features",
        download: "Download",
        team: "Team",
        about: "About",
        login: "Login"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "Experience Android like never before",
          description: "Custom ROM flavors crafted for performance, stability, and elegance",
          cta: "Download Now"
        },
        brands: {
          title: "Device Brands",
          xiaomi: "Xiaomi",
          xiaomiDesc: "Discover custom ROMs for Xiaomi devices",
          poco: "POCO",
          pocoDesc: "Custom ROMs specially optimized for POCO devices",
          redmi: "Redmi",
          redmiDesc: "Enhanced ROMs for Redmi series devices"
        },
        flavors: {
          title: "Choose Your Flavor",
          sleepos: "SleepOS",
          sleeposDesc: "HyperOS-based with enhanced features",
          aosp: "AOSP",
          aospDesc: "Pure Android experience",
          port: "Port ROM",
          portDesc: "Ported features from flagship devices"
        }
      },
      features: {
        title: "Features",
        subtitle: "Discover what makes Project Sleep special",
        description: "Experience the best of Android with our carefully crafted features designed to enhance your daily usage.",
        battery: {
          title: "Battery Optimization",
          description: "Advanced battery management for all-day usage"
        },
        performance: {
          title: "Performance Tuning",
          description: "Optimized kernel and system for peak performance"
        },
        security: {
          title: "Privacy & Security",
          description: "Enhanced security features and privacy controls"
        },
        customization: {
          title: "Customization",
          description: "Extensive theming and customization options"
        },
        ui: {
          title: "Modern UI",
          description: "Clean, intuitive interface with smooth animations"
        },
        connectivity: {
          title: "Connectivity",
          description: "Improved WiFi and Bluetooth stability"
        },
        difference: {
          title: "What Makes Us Different",
          updates: {
            title: "Regular Updates",
            description: "We provide frequent updates with the latest security patches and features to keep your device secure and up-to-date."
          },
          community: {
            title: "Active Community",
            description: "Join thousands of users in our Discord and Telegram communities for support, tips, and ROM development discussions."
          },
          opensource: {
            title: "Open Source",
            description: "Our ROMs are built on open-source foundations, ensuring transparency and community collaboration."
          },
          devicesupport: {
            title: "Device Support",
            description: "We support a wide range of devices from various manufacturers, ensuring more users can experience Project Sleep."
          }
        }
      },
      download: {
        title: "Download ROMs",
        search: "Search devices or ROMs...",
        allBrands: "All Brands",
        xiaomi: "Xiaomi",
        poco: "POCO",
        redmi: "Redmi",
        noRomsForType: "No {{romType}} ROMs available for this device",
        filter: {
          all: "All",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "Newest",
          popular: "Most Downloaded",
          name: "Name"
        },
        version: "Version",
        downloads: "Downloads",
        changelog: "Changelog",
        notes: "Notes",
        download: "Download",
        checksum: "Checksum",
        fileSize: "File Size",
        uploadDate: "Upload Date",
        type: "Type",
        roms: {
          available: "{{count}} ROMs available"
        }
      },
      team: {
        title: "Our Team",
        subtitle: "Meet the people behind Project Sleep",
        apply: {
          title: "Join Our Team",
          name: "Full Name",
          email: "Email Address",
          portfolio: "GitHub / Portfolio URL",
          role: "Role Applying For",
          message: "Why do you want to join?",
          cv: "Attach CV (Optional)",
          submit: "Submit Application",
          success: "Application submitted successfully!",
          error: "Failed to submit application"
        }
      },
      about: {
        title: "About Project Sleep",
        mission: "Our Mission",
        missionText: "To deliver the best custom Android experience with stability, performance, and features that matter.",
        description: "Project Sleep was born from a passion for Android customization and a desire to create ROMs that prioritize user experience, stability, and performance. We believe that everyone deserves access to high-quality custom ROMs that enhance their device rather than compromise it.",
        community: {
          title: "Join Our Community",
          description: "Join thousands of users in our vibrant community. Get support, share your experiences, and connect with fellow Project Sleep enthusiasts."
        },
        discord: "Join Discord",
        telegram: "Join Telegram",
        values: {
          community: {
            title: "Community First",
            description: "Built by the community, for the community"
          },
          opensource: {
            title: "Open Source",
            description: "Transparent development and collaboration"
          },
          quality: {
            title: "Quality Code",
            description: "Clean, maintainable, and well-tested"
          },
          performance: {
            title: "Performance",
            description: "Optimized for speed and efficiency"
          }
        }
      },
      auth: {
        login: "Login",
        logout: "Logout",
        email: "Email",
        password: "Password",
        adminOnly: "Admin Only",
        signIn: "Sign In"
      },
      theme: {
        light: "Light",
        dark: "Dark",
        toggle: "Toggle theme"
      },
      common: {
        loading: "Loading...",
        error: "Something went wrong",
        noResults: "No results found",
        viewMore: "View More",
        viewLess: "View Less"
      },
      deviceDownload: {
        title: "Download ROMs for {{device}}",
        description: "Select and download the ROM version that best fits your needs",
        noRoms: "No ROMs available for {{device}} at this time",
        deviceNotFound: "Device not found",
        downloads: "{{count}} downloads",
        changelog: "Changelog",
        noNotes: "No additional notes",
        download: "Download",
        details: "Details",
        backToDownload: "Back to Downloads",
        version: "Version",
        size: "Size",
        date: "Date"
      }
    }
  },
  id: {
    translation: {
      nav: {
        home: "Beranda",
        features: "Fitur",
        download: "Unduh",
        team: "Tim",
        about: "Tentang",
        login: "Masuk"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "Rasakan Android seperti tidak pernah sebelumnya",
          description: "ROM kustom yang dibuat untuk performa, stabilitas, dan keanggunan",
          cta: "Unduh Sekarang"
        },
        brands: {
          title: "Merek Perangkat",
          xiaomi: "Xiaomi",
          xiaomiDesc: "Temukan ROM kustom untuk perangkat Xiaomi",
          poco: "POCO",
          pocoDesc: "ROM kustom yang dioptimalkan khusus untuk perangkat POCO",
          redmi: "Redmi",
          redmiDesc: "ROM yang ditingkatkan untuk perangkat seri Redmi"
        },
        flavors: {
          title: "Pilih Versi Anda",
          sleepos: "SleepOS",
          sleeposDesc: "Berbasis HyperOS dengan fitur yang ditingkatkan",
          aosp: "AOSP",
          aospDesc: "Pengalaman Android murni",
          port: "Port ROM",
          portDesc: "Fitur yang diporting dari perangkat flagship"
        }
      },
      features: {
        title: "Fitur",
        subtitle: "Temukan apa yang membuat Project Sleep istimewa",
        description: "Alami Android terbaik dengan fitur-fitur terpilih kami yang dirancang untuk meningkatkan penggunaan harian Anda.",
        battery: {
          title: "Optimasi Baterai",
          description: "Manajemen baterai canggih untuk penggunaan sepanjang hari"
        },
        performance: {
          title: "Pengaturan Performa",
          description: "Kernel dan sistem yang dioptimalkan untuk performa puncak"
        },
        security: {
          title: "Privasi & Keamanan",
          description: "Fitur keamanan dan kontrol privasi yang ditingkatkan"
        },
        customization: {
          title: "Kustomisasi",
          description: "Opsi tema dan kustomisasi yang luas"
        },
        ui: {
          title: "UI Modern",
          description: "Interface yang bersih dan intuitif dengan animasi yang halus"
        },
        connectivity: {
          title: "Konektivitas",
          description: "Stabilitas WiFi dan Bluetooth yang ditingkatkan"
        },
        difference: {
          title: "Apa yang Membuat Kami Berbeda",
          updates: {
            title: "Pembaruan Reguler",
            description: "Kami menyediakan pembaruan berkala dengan patch keamanan dan fitur terbaru agar perangkat Anda tetap aman dan mutakhir."
          },
          community: {
            title: "Komunitas Aktif",
            description: "Bergabunglah dengan ribuan pengguna di komunitas Discord dan Telegram kami untuk dukungan, tips, dan diskusi pengembangan ROM."
          },
          opensource: {
            title: "Sumber Terbuka",
            description: "ROM kami dibangun di atas fondasi sumber terbuka, memastikan transparansi dan kolaborasi komunitas."
          },
          devicesupport: {
            title: "Dukungan Perangkat",
            description: "Kami mendukung berbagai perangkat dari berbagai produsen, memastikan lebih banyak pengguna dapat merasakan Project Sleep."
          }
        }
      },
      download: {
        title: "Unduh ROM",
        search: "Cari perangkat atau ROM...",
        allBrands: "Semua Merek",
        xiaomi: "Xiaomi",
        poco: "POCO",
        redmi: "Redmi",
        noRomsForType: "Tidak ada ROM {{romType}} tersedia untuk perangkat ini",
        filter: {
          all: "Semua",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "Terbaru",
          popular: "Paling Banyak Diunduh",
          name: "Nama"
        },
        version: "Versi",
        downloads: "Unduhan",
        changelog: "Catatan Perubahan",
        notes: "Catatan",
        download: "Unduh",
        checksum: "Checksum",
        fileSize: "Ukuran File",
        uploadDate: "Tanggal Unggah",
        type: "Jenis",
        roms: {
          available: "{{count}} ROM Tersedia"
        }
      },
      team: {
        title: "Tim Kami",
        subtitle: "Kenali orang-orang di balik Project Sleep",
        apply: {
          title: "Bergabung dengan Tim Kami",
          name: "Nama Lengkap",
          email: "Alamat Email",
          portfolio: "URL GitHub / Portofolio",
          role: "Peran yang Diajukan",
          message: "Mengapa Anda ingin bergabung?",
          cv: "Lampirkan CV (Opsional)",
          submit: "Kirim Aplikasi",
          success: "Aplikasi berhasil dikirim!",
          error: "Gagal mengirim aplikasi"
        }
      },
      about: {
        title: "Tentang Project Sleep",
        mission: "Misi Kami",
        missionText: "Untuk memberikan pengalaman Android kustom terbaik dengan stabilitas, kinerja, dan fitur yang penting.",
        description: "Project Sleep lahir dari hasrat akan kustomisasi Android dan keinginan untuk membuat ROM yang mengutamakan pengalaman pengguna, stabilitas, dan kinerja. Kami percaya bahwa semua orang layak mendapatkan ROM kustom berkualitas tinggi yang meningkatkan perangkat mereka daripada merusaknya.",
        community: {
          title: "Bergabunglah dengan Komunitas Kami",
          description: "Bergabunglah dengan ribuan pengguna di komunitas kami yang aktif. Dapatkan dukungan, berbagi pengalaman, dan terhubung dengan sesama penggemar Project Sleep."
        },
        discord: "Bergabung Discord",
        telegram: "Bergabung Telegram",
        values: {
          community: {
            title: "Utamakan Komunitas",
            description: "Dibangun oleh komunitas, untuk komunitas"
          },
          opensource: {
            title: "Sumber Terbuka",
            description: "Pengembangan transparan dan kolaborasi"
          },
          quality: {
            title: "Kode Berkualitas",
            description: "Kode bersih, mudah dipelihara, dan teruji dengan baik"
          },
          performance: {
            title: "Kinerja",
            description: "Dioptimalkan untuk kecepatan dan efisiensi"
          }
        }
      },
      auth: {
        login: "Masuk",
        logout: "Keluar",
        email: "Email",
        password: "Sandi",
        adminOnly: "Hanya Admin",
        signIn: "Masuk"
      },
      theme: {
        light: "Terang",
        dark: "Gelap",
        toggle: "Ganti tema"
      },
      common: {
        loading: "Memuat...",
        error: "Terjadi kesalahan",
        noResults: "Tidak ada hasil ditemukan",
        viewMore: "Lihat Lebih Banyak",
        viewLess: "Lihat Lebih Sedikit"
      },
      deviceDownload: {
        title: "Unduh ROM untuk {{device}}",
        description: "Pilih dan unduh versi ROM yang paling sesuai dengan kebutuhan Anda",
        noRoms: "Tidak ada ROM yang tersedia untuk {{device}} saat ini",
        deviceNotFound: "Perangkat tidak ditemukan",
        downloads: "{{count}} unduhan",
        changelog: "Catatan Perubahan",
        noNotes: "Tidak ada catatan tambahan",
        download: "Unduh",
        details: "Detail",
        backToDownload: "Kembali ke Unduhan",
        version: "Versi",
        size: "Ukuran",
        date: "Tanggal"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        features: "विशेषताएँ",
        download: "डाउनलोड",
        team: "टीम",
        about: "परिचय",
        login: "लॉगिन"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "एंड्रॉइड का अनुभव अभूतपूर्व तरीके से करें",
          description: "प्रदर्शन, स्थिरता और सुंदरता के लिए निर्मित कस्टम रॉम",
          cta: "अब डाउनलोड करें"
        },
        flavors: {
          title: "अपना स्वाद चुनें",
          sleepos: "SleepOS",
          sleeposDesc: "हाइपर ओएस पर आधारित सुधारित सुविधाओं के साथ",
          aosp: "AOSP",
          aospDesc: "शुद्ध एंड्रॉइड अनुभव",
          port: "पोर्ट रॉम",
          portDesc: "फ्लैगशिप उपकरणों से सुविधाएँ पोर्ट की गई"
        }
      },
      features: {
        title: "विशेषताएँ",
        subtitle: "जानें कि प्रोजेक्ट स्लीप को खास क्या बनाता है",
        description: "अपने दैनिक उपयोग को बेहतर बनाने के लिए हमारे ध्यानपूर्वक तैयार किए गए फीचर्स के साथ एंड्रॉइड का सर्वोत्तम अनुभव प्राप्त करें।",
        battery: {
          title: "बैटरी अनुकूलन",
          description: "पूरे दिन के उपयोग के लिए उन्नत बैटरी प्रबंधन"
        },
        performance: {
          title: "प्रदर्शन ट्यूनिंग",
          description: "शीर्ष प्रदर्शन के लिए अनुकूलित कर्नेल और सिस्टम"
        },
        security: {
          title: "गोपनीयता और सुरक्षा",
          description: "उन्नत सुरक्षा विशेषताएँ और गोपनीयता नियंत्रण"
        },
        customization: {
          title: "अनुकूलन",
          description: "विस्तृत थीमिंग और अनुकूलन विकल्प"
        },
        ui: {
          title: "आधुनिक UI",
          description: "चिकने एनिमेशन के साथ साफ, बुद्धिमान इंटरफेस"
        },
        connectivity: {
          title: "कनेक्टिविटी",
          description: "WiFi और ब्लूटूथ स्थिरता में सुधार"
        },
        difference: {
          title: "हमें अलग क्या बनाता है",
          updates: {
            title: "नियमित अपडेट",
            description: "हम नवीनतम सुरक्षा पैच और सुविधाओं के साथ नियमित अपडेट प्रदान करते हैं ताकि आपका उपकरण सुरक्षित और अद्यतन रहे।"
          },
          community: {
            title: "सक्रिय समुदाय",
            description: "समर्थन, युक्तियों और रोम विकास चर्चाओं के लिए हमारे डिस्कॉर्ड और टेलीग्राम समुदायों में हजारों उपयोगकर्ताओं में शामिल हों।"
          },
          opensource: {
            title: "ओपन सोर्स",
            description: "हमारे रोम ओपन-सोर्स आधार पर बनाए गए हैं, जो पारदर्शिता और सामुदायिक सहयोग सुनिश्चित करते हैं।"
          },
          devicesupport: {
            title: "उपकरण समर्थन",
            description: "हम विभिन्न निर्माताओं की एक विस्तृत श्रृंखला का समर्थन करते हैं, जिससे अधिक उपयोगकर्ता प्रोजेक्ट स्लीप का अनुभव कर सकते हैं।"
          }
        }
      },
      download: {
        title: "रॉम डाउनलोड करें",
        search: "उपकरण या रॉम खोजें...",
        filter: {
          all: "सभी",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "पोर्ट"
        },
        sort: {
          newest: "नवीनतम",
          popular: "सर्वाधिक डाउनलोड किया गया",
          name: "नाम"
        },
        version: "संस्करण",
        downloads: "डाउनलोड",
        changelog: "परिवर्तन सूची",
        notes: "नोट्स",
        download: "डाउनलोड",
        checksum: "चेकसम",
        fileSize: "फ़ाइल का आकार",
        uploadDate: "अपलोड की तारीख",
        type: "प्रकार",
        roms: {
          available: "{{count}} ROMs उपलब्ध"
        }
      },
      team: {
        title: "हमारी टीम",
        subtitle: "प्रोजेक्ट स्लीप के पीछे के लोग जानें",
        apply: {
          title: "हमारी टीम में शामिल हों",
          name: "पूरा नाम",
          email: "ईमेल पता",
          portfolio: "GitHub / पोर्टफोलियो यूआरएल",
          role: "भूमिका जिसके लिए आवेदन कर रहे हैं",
          message: "आप प्रोजेक्ट में क्यों शामिल होना चाहते हैं?",
          cv: "सीवी अटैच करें (वैकल्पिक)",
          submit: "आवेदन जमा करें",
          success: "आवेदन सफलतापूर्वक जमा किया गया!",
          error: "आवेदन जमा करने में विफल"
        }
      },
      about: {
        title: "प्रोजेक्ट स्लीप के बारे में",
        mission: "हमारा मिशन",
        missionText: "स्थिरता, प्रदर्शन और उपयोगी सुविधाओं के साथ सर्वोत्तम कस्टम एंड्रॉइड अनुभव प्रदान करने के लिए।",
        description: "प्रोजेक्ट स्लीप को एंड्रॉइड कस्टमाइज़ेशन के प्रति शौक और उपयोगकर्ता अनुभव, स्थिरता और प्रदर्शन को प्राथमिकता देने वाले रोम बनाने की इच्छा से जन्म दिया गया था। हम मानते हैं कि हर किसी को उच्च-गुणवत्ता वाले कस्टम रोम तक पहुंच प्राप्त होनी चाहिए जो उपकरण को बेहतर बनाएं बजाय इसे नुकसान पहुंचाने के।",
        community: {
          title: "हमारे समुदाय में शामिल हों",
          description: "हमारे सक्रिय समुदाय में हजारों उपयोगकर्ताओं में शामिल हों। समर्थन प्राप्त करें, अपने अनुभव साझा करें, और प्रोजेक्ट स्लीप उत्साहियों से जुड़ें।"
        },
        discord: "Discord से जुड़ें",
        telegram: "Telegram से जुड़ें",
        values: {
          community: {
            title: "समुदाय प्रथम",
            description: "समुदाय द्वारा बनाया गया, समुदाय के लिए"
          },
          opensource: {
            title: "ओपन सोर्स",
            description: "पारदर्शक विकास और सहयोग"
          },
          quality: {
            title: "गुणवत्ता संहिता",
            description: "साफ, बनाए रखने योग्य और अच्छी तरह से परीक्षण किया गया"
          },
          performance: {
            title: "प्रदर्शन",
            description: "गति और दक्षता के लिए अनुकूलित"
          }
        }
      },
      auth: {
        login: "लॉगिन",
        logout: "लॉगआउट",
        email: "ईमेल",
        password: "पासवर्ड",
        adminOnly: "केवल व्यवस्थापक",
        signIn: "साइन इन करें"
      },
      theme: {
        light: "हल्का",
        dark: "गहरा",
        toggle: "थीम टॉगल करें"
      },
      common: {
        loading: "लोड हो रहा है...",
        error: "कुछ गलत हो गया",
        noResults: "कोई परिणाम नहीं मिला",
        viewMore: "और देखें",
        viewLess: "कम देखें"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        features: "Функции",
        download: "Скачать",
        team: "Команда",
        about: "О нас",
        login: "Войти"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "Испытайте Android по-новому",
          description: "Пользовательские ROM, созданные для производительности, стабильности и элегантности",
          cta: "Скачать сейчас"
        },
        flavors: {
          title: "Выберите свой стиль",
          sleepos: "SleepOS",
          sleeposDesc: "На базе HyperOS с улучшенными функциями",
          aosp: "AOSP",
          aospDesc: "Чистый Android опыт",
          port: "Port ROM",
          portDesc: "Функции, портированные с флагманских устройств"
        }
      },
      features: {
        title: "Функции",
        subtitle: "Узнайте, что делает Project Sleep особенным",
        description: "Получите лучший опыт работы с Android с помощью наших тщательно разработанных функций, созданных для улучшения вашего ежедневного использования.",
        battery: {
          title: "Оптимизация батареи",
          description: "Расширенное управление батареей для использования в течение всего дня"
        },
        performance: {
          title: "Настройка производительности",
          description: "Оптимизированное ядро и система для максимальной производительности"
        },
        security: {
          title: "Конфиденциальность и безопасность",
          description: "Расширенные функции безопасности и управления конфиденциальностью"
        },
        customization: {
          title: "Настройка",
          description: "Обширные возможности тематизации и настройки"
        },
        ui: {
          title: "Современный интерфейс",
          description: "Чистый, интуитивно понятный интерфейс с плавной анимацией"
        },
        connectivity: {
          title: "Подключение",
          description: "Улучшенная стабильность Wi-Fi и Bluetooth"
        },
        difference: {
          title: "Что делает нас особенными",
          updates: {
            title: "Регулярные обновления",
            description: "Мы предоставляем частые обновления с последними исправлениями безопасности и функциями, чтобы ваше устройство оставалось в безопасности и актуальным."
          },
          community: {
            title: "Активное сообщество",
            description: "Присоединяйтесь к тысячам пользователей в наших сообществах Discord и Telegram для поддержки, советов и обсуждения разработки ROM."
          },
          opensource: {
            title: "Открытый исходный код",
            description: "Наши ROM построены на основе открытого кода, обеспечивая прозрачность и совместную работу сообщества."
          },
          devicesupport: {
            title: "Поддержка устройств",
            description: "Мы поддерживаем широкий спектр устройств от различных производителей, чтобы больше пользователей могли оценить Project Sleep."
          }
        }
      },
      download: {
        title: "Скачать ROM",
        search: "Поиск устройств или ROM...",
        filter: {
          all: "Все",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "Новинки",
          popular: "Самые скачиваемые",
          name: "Название"
        },
        version: "Версия",
        downloads: "Загрузки",
        changelog: "Изменения",
        notes: "Примечания",
        download: "Скачать",
        checksum: "Контрольная сумма",
        fileSize: "Размер файла",
        uploadDate: "Дата загрузки",
        type: "Тип",
        roms: {
          available: "{{count}} ROM Доступно"
        }
      },
      team: {
        title: "Наша команда",
        subtitle: "Познакомьтесь с людьми за Project Sleep",
        apply: {
          title: "Присоединиться к нашей команде",
          name: "Полное имя",
          email: "Адрес электронной почты",
          portfolio: "GitHub / URL портфолио",
          role: "Роль, на которую подаете",
          message: "Почему вы хотите присоединиться?",
          cv: "Прикрепить резюме (по желанию)",
          submit: "Отправить заявку",
          success: "Заявка успешно отправлена!",
          error: "Не удалось отправить заявку"
        }
      },
      about: {
        title: "О Project Sleep",
        mission: "Наша миссия",
        missionText: "Предоставить лучший пользовательский Android опыт со стабильностью, производительностью и важными функциями.",
        description: "Project Sleep родился из страсти к настройке Android и желания создавать ROM, в которых приоритет отдается пользовательскому опыту, стабильности и производительности. Мы считаем, что каждый заслуживает доступа к высококачественным пользовательским ROM, которые улучшают ваше устройство, а не ухудшают его.",
        community: {
          title: "Присоединяйтесь к нашему сообществу",
          description: "Присоединяйтесь к тысячам пользователей в нашем оживленном сообществе. Получите поддержку, делитесь впечатлениями и общайтесь с единомышленниками Project Sleep."
        },
        discord: "Присоединиться к Discord",
        telegram: "Присоединиться к Telegram",
        values: {
          community: {
            title: "Сообщество превыше всего",
            description: "Создано сообществом, для сообщества"
          },
          opensource: {
            title: "Открытый исходный код",
            description: "Прозрачная разработка и сотрудничество"
          },
          quality: {
            title: "Качественный код",
            description: "Чистый, удобный для сопровождения и хорошо протестированный"
          },
          performance: {
            title: "Производительность",
            description: "Оптимизировано для скорости и эффективности"
          }
        }
      },
      auth: {
        login: "Войти",
        logout: "Выйти",
        email: "Электронная почта",
        password: "Пароль",
        adminOnly: "Только администратор",
        signIn: "Войти"
      },
      theme: {
        light: "Светлая",
        dark: "Темная",
        toggle: "Переключить тему"
      },
      common: {
        loading: "Загрузка...",
        error: "Что-то пошло не так",
        noResults: "Результатов не найдено",
        viewMore: "Посмотреть больше",
        viewLess: "Показать меньше"
      }
    }
  },
  th: {
    translation: {
      nav: {
        home: "หน้าแรก",
        features: "คุณสมบัติ",
        download: "ดาวน์โหลด",
        team: "ทีม",
        about: "เกี่ยวกับ",
        login: "เข้าสู่ระบบ"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "สัมผัสประสบการณ์แอนดรอยด์ที่คุณไม่เคยมีมาก่อน",
          description: "ระบบ ROM ที่ออกแบบมาเพื่อประสิทธิภาพ ความเสถียร และความล้ำสมัย",
          cta: "ดาวน์โหลดเดี๋ยวนี้"
        },
        flavors: {
          title: "เลือกรสชาติของคุณ",
          sleepos: "SleepOS",
          sleeposDesc: "ใช้ฐาน HyperOS พร้อมคุณสมบัติที่ปรับปรุงแล้ว",
          aosp: "AOSP",
          aospDesc: "ประสบการณ์แอนดรอยด์บริสุทธิ์",
          port: "Port ROM",
          portDesc: "คุณสมบัติที่นำเข้าจากอุปกรณ์เรือธง"
        }
      },
      features: {
        title: "คุณสมบัติ",
        subtitle: "ค้นพบว่าอะไรทำให้ Project Sleep พิเศษ",
        description: "สัมผัสประสบการณ์ Android ที่ดีที่สุดกับคุณสมบัติที่เราคัดสรรมาอย่างพิถีพิถันซึ่งออกแบบมาเพื่อปรับปรุงการใช้งานประจำวันของคุณ",
        battery: {
          title: "การปรับแต่งแบตเตอรี่",
          description: "การจัดการแบตเตอรี่ขั้นสูงสำหรับการใช้งานตลอดทั้งวัน"
        },
        performance: {
          title: "การปรับแต่งประสิทธิภาพ",
          description: "เคอร์เนลและระบบแบบได้รับการปรับให้เหมาะสมสำหรับประสิทธิภาพสูงสุด"
        },
        security: {
          title: "ความเป็นส่วนตัวและความปลอดภัย",
          description: "คุณสมบัติด้านความปลอดภัยและการควบคุมความเป็นส่วนตัวที่เพิ่มขึ้น"
        },
        customization: {
          title: "การปรับแต่ง",
          description: "ตัวเลือกการตกแต่งและการปรับแต่งอย่างกว้างขวาง"
        },
        ui: {
          title: "อินเตอร์เฟซสมัยใหม่",
          description: "อินเตอร์เฟซที่สะอาดและใช้งานง่ายพร้อมภาพเคลื่อนไหวที่ลื่นไหล"
        },
        connectivity: {
          title: "การเชื่อมต่อ",
          description: "ปรับปรุงความเสถียรของ WiFi และ Bluetooth"
        },
        difference: {
          title: "สิ่งที่ทำให้เราแตกต่าง",
          updates: {
            title: "อัปเดตสม่ำเสมอ",
            description: "เราให้การอัปเดตอย่างสม่ำเสมอพร้อมแพตช์ความปลอดภัยและคุณสมบัติล่าสุดเพื่อให้อุปกรณ์ของคุณปลอดภัยและทันสมัยอยู่เสมอ"
          },
          community: {
            title: "ชุมชนที่ใช้งานอยู่",
            description: "เข้าร่วมกับผู้ใช้หลายพันคนในชุมชน Discord และ Telegram ของเราสำหรับการสนับสนุน เทคนิค และการอภิปรายการพัฒนา ROM"
          },
          opensource: {
            title: "โอเพ่นซอร์ส",
            description: "ROM ของเราสร้างขึ้นบนรากฐานโอเพ่นซอร์ส เพื่อให้มั่นใจถึงความโปร่งใสและการทำงานร่วมกันของชุมชน"
          },
          devicesupport: {
            title: "การสนับสนุนอุปกรณ์",
            description: "เราสนับสนุนอุปกรณ์หลากหลายรุ่นจากผู้ผลิตต่างๆ ทำให้ผู้ใช้มากขึ้นสามารถสัมผัสประสบการณ์ Project Sleep ได้"
          }
        }
      },
      download: {
        title: "ดาวน์โหลด ROM",
        search: "ค้นหาอุปกรณ์หรือ ROM...",
        filter: {
          all: "ทั้งหมด",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "ใหม่ล่าสุด",
          popular: "ถูกดาวน์โหลดมากที่สุด",
          name: "ชื่อ"
        },
        version: "เวอร์ชัน",
        downloads: "จำนวนดาวน์โหลด",
        changelog: "บันทึกการเปลี่ยนแปลง",
        notes: "หมายเหตุ",
        download: "ดาวน์โหลด",
        checksum: "Checksum",
        fileSize: "ขนาดไฟล์",
        uploadDate: "วันที่อัปโหลด",
        type: "ประเภท",
        roms: {
          available: "{{count}} ROMs ที่มีอยู่"
        }
      },
      team: {
        title: "ทีมของเรา",
        subtitle: "พบกับผู้คนเบื้องหลัง Project Sleep",
        apply: {
          title: "เข้าร่วมทีมเรา",
          name: "ชื่อเต็ม",
          email: "ที่อยู่อีเมล",
          portfolio: "GitHub / ลิงก์ Portfolio",
          role: "ตำแหน่งที่ต้องการสมัคร",
          message: "ทำไมคุณถึงอยากเข้าร่วม?",
          cv: "แนบประวัติ (ไม่บังคับ)",
          submit: "ส่งใบสมัคร",
          success: "ส่งใบสมัครสำเร็จ!",
          error: "ไม่สามารถส่งใบสมัครได้"
        }
      },
      about: {
        title: "เกี่ยวกับ Project Sleep",
        mission: "ภารกิจของเรา",
        missionText: "เพื่อส่งมอบประสบการณ์ Android ที่ดีที่สุดด้วยความเสถียร ประสิทธิภาพ และคุณสมบัติที่สำคัญ",
        description: "Project Sleep เกิดขึ้นจากความหลงใหลในการปรับแต่งแอนดรอยด์และความต้องการสร้าง ROM ที่ให้ความสำคัญกับประสบการณ์ผู้ใช้ ความเสถียร และประสิทธิภาพ เราเชื่อว่าทุกคนควรได้รับสิทธิ์เข้าถึง ROM ที่มีคุณภาพสูงซึ่งช่วยเพิ่มประสิทธิภาพอุปกรณ์ของคุณแทนที่จะลดทอนมัน",
        community: {
          title: "เข้าร่วมชุมชนของเรา",
          description: "เข้าร่วมกับผู้ใช้หลายพันคนในชุมชนที่เต็มไปด้วยชีวิตชีวาของเรา รับการสนับสนุน แบ่งปันประสบการณ์ และเชื่อมต่อกับเพื่อนร่วมงาน Project Sleep"
        },
        discord: "เข้าร่วม Discord",
        telegram: "เข้าร่วม Telegram",
        values: {
          community: {
            title: "ชุมชนเป็นสำคัญ",
            description: "สร้างขึ้นโดยชุมชน เพื่อชุมชน"
          },
          opensource: {
            title: "โอเพ่นซอร์ส",
            description: "การพัฒนาอย่างโปร่งใสและการทำงานร่วมกัน"
          },
          quality: {
            title: "โค้ดคุณภาพ",
            description: "สะอาด เปิดให้ปรับปรุง และผ่านการทดสอบอย่างดี"
          },
          performance: {
            title: "ประสิทธิภาพ",
            description: "ปรับแต่งเพื่อความเร็วและประสิทธิภาพ"
          }
        }
      },
      auth: {
        login: "เข้าสู่ระบบ",
        logout: "ออกจากระบบ",
        email: "อีเมล",
        password: "รหัสผ่าน",
        adminOnly: "เฉพาะแอดมิน",
        signIn: "ลงชื่อเข้าใช้"
      },
      theme: {
        light: "โหมดสว่าง",
        dark: "โหมดมืด",
        toggle: "สลับธีม"
      },
      common: {
        loading: "กำลังโหลด...",
        error: "เกิดข้อผิดพลาดบางอย่าง",
        noResults: "ไม่พบผลลัพธ์",
        viewMore: "ดูเพิ่มเติม",
        viewLess: "ดูน้อยลง"
      }
    }
  },
  vi: {
    translation: {
      nav: {
        home: "Trang chủ",
        features: "Tính năng",
        download: "Tải xuống",
        team: "Đội ngũ",
        about: "Giới thiệu",
        login: "Đăng nhập"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "Trải nghiệm Android theo một cách chưa từng có",
          description: "ROM tùy chỉnh được tạo ra cho hiệu năng, độ ổn định và sự tinh tế",
          cta: "Tải về ngay"
        },
        flavors: {
          title: "Chọn phiên bản của bạn",
          sleepos: "SleepOS",
          sleeposDesc: "Dựa trên HyperOS với các tính năng được nâng cao",
          aosp: "AOSP",
          aospDesc: "Trải nghiệm Android thuần",
          port: "Port ROM",
          portDesc: "Tính năng được chuyển thể từ các thiết bị hàng đầu"
        }
      },
      features: {
        title: "Tính năng",
        subtitle: "Khám phá điều gì làm cho Project Sleep trở nên đặc biệt",
        description: "Trải nghiệm Android tốt nhất với các tính năng được lựa chọn cẩn thận của chúng tôi, được thiết kế để nâng cao trải nghiệm sử dụng hàng ngày của bạn.",
        battery: {
          title: "Tối ưu hóa Pin",
          description: "Quản lý pin tiên tiến cho thời gian sử dụng cả ngày"
        },
        performance: {
          title: "Tinh chỉnh Hiệu suất",
          description: "Nhân và hệ thống được tối ưu hóa cho hiệu năng cao nhất"
        },
        security: {
          title: "Bảo mật & Riêng tư",
          description: "Tính năng bảo mật và kiểm soát quyền riêng tư nâng cao"
        },
        customization: {
          title: "Tùy biến",
          description: "Tùy chọn chủ đề và tùy biến mở rộng"
        },
        ui: {
          title: "Giao diện Hiện đại",
          description: "Giao diện sạch sẽ, trực quan với hoạt ảnh mượt mà"
        },
        connectivity: {
          title: "Kết nối",
          description: "Cải thiện độ ổn định của WiFi và Bluetooth"
        },
        difference: {
          title: "Điều gì làm cho chúng tôi khác biệt",
          updates: {
            title: "Cập nhật Định kỳ",
            description: "Chúng tôi cung cấp các bản cập nhật thường xuyên với các bản vá bảo mật và tính năng mới nhất để giữ cho thiết bị của bạn an toàn và cập nhật."
          },
          community: {
            title: "Cộng đồng Sôi động",
            description: "Tham gia hàng ngàn người dùng trong các cộng đồng Discord và Telegram của chúng tôi để được hỗ trợ, mẹo và thảo luận phát triển ROM."
          },
          opensource: {
            title: "Mã nguồn mở",
            description: "ROM của chúng tôi được xây dựng trên nền tảng mã nguồn mở, đảm bảo tính minh bạch và hợp tác cộng đồng."
          },
          devicesupport: {
            title: "Hỗ trợ Thiết bị",
            description: "Chúng tôi hỗ trợ nhiều thiết bị từ các nhà sản xuất khác nhau, đảm bảo nhiều người dùng có thể trải nghiệm Project Sleep."
          }
        }
      },
      download: {
        title: "Tải ROM",
        search: "Tìm kiếm thiết bị hoặc ROM...",
        filter: {
          all: "Tất cả",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "Mới nhất",
          popular: "Tải nhiều nhất",
          name: "Tên"
        },
        version: "Phiên bản",
        downloads: "Lượt tải",
        changelog: "Nhật ký thay đổi",
        notes: "Ghi chú",
        download: "Tải về",
        checksum: "Checksum",
        fileSize: "Kích thước tập tin",
        uploadDate: "Ngày tải lên",
        type: "Loại",
        roms: {
          available: "{{count}} ROM khả dụng"
        }
      },
      team: {
        title: "Đội ngũ chúng tôi",
        subtitle: "Gặp gỡ những người đứng sau Project Sleep",
        apply: {
          title: "Tham gia đội ngũ chúng tôi",
          name: "Họ và tên",
          email: "Địa chỉ email",
          portfolio: "GitHub / Liên kết Portfolio",
          role: "Vai trò ứng tuyển",
          message: "Tại sao bạn muốn tham gia?",
          cv: "Đính kèm CV (Tùy chọn)",
          submit: "Gửi đơn ứng tuyển",
          success: "Ứng tuyển thành công!",
          error: "Gửi đơn ứng tuyển thất bại"
        }
      },
      about: {
        title: "Về Project Sleep",
        mission: "Sứ mệnh của chúng tôi",
        missionText: "Phải triển trải nghiệm Android tùy chỉnh tốt nhất với độ ổn định, hiệu năng và các tính năng quan trọng.",
        description: "Project Sleep ra đời từ đam mê với việc tùy chỉnh Android và mong muốn tạo ra các ROM ưu tiên trải nghiệm người dùng, độ ổn định và hiệu năng. Chúng tôi tin rằng tất cả mọi người xứng đáng có quyền truy cập vào các ROM tùy chỉnh chất lượng cao giúp nâng cao thiết bị của họ thay vì làm tổn hại đến nó.",
        community: {
          title: "Tham gia cộng đồng của chúng tôi",
          description: "Tham gia hàng ngàn người dùng trong cộng đồng sôi nổi của chúng tôi. Nhận hỗ trợ, chia sẻ trải nghiệm và kết nối với những người yêu thích Project Sleep."
        },
        discord: "Tham gia Discord",
        telegram: "Tham gia Telegram",
        values: {
          community: {
            title: "Cộng đồng là trên hết",
            description: "Được xây dựng bởi cộng đồng, cho cộng đồng"
          },
          opensource: {
            title: "Mã nguồn mở",
            description: "Phát triển minh bạch và hợp tác"
          },
          quality: {
            title: "Mã chất lượng",
            description: "Sạch sẽ, dễ bảo trì và được kiểm thử kỹ lưỡng"
          },
          performance: {
            title: "Hiệu năng",
            description: "Tối ưu hóa cho tốc độ và hiệu quả"
          }
        }
      },
      auth: {
        login: "Đăng nhập",
        logout: "Đăng xuất",
        email: "Email",
        password: "Mật khẩu",
        adminOnly: "Chỉ Admin",
        signIn: "Đăng nhập"
      },
      theme: {
        light: "Sáng",
        dark: "Tối",
        toggle: "Chuyển đổi chế độ"
      },
      common: {
        loading: "Đang tải...",
        error: "Đã xảy ra lỗi",
        noResults: "Không tìm thấy kết quả",
        viewMore: "Xem thêm",
        viewLess: "Xem ít hơn"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        features: "الميزات",
        download: "تحميل",
        team: "الفريق",
        about: "حول",
        login: "تسجيل الدخول"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "استمتع بتجربة أندرويد مثل لم تسبق لك من قبل",
          description: "نظام تشغيل مخصص مصمم للأداء والاستقرار والأناقة",
          cta: "حمل الآن"
        },
        flavors: {
          title: "اختر نسختك",
          sleepos: "SleepOS",
          sleeposDesc: "يعتمد على نظام هايبر أو إس مع ميزات محسنة",
          aosp: "AOSP",
          aospDesc: "تجربة أندرويد نقية",
          port: "Port ROM",
          portDesc: "ميزات محوّلة من الأجهزة الرائدة"
        }
      },
      features: {
        title: "الميزات",
        subtitle: "اكتشف ما يميز Project Sleep",
        description: "استمتع بتجربة أندرويد الأفضل مع ميزاتنا المدروسة بعناية والتي تم تصميمها لتحسين استخدامك اليومي.",
        battery: {
          title: "تحسين البطارية",
          description: "إدارة متقدمة للبطارية للاستخدام طوال اليوم"
        },
        performance: {
          title: "تحسين الأداء",
          description: "نواة ونظام محسن لأداء ذروته"
        },
        security: {
          title: "الخصوصية والأمان",
          description: "ميزات أمان متقدمة وضوابط الخصوصية"
        },
        customization: {
          title: "التخصيص",
          description: "خيارات واسعة للتخصيص والمظهر"
        },
        ui: {
          title: "واجهة حديثة",
          description: "واجهة نظيفة وسلسة مع رسوم متحركة متميزة"
        },
        connectivity: {
          title: "الاتصال",
          description: "تحسين استقرار الـ WiFi والبلوتوث"
        },
        difference: {
          title: "ما الذي يجعلنا مختلفين",
          updates: {
            title: "تحديثات منتظمة",
            description: "نقدم تحديثات متكررة مع أحدث تصحيحات الأمان والميزات للحفاظ على أمان جهازك وتحديثه."
          },
          community: {
            title: "مجتمع نشط",
            description: "انضم إلى الآلاف من المستخدمين في مجتمعات Discord و Telegram الخاصة بنا للحصول على الدعم والنصائح ونقاش تطوير النظام."
          },
          opensource: {
            title: "مصدر مفتوح",
            description: "يتم بناء أنظمتنا على أسس مفتوحة المصدر، مما يضمن الشفافية والتعاون المجتمعي."
          },
          devicesupport: {
            title: "دعم الأجهزة",
            description: "نقدم دعمًا لمجموعة واسعة من الأجهزة من مختلف الشركات المصنعة، لضمان قدرة المزيد من المستخدمين على تجربة Project Sleep."
          }
        }
      },
      download: {
        title: "تحميل النظام",
        search: "ابحث عن الأجهزة أو الأنظمة...",
        filter: {
          all: "الكل",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "الأحدث",
          popular: "الأكثر تحميلاً",
          name: "الاسم"
        },
        version: "الإصدار",
        downloads: "التحميلات",
        changelog: "سجل التغييرات",
        notes: "ملاحظات",
        download: "تحميل",
        checksum: "Checksum",
        fileSize: "حجم الملف",
        uploadDate: "تاريخ الرفع",
        type: "النوع",
        roms: {
          available: "{{count}} أنظمة متوفرة"
        }
      },
      team: {
        title: "فريقنا",
        subtitle: "تعرف على الأشخاص وراء Project Sleep",
        apply: {
          title: "انضم إلى فريقنا",
          name: "الاسم الكامل",
          email: "عنوان البريد الإلكتروني",
          portfolio: "GitHub / رابط المعرض",
          role: "الوظيفة المطلوبة",
          message: "لماذا تريد الانضمام؟",
          cv: "إرفاق السيرة الذاتية (اختياري)",
          submit: "إرسال الطلب",
          success: "تم إرسال الطلب بنجاح!",
          error: "فشل في إرسال الطلب"
        }
      },
      about: {
        title: "حول Project Sleep",
        mission: "مهمتنا",
        missionText: "توفير أفضل تجربة أندرويد مخصصة مع الاستقرار والأداء والميزات المهمة.",
        description: "ولد مشروع Project Sleep من شغف بتخصيص أندرويد ورغبة في إنشاء أنظمة ROM تعطي الأولوية لتجربة المستخدم والاستقرار والأداء. نحن نؤمن بأن الجميع يستحقون الوصول إلى أنظمة ROM مخصصة عالية الجودة تحسن جهازهم بدلاً من التأثير سلباً عليه.",
        community: {
          title: "انضم إلى مجتمعنا",
          description: "انضم إلى الآلاف من المستخدمين في مجتمعنا النابض بالحياة. احصل على الدعم، وشارك تجاربك، واتصل بمحبي Project Sleep الآخرين."
        },
        discord: "انضم إلى Discord",
        telegram: "انضم إلى Telegram",
        values: {
          community: {
            title: "المجتمع أولاً",
            description: "مبنية من قِبل المجتمع، وللمجتمع"
          },
          opensource: {
            title: "مصدر مفتوح",
            description: "تطوير شفاف وتعاون"
          },
          quality: {
            title: "كود عالي الجودة",
            description: "نظيف، سهل الصيانة، ومختبر جيدًا"
          },
          performance: {
            title: "الأداء",
            description: "مُحسّن للسرعة والكفاءة"
          }
        }
      },
      auth: {
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        adminOnly: "المسؤول فقط",
        signIn: "تسجيل الدخول"
      },
      theme: {
        light: "فاتح",
        dark: "داكن",
        toggle: "تبديل السمة"
      },
      common: {
        loading: "جاري التحميل...",
        error: "حدث خطأ ما",
        noResults: "لا توجد نتائج",
        viewMore: "عرض المزيد",
        viewLess: "عرض أقل"
      }
    }
  },
  ka: {
    translation: {
      nav: {
        home: "მთავარი",
        features: "ფუნქციები",
        download: "ჩამოტვირთვა",
        team: "გუნდი",
        about: "შესახებ",
        login: "შესვლა"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "განცდით Android ისე, როგორც არასდროს არ მოგივიდათ",
          description: "მომხმარებლისთვის მორგებული ROM სისტემები წარმადობისთვის, სტაბილურობისთვის და ელეგანტურობისთვის",
          cta: "ჩამოტვირთვა ახლავე"
        },
        flavors: {
          title: "აირჩიეთ თქვენი სტილი",
          sleepos: "SleepOS",
          sleeposDesc: "გამოყენებულია HyperOS ბაზაზე გაუმჯობესებული ფუნქციებით",
          aosp: "AOSP",
          aospDesc: "შუდი Android გამოცდილება",
          port: "Port ROM",
          portDesc: "ფუნქციები რომლებიც პორტირებულია დროშის მასალებიდან"
        }
      },
      features: {
        title: "ფუნქციები",
        subtitle: "შეიტყვეთ რა აქცევს Project Sleep-ს განსაკუთრებულად",
        description: "განცადეთ საუკეთესო ანდროიდის გამოცდილება ჩვენი ყურადღებით შერჩეული ფუნქციებით, რომლებიც დამზადებულია თქვენი ყოველდღიური გამოყენების გასაუმჯობესებლად.",
        battery: {
          title: "ბატარეის ოპტიმიზაცია",
          description: "დამატებითი ბატარეის მართვა მთელი დღის გამოყენებისთვის"
        },
        performance: {
          title: "წარმადობის მორგება",
          description: "ოპტიმიზირებული ბირთვი და სისტემა უმაღლესი წარმადობისთვის"
        },
        security: {
          title: "კონფიდენციალურობა და უსაფრთხოება",
          description: "გაუმჯობესებული უსაფრთხოების ფუნქციები და კონფიდენციალურობის საშუალებები"
        },
        customization: {
          title: "მორგება",
          description: "გაშლილი თემების და მორგების შესაძლებლობები"
        },
        ui: {
          title: "თანამედროვე ინტერფეისი",
          description: "სუფთა, ინტუიტიური ინტერფეისი მსუბუქი ანიმაციებით"
        },
        connectivity: {
          title: "კავშირგება",
          description: "გაუმჯობესებული WiFi და Bluetooth მდგრადობა"
        },
        difference: {
          title: "რით განირჩევით ჩვენ",
          updates: {
            title: "რეგულარული განახლებები",
            description: "ჩვენ ვუზრუნველყოფთ ხშირ განახლებებს უახლესი უსაფრთხოების პაჩებით და ფუნქციებით, რომ თქვენი მოწყობილობა დაცული და განახლებული იყოს."
          },
          community: {
            title: "აქტიური საზოგადოება",
            description: "შეუერთდით ათასობით მომხმარებელს Discord და Telegram საზოგადოებებში მხარდაჭერის, რჩევების და ROM დამუშავების განხილვების მისაღებად."
          },
          opensource: {
            title: "ღია წყარო",
            description: "ჩვენი ROM ები აგებულია ღია წყაროს საფუძველზე, რათა უზრუნველყოს გამჭვირვალობა და საზოგადოებრივი თანამშრომლობა."
          },
          devicesupport: {
            title: "მოწყობილობების მხარდაჭერა",
            description: "ჩვენ ვუზრუნველყოფთ სხვადასხვა მწარმოებლებისგან მრავალფეროვანი მოწყობილობების მხარდაჭერას, რათა მეტმა მომხმარებელმა შეძლოს Project Sleep-ის გამოცდილება."
          }
        }
      },
      download: {
        title: "ჩამოტვირთეთ ROM სისტემები",
        search: "მოძებნეთ მოწყობილობები ან ROM სისტემები...",
        filter: {
          all: "ყველა",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        },
        sort: {
          newest: "უახლესი",
          popular: "ყველაზე მეტად ჩამოტვირთული",
          name: "სახელი"
        },
        version: "ვერსია",
        downloads: "ჩამოტვირთვები",
        changelog: "ცვლილებების ჟურნალი",
        notes: "შენიშვნები",
        download: "ჩამოტვირთვა",
        checksum: "Checksum",
        fileSize: "ფაილის ზომა",
        uploadDate: "ატვირთვის თარიღი",
        type: "ტიპი",
        roms: {
          available: "{{count}} ROM სისტემა ხელმისაწვდომია"
        }
      },
      team: {
        title: "ჩვენი გუნდი",
        subtitle: "გაიცანით ადამიანები რომლებიც Project Sleep-ს უკან არიან",
        apply: {
          title: "შეუერთდით ჩვენს გუნდს",
          name: "სრული სახელი",
          email: "ელ.ფოსტის მისამართი",
          portfolio: "GitHub / პორტფოლიოს ბმული",
          role: "როლი რომლისთვისაც აპირებთ",
          message: "რატომ გსურთ შეუერთდეთ?",
          cv: "მიამაგრეთ CV (არასავალდებულო)",
          submit: "მოთხოვნის გაგზავნა",
          success: "მოთხოვნა წარმატებით გაიგზავნა!",
          error: "მოთხოვნის გაგზავნა ვერ მოხერხდა"
        }
      },
      about: {
        title: "Project Sleep-ის შესახებ",
        mission: "ჩვენი მისია",
        missionText: "უზრუნველყოთ საუკეთესო მომხმარებლისთვის მორგებული Android გამოცდილებით რომელიც ეყრდნობა სტაბილურობას, წარმადობას და მნიშვნელოვან ფუნქციებს.",
        description: "Project Sleep შეიქმნა Android-ის მორგების სიყვარულისა და მომხმარებლის გამოცდილებას, სტაბილურობასა და წარმადობას უპირატესობა მიეცეს ROM-ების შექმნის სურვილით. ჩვენ მაგონია, რომ ყველა მომხმარებელი უნარჩუნდეს მაღალი ხარისხის მომხმარებლისთვის მორგებული ROM-ებთან, რომლებიც გააუმჯობესებენ მოწყობილობას უარყოფითად შედევის ნაცვლად.",
        community: {
          title: "შეუერთდით ჩვენს საზოგადოებას",
          description: "შეუერთდით ათასობით მომხმარებელს ჩვენს ცოცხალ საზოგადოებაში. მიიღეთ მხარდაჭერა, გააზიარეთ თქვენი გამოცდილება და დაუკავშირდით სხვა Project Sleep მოყვარულებს."
        },
        discord: "შეუერთდით Discord-ს",
        telegram: "შეუერთდით Telegram-ს",
        values: {
          community: {
            title: "საზოგადოება პირველ რიგში",
            description: "აგებულია საზოგადოების მიერ, საზოგადოებისთვის"
          },
          opensource: {
            title: "ღია წყარო",
            description: "გამჭვირვალე შემუშავება და თანამშრომლობა"
          },
          quality: {
            title: "ხარისხიანი კოდი",
            description: "სუფთა, მართვადი და კარგად დატესტილი"
          },
          performance: {
            title: "წარმადობა",
            description: "ოპტიმიზირებულია სიჩქარისა და ეფექტურობისთვის"
          }
        }
      },
      auth: {
        login: "შესვლა",
        logout: "გასვლა",
        email: "ელ.ფოსტა",
        password: "პაროლი",
        adminOnly: "მხოლოდ ადმინისტრატორისთვის",
        signIn: "შესვლა"
      },
      theme: {
        light: "ღია",
        dark: "ბნელი",
        toggle: "თემის გადართვა"
      },
      common: {
        loading: "იტვირთება...",
        error: "რაღაც შეცდომა მოხდა",
        noResults: "შედეგები ვერ მოიძებნა",
        viewMore: "მეტის ნახვა",
        viewLess: "ნაკლების ნახვა"
      }
    }
  },
  bn: {
    translation: {
      nav: {
        home: "হোম",
        features: "বৈশিষ্ট্য",
        download: "ডাউনলোড",
        team: "টিম",
        about: "সম্পর্কে",
        login: "লগইন"
      },
      home: {
        hero: {
          title: "Project Sleep",
          subtitle: "এখন পর্যন্ত যে কোনও অ্যান্ড্রয়েড অভিজ্ঞতা নেই তার চেয়ে ভিন্ন অ্যান্ড্রয়েড অভিজ্ঞতা",
          description: "কাস্টম রম যা তৈরি করা হয়েছে কর্মক্ষমতা, স্থিতিশীলতা এবং সৌন্দর্যের জন্য",
          cta: "এখনই ডাউনলোড করুন"
        },
        flavors: {
          title: "আপনার স্বাদ নির্বাচন করুন",
          sleepos: "SleepOS",
          sleeposDesc: "হাইপারওএস এর উপর ভিত্তি করে উন্নত বৈশিষ্ট্যসহ",
          aosp: "AOSP",
          aospDesc: "পরিষ্কার অ্যান্ড্রয়েড অভিজ্ঞতা",
          port: "পোর্ট রম",
          portDesc: "ফ্ল্যাগশিপ ডিভাইস থেকে পোর্ট করা বৈশিষ্ট্যগুলি"
        }
      },
      features: {
        title: "বৈশিষ্ট্য",
        subtitle: "খুঁজে বার করুন কি করে Project Sleep বিশেষ",
        description: "আপনার দৈনিক ব্যবহার উন্নত করার জন্য তৈরি করা আমাদের যত্ন সহকারে নির্বাচিত বৈশিষ্ট্যগুলির সাথে সেরা Android অভিজ্ঞতা অর্জন করুন।",
        battery: {
          title: "ব্যাটারি অপ্টিমাইজেশন",
          description: "সারাদিনের ব্যবহারের জন্য উন্নত ব্যাটারি ব্যবস্থাপনা"
        },
        performance: {
          title: "কর্মক্ষমতা টিউনিং",
          description: "সেরা কর্মক্ষমতার জন্য অপ্টিমাইজড কার্নেল এবং সিস্টেম"
        },
        security: {
          title: "গোপনীয়তা এবং নিরাপত্তা",
          description: "উন্নত নিরাপত্তা বৈশিষ্ট্য এবং গোপনীয়তা নিয়ন্ত্রণ"
        },
        customization: {
          title: "অনুকূলায়ন",
          description: "বিস্তৃত থিম এবং অনুকূলায়ন বিকল্পগুলি"
        },
        ui: {
          title: "আধুনিক UI",
          description: "মসৃণ অ্যানিমেশন সহ পরিষ্কার, সহজাত ইন্টারফেস"
        },
        connectivity: {
          title: "সংযোগ",
          description: "WiFi এবং Bluetooth স্থিতিশীলতা উন্নত করা হয়েছে"
        },
        difference: {
          title: "আমাদের আলাদা করে কী",
          updates: {
            title: "নিয়মিত আপডেট",
            description: "আপনার ডিভাইসটি নিরাপদ এবং আপ-টু-ডেট রাখতে সর্বাধিক সুরক্ষা প্যাচ এবং বৈশিষ্ট্যগুলির সাথে আমরা পর্যায়ক্রমিক আপডেটগুলি সরবরাহ করি।"
          },
          community: {
            title: "সক্রিয় কমিউনিটি",
            description: "সমর্থন, টিপস এবং ROM ডেভেলপমেন্ট আলোচনার জন্য আমাদের Discord এবং Telegram কমিউনিটিগুলিতে হাজার হাজার ব্যবহারকারীর সাথে যোগ দিন।"
          },
          opensource: {
            title: "ওপেন সোর্স",
            description: "আমাদের ROM গুলি ওপেন-সোর্স ভিত্তির উপর নির্মিত, যা স্বচ্ছতা এবং কমিউনিটি সহযোগিতা নিশ্চিত করে।"
          },
          devicesupport: {
            title: "ডিভাইস সমর্থন",
            description: "বিভিন্ন প্রস্তুতকারকের বিস্তৃত ডিভাইসগুলি সমর্থন করি, যাতে আরও বেশি ব্যবহারকারী Project Sleep এর অভিজ্ঞতা অর্জন করতে পারে।"
          }
        }
      },
      download: {
        title: "রম ডাউনলোড করুন",
        search: "ডিভাইস বা রম খুঁজুন...",
        filter: {
          all: "সব",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "পোর্ট"
        },
        sort: {
          newest: "নতুনতম",
          popular: "সর্বাধিক ডাউনলোড করা হয়েছে",
          name: "নাম"
        },
        version: "সংস্করণ",
        downloads: "ডাউনলোড",
        changelog: "পরিবর্তন লগ",
        notes: "নোট",
        download: "ডাউনলোড",
        checksum: "চেকসাম",
        fileSize: "ফাইলের আকার",
        uploadDate: "আপলোডের তারিখ",
        type: "ধরন",
        roms: {
          available: "{{count}} রম সহায়যগ্য"
        }
      },
      team: {
        title: "আমাদের দল",
        subtitle: "Project Sleep এর পিছনের মানুষজন সম্পর্কে জানুন",
        apply: {
          title: "আমাদের দলে যোগ দিন",
          name: "পুরো নাম",
          email: "ইমেইল ঠিকানা",
          portfolio: "গিটহাব / পোর্টফোলিও ইউআরএল",
          role: "যে পদের জন্য আবেদন করছেন",
          message: "আপনি কেন যোগ দিতে চান?",
          cv: "সিভি সংযুক্ত করুন (ঐচ্ছিক)",
          submit: "আবেদন জমা দিন",
          success: "আবেদন সফলভাবে জমা হয়েছে!",
          error: "আবেদন জমা দেওয়া ব্যর্থ হয়েছে"
        }
      },
      about: {
        title: "Project Sleep সম্পর্কে",
        mission: "আমাদের লক্ষ্য",
        missionText: "স্থিতিশীলতা, কর্মক্ষমতা এবং গুরুত্বপূর্ণ বৈশিষ্ট্যগুলির সাথে সেরা কাস্টম অ্যান্ড্রয়েড অভিজ্ঞতা সরবরাহ করা।",
        description: "Android কাস্টমাইজেশনের প্রতি আমাদের আবেগ এবং ব্যবহারকারীর অভিজ্ঞতা, স্থিতিশীলতা এবং কর্মক্ষমতার উপর গুরুত্বারোপ করে ROM তৈরির ইচ্ছার ফলে Project Sleep এর জন্ম। আমরা বিশ্বাস করি যে সবার উচ্চ মানের কাস্টম ROM তৈরির অধিকার রয়েছে যা ডিভাইসটিকে ক্ষতি না করে বরং উন্নত করে।",
        community: {
          title: "আমাদের কমিউনিটিতে যোগ দিন",
          description: "আমাদের সক্রিয় কমিউনিটিতে হাজার হাজার ব্যবহারকারীর সাথে যোগ দিন। সমর্থন পান, আপনার অভিজ্ঞতা ভাগ করে নিন এবং Project Sleep প্রেমীদের সাথে সংযোগ করুন।"
        },
        discord: "Discord এ যোগ দিন",
        telegram: "টেলিগ্রামে যোগ দিন",
        values: {
          community: {
            title: "সম্প্রদায় প্রথম",
            description: "সম্প্রদায়ের দ্বারা নির্মিত, সম্প্রদায়ের জন্য"
          },
          opensource: {
            title: "ওপেন সোর্স",
            description: "স্বচ্ছ উন্নয়ন এবং সহযোগিতা"
          },
          quality: {
            title: "গুণগত কোড",
            description: "পরিষ্কার, রক্ষণাবেক্ষণ করা সহজ এবং ভালো পরীক্ষণ করা"
          },
          performance: {
            title: "কর্মক্ষমতা",
            description: "গতি এবং দক্ষতার জন্য অপ্টিমাইজ করা হয়েছে"
          }
        }
      },
      auth: {
        login: "লগইন",
        logout: "লগ আউট",
        email: "ইমেইল",
        password: "পাসওয়ার্ড",
        adminOnly: "শুধুমাত্র অ্যাডমিন",
        signIn: "সাইন ইন"
      },
      theme: {
        light: "হালকা",
        dark: "গাঢ়",
        toggle: "থিম টগল করুন"
      },
      common: {
        loading: "লোড হচ্ছে...",
        error: "কিছু ভুল হয়েছে",
        noResults: "কোনো ফলাফল পাওয়া যায়নি",
        viewMore: "আরও দেখুন",
        viewLess: "কম দেখুন"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en', // Use stored language or default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    saveMissing: true, // Save missing keys to the language files
    returnNull: false, // Return empty string instead of null when translation is missing
  });

// Listen for language change events to update localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
