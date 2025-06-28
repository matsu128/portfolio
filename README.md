# 松本颯 - ポートフォリオサイト

https://soumatsumoto-portfolio.vercel.app/

## ✨ 特徴

- **多言語対応**: 日本語・英語の切り替え機能
- **レスポンシブデザイン**: スマートフォン・タブレット・デスクトップに対応
- **インタラクティブなUI**: Framer Motionによる滑らかなアニメーション
- **3D背景**: Three.jsによる宇宙空間のワイヤーフレームアニメーション
- **スキル可視化**: 液体アニメーションによるスキルバー
- **プロジェクトギャラリー**: スワイプ可能なプロジェクト紹介
- **実務経験タイムライン**: 詳細な職歴とプロジェクト経験

## ✨ Features

- **Multi-language Support**: Japanese/English language switching
- **Responsive Design**: Compatible with smartphones, tablets, and desktops
- **Interactive UI**: Smooth animations with Framer Motion
- **3D Background**: Wireframe space animation using Three.js
- **Skill Visualization**: Liquid animation skill bars
- **Project Gallery**: Swipeable project showcase
- **Work Experience Timeline**: Detailed career history and project experience

## 🛠️ 技術スタック

### フロントエンド
- **React 18.2.0** - UIライブラリ
- **TypeScript 5.8.2** - 型安全性
- **Vite 6.2.3** - 高速ビルドツール
- **SWC** - 高速なTypeScript/JSXコンパイラー

### スタイリング
- **Tailwind CSS 3.4.1** - ユーティリティファーストCSS
- **PostCSS 8.4.38** - CSS処理
- **Autoprefixer** - ベンダープレフィックス自動付与

### UI/UX
- **Framer Motion 11.18.2** - アニメーションライブラリ
- **Radix UI** - アクセシブルなUIコンポーネント
- **Lucide React** - アイコンライブラリ
- **React Icons** - 追加アイコンライブラリ

### 3D・グラフィックス
- **Three.js 0.177.0** - 3Dグラフィックスライブラリ
- **@types/three** - Three.js型定義

### フォーム・バリデーション
- **React Hook Form 7.51.5** - フォーム管理
- **Zod 3.23.8** - スキーマバリデーション
- **@hookform/resolvers 3.6.0** - フォームリゾルバー

### その他のライブラリ
- **clsx 2.1.1** - 条件付きクラス名
- **tailwind-merge 2.3.0** - Tailwindクラス名マージ
- **class-variance-authority 0.7.0** - コンポーネントバリアント
- **date-fns 3.6.0** - 日付操作
- **cmdk 1.0.0** - コマンドパレット

### 開発ツール
- **ESLint** - コード品質管理
- **Tempo DevTools 2.0.108** - 開発支援ツール

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI Library
- **TypeScript 5.8.2** - Type Safety
- **Vite 6.2.3** - Fast Build Tool
- **SWC** - Fast TypeScript/JSX Compiler

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **PostCSS 8.4.38** - CSS Processing
- **Autoprefixer** - Automatic Vendor Prefixes

### UI/UX
- **Framer Motion 11.18.2** - Animation Library
- **Radix UI** - Accessible UI Components
- **Lucide React** - Icon Library
- **React Icons** - Additional Icon Library

### 3D & Graphics
- **Three.js 0.177.0** - 3D Graphics Library
- **@types/three** - Three.js Type Definitions

### Forms & Validation
- **React Hook Form 7.51.5** - Form Management
- **Zod 3.23.8** - Schema Validation
- **@hookform/resolvers 3.6.0** - Form Resolvers

### Other Libraries
- **clsx 2.1.1** - Conditional Class Names
- **tailwind-merge 2.3.0** - Tailwind Class Name Merging
- **class-variance-authority 0.7.0** - Component Variants
- **date-fns 3.6.0** - Date Manipulation
- **cmdk 1.0.0** - Command Palette

### Development Tools
- **ESLint** - Code Quality Management
- **Tempo DevTools 2.0.108** - Development Support Tools

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── home.tsx              # メインコンポーネント（多言語対応）
│   ├── WorkExperienceSection.tsx  # 実務経験セクション
│   ├── ProjectsGallery.tsx   # プロジェクトギャラリー
│   ├── SpaceBackground.tsx   # 3D背景アニメーション
│   └── ui/                   # shadcn/uiコンポーネント
│       ├── liquid-skill-bar.tsx  # カスタムスキルバー
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (その他UIコンポーネント)
├── lib/
│   └── utils.ts              # ユーティリティ関数（cn関数）
├── App.tsx                   # アプリケーションルート
├── main.tsx                  # エントリーポイント
├── index.css                 # グローバルスタイル
└── vite-env.d.ts            # Vite型定義
```

## 📁 Project Structure

```
src/
├── components/
│   ├── home.tsx              # Main component (multi-language support)
│   ├── WorkExperienceSection.tsx  # Work experience section
│   ├── ProjectsGallery.tsx   # Project gallery
│   ├── SpaceBackground.tsx   # 3D background animation
│   └── ui/                   # shadcn/ui components
│       ├── liquid-skill-bar.tsx  # Custom skill bar
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (other UI components)
├── lib/
│   └── utils.ts              # Utility functions (cn function)
├── App.tsx                   # Application root
├── main.tsx                  # Entry point
├── index.css                 # Global styles
└── vite-env.d.ts            # Vite type definitions
```

## 🚀 セットアップ・実行

### 前提条件
- Node.js 18.0.0以上
- npm または yarn

### インストール
```bash
# 依存関係のインストール
npm install
# または
yarn install
```

### 開発サーバー起動
```bash
# 開発サーバー起動
npm run dev
# または
yarn dev
```

### ビルド
```bash
# 本番用ビルド
npm run build
# または
yarn build
```

### プレビュー
```bash
# ビルド結果のプレビュー
npm run preview
# または
yarn preview
```

## 🚀 Setup & Execution

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
# or
yarn install
```

### Development Server
```bash
# Start development server
npm run dev
# or
yarn dev
```

### Build
```bash
# Production build
npm run build
# or
yarn build
```

### Preview
```bash
# Preview build results
npm run preview
# or
yarn preview
```

## 🎨 主要機能

### 1. ヒーローセクション
- 3D宇宙背景アニメーション
- 技術スタックのインタラクティブカード
- 統計情報の表示

### 2. 実務経験セクション
- タイムライン形式の職歴表示
- 詳細情報の展開/折りたたみ
- 技術スタックのバッジ表示

### 3. プロジェクトギャラリー
- スワイプ可能なプロジェクトカード
- iframeによるライブプレビュー
- 技術スタックの表示

### 4. スキルセクション
- 液体アニメーションによるスキルバー
- カテゴリ別スキル表示
- 年数ベースの可視化

### 5. コンタクトセクション
- コンタクトフォーム
- 連絡先情報
- 対応時間の表示

## 🎨 Main Features

### 1. Hero Section
- 3D space background animation
- Interactive technology stack cards
- Statistics display

### 2. Work Experience Section
- Timeline-style career history
- Expandable/collapsible detailed information
- Technology stack badges

### 3. Project Gallery
- Swipeable project cards
- Live preview via iframe
- Technology stack display

### 4. Skills Section
- Liquid animation skill bars
- Category-based skill display
- Year-based visualization

### 5. Contact Section
- Contact form
- Contact information
- Business hours display

## 🌐 多言語対応

日本語・英語の切り替え機能を実装：
- ナビゲーション
- セクションタイトル
- プロジェクト説明
- 実務経験詳細
- コンタクト情報

## 🌐 Multi-language Support

Japanese/English language switching implemented for:
- Navigation
- Section titles
- Project descriptions
- Work experience details
- Contact information

## 📱 レスポンシブデザイン

- **モバイルファースト**設計
- **ブレークポイント**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **タッチ操作**対応（スワイプ、タップ）
- **ハンバーガーメニュー**（モバイル用）

## 📱 Responsive Design

- **Mobile-first** design
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Touch operation** support (swipe, tap)
- **Hamburger menu** (mobile)

## 🎭 アニメーション

### Framer Motion
- ページロード時のフェードイン
- スクロールトリガーアニメーション
- ホバーエフェクト
- スムーズなトランジション

### Three.js
- ワイヤーフレーム立体の浮遊アニメーション
- カメラのゆっくりとした移動
- パーティクルエフェクト

### カスタムアニメーション
- 液体スキルバーの波アニメーション
- 技術カードの光エフェクト
- プロジェクトカードのホバーエフェクト

## 🎭 Animations

### Framer Motion
- Page load fade-in
- Scroll-triggered animations
- Hover effects
- Smooth transitions

### Three.js
- Floating wireframe geometry animation
- Slow camera movement
- Particle effects

### Custom Animations
- Liquid skill bar wave animation
- Technology card light effects
- Project card hover effects

## 🔧 設定ファイル

- **vite.config.ts**: Vite設定（SWC、エイリアス、プラグイン）
- **tailwind.config.js**: Tailwind CSS設定（カスタムカラー、アニメーション）
- **tsconfig.json**: TypeScript設定
- **postcss.config.js**: PostCSS設定
- **components.json**: shadcn/ui設定

## 🔧 Configuration Files

- **vite.config.ts**: Vite configuration (SWC, aliases, plugins)
- **tailwind.config.js**: Tailwind CSS configuration (custom colors, animations)
- **tsconfig.json**: TypeScript configuration
- **postcss.config.js**: PostCSS configuration
- **components.json**: shadcn/ui configuration

## 📦 デプロイ

### Vercel推奨
```bash
# Vercel CLIでデプロイ
npm i -g vercel
vercel
```

### その他のプラットフォーム
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📦 Deployment

### Recommended: Vercel
```bash
# Deploy with Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📄 License

This project is published under the MIT License.

## 👤 作者

**松本颯** - フロントエンド・バックエンドエンジニア

- **実務経験**: 2年+
- **プロジェクト数**: 10+
- **技術スタック**: 15+
- **チーム開発**: 5+

## 👤 Author

**Sou Matsumoto** - Frontend/Backend Engineer

- **Work Experience**: 2+ years
- **Projects**: 10+
- **Technology Stack**: 15+
- **Team Development**: 5+

## 📞 連絡先

- **対応時間**: 平日 9:00-18:00
- **返信**: 24時間以内
- **お問い合わせ**: サイト内コンタクトフォームから

## 📞 Contact

- **Business Hours**: Weekdays 9:00-18:00
- **Response**: Within 24 hours
- **Inquiries**: Via contact form on the site

---

このポートフォリオサイトは、モダンなWeb技術を活用し、ユーザー体験を重視した設計で構築されています。

---

This portfolio site is built with modern web technologies and designed with a focus on user experience.
