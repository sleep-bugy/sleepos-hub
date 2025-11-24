import { useTranslation } from "react-i18next";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt="Project Sleep Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-xl">Project Sleep</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Custom Android ROMs crafted with care for the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-primary transition-colors">
                  {t("nav.features")}
                </a>
              </li>
              <li>
                <a href="/download" className="hover:text-primary transition-colors">
                  {t("nav.download")}
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-primary transition-colors">
                  {t("nav.team")}
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">{t("about.community.title")}</h3>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open("https://discord.gg/sK433E4jq", "_blank")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("about.discord")}
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open("https://t.me/SleepOsUser", "_blank")}
              >
                <Send className="h-4 w-4 mr-2" />
                {t("about.telegram")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Project Sleep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
