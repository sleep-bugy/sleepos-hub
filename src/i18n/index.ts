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
        subtitle: "Discover what makes Project Sleep special"
      },
      download: {
        title: "Download ROMs",
        search: "Search devices or ROMs...",
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
        uploadDate: "Upload Date"
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
        community: "Join Our Community",
        discord: "Join Discord",
        telegram: "Join Telegram"
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
        viewMore: "View More"
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
      download: {
        search: "Cari perangkat atau ROM...",
        filter: {
          all: "Semua",
          sleepos: "SleepOS",
          aosp: "AOSP",
          port: "Port"
        }
      },
      team: {
        title: "Tim Kami",
        subtitle: "Kenali orang-orang di balik Project Sleep"
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
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
