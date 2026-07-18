# V3 阶段2最终生产验收报告

**验收日期：** 2026-07-18（Asia/Shanghai）  
**验收范围：** V3 阶段2最终生产清理与正式域名验收；未进入阶段3，未新增业务功能。

## 1. 结论

V3 阶段2最终收尾已通过代码、本地生产构建、全量浏览器回归、Vercel Production 部署、正式域名无缓存检查、正式域名浏览器回归与人工视觉检查。

- 生产代码 Git SHA：`ff05566461c2f151b33782e0c0e848956d421657`
- 分支：`main`
- Git 推送：`origin/main` 已包含上述提交
- Vercel Deployment ID：`dpl_9HPHQr8UynBNLTqztJ44LwUSW6w6`
- Production URL：`https://china-travel-cip04ts93-chengwee711-4164s-projects.vercel.app`
- 正式站：`https://www.firstchinatripkit.com`
- Vercel 状态：`Ready`，target 为 `production`
- 未创建新 Vercel 项目；未修改域名或环境变量。

## 2. Git 与 Vercel 基线

开始时 `main` 工作区干净，并与 `origin/main` 一致。阶段1首页和阶段2 Payment Hub 的成果均存在。本轮修复提交并推送后，通过现有 `china-travel-kit` 项目执行强制 Production 部署。

`vercel inspect --wait` 结果为 `Ready`，以下 alias 均指向同一最新 Deployment：

- `https://www.firstchinatripkit.com`
- `https://firstchinatripkit.com`
- `https://china-travel-kit.vercel.app`
- `https://china-travel-kit-chengwee711-4164s-projects.vercel.app`

## 3. 首页与全站 Payment Hub 入口

通用的“开始设置、支付与 App 总览、支付与 App 中心”入口统一指向 `/payments-and-apps`；具体“How to Pay”知识文章仍指向旧 Guide，Hub 和 Guide 职责没有混淆。

正式域名无缓存 HTML 检查：

| 检查项 | 结果 |
| --- | --- |
| 首页 `/payments-and-apps` 链接数 | 6 |
| Start Here Hub 入口 | PASS |
| Store Hub 入口 | PASS |
| Payment Guide 返回 Hub 入口 | PASS |
| Apps Guide 返回 Hub 入口 | PASS |
| eSIM Guide 返回 Hub 入口 | PASS |

新增 `tests/live/payment-hub-entrypoints.spec.ts`，并在本地所有配置浏览器及正式域名 Chromium 上通过。

## 4. Payment Hub SEO

`https://www.firstchinatripkit.com/payments-and-apps` 无缓存检查结果：

| 项目 | 结果 |
| --- | --- |
| HTTP | 200 |
| H1 | 1（唯一） |
| Title | 独立，`China Payments & Essential Apps Hub \| First Trip Setup` |
| Meta description | 独立，包含 payments / essential apps / internet |
| Canonical | `https://www.firstchinatripkit.com/payments-and-apps` |
| Open Graph | 10 项元数据存在 |
| Twitter Card | 4 项元数据存在，包含 `summary_large_image` |
| JSON-LD | 2 组结构化数据 |
| Sitemap | 收录 1 次 |
| Robots | 未禁止，`Disallow: /payments-and-apps` 为 0 |
| 旧 Payment Guide canonical | 仍指向自身，不与 Hub 冲突 |

## 5. 旧技术提示与 Store 文案

仓库和正式域名检查以下文案：

- `Coming soon`
- `A verified partner link has not been configured yet.`
- `Partner link not configured`
- `when configured`

结果：**0 处残留**。没有真实合作链接时，推荐模块整体不渲染，不向访客暴露配置状态。

Store 已使用顾客语言：

- `Secure checkout and instant digital delivery through Payhip.`
- `Download the checklist for free, or optionally support future updates through Payhip.`

正式 Store HTML 中 `public product link`、`environment`、`partner link`、`when configured` 均为 0。

## 6. Store 比较区 DOM

`Free checklist vs. paid setup guide` 使用单一语义数据源和单一 DOM 结构，通过 CSS 在不同视口中调整布局，没有同时输出桌面表格与移动卡片两套内容。

正式 DOM 检查：

- `#free-vs-paid` section：1
- 比较区 H2：1
- 比较数据行：10
- 源码 `freeVsPaidRows.map` 输出：1 处
- 横向滚动：无

## 7. Related Guides 图片

本轮发现并修复了一个实际顺序问题：旧逻辑先按全局 Guide 顺序筛选，可能将配置的 WeChat Pay 挤出前三张。现在先按 `relatedGuideSlugs` 顺序查找目标 Guide，再渲染目标自身 `featuredImage`。

| 目标文章 | 实际渲染图片 | 结果 |
| --- | --- | --- |
| Best Apps | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | PASS |
| Alipay | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | PASS |
| WeChat Pay | `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp` | PASS |
| eSIM | `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp` | PASS |
| Packing List | `/images/guides/phase-c/china-travel-packing-list/card.webp` | PASS |
| Chinese Phrases | `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp` | PASS |

不存在 `categoryFallback`、`defaultFoodImage` 或 `currentPageImage`。新增的实际渲染测试在 Chromium Desktop/Mobile/320、WebKit Desktop/Mobile 和 Firefox Desktop 全部通过。

支付 Guide 的 1440/390 视觉基准因第三张卡片正确变为 WeChat Pay 而产生预期差异。差异图经人工检查后，仅更新这两张基准；未提高差异阈值。

## 8. Payhip 公开商品状态

检查页：`https://payhip.com/b/Gu2XB`

| 检查 | 结果 |
| --- | --- |
| `Only -1 left` | 0，未显示 |
| `On Sale` | 0，未显示 |
| 价格 | `US$7.00` |
| Buy Now | 可用 |
| Checkout | 成功打开 `https://payhip.com/buy?s=1&cart_links%5B%5D=Gu2XB&qty%5BGu2XB%5D=1` |
| 产品说明 | `Printable PDF · 18 pages`、A4、mobile-friendly、instant digital delivery 均存在 |

Payhip 公开状态已反映正确。按本轮范围仅做公开页与 Checkout 入口检查，未执行真实扣款。

## 9. 正式域名无缓存检查

| 路由 | HTTP |
| --- | --- |
| `/` | 200 |
| `/payments-and-apps` | 200 |
| `/guides/how-to-pay-in-china-as-a-foreigner` | 200 |
| `/guides/best-apps-for-traveling-in-china` | 200 |
| `/store` | 200 |
| `/start-here` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |

四个无缓存 HTML 样本中旧技术提示共 0 处。

## 10. 测试和审计

| 命令 | 结果 |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS，54/54，0 skipped |
| `npm run build` | PASS，58 个静态/动态路由生成完成 |
| `npx playwright test` | PASS，594 passed，930 为项目原有的按浏览器/视口条件不适用项，0 failed |
| `node scripts/audit-image-usage.mjs` | PASS，91 unique images，0 errors，2 warnings |
| 正式域名 Payment Hub 定向回归 | PASS，8/8 |
| 应用内浏览器控制台 | 0 errors，0 warnings |
| Payment Readiness 真实交互 | PASS，0% → 25%，验收后恢复 |

两条图片 warning 均是阶段1首页 Hero 替换后未再使用的旧 Phase D 文件：

- `/images/home/phase-d/first-trip-phone-metro-hero.webp`
- `/images/home/phase-d/first-trip-phone-metro-og.webp`

它们不在任何公开页渲染，不构成坏图、性能或 SEO 故障，本轮不扩大范围删除历史资产。

本轮未使用 `.skip` 隐藏失败，未删除原测试，未提高截图差异阈值。

## 11. 正式站截图

- [Homepage 1440px](screenshots/v3-phase2-production/homepage-1440.png)
- [Homepage 390px](screenshots/v3-phase2-production/homepage-390.png)
- [Payment Hub 1440px](screenshots/v3-phase2-production/payment-hub-1440.png)
- [Payment Hub 390px](screenshots/v3-phase2-production/payment-hub-390.png)

四张截图均来自 `https://www.firstchinatripkit.com`，HTTP 200，无横向滚动，截图过程未发现控制台错误。

## 12. 遗留问题

- 无 P0/P1 代码、部署、域名、SEO、入口、图片、Store 或 Payhip 公开状态问题。
- 仅保留两张不再使用的旧首页图片作为非阻断性审计 warning。
- 本报告完成后停止，不进入阶段3。

**V3阶段2已完成生产集成并通过正式域名验收。**
