import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SpaceBackground from "./SpaceBackground";
import WorkExperienceSection from "./WorkExperienceSection";
import ProjectsGallery from "./ProjectsGallery";
import { ChevronDown, Mail, Send, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LiquidSkillBar from "./ui/liquid-skill-bar";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

// 多言語辞書
const translations = {
  ja: {
    siteTitle: "ポートフォリオサイト",
    nav: ["ホーム", "実務経験", "プロジェクト", "スキル", "コンタクト"],
    sections: {
      main: "ホーム",
      work: "実務経験",
      projects: "プロジェクト",
      skills: "スキル",
      contact: "コンタクト",
    },
    scrollToDetails: "スクロールして詳細を見る",
    skillCategories: {
      frontend: "フロントエンド",
      backend: "バックエンド",
      other: "その他のスキル",
    },
    yearsUnit: "年",
    workExperience: {
      title: "実務経験",
      closeDetails: "詳細を閉じる",
      showDetails: "詳細を表示",
      teamSize: "チーム規模:",
    },
    projects: {
      title: "副業 & 個人開発",
      viewProject: "サイトを見る",
      expandDescription: "詳細を見る",
      collapseDescription: "閉じる",
      list: [
        {
          title: "Space Tech Accelerator",
          description: "宇宙技術を活用したサステナブルな未来創造を目指す企業サイト。衛星データ解析や環境モニタリングなどのサービスを提供。",
          image: "https://spase-tech-hp.vercel.app/ogp.png",
          link: "https://spase-tech-hp.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "DevFund",
          description: "個人開発者と企業・投資家をつなぐマッチングプラットフォーム。プロジェクトの収益化や投資機会の創出を支援。",
          image: "https://devfund-eosin.vercel.app/ogp.png",
          link: "https://devfund-eosin.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "enmatch",
          description: "エンジニア同士のスキルや興味に基づいたマッチングプラットフォーム。GitHubアカウントと連携して自動的にスキルを分析し、相性の良いパートナーを見つけることができます。",
          image: "https://raw.githubusercontent.com/matsu128/enmatch/main/public/ogp.png",
          link: "https://github.com/matsu128/enmatch",
          technologies: ["React", "Node.js", "Next.js", "Prisma", "Recoil", "GitHub API"]
        },
        {
          title: "イナズマカフェ",
          description: "カフェや飲食店向けのシンプルなWebサイト。メニューや店舗情報、雰囲気を伝えるデザイン。",
          image: "https://cafe-site-seven.vercel.app/ogp.png",
          link: "https://cafe-site-seven.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "お取り寄せハブ",
          description: "厳選グルメをランキング形式で紹介するグルメ情報サイト。肉・麺類・魚介などカテゴリ別に新着や人気商品を掲載。",
          image: "https://otoriyose-hub.vercel.app/ogp.png",
          link: "https://otoriyose-hub.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "Kokolth",
          description: "高齢出産や妊活、育児、夫婦関係などの悩みに寄り添うカウンセリングサービスサイト。管理栄養士・心理カウンセラーによるメール相談を提供。",
          image: "https://kokolth-seven.vercel.app/ogp.png",
          link: "https://kokolth-seven.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
      ],
    },
    contact: {
      title: "コンタクト",
      send: "メッセージを送信",
      sending: "送信中...",
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      placeholder: "お仕事のご相談、技術的な質問など、お気軽にメッセージをお送りください。",
      info: "お気軽にご連絡ください",
      infoText: "新しいプロジェクトやお仕事のご相談、技術的な質問など、どんなことでもお気軽にお声がけください。",
      time: "対応時間:",
      timeValue: "平日 9:00-18:00",
      reply: "返信:",
      replyValue: "24時間以内に返信いたします",
    },
    workExperiences: [
      {
        company: "メディアファイブ株式会社",
        period: "2022年11月 〜 2024年09月",
        position: "フルスタックエンジニア",
        project: "金融システムの機能追加・改修",
        teamSize: "1-10人",
        technologies: ["Javascript", "Java (Spring Boot)", "OracleDB", "Docker", "Eclipse", "VSCode"],
        details: `役割: 基本設計、詳細設計、開発、単体テスト、結合テスト\n\n投資商品関連の機能追加および改修を担当。小規模から中規模のプロジェクトに従事し、基本設計から結合テストまでの工程を担当。\nフロントエンドをJavascript + JSP、バックエンドをSpring Bootを使って実装。\n具体例:xx銀行に外貨預金の処理を追加\n調査: 似た処理がある場合は他銀行の外貨預金処理のフローを調査(ない場合は新規で作成)し、要件や既存システムとの統合点を把握。\n設計: 外貨預金の処理に必要な機能やデータフローを設計書に記載し、システム全体の設計にどのように組み込むかを決定。\n実装: 設計に基づき、フロント側とバックエンド側の外貨預金の処理を実装。処理のロジックやデータの整合性を保つためのコードを記述。\nテスト: 単体テストと結合テストを実施し、既存の処理に影響を与えないことを確認。特にバグが発生しないよう、設計とテストの観点から慎重に対応。`,
      },
      {
        company: "WeBase株式会社",
        position: "フロントエンドエンジニア",
        period: "2024年12月 〜 2025年04月",
        role: "メンバー",
        teamSize: "1-10人",
        projectTitle: "会計システムの新規機能追加",
        technologies: ["PostgreSQL", "TypeScript", "React", "Next.js"],
        details: `役割: 調査、仕様検討、設計、実装\n\n会計システムの新規機能追加を担当。Reactをメインにatomic designを用いて設計し、Recoil,styledCSSを用いて実装。\nToB向けの会計サービスの一部機能を新規作成。手で行なっていた事務処理をAIを用いて判断するようにDX化するというプロジェクト。要件や仕様選定からフロント、バックエンド、DBの処理などを1人で担当。`,
      },
      {
        company: "個人事業主",
        position: "フロントエンドエンジニア",
        period: "2025年01月 〜 2025年03月",
        role: "メンバー",
        teamSize: "1-10人",
        projectTitle: "xxxxサイトのシステム開発",
        technologies: ["AWS", "Docker", "Node.js", "React", "GitHub", "Prisma", "Recoil"],
        details: `ToC向けのマッチングサービスを開発。既存の競合のサイトが古く更新が止まっているため、踏襲する形でシステムを作成。\nフロントとバックで1人ずつのチームを組み、デザイン、フロントエンド実装、API連携などを含めて実装。`,
      },
    ],
    footer: {
      copyright: "© 2025 Matsumoto Sou - ポートフォリオ",
      madeWith: "このサイトは React, Three.js, Framer Motion を使用して作成されています"
    },
    hero: {
      name: "松本 颯",
      title: "フロントエンド・バックエンドエンジニア",
      description: "モダンな技術スタックを活用し、ユーザー体験を重視したWebアプリケーション開発を行っています。フロントエンドからバックエンドまで幅広い技術領域をカバーし、チーム開発での協調性も大切にしています。",
      stats: [
        { label: "実務経験", value: "2年+" },
        { label: "プロジェクト", value: "10+" },
        { label: "技術スタック", value: "15+" },
        { label: "チーム開発", value: "5+" },
      ],
    },
  },
  en: {
    siteTitle: "Portfolio Site",
    nav: ["Home", "Work", "Projects", "Skills", "Contact"],
    sections: {
      main: "Home",
      work: "Work Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    scrollToDetails: "Scroll to see details",
    skillCategories: {
      frontend: "Frontend",
      backend: "Backend",
      other: "Other Skills",
    },
    yearsUnit: " years",
    workExperience: {
      title: "Work Experience",
      closeDetails: "Close Details",
      showDetails: "Show Details",
      teamSize: "Team size:",
    },
    projects: {
      title: "Side Jobs & Personal Projects",
      viewProject: "View Project",
      expandDescription: "Show Details",
      collapseDescription: "Close",
      list: [
        {
          title: "Space Tech Accelerator",
          description: "A corporate site aiming to create a sustainable future using space technology. Provides services such as satellite data analysis and environmental monitoring.",
          image: "https://spase-tech-hp.vercel.app/ogp.png",
          link: "https://spase-tech-hp.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "DevFund",
          description: "A matching platform connecting individual developers with companies and investors. Supports project monetization and investment opportunities.",
          image: "https://devfund-eosin.vercel.app/ogp.png",
          link: "https://devfund-eosin.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "enmatch",
          description: "A matching platform for engineers based on skills and interests. Automatically analyzes skills via GitHub account integration and helps find compatible partners.",
          image: "https://raw.githubusercontent.com/matsu128/enmatch/main/public/ogp.png",
          link: "https://github.com/matsu128/enmatch",
          technologies: ["React", "Node.js", "Next.js", "Prisma", "Recoil", "GitHub API"]
        },
        {
          title: "Cafe Site Seven",
          description: "A simple website for cafes and restaurants. Features menu, shop info, and a design that conveys the atmosphere.",
          image: "https://cafe-site-seven.vercel.app/ogp.png",
          link: "https://cafe-site-seven.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "Otoriyose Hub",
          description: "A gourmet information site introducing selected gourmet foods in ranking format. Features categories such as meat, noodles, and seafood, with new and popular items.",
          image: "https://otoriyose-hub.vercel.app/ogp.png",
          link: "https://otoriyose-hub.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
        {
          title: "Kokolth",
          description: "A counseling service site supporting concerns such as late childbirth, fertility, parenting, and marital relationships. Offers email counseling by a registered dietitian and psychological counselor.",
          image: "https://kokolth-seven.vercel.app/ogp.png",
          link: "https://kokolth-seven.vercel.app/",
          technologies: ["Next.js", "TypeScript", "TailwindCSS"]
        },
      ],
    },
    contact: {
      title: "Contact",
      send: "Send Message",
      sending: "Sending...",
      name: "Name",
      email: "Email",
      message: "Message",
      placeholder: "Feel free to send a message for work inquiries or technical questions.",
      info: "Feel free to contact me",
      infoText: "For new projects, work inquiries, or technical questions, please feel free to reach out.",
      time: "Available:",
      timeValue: "Weekdays 9:00-18:00",
      reply: "Reply:",
      replyValue: "I will reply within 24 hours.",
    },
    workExperiences: [
      {
        company: "MediaFive Inc.",
        period: "Nov 2022 - Sep 2024",
        position: "Full Stack Engineer",
        project: "Financial System Feature Development & Enhancement",
        teamSize: "1-10",
        technologies: ["Javascript", "Java (Spring Boot)", "OracleDB", "Docker", "Eclipse", "VSCode"],
        details: `Role: Basic design, detailed design, development, unit testing, integration testing\n\nResponsible for adding and enhancing features related to investment products. Participated in small to medium-sized projects, handling all phases from basic design to integration testing.\nFrontend implemented with Javascript + JSP, backend with Spring Boot.\nExample: Added foreign currency deposit processing for XX Bank.\nResearch: If similar processing existed, investigated the flow at other banks; if not, created new. Understood requirements and integration points with existing systems.\nDesign: Documented necessary functions and data flows for foreign currency deposits, and determined how to incorporate them into the overall system design.\nImplementation: Developed both frontend and backend processing for foreign currency deposits based on the design, ensuring logic and data consistency.\nTesting: Conducted unit and integration tests to ensure no impact on existing processing. Paid special attention to design and testing perspectives to prevent bugs.`,
      },
      {
        company: "WeBase Inc.",
        position: "Frontend Engineer",
        period: "Dec 2024 - Apr 2025",
        role: "Member",
        teamSize: "1-10",
        projectTitle: "New Feature Development for Accounting System",
        technologies: ["PostgreSQL", "TypeScript", "React", "Next.js"],
        details: `Role: Research, specification review, design, implementation\n\nResponsible for developing new features for an accounting system. Designed mainly with React using atomic design, and implemented with Recoil and styledCSS.\nCreated new features for a B2B accounting service. The project aimed to digitalize manual office work using AI. Handled everything from requirements/specification selection to frontend, backend, and DB processing as a solo developer.`,
      },
      {
        company: "Sole Proprietor",
        position: "Frontend Engineer",
        period: "Jan 2025 - Mar 2025",
        role: "Member",
        teamSize: "1-10",
        projectTitle: "xxxx Site System Development",
        technologies: ["AWS", "Docker", "Node.js", "React", "GitHub", "Prisma", "Recoil"],
        details: `Developed a matching service for consumers (ToC). Since existing competitor sites were outdated and no longer maintained, created a new system based on their concepts. Formed a team of two (one for frontend, one for backend) and implemented design, frontend, and API integration.`,
      },
    ],
    footer: {
      copyright: "© 2025 Matsumoto Sou - Portfolio",
      madeWith: "This site is built with React, Three.js, and Framer Motion."
    },
    hero: {
      name: "Matsumoto Sou",
      title: "Frontend / Backend Engineer",
      description: "I develop web applications with a focus on user experience, utilizing modern tech stacks. I cover a wide range of technologies from frontend to backend, and value teamwork in development.",
      stats: [
        { label: "Years Experience", value: "2+ years" },
        { label: "Projects", value: "10+" },
        { label: "Tech Stack", value: "15+" },
        { label: "Team Projects", value: "5+" },
      ],
    },
  },
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("main");
  const [scrollY, setScrollY] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];
  const [skillsInView, setSkillsInView] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Active section detection
      const sections = ['main', 'work', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      { threshold: 0.4 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate email sending (replace with actual email service)
    try {
      // Here you would integrate with an email service like EmailJS, Formspree, etc.
      console.log("Contact form submitted:", contactForm);
      alert("メッセージが送信されました！");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Space Background */}
      <SpaceBackground />
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          {/* PC用ナビゲーション */}
          <ul className="hidden md:flex space-x-4 items-center justify-end">
            {Object.keys(t.sections).map((section, i) => (
                <motion.li
                  key={section}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg border group ${
                    activeSection === section 
                      ? "bg-gradient-to-r from-white/30 via-cyan-500/30 to-purple-500/30 backdrop-blur-sm border-cyan-400/50" 
                      : "bg-gradient-to-r from-white/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-sm hover:from-white/20 hover:via-cyan-500/20 hover:to-purple-500/20 border-white/20 hover:border-cyan-400/30"
                  }`}
                  >
                  <span className={`bg-clip-text text-transparent transition-all duration-300 ${
                    activeSection === section
                      ? "bg-gradient-to-r from-white via-cyan-200 to-purple-200"
                      : "bg-gradient-to-r from-gray-300 via-cyan-300 to-purple-300 group-hover:from-white group-hover:via-cyan-200 group-hover:to-purple-200"
                  }`}>
                    {t.sections[section]}
                  </span>
                  </button>
                </motion.li>
            ))}
            <li className="flex items-center space-x-3 ml-4">
              <a
                href="https://www.linkedin.com/in/sou-m-868661276/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-blue-300 hover:text-blue-200 text-2xl transition-all duration-300 hover:scale-110 drop-shadow-lg"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/matsu128"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-200 hover:text-white text-2xl transition-all duration-300 hover:scale-110 drop-shadow-lg"
              >
                <FaGithub />
              </a>
            </li>
            <li className="ml-4">
              <button
                onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                className="flex items-center px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 hover:from-cyan-400/30 hover:via-purple-400/30 hover:to-pink-400/30 backdrop-blur-sm text-white text-sm font-semibold shadow-lg transition-all duration-300 border border-white/20 hover:border-cyan-300/50"
                aria-label="Language Switch"
              >
                <FaGlobe className="mr-2 text-cyan-300" />
                <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {language === 'ja' ? 'EN' : 'JA'}
                </span>
              </button>
            </li>
          </ul>

          {/* スマホ用ハンバーガーメニュー */}
          <div className="md:hidden flex items-center justify-end w-full">
            <a
              href="https://www.linkedin.com/in/sou-m-868661276/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-blue-300 hover:text-blue-200 text-2xl transition-all duration-300 hover:scale-110 drop-shadow-lg mr-2"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/matsu128"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-200 hover:text-white text-2xl transition-all duration-300 hover:scale-110 drop-shadow-lg mr-2"
            >
              <FaGithub />
            </a>
            <button
              className="text-white p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
            
            {/* スマホ用ドロワーメニュー */}
            {menuOpen && (
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
                {/* 背景ぼかしオーバーレイ */}
                <div className="w-full h-full absolute inset-0 bg-black/100 transition-all duration-300"></div>
                
                {/* メニュー本体 */}
                <div className="relative w-11/12 max-w-sm bg-black/40 backdrop-blur-3xl rounded-2xl shadow-2xl flex flex-col items-center p-8 z-10 border border-white/20">
                  {/* 閉じるボタン */}
                  <button
                    className="absolute top-4 right-4 text-white text-3xl hover:text-cyan-300 transition-all duration-300"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    ×
                  </button>
                  
                  {/* メニュー項目 */}
                  <ul className="space-y-6 text-xl font-bold w-full text-center mt-8">
                    {Object.keys(t.sections).map((section) => (
                      <li key={section}>
                        <button
                          onClick={() => {
                            scrollToSection(section);
                            setMenuOpen(false);
                          }}
                          className="px-6 py-4 rounded-xl bg-gradient-to-r from-white/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-sm hover:from-white/30 hover:via-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 w-full font-semibold shadow-lg border border-white/20 hover:border-cyan-400/50 group"
                        >
                          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent group-hover:from-white group-hover:via-cyan-100 group-hover:to-purple-100 transition-all duration-300 drop-shadow-sm">
                            {t.sections[section]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  {/* SNS・言語切替 */}
                  <div className="flex items-center justify-center w-full mt-8">
                    <button
                      onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                      className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 hover:from-cyan-400/40 hover:via-purple-400/40 hover:to-pink-400/40 backdrop-blur-sm text-white text-lg font-bold shadow-lg transition-all duration-300 border border-white/20 hover:border-cyan-300/50"
                      aria-label="Language Switch"
                    >
                      <FaGlobe className="mr-2 text-cyan-300" />
                      <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        {language === 'ja' ? 'EN' : 'JA'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Main Hero Section */}
      <section
        id="main"
        className="min-h-screen flex flex-col justify-center items-center relative pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {t.hero.name}
              </h1>
              <img src="/IMG_4051.JPG" alt="avatar" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white/30 shadow-lg" style={{ objectPosition: 'center 100%' }} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <p className="text-lg sm:text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-gray-200">
                {t.hero.title}
              </p>
              <p className={`text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 ${language === 'en' ? 'font-bold' : ''}`}>
                {t.hero.description}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4 mb-12 w-full max-w-2xl mx-auto"
          >
            {[
              { 
                name: "React", 
                color: "from-[#61DAFB] to-[#282C34]", 
                icon: "⚛️",
                bgColor: "bg-[#282C34]",
                textColor: "text-[#61DAFB]"
              },
              { 
                name: "Next.js", 
                color: "from-white to-black", 
                icon: "▲",
                bgColor: "bg-black",
                textColor: "text-white"
              },
              { 
                name: "JavaScript", 
                color: "from-[#F7DF1E] to-[#000000]", 
                icon: "JS",
                bgColor: "bg-[#F7DF1E]",
                textColor: "text-black"
              },
              { 
                name: "TypeScript", 
                color: "from-[#3178C6] to-[#FFFFFF]", 
                icon: "TS",
                bgColor: "bg-[#3178C6]",
                textColor: "text-white"
              },
              { 
                name: "Node.js", 
                color: "from-[#339933] to-[#FFFFFF]", 
                icon: "🟢",
                bgColor: "bg-[#339933]",
                textColor: "text-white"
              },
              { 
                name: "Java", 
                color: "from-[#ED8B00] to-[#FFFFFF]", 
                icon: "☕",
                bgColor: "bg-[#ED8B00]",
                textColor: "text-white"
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1)"
                }}
                className="relative group w-full md:w-auto"
              >
                <div className={`w-full h-full flex flex-col items-center justify-center px-2 py-2 md:px-6 md:py-3 ${tech.bgColor} rounded-[1.5rem] text-xs md:text-sm font-semibold ${tech.textColor} shadow-2xl border border-white/15 relative overflow-hidden transition-all duration-500 hover:shadow-[0_35px_70px_rgba(0,0,0,0.5)] backdrop-blur-md min-h-[56px] md:min-h-0`}>
                  {/* 継続的な光のエフェクト */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.6
                    }}
                  />
                  
                  {/* グラデーション背景オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-[1.5rem]"></div>
                  
                  {/* アイコンとテキスト */}
                  <div className="flex items-center gap-1.5 md:gap-3 relative z-10">
                    <motion.div
                      className="relative"
                      animate={{
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                    >
                      <span className="text-sm md:text-lg font-bold drop-shadow-lg">{tech.icon}</span>
                      {/* アイコン周りの光るリング */}
                      <motion.div
                        className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 border-2 border-white/20 rounded-full -m-0.5 md:-m-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                    <motion.span 
                      className="font-bold text-xs md:text-sm tracking-wide"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        letterSpacing: ["0.05em", "0.1em", "0.05em"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
              >
                {tech.name}
              </motion.span>
                  </div>
                  
                  {/* 下部の光るライン */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                    animate={{
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                  
                  {/* 浮遊する粒子エフェクト */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/50 rounded-full blur-[0.5px]"
                        animate={{
                          x: [0, Math.random() * 80 - 40],
                          y: [0, Math.random() * 60 - 30],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.6 + index * 0.3,
                        }}
                        style={{
                          left: `${15 + i * 15}%`,
                          top: `${25 + i * 12}%`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 内側の光るボーダー */}
                  <motion.div
                    className="absolute inset-0 rounded-[1.5rem] border border-white/20"
                    animate={{
                      borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
          >
            {t.hero.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-center"
          onClick={() => scrollToSection("work")}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="mx-auto mb-2 text-white" size={32} />
          </motion.div>
          <span className="text-sm text-gray-300">
            {t.scrollToDetails}
          </span>
        </motion.div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="min-h-screen py-12 md:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 border-l-4 border-purple-500 pl-4 text-white"
          >
            {t.sections.work}
          </motion.h2>
          <WorkExperienceSection language={language} t={t} />
        </div>
      </section>
      {/* Projects Gallery Section */}
      <section id="projects" className="min-h-screen py-12 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 border-l-4 border-green-500 pl-4 text-white"
          >
            {t.sections.projects}
          </motion.h2>
          <ProjectsGallery language={language} t={t} />
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-12 md:py-24 relative" ref={skillsRef}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 border-l-4 border-yellow-500 pl-4 text-white"
          >
            {t.sections.skills}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* フロントエンド */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-blue-400">
                {t.skillCategories.frontend}
              </h3>
              <div className="flex flex-row justify-center gap-4">
                {[
                  { name: "React", years: 2 },
                  { name: "Next.js", years: 2 },
                  { name: "JavaScript", years: 2.6 },
                ].map((skill) => (
                  <LiquidSkillBar key={skill.name} label={skill.name} years={skill.years} yearsUnit={t.yearsUnit} startAnimation={skillsInView} />
                ))}
              </div>
            </motion.div>

            {/* バックエンド */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">
                {t.skillCategories.backend}
              </h3>
              <div className="flex flex-row flex-wrap justify-center gap-4 overflow-x-auto">
                {[
                  { name: "Java (Spring Boot)", years: 2 },
                  { name: "Node.js", years: 1 },
                  { name: "Python", years: 1 },
                  { name: "Database", years: 2 },
                  { name: "TypeScript", years: 1 },
                ].map((skill) => (
                  <LiquidSkillBar key={skill.name} label={skill.name} years={skill.years} yearsUnit={t.yearsUnit} startAnimation={skillsInView} />
                ))}
              </div>
            </motion.div>

            {/* その他のスキル */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-6 text-green-400">
                {t.skillCategories.other}
              </h3>
              <div className="flex flex-row justify-center gap-4">
                {[
                  { name: "GitHub", years: 2.6 },
                  { name: "Mac", years: 2.6 },
                  { name: "Windows", years: 2.6 },
                ].map((skill) => (
                  <LiquidSkillBar key={skill.name} label={skill.name} years={skill.years} yearsUnit={t.yearsUnit} startAnimation={skillsInView} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-12 md:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 border-l-4 border-pink-500 pl-4 text-white"
          >
            {t.sections.contact}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-pink-400" />
                    {t.contact.info}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">
                    {t.contact.infoText}
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <span className="font-medium text-white mr-2">
                        {t.contact.time}
                      </span>
                      <span>{t.contact.timeValue}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium text-white mr-2">{t.contact.reply}:</span>
                      <span>{t.contact.replyValue}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-pink-400" />
                  {t.contact.send}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.name}
                    </label>
                    <Input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="山田太郎"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.email}
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 resize-none"
                      placeholder={t.contact.placeholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      t.contact.sending
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.contact.send}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="mb-4 text-white">{t.footer.copyright}</p>
          <p className="text-sm text-gray-400">{t.footer.madeWith}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
