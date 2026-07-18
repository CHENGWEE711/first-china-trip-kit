# V3 Phase 2 — China Payments & Essential Apps Hub 阶段报告

- 当前阶段：阶段 2 — China Payments & Essential Apps Hub
- 已完成阶段：阶段 1 已验收；阶段 2 已完成，等待验收
- 下一阶段：阶段 3 — Visa-Free Transit Hub（阶段 2 验收后才可开始）
- 禁止提前实施：Visa Hub、Social Landing Pages、Chongqing/Zhangjiajie 热点城市完整页、AI Planner、用户系统
- 项目路径：`/Users/chengwee/Documents/20260704_中国旅游攻略`
- 工作分支：`v3/phase-2-payment-apps-hub`
- 开始 Commit：`b2ccf5b859d576e2339711bf04a149b8acbd3393`
- 报告日期：2026-07-18
- 部署状态：未执行 Preview 或 Production 部署；未修改 Vercel、域名或环境变量

## 1. 阶段结论

阶段 2 已在独立分支完成。新建唯一 Product Hub 路由：

`/payments-and-apps`

页面把支付、必备 App、网络、抵达第一小时、离线备用、互动清单与 $7 Guide 统一为一个可执行的准备系统。没有创建或提前实现阶段 3–8 内容。

本地 release candidate 返回 HTTP 200，静态生成成功，完整信息架构、交互、SEO、GA4 事件、图片来源、响应式和可访问性检查全部通过。

## 2. 页面结构

严格按阶段指令的顺序实现：

1. Hero — `Set Up China Before You Land`
2. Quick Start — `15 Minute Setup`
3. Payment — 四层 Payment Pyramid + Payment Readiness Score
4. Apps — Must Have / Good to Have / Optional + 推荐安装顺序
5. Internet — iPhone/Android、7/30 天、保留/新号码决策树
6. Arrival Day — `The First Hour in China` 时间线
7. Backup Plan — 8 个 `What if...` 备用方案
8. Checklist — 20 项互动清单、进度保存、100% 后解锁 PDF
9. $7 Guide — 5 页真实产品预览与环境门控购买入口
10. FAQ — `People Always Ask`
11. Related Guides — 只保留支付、Apps、eSIM、高铁、离线准备主题

Hero 只有两个按钮：`Get the Free Checklist` 与 `See the $7 Setup Guide`。

## 3. 核心工具

### Payment Readiness Checker

- 五项权重：Primary wallet 25%、Physical card 20%、Bank access 15%、Second payment route 25%、Emergency cash 15%。
- 支持 0–100% 实时得分、缺项提示、完成事件和分享/复制。
- 四项完成、缺现金时准确显示 85%。
- 使用版本化浏览器存储 `fctk:payment-readiness:v1`，不上传个人数据。

### Internet Decision Tree

- 输入设备、旅行时长和号码偏好。
- 输出适合的 eSIM、roaming 或 local SIM 起始方案。
- 明确提醒核对设备兼容性、运营商条款、银行安全消息与当前服务规则。

### Interactive Checklist

- 共 20 项，每项 5%，可准确形成 35%、70%、100% 等进度。
- 使用版本化浏览器存储 `fctk:payment-hub-checklist:v1`。
- 100% 后才显示免费 PDF 下载按钮。
- 支持重置；没有账户、服务端画像或敏感信息收集。

### Backup Plan

覆盖 Alipay、WeChat Pay、无网络、地图失效、叫不到车、语言、没电和只收现金八种失败场景。每项给出可立即执行的替代路径。

## 4. 视觉与设计还原

生产页面继续使用既有暖白、深炭黑、中国红、墨绿、Source Serif 4 与 Inter；使用开放式分区、细分隔线和时间线，避免把全页做成白卡片墙。

设计还原台账：

1. 保留概念稿的非对称三帧真实任务图片序列：扫码支付、手机出行、高铁。
2. 保留大标题、短承诺和严格两个 Hero CTA 的首屏层级。
3. 保留横向 `15 Minute Setup` 四步快速路径，移动端改为自然纵向阅读。
4. 保留 Payment Pyramid 与 Readiness Score 的并列关系；最终实现把工具内部改为单列，修复 1440px 半栏内的拥挤换行。
5. 保留暖白/墨色/中国红/墨绿、开放排版、细线和大留白的整体节奏。
6. 移动端 390px 首屏可看到 H1、副标题与两个 CTA，无横向滚动。
7. 概念稿中的说明性图片标签没有进入生产页面，避免伪装成真实 UI 内容。
8. 生产 Header、Footer 和 CTA 继续复用既有全站组件，没有创建第二套导航体系。

内部概念参考，不作为旅行照片发布：

- `docs/design/v3-phase2/payment-hub-top-concept.png`
- `docs/design/v3-phase2/payment-hub-core-tools-concept.png`

## 5. Penpot Frame

当前工具环境没有可调用的 Penpot 连接器，现有会话也没有经验证的 Penpot 写权限，因此本阶段未伪造或声称创建 Penpot Frame ID。

为保证设计过程可追溯，项目内保存了两张阶段 2 专属概念图、完整前后截图和上述设计还原台账。Penpot Frame 写回是唯一设计工具层遗留项，不影响代码、交互、SEO、测试或部署准备状态。

## 6. 图片来源

Hub 没有使用 AI 旅行照片、第三方热链、未授权 App Logo 或模拟 App 界面。

| 用途 | 本地文件 | 来源 |
|---|---|---|
| 扫码支付 Hero / 抵达支付测试 | `/public/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp` | Pexels, `phase-c-how-to-pay-in-china-as-a-foreigner-hero`, https://www.pexels.com/photo/a-close-up-shot-of-a-person-scanning-a-qr-code-12935051/ |
| 旅行者手机 / Apps | `/public/images/guides/phase-c/best-apps-for-traveling-in-china/hero.webp` | Pexels, `phase-c-best-apps-for-traveling-in-china-hero`, https://www.pexels.com/photo/people-using-phones-in-a-subway-station-31216218/ |
| 中国高铁 | `/public/images/guides/phase-c/how-to-book-high-speed-trains-in-china/hero.webp` | Pexels, `phase-c-how-to-book-high-speed-trains-in-china-hero`, https://www.pexels.com/photo/high-speed-train-at-a-station-in-china-7494174/ |

三张照片均为既有本地、已压缩、已有来源记录的 2400×1600 WebP。产品区使用现有一方 PDF 预览：

- `/public/products/previews/payment-apps-guide-cover.png`
- `/public/products/previews/payment-apps-guide-decision-tree.png`
- `/public/products/previews/payment-apps-guide-app-stack.png`
- `/public/products/previews/payment-apps-guide-hotel-card.png`
- `/public/products/previews/payment-apps-guide-phrase-card.png`

## 7. Analytics

要求的九个 GA4 事件全部实现并通过自动化验证：

| 事件 | 触发点 |
|---|---|
| `payment_hub_view` | Hub 首次渲染 |
| `payment_step_clicked` | Hero / Quick Start 内部步骤入口 |
| `payment_readiness_started` | 首次勾选准备度项目 |
| `payment_readiness_completed` | 点击检查准备度，附带 score 与 missing_count |
| `interactive_checklist_started` | 首次勾选 20 项清单 |
| `interactive_checklist_completed` | 清单首次达到 100% |
| `guide_preview_opened` | 打开 5 页产品预览 |
| `guide_buy_clicked` | 可用 Payhip 购买入口点击 |
| `offline_backup_opened` | 首次打开某一备用场景 |

现有 `trackEvent`、GA4 与 Metricool 加载契约未改变。Payhip 未配置时继续诚实显示站内产品说明路径，不生成无效 checkout，也没有修改环境变量。

## 8. SEO

- canonical：`https://www.firstchinatripkit.com/payments-and-apps`
- 完整 title、description、Open Graph 与 Twitter metadata。
- JSON-LD：WebPage、BreadcrumbList、ItemList、FAQPage。
- `/payments-and-apps` 已加入 sitemap 源；本地 `sitemap.xml` 返回 200 并包含该 URL。
- Payment Cluster Guide 页面新增主题导航，互相链接 Hub、How to Pay、Alipay、WeChat Pay、Apps、eSIM、Checklist。
- Homepage、Start Here、Travel Essentials、Travel Tools 和 Footer 的高意图支付入口改为 Hub。
- 站内链接没有添加 UTM。
- 官方支付来源与审慎免责声明保留在 Payment 区；没有 guaranteed payment、guaranteed entry 或 guaranteed visa 表述。

## 9. 测试结果

### Lint

`npm run lint`：通过，0 error，0 warning。

### TypeScript

`npm run typecheck`：通过，0 error。

### Unit / Contract

`npm test`：49/49 通过，0 skipped，0 failed。

阶段 2 新增四项静态契约验证：范围、九个事件、版本化本地存储/真实图片、sitemap 与高意图导航。

### Build

`npm run build`：通过。

- Next.js 16.2.10
- 58 个 build surfaces
- `/payments-and-apps` 为静态生成页面
- TypeScript、预渲染和 checklist PDF prebuild 正常

### Playwright

全量矩阵：

- 578 passed
- 910 skipped（既有跨项目范围设计）
- 0 failed
- 约 6.4 分钟

视觉基线变化逐张检查后，只接受了 Payment / Apps Guide 的新 Cluster rail、Guides list 与 Homepage Footer 的 Hub 入口变化；未提高差异阈值。

最终 1440px 工具可读性微调后再次运行阶段 2 定向矩阵：10 passed、50 project-scope skipped、0 failed。覆盖 320、390、768、1440、键盘、ARIA、控件尺寸、无横向滚动、交互持久化、事件、SEO 与 Cluster 内链。

### Accessibility

通过自动化检查：单 H1、标题层级无跳级、所有 input 有 label、所有 action 有可访问名称、8 个 disclosure 有 `aria-expanded`、动态分数/结果有 `aria-live`、键盘 Space 可切换 checkbox、主要控件至少 44×44、图片无空 alt、320–1440 无水平溢出。

### Image / Link / SEO Audit

对本地 release candidate (`http://localhost:3000`) 运行完整审计：

- 58 build surfaces；54 个可请求 HTML/metadata 页面成功
- page issues 0
- 116 个 public assets；99 个被本地页面引用
- missing files 0
- exact duplicate groups 0
- Hero < 2000px：0
- Content image < 1400px：0
- oversized assets：0
- license gaps：0
- first-party provenance gaps：0
- broken internal links：0
- missing from sitemap：0
- 26 张重点行程日图 semantic mismatches：0

生产站尚未部署新路由，所以对当前生产 URL 做同类审计时 `/payments-and-apps` 会按预期仍是 404；这不是本地 release candidate 缺陷，而是“先验收、后部署”的阶段门控结果。

## 10. 前后截图

Before（阶段 2 前的支付 Guide 基线）：

- `docs/screenshots/v3-phase2/before/payment-guide-baseline-1440.png`
- `docs/screenshots/v3-phase2/before/payment-guide-baseline-390.png`

After：

- `docs/screenshots/v3-phase2/after/payment-hub-after-1440.png`
- `docs/screenshots/v3-phase2/after/payment-hub-after-390.png`
- `docs/screenshots/v3-phase2/after/payment-readiness-score-85.png`
- `docs/screenshots/v3-phase2/after/interactive-checklist-complete-1440.png`

可复现截图脚本：`scripts/capture-v3-phase2.mjs`。

## 11. 功能保护

- 没有修改 Contact、Newsletter、WhatsApp、Klook、域名或环境变量。
- Payhip 仍由 `NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL` 门控。
- 没有站内 UTM、个人 Gmail、占位符或未经授权的 App Logo。
- 没有创建新 Vercel 项目或执行生产部署。
- 没有移除现有有效 URL；原 Guide 保留并加入主题 Cluster。

## 12. 路线快照

按“每完成两个阶段保存一次”的主控纪律，已创建：

`docs/V3_MASTER_ROADMAP_SNAPSHOT.md`

快照记录阶段 1 已验收、阶段 2 完成待验收、阶段 3 尚未开始。

## 13. 遗留问题

1. Penpot 当前无可用写入连接器，Phase 2 专属 Frame ID 尚未写回；没有伪造 ID。
2. Payhip 的真实购买跳转仍需在已配置对应环境变量的 Preview 中验收；本阶段没有读取、写入或改变环境变量。
3. 支付、App 与网络规则可能变化，上线后仍需按页面官方来源定期复核。
4. 新 Hub 尚未存在于生产站；只有阶段 2 验收后才应部署。
5. Visa Hub 与 Visa eligibility 逻辑没有在本阶段合并或改写。

## 14. Git Commit

- 分支：`v3/phase-2-payment-apps-hub`
- 开始 Commit：`b2ccf5b859d576e2339711bf04a149b8acbd3393`
- 实施提交信息：`Implement V3 payment and essential apps hub`
- 实施 Commit SHA：将在代码、截图与测试成果提交后写入本报告的后续文档提交；不伪造尚未生成的 SHA。

## 15. 验收状态

阶段 2 完成，等待验收。未执行生产部署，未进入阶段 3。
