import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { GB, ID, IN, RU, TH, VN, SA, GE, BD } from "country-flag-icons/react/3x2";

const languages = [
  { code: "en", name: "English", Flag: GB },
  { code: "id", name: "Bahasa Indonesia", Flag: ID },
  { code: "hi", name: "हिन्दी", Flag: IN },
  { code: "ru", name: "Русский", Flag: RU },
  { code: "th", name: "ไทย", Flag: TH },
  { code: "vi", name: "Tiếng Việt", Flag: VN },
  { code: "ar", name: "العربية", Flag: SA },
  { code: "ka", name: "ქართული", Flag: GE },
  { code: "bn", name: "বাংলা", Flag: BD },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="flex items-center space-x-2"
          >
            <lang.Flag className="h-4 w-6" />
            <span className={i18n.language === lang.code ? "font-semibold" : ""}>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
