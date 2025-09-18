import React from "react";
import { Target, Rocket, Eye, Zap, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type FeatureKey = "objective" | "mission" | "vision";

interface FeatureConfig {
  key: FeatureKey;
  icon: LucideIcon;
}

const featureConfigs: FeatureConfig[] = [
  { key: "objective", icon: Target },
  { key: "mission", icon: Rocket },
  { key: "vision", icon: Eye },
];

const About: React.FC = () => {
  const { t } = useTranslation();

  // paragrafos estáticos
  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];

  return (
    <section
      id="about"
      className="py-20 lg:py-32 relative bg-cyan-50 dark:bg-lirge-darker transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#04363e] dark:text-white">
              {t("about.title")}{" "}
              <span className="text-lirge-cyan">{t("about.highlight")}</span>
            </h2>
            <div className="w-24 h-1 bg-lirge-cyan mx-auto mb-8" />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text */}
            <div className="space-y-6">
              {paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Image */}
            <div className="relative">
              <div
                className="
                  rounded-2xl p-8 border
                  bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf] border-[#81D4FA]
                  dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 dark:border-lirge-cyan/20
                  transition-colors duration-300
                "
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/sobrefoto.jpg`}
                  alt={t("about.imageAlt")}
                  loading="lazy"
                  className="w-full h-full lg:h-80 object-cover rounded-xl"
                />
                <div
                  className="
                    absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center
                    bg-[#04363e] border-2 border-cyan-700
                    dark:bg-lirge-darker/80 dark:border-lirge-cyan
                    transition-colors duration-300
                  "
                >
                  <Zap className="text-cyan-50 dark:text-lirge-cyan" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {featureConfigs.map(({ key, icon: Icon }) => (
              <div key={key} className="group w-full sm:w-[300px] max-w-sm">
                <div
                  className="
                    h-full flex flex-col justify-between rounded-xl p-6 border
                    bg-gradient-to-br from-[#7bc3cf] to-[#7bc3cf] border-[#81D4FA]
                    dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 dark:border-lirge-cyan/20
                    transition-colors duration-300
                  "
                >
                  <div className="w-12 h-12 bg-[#04363e] dark:bg-gradient-to-br dark:from-lirge-teal/20 dark:to-lirge-cyan/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-cyan-50 dark:text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#04363e] dark:text-white mb-3 text-center">
                    {t(`about.features.${key}.title`)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
                    {t(`about.features.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;