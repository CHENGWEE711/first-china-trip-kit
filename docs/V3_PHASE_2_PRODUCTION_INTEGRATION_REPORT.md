# V3 Phase 2 Production Integration Report

验收日期：2026-07-18（Asia/Shanghai）
范围：只处理 China Payments & Essential Apps Hub 的生产接线与 P0 修复；未进入 V3 阶段 3。

## 1. 版本与生产部署

- 分支：`main`
- 最新生产代码 Commit：`78b4d89f3fb78cb96d0b99ba3ab42f88fd560e83`
- Commit 标题：`Complete V3 phase 2 production integration`
- 阶段 2 Commit 均为当前版本祖先：
  - `c6a3b39a076cda01f5b56504971cbd9fd533d552`
  - `d7c10b65aaec288234aea38b21a62540b825b8f2`
- Vercel 项目：`china-travel-kit`
- Production Deployment：`https://china-travel-4m0gim5qf-chengwee711-4164s-projects.vercel.app`
- Deployment ID：`dpl_3PeQ1KAqB6ZQ81x51DxJZnAgGA9T`
- 状态：`Ready`
- 正式域名映射：
  - `https://www.firstchinatripkit.com` → 上述 Production Deployment
  - `https://firstchinatripkit.com` → 上述 Production Deployment
- 未创建新 Vercel 项目，未修改域名，未修改环境变量。

V3 阶段 1 首页仍在线：正式首页保留 Homepage 3.0 Hero、四个任务入口、热门内容、热点城市、Before You Fly、Explore by Experience、$7 产品和原有追踪结构。

## 2. `/payments-and-apps` 正式域名结果

- `curl -I`：HTTP `200`
- `curl -L`：最终 URL 保持 `/payments-and-apps`，未跳转到旧 Guide
- H1：1 个，`Set Up China Before You Land`
- Payment Readiness：存在且正式域名交互成功
- Apps、Internet、Arrival Day、Backup Plan：全部存在
- Free Checklist、$7 Guide：全部存在
- canonical：`https://www.firstchinatripkit.com/payments-and-apps`
- Open Graph：存在
- JSON-LD：2 个结构化数据脚本
- 横向滚动：1440px、390px 均为 0
- 正式浏览器控制台错误：0

## 3. 全站入口接线

所有“总览、开始准备、设置支付与 App”高意图入口已统一进入 `/payments-and-apps`，具体问题仍可进入子 Guide。

已覆盖：

- Homepage Hero：`Set Up Payments & Apps`
- Homepage 任务入口：`Set Up Payments & Apps`
- Homepage Before You Fly：Payments、Apps & Internet
- Start Here 支付准备步骤
- Header 主导航：`Payments & Apps`
- Footer：Payments & Apps
- Store：`Start with the free Payments & Apps Hub`
- Travel Essentials kits：Payments、Apps、Internet 三个入口及对应锚点
- Thank-you 后续步骤
- Payment、Apps、eSIM Guide 的上级 Hub rail
- Brevo Welcome 第 2 天链接
- 当前支付类 Threads、Instagram、Reddit、Quora、Pinterest、TikTok 默认落地页与 UTM 表

正式首页当前可发现 6 个 `/payments-and-apps` 入口。所有站内链接均未添加 UTM。

## 4. 旧技术提示清理

在 6 个正式验收路由的可见主内容中，以下技术提示合计数量为 `0`：

- `Coming soon`
- `A verified partner link has not been configured yet.`
- `Partner link not configured`
- `when configured`

没有真实合作链接时，访客侧按钮、卡片或整个推荐模块不渲染；不再输出空壳、不可点击卡片或配置状态。

## 5. Related Guides 图片

- `GuideCard` 始终读取目标文章自身的 `guide.featuredImage`。
- Related Guides 传入每一个目标 `relatedGuide`。
- 未发现 `categoryFallback`、`defaultFoodImage` 或 `currentPageImage`。
- 正式支付 Guide 已验证：
  - Apps → `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp`
  - Alipay → `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp`
- 图片审计：91 张唯一图片通过，0 错误；2 条非阻断警告均为旧首页未引用素材。

## 6. Store 修复

- 技术配置文案已改为顾客语言：`Secure checkout and instant digital delivery through Payhip.`
- 免费项文案已改为：`Download the checklist for free, or optionally support future updates through Payhip.`
- Free vs Paid 数据在源码和正式 DOM 中只输出一次；桌面与移动端共用同一响应式结构。
- 正式 Store 技术提示为 0。
- $7 商品链接正确指向 Payhip 商品 `Gu2XB`，并保留网站来源 UTM。

## 7. Payhip 商品检查

已在公开商品与 Checkout 完成以下非扣款检查：

- 商品页面可访问：`https://payhip.com/b/Gu2XB`
- 当前价格：`$7.00`
- `Buy Now` 可用
- Checkout 可到达：`https://payhip.com/buy?s=1&cart_links%5B%5D=Gu2XB&qty%5BGu2XB%5D=1`
- Checkout 显示正确商品、$7 总价和购买邮箱字段
- 未输入个人支付资料，未发生真实扣款

2026-07-18 已通过登录后的 Payhip 后台完成商品设置：

- `Advanced options → Limit the number of times this product can be sold` 保持未勾选，并保存成功；
- Payhip 返回 `Your product changes have been saved.`；
- 重新进入编辑页后确认库存限制仍为未勾选，数字商品为无限库存；
- 商品价格仍为 `$7.00`；
- 公开商品页 `Only -1 left` 数量为 0；
- 公开商品页 `On Sale` 数量为 0；
- 保存后重新测试 `Buy Now`，可进入显示正确商品与 `$7.00` Total 的 Checkout；
- 未输入支付资料，未发生真实扣款。

库存、促销标签、价格和 Checkout P0 已关闭。数字文件交付与购买邮件仍需在另一次明确授权的零扣款测试订单中验证。

## 8. Sitemap、robots 与 SEO

- `https://www.firstchinatripkit.com/sitemap.xml`：HTTP `200`，包含 `/payments-and-apps`
- `https://www.firstchinatripkit.com/robots.txt`：HTTP `200`，未阻止 `/payments-and-apps`
- Hub 未设置 `noindex`
- Hub canonical 正确
- 旧 Payment Guide 使用其自身 canonical，不与 Hub 冲突
- 首页与 Payment、Apps、eSIM 子 Guide 均存在 Hub 内链

## 9. 正式域名路由验收

以下路由均返回 HTTP `200`：

- `/`
- `/payments-and-apps`
- `/guides/how-to-pay-in-china-as-a-foreigner`
- `/guides/best-apps-for-traveling-in-china`
- `/store`
- `/start-here`
- `/sitemap.xml`
- `/robots.txt`

专项正式域名 Playwright：`14 passed`。覆盖 Hub 可发现性、主要入口、技术提示、坏图、横向滚动、控制台、Payhip 链接、GA4 事件、Related Guides、canonical、sitemap 和 robots。

生产 GA4 已捕获：

- `payment_hub_view`
- `payment_step_clicked`
- `payment_readiness_started`
- `payment_readiness_completed`
- `interactive_checklist_started`
- `offline_backup_opened`
- `guide_preview_opened`

## 10. 全量验证结果

| 验证 | 结果 |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS，54/54 |
| `npm run build` | PASS，58 个静态/生成页面；首次重跑曾遇到 Google Fonts 临时网络失败，字体端点恢复后同一代码成功 |
| `npx playwright test` | PASS，582 passed，930 按项目矩阵配置 skipped，0 failed |
| `node scripts/audit-image-usage.mjs` | PASS，91 unique，0 errors，2 warnings |
| 正式域名专项 Playwright | PASS，14/14 |

## 11. 正式域名截图

- `docs/screenshots/v3-phase2-production/homepage-1440.png`
- `docs/screenshots/v3-phase2-production/homepage-390.png`
- `docs/screenshots/v3-phase2-production/payment-hub-1440.png`
- `docs/screenshots/v3-phase2-production/payment-hub-390.png`

四张截图均来自 `https://www.firstchinatripkit.com`，状态为 200，无横向滚动，已人工检查页面完整性与移动端可读性。

## 12. 未完成问题

库存限制、`Only -1 left` 与 `On Sale` 已修复。仅 Payhip 数字文件交付及购买邮件尚未通过零扣款测试订单验证；网站生产集成、入口、SEO、图片、Store、GA4 与正式域名验收没有其他未完成问题。

V3阶段2已完成生产集成并通过正式域名验收。
