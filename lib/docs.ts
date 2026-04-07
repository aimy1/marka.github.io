export interface DocSection {
  id: string;
  title: string;
  items: DocItem[];
}

export interface DocItem {
  slug: string;
  title: string;
  content: string;
}

export const docsDataEN: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        slug: "introduction",
        title: "Introduction",
        content: `# Introduction\n\nMarka is a modern Markdown editor built for writers and developers who value clarity, speed, and focus. It strips away every distraction so you can concentrate on what matters most — your words.\n\n## Why Marka?\n\nMost editors try to do everything. They become bloated with features nobody uses, and the writing experience suffers. Marka takes the opposite approach.\n\n> Reduce distractions. Let writing be what it should be.\n\nMarka gives you a clean, split-pane interface: raw Markdown on the left, beautifully rendered output on the right. Both panels scroll in sync. Both are always in view.\n\n## Who is it for?\n\n- **Writers** who want a distraction-free environment\n- **Developers** who live in Markdown and need a real-time preview\n- **Note-takers** who think in bullet points and headings\n- **Technical writers** who produce documentation daily\n\n## Core Principles\n\n1. **Simplicity first** — Every feature earns its place\n2. **Keyboard-driven** — Your hands stay on the keyboard\n3. **Pixel-perfect rendering** — What you write is what you get\n4. **Offline-first** — Your files, your machine, no cloud required\n`,
      },
      {
        slug: "installation",
        title: "Installation",
        content: `# Installation\n\nMarka is available for macOS, Windows, and Linux. Download the installer for your platform from the [Download](/download) page.\n\n## macOS\n\nDownload the \`.dmg\` file, open it, and drag Marka to your Applications folder.\n\n\`\`\`bash\n# Or install via Homebrew (coming soon)\nbrew install --cask marka\n\`\`\`\n\n## Windows\n\nDownload the \`.exe\` installer and run it. Marka will be installed to your Program Files and a shortcut added to your desktop.\n\n## Linux\n\nDownload the \`.AppImage\` or \`.deb\` package.\n\n\`\`\`bash\n# AppImage\nchmod +x Marka-3.3.7.AppImage\n./Marka-3.3.7.AppImage\n\n# Debian/Ubuntu\nsudo dpkg -i marka_3.3.7_amd64.deb\n\`\`\`\n`,
      },
       {
        slug: "quick-start",
        title: "Quick Start",
        content: `# Quick Start\n\nGet up and running in under two minutes.\n\n## Create your first document\n\n1. Launch Marka\n2. Press \`Cmd/Ctrl + N\` to create a new file\n3. Start typing Markdown on the left panel\n4. See your formatted output appear instantly on the right\n`,
      },
    ],
  },
  {
    id: "editor",
    title: "Editor",
    items: [
      {
        slug: "interface",
        title: "Interface Overview",
        content: `# Interface Overview\n\nMarka's interface is deliberately minimal. There are no toolbars cluttering your view — just your text and the result.\n\n## Layout\n\nThe editor is divided into three zones: Editor Panel (Markdown), Preview Panel (HTML), and a subtle Title/Status bar.\n`,
      },
    ],
  },
];

export const docsDataZH: DocSection[] = [
  {
    id: "getting-started",
    title: "入门指南",
    items: [
      {
        slug: "introduction",
        title: "项目介绍",
        content: `# 项目介绍\n\nMarka 是一款为追求效率、速度和专著的创作者及开发者量身打造的现代 Markdown 编辑器。它剥离了一切干扰，让你能够全身心地投入到最重要的事业中——你的文字。\n\n## 为什么选择 Marka？\n\n大多数编辑器试图包罗万象，最后却因臃肿的功能而牺牲了写作体验。Marka 采取了截然相反的路径。\n\n> 减少干扰，让写作重归本质。\n\nMarka 提供纯净的双栏界面：左侧是 Markdown 源码，右侧是精致的渲染效果。左右面板完美同步滚动，始终保持视野对齐。\n\n## 目标用户\n\n- **创意写作者**：渴望零干扰的创作环境\n- **开发者**：深度依赖 Markdown 并需要即时预览效果\n- **笔记爱好者**：习惯于用大纲和标题组织思想\n- **技术撰稿人**：日常产出高质量的技术文档\n\n## 核心理念\n\n1. **极简方案** — 每一个功能都经过审慎权衡\n2. **快捷键驱动** — 让你的双手始终停留在键盘上\n3. **像素级渲染** — 所写即所得，呈现极致视觉体验\n4. **本地优先** — 你的文件存储在你的设备上，无需云端同步\n`,
      },
      {
        slug: "installation",
        title: "安装说明",
        content: `# 安装说明\n\nMarka 支持 macOS、Windows 和 Linux 系统。你可以在 [下载页面](/zh/download) 为你的平台获取安装程序。\n\n## macOS\n\n下载 \`.dmg\` 文件，打开并将其拖入 Applications 文件夹即可。\n\n\`\`\`bash\n# 或通过 Homebrew 安装 (即将发布)\nbrew install --cask marka\n\`\`\`\n\n## Windows\n\n下载 \`.exe\` 安装包并运行。Marka 将安装到 Program Files，并在桌面创建快捷方式。\n\n## Linux\n\n下载 \`.AppImage\` 或 \`.deb\` 安装包。\n\n\`\`\`bash\n# AppImage 运行方法\nchmod +x Marka-3.3.7.AppImage\n./Marka-3.3.7.AppImage\n\n# Debian/Ubuntu 安装\nsudo dpkg -i marka_3.3.7_amd64.deb\n\`\`\`\n`,
      },
      {
        slug: "quick-start",
        title: "快速上手",
        content: `# 快速上手\n\n两分钟内即可完成配置并开始写作。\n\n## 创建你的第一篇文档\n\n1. 启动 Marka\n2. 按下 \`Cmd/Ctrl + N\` 创建新文件\n3. 在左侧面板开始输入 Markdown 源码\n4. 在右侧面板即时看到格式化后的渲染效果\n`,
      },
    ],
  },
  {
    id: "editor",
    title: "编辑器",
    items: [
      {
        slug: "interface",
        title: "界面概览",
        content: `# 界面概览\n\nMarka 的界面经过精心瘦身，没有任何干扰视线的工具栏——只有你的文字和最终效果。\n\n## 布局\n\n编辑器分为三个区域：源码编辑区、动态预览区，以及极简的状态条。\n`,
      },
    ],
  },
];

export function getDocsData(lang: "en" | "zh"): DocSection[] {
  return lang === "zh" ? docsDataZH : docsDataEN;
}

export function getAllDocItems(lang: "en" | "zh"): DocItem[] {
  return getDocsData(lang).flatMap((section) => section.items);
}

export function getDocBySlug(slug: string, lang: "en" | "zh"): DocItem | undefined {
  return getAllDocItems(lang).find((item) => item.slug === slug);
}

export function getFirstDoc(lang: "en" | "zh"): DocItem {
  return getDocsData(lang)[0].items[0];
}
