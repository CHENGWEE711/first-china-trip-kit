# V3 Phase 1 — Homepage 3.0 阶段报告

- 当前阶段：阶段 1 — Homepage 3.0
- 已完成阶段：阶段 1（完成，等待验收）
- 下一阶段：阶段 2 — Payment & Apps Hub（尚未开始）
- 禁止提前实施：Payment Hub、Visa Hub、社媒专用落地页、热点城市完整页面、AI Trip Planner、Guide 正文大规模重做、Store 业务逻辑改造
- 项目路径：`/Users/chengwee/Documents/20260704_中国旅游攻略`
- 工作分支：`v3/phase-1-homepage-3`
- 开始 Commit：`39de36a1cee083848571f71fbd631581742ab010`
- 开始状态：工作区干净；阶段 1 从 `main` 当前生产基线建立独立分支
- 报告日期：2026-07-18

## 1. 阶段范围

本阶段只把首页从栏目展示页重构为面向第一次来华游客的商业导航首页。已完成 Hero、四任务入口、真实兴趣排序、热点视觉入口、Before You Fly、体验入口、$7 产品展示、精选 Guide、事件跟踪，以及桌面/移动视觉回归。

没有创建 Payment Hub、Visa Hub、Social Landing、Chongqing/Zhangjiajie/Wuhan 完整页面或 AI Planner；没有改变 Store 业务逻辑、环境变量、生产部署或域名。

## 2. 数据依据

### 当前网站兴趣信号

| 页面 | 当前 views |
|---|---:|
| 首页 | 67 |
| Store | 16 |
| How to Pay in China | 12 |
| 240-hour visa-free itinerary | 8 |
| 240-hour visa-free guide | 6 |
| 10-day classic itinerary | 6 |
| Start Here | 6 |
| Tools | 6 |
| Essential Apps Checklist | 6 |

当前可识别来源以 Direct 为主，Threads 与其他社媒引流仍少，因此首页强化真实落地路径、事件与 UTM 透传，而不是引入复杂实时内容 API。当前小样本同时显示：TikTok 的视觉型“中国五帧”内容比纯政策讲解获得更好的初始播放与点赞；Threads 更适合简短、可执行的准备清单；曾出现 TikTok 素材尺寸超过 1080p 的发布失败。

以上均为当前小样本的设计方向信号，不作为长期趋势或规模化用户结论。

## 3. Penpot Frame ID

本阶段尝试访问现有 Penpot 文件 `First China Trip Kit — UI System 2.0`，当前可复用的已批准基线为：

| 参考 | Frame / Page ID |
|---|---|
| Approved Designs page | `a6412e37-8bb7-80fe-8008-5099c0a498ba` |
| Existing approved Desktop | `a6412e37-8bb7-80fe-8008-50a0867e2db8` |
| Existing approved Mobile | `a6412e37-8bb7-80fe-8008-50a0b791f30f` |
| Existing approved group | `a6412e37-8bb7-80fe-8008-50a0866d7ef3` |

当前环境没有 Penpot 写入连接器，浏览器会话打开该文件时处于未登录状态，因此未能在 Penpot 内创建独立的 `Homepage 3.0 / …` Frame ID。实现继续遵循上述已批准 A+B 视觉方向与主控文档的精确 IA；专属 Phase 1 Frame 写回列为验收前唯一设计工具层遗留项，不伪造 ID。

设计还原台账：

- 保留 Source Serif 4、Inter、暖白、深炭黑、中国红、墨绿、Premium Editorial 与 Modern Travel Utility；
- 严格按主控顺序实现十个首页区域；
- 只展示已有真实承接页的 Xi’an 与 Shanghai，未展示空入口；
- 专属 Penpot Frame 未写回，原因仅为当前 Penpot 会话无认证写权限。

## 4. 页面结构变化

1. Header 精简为 Start Here、Destinations、Plan Your Trip、Guides、Store，并保留单一 checklist CTA。
2. Hero 使用指定 H1、副标题、单一主 CTA `Plan Your First China Trip` 与支付次 CTA。
3. 新增四个可整卡点击的任务入口。
4. 新增 `What First-Time Travelers Are Reading`，按当前真实兴趣排序三项。
5. 新增 `Trending in China`，只开放 Xi’an、Shanghai 和真实 Destinations 汇总入口。
6. Before You Fly 重构为 Visa、Payments、Apps & Internet、Transport & Arrival 四个系统。
7. 新增八个均有真实承接页的 `Explore China Your Way` 体验入口。
8. $7 产品区升级为真实封面、三张内部预览、三个结果收益、Preview 和环境门控的 Payhip Buy。
9. Featured Guides 只读取并展示支付、Apps、240-hour 三篇 Guide 自身数据与图片。
10. Newsletter 与 Footer 继续使用现有真实组件。

阶段 1 过渡链接：

- Visa → `/tools/visa-free-eligibility-checker`，阶段 3 再切换 Visa Hub；
- Payment & Apps → `/guides/how-to-pay-in-china-as-a-foreigner`，阶段 2 再切换 Payment Hub；
- City → `/city-kits`；
- Itinerary → `/itinerary-kits`。

## 5. 图片来源

Hero 复用已下载、可追溯的真实 Suzhou Pingjiang Road 照片：

- 本地文件：`/public/images/cities/phase-d/suzhou-pingjiang-canal-hero.webp`
- 尺寸：2400 × 1600
- 来源记录：`phase-d-unsplash-suzhou-pingjiang-canal`
- 方式：本地 Next Image，无第三方热链，无 AI 旅行照片

Popular、Trending、Featured Guides 均读取页面自身图像数据；产品区使用现有真实 PDF 封面和三张内部预览。没有新增未授权 App Logo 或概念拼贴。

## 6. 功能保护

- SEO metadata、canonical、OG、Twitter card 与 JSON-LD 保持有效；
- GA4 与 Metricool 没有重复加载，仍保持仅在既有生产条件下加载；
- Payhip 购买按钮继续由 `NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL` 门控；未配置时不展示无效购买链接；
- Newsletter、Contact、WhatsApp、Klook、Footer 和现有 URL 未改变业务契约；
- UTM 首次进入后的当前会话归因继续透传；没有引入账户或复杂用户系统；
- 移动菜单保持 ARIA、Escape 关闭与焦点返回；
- 未增加全站移动底部任务栏。

## 7. 事件

必需事件全部实现并通过自动化验证：

- `hero_primary_cta_clicked`
- `homepage_task_clicked`
- `homepage_popular_content_clicked`
- `homepage_trending_clicked`
- `homepage_product_preview_clicked`
- `payment_guide_buy_clicked`
- `checklist_opened`

所有 TrackedLink 自动补充 `destination_url` 和已保存 UTM；事件携带 `item_name`、`section`、`utm_source`、`utm_medium`、`utm_campaign`、`utm_content`。购买事件额外携带产品、价格、placement 与 product_id。完整矩阵见 `docs/V3_PHASE_1_EVENT_MATRIX.md`。

## 8. Lint

`npm run lint`：通过，0 error。

## 9. TypeScript

`npm run typecheck`：通过，0 error。

## 10. Tests

`npm test`：通过，45/45。

阶段 1 新增测试文件没有使用 `.skip`。全量 Playwright 中的项目范围跳过来自既有跨项目矩阵，不是为了隐藏阶段 1 失败。

## 11. Playwright

`npx playwright test`：通过。

- 568 passed
- 860 skipped（既有项目/浏览器范围设计）
- 0 failed
- 运行时间约 6.3 分钟
- 本地回归使用已构建的 Next.js production server，避免开发 HMR 资源在长矩阵中的非确定性 `ChunkLoadError`
- 固定 2 workers；截图差异阈值未提高

覆盖：

- 1440 与 390 全页视觉基线；
- 390 移动菜单；
- 1440 产品区；
- 390 四任务入口；
- 375、390、430、768、1024、1440 响应式；
- 键盘、ARIA、单 H1、无横向滚动；
- 主/次 CTA、任务、Popular、Trending、产品预览、Payhip、Guide、Newsletter、Header、Footer 与事件参数。

## 12. Build

`npm run build`：通过。

- Next.js 16.2.10
- 57 个静态/动态路由页面生成完成
- TypeScript 与静态页面生成通过
- Checklist PDF prebuild 正常

## 13. 图片审计

`node scripts/audit-image-usage.mjs`：PASS，0 errors、2 warnings。

两条 warning 指向被新首页 Hero 替换后的旧 Phase D 首页图片：

- `/images/home/phase-d/first-trip-phone-metro-hero.webp`
- `/images/home/phase-d/first-trip-phone-metro-og.webp`

旧 OG 仍被 `lib/site-defaults.json` 作为默认分享资产引用，且两张均保留完整来源记录和回滚价值，因此本阶段未删除。新首页 Hero、Popular、Trending、Guide 与产品图片均存在、可加载并通过真实尺寸检查。

## 14. 回归检查

以下公共页面已在 Chromium、WebKit 与 Firefox 的全量回归矩阵中抽查：

- `/guides`
- `/guides/how-to-pay-in-china-as-a-foreigner`
- `/start-here`
- `/city-kits`
- `/itinerary-kits`
- `/store`
- `/tools`
- `/about`

结果：返回状态、图片加载、控制台错误、水平溢出、Header/Footer 与关键交互检查通过。没有借阶段 1 重做这些页面。

视觉证据：

- Before 1440：`docs/screenshots/v3-phase1/before/homepage-1440.png`
- Before 390：`docs/screenshots/v3-phase1/before/homepage-390.png`
- After 1440：`docs/screenshots/v3-phase1/after/homepage-1440.png`
- After 390：`docs/screenshots/v3-phase1/after/homepage-390.png`
- Mobile menu 390：`docs/screenshots/v3-phase1/after/mobile-menu-390.png`
- Product 1440：`docs/screenshots/v3-phase1/after/product-1440.png`
- Task navigation 390：`docs/screenshots/v3-phase1/after/task-navigation-390.png`

## 15. 遗留问题

1. Penpot 当前会话未认证，专属 `Homepage 3.0 / …` Frames 尚未写回；现有批准稿 ID 与实现差异已完整记录。
2. Payhip Buy 在未配置环境变量的本地/Preview 环境会诚实隐藏；需要在已配置 Preview 中验收真实跳转，但本阶段没有修改任何环境变量。
3. Chongqing、Zhangjiajie、Wuhan 均未公开展示，待阶段 4/5 有真实承接页后再开放。
4. 移动底部任务栏按范围要求留到后续阶段评估。
5. 数据样本仍小，Popular 当前为人工读取既有统计后的静态排序；不应解读为长期排名。

## 16. Git Commit

- 分支：`v3/phase-1-homepage-3`
- 开始 Commit：`39de36a1cee083848571f71fbd631581742ab010`
- 提交信息：`Implement Homepage 3.0 commercial navigation`
- 最终 SHA：在本报告随阶段成果提交后由 `git rev-parse HEAD` 生成并作为 Git 交付对象；报告不伪造自身尚未生成的 SHA。

## 17. Production 部署

未执行 Vercel Production 部署；未修改生产域名、Vercel 项目或环境变量。阶段 1 当前状态仅为本地分支完成并等待验收。
