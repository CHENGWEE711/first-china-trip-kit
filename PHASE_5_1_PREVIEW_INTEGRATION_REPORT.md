# Phase 5.1C — Final P0 Gate Closure（复验中，未获生产授权）

**项目：** First China Trip Kit<br>
**验收日期：** 2026-07-28<br>
**结论：** **不得合并 `main`，不得部署 Production。**

本报告仅记录实际观察与可重复的验证结果；不包含环境变量值、密钥、Token、测试邮箱、订单号、优惠码、支付链接或自由文本表单内容。

## 1. 版本与 Preview 部署

| 项目 | 证据 |
| --- | --- |
| 功能分支 | `feat/v3-phase4b-growth-platform-architecture` |
| 当前分支 Commit | `5854f68a82ea24a3cfa48d4f42025559448deb72` — `fix: restore itinerary review persistence` |
| Preview 运行代码 Commit | `89853128e471181fc8fd3aa38647e88028f54d96` — `fix: fall back to Brevo when subscriber store is unavailable` |
| 推送状态 | 当前功能分支已推送；复验结束时工作树干净。 |
| Vercel 项目 | 既有项目 `chengwee711-4164s-projects/china-travel-kit`；未创建新项目。 |
| Preview URL | `https://china-travel-5co6kcyhi-chengwee711-4164s-projects.vercel.app` |
| Deployment ID | `dpl_FxtmvEYAqog1qDatNB8QqrtS5KdC` |
| 部署目标与状态 | `preview`，Vercel `Ready`；未使用 `--prod`、promote、alias、DNS 或正式域名变更。 |

`5854f68` 只新增可审计的 Supabase 迁移与测试，不改变 Next.js 运行时代码、依赖、配置或 Vercel 变量。因此没有把它当作新的应用部署；现有 Preview 仍在验证正确的 Phase 5.1 运行代码，外部数据库状态已按该迁移补齐。

### 本次最小可靠性修复

1. 之前在 Preview 中，`contact_messages` 表不存在且 Supabase 项目处于暂停状态，导致 Custom Itinerary Review 安全失败。
2. 已恢复同一个既有 Supabase Preview 项目，并在 Dashboard SQL Editor 成功执行了与 [`supabase/migrations/20260728070000_create_contact_messages.sql`](supabase/migrations/20260728070000_create_contact_messages.sql) 一致的最小 DDL。
3. 迁移创建/补齐 `contact_messages` 所需字段并启用 RLS；没有向 `anon` 或 `authenticated` 授予写权限。Vercel API 路由继续仅以服务端 `SUPABASE_SERVICE_ROLE_KEY` 写入。
4. 真实 Preview 行程表单显示保存成功；随后以不含个人信息的聚合查询确认目标来源记录数大于零，且 `source` 与 `status` 符合预期。

## 2. Preview 环境变量与安全边界

以下为已配置或代码支持的 Preview 环境变量**名称**；本报告不记录任何值。

```text
VERCEL_ENV
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_ANALYTICS_DEBUG
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL
NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL
NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL
BREVO_API_KEY
BREVO_LIST_ID
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_NEWSLETTER_TABLE
SUPABASE_CONTACT_TABLE
NEXT_PUBLIC_WHATSAPP_URL
```

- Preview 专用 Payhip URL、GA 调试开关和 Brevo 名单配置已使用；未修改 Production 环境变量。
- `SUPABASE_CONTACT_TABLE` 未显式配置时，代码安全地默认 `contact_messages`；现已实际验证表结构、RLS 与服务端写入路径。
- `BREVO_API_KEY` 只由服务端 API 路由读取；没有 `NEXT_PUBLIC_BREVO_*` 变量或客户端 Bundle 暴露。
- `.gitignore` 覆盖 `.env*`（保留 `.env.example`）、`.vercel`、构建目录和临时报告目录。本次 diff、提交和推送审查未发现密钥、Token、环境文件或测试个人数据。
- 缺失 Payhip、GA、Brevo、Supabase 关键变量时，代码路径以安全失败处理；本地缺失变量构建验证已通过。

## 3. Preview 索引与 SEO 门禁

| 检查项 | Preview / 回归证据 | 结果 |
| --- | --- | --- |
| 全站 Preview noindex | 工具页 `robots` meta 为 `noindex, nofollow`。 | 通过 |
| 响应头 | 返回 `X-Robots-Tag: noindex, nofollow, noarchive`。 | 通过 |
| `/robots.txt` | 返回 `User-Agent: *` 与 `Disallow: /`。 | 通过 |
| Canonical | Readiness 工具 canonical 仍指向正式规范 URL，未改为 Preview hostname。 | 通过 |
| Sitemap | 含 Readiness 工具和 Bundle；不含 `growth-dashboard`。 | 通过 |
| 页面元数据 | 工具、Bundle 和九篇指南的唯一 metadata、OG、结构化数据、面包屑和内部链接由回归测试覆盖。 | 通过（代码/浏览器） |

## 4. Payhip 端到端验收

| 产品 | Preview CTA 与事件 | Payhip 端验证 | 结论 |
| --- | --- | --- | --- |
| Free Checklist | Store CTA 一次点击触发一次 `checklist_download_clicked`。 | 与其它产品独立的正确产品页。 | 入口通过 |
| Payment & Apps Guide — $7 | Store 载入触发 `payment_guide_viewed`；CTA 触发一次 `payment_guide_buy_clicked`。 | 名称与价格正确。 | 入口通过 |
| China Arrival Setup Bundle — $19 | Bundle 载入触发 `arrival_bundle_viewed`；CTA 触发一次 `arrival_bundle_buy_clicked`。 | 直达产品页显示正确名称、$19 价格、封面、PDF Preview、交付控件和无库存异常提示。 | 入口通过 |

已完成一次 100% 折扣零金额订单，验证从 Preview CTA 到结账、完成页、订单记录、交付通知及 PDF 下载/文件有效性。该订单不是付款处理测试。

本轮重新进入真实 $19 Bundle 结账：商品、金额、国家选择和 PayPal/卡支付控件均正确。当前浏览器保存的是卖家侧 Payhip 会话，不能作为“与收款账户不同的受控买家”完成真实付款，也没有提交付款。

**Release Candidate Gate — 已延期。** **“Deferred to Release Candidate due to unavailable controlled buyer account.”** 当前 Phase 5.1 不再以真实扣款阻塞：三个产品入口、$19 商品、零金额订单、交付与 PDF 下载已经验收。完整真实支付步骤、不同于卖家收款账户的受控买家身份、最终 `Pay/Submit` 前的逐次明确确认，以及是否退款的决定均保留到 Release Candidate；不删除任何代码、测试或文档。

## 5. Brevo 联系人与表单验收

### 已完成的真实写入与持久化

- 已使用独立 Preview QA 名单；没有把本次测试写入 Production 名单。
- 已配置/核对所需字段：`EMAIL`、`FIRSTNAME`、`LEAD_SOURCE`、`LEAD_MAGNET`、`READINESS_SCORE`、`READINESS_RISK_LEVEL`、`UTM_SOURCE`、`UTM_MEDIUM`、`UTM_CAMPAIGN`、`LANDING_PAGE`、`CONSENT_TIMESTAMP`。
- 真实 Preview `/api/newsletter` 调用已验证 Readiness Checker 与 Free Checklist 两个来源；同一受控地址的重复提交更新已有联系人，不产生重复联系人。
- 真实 Custom Itinerary Review 已从 Preview UI 返回保存成功。其持久化记录经不含个人信息的聚合查询复核；选择邮件序列的受控提交也显示序列已确认。
- 应用日志不记录完整邮箱、表单正文或其他敏感内容；服务器端 Brevo 调用不向客户端暴露 API Key。

### 表单安全与可靠性

| 要求 | 证据 | 结果 |
| --- | --- | --- |
| 客户端与服务端校验 | API 字段长度、格式、枚举和必填项均有限制；组件有对应前端限制。 | 通过（代码/测试） |
| 恶意 HTML 过滤 | `sanitizePlainText` 移除标签与控制字符；回归测试通过。 | 通过 |
| 蜜罐与限长 | Newsletter/Contact 均有 `website` 蜜罐与请求/字段上限。 | 通过 |
| 重复提交控制 | UI pending 状态禁用按钮；Brevo 真实重复提交为联系人更新。 | 通过 |
| 超时与安全失败 | 客户端请求 10 秒，供应商调用 8 秒；失败显示可重试的安全消息。 | 通过 |
| 刷新安全 | 成功 URL 不含邮箱；刷新不会自动重提。 | 通过（代码/回归） |
| Itinerary 数据持久化 | Preview 写入、RLS 边界和无个人信息的数据库聚合查询均已复核。 | **通过** |

**联系人字段逐项 UI 取证仍是 P1：** 需要在 Brevo 侧对每个三来源联系人逐项核对 `LEAD_SOURCE`、`LEAD_MAGNET`、Readiness 分数/风险和 UTM/落地页字段；这不影响已关闭的 Supabase 表单持久化 P0，但不能替代邮件交付验收。

## 6. Brevo 五封自动化

Preview QA 自动化保持未启用。登录复验可见同一个 Preview 工作流、正确的名单触发器和一个首封邮件节点，但该节点仍标为“需要定义并保存”。当打开其编辑操作时，Brevo 工作流前端再次稳定出现第一方 `TypeError: f?.map is not a function`；因此不能可靠编辑、保存、添加后续等待/邮件，或执行测试。

已在 2026-07-27T22:28:44Z 向 Brevo Help Center 提交去敏支持请求；提交页未返回可记录的支持单号。为避免误发、重复发送或污染名单，未启用该自动化，也没有伪造发送、移动端、退订、回复地址或 UTM 送达证据。

| 邮件 | 配置/送达验收 |
| --- | --- |
| 立即：结果或免费清单 | 节点草稿存在，但无法定义并保存。 |
| 测试延时 1：支付设置 | 未完成。 |
| 测试延时 2：APP 与网络 | 未完成。 |
| 测试延时 3：行程与交通 | 未完成。 |
| 测试延时 4：$19 Bundle | 未完成。 |

**结果：P0。** 需先由 Brevo 修复其编辑器/动作保存错误，再以受控可收件邮箱使用短延时完成五封测试，随后恢复正式第 0、2、4、7、10 天节奏。

## 7. GA4 DebugView 与事件验收

### 已完成：Preview 真实 Tag Assistant 发送证据

Tag Assistant 已连接 Preview，识别到唯一匹配的 Google tag，且已发送命中包含调试标记。以下 13 个事件均在**桌面端**从真实 Preview UI 各触发一次并出现在 Tag Assistant 事件列表：

| 事件 | 触发页面 / 操作 | 参数与去重 |
| --- | --- | --- |
| `newsletter_subscribed` | 首页 Free Checklist 订阅成功 | 一次；无邮箱参数。 |
| `checklist_download_clicked` | Store 免费清单 CTA | 一次。 |
| `readiness_checker_started` | Checker 首次回答 | 一次。 |
| `readiness_checker_completed` | 完成 12 题 | 分数、状态、未解决数；一次。 |
| `readiness_result_email_submitted` | Checker 结果邮箱成功提交 | 分数、状态、未解决数；一次；无邮箱。 |
| `payment_guide_viewed` | Store 载入 | 一次。 |
| `payment_guide_buy_clicked` | $7 Guide CTA | 一次。 |
| `arrival_bundle_viewed` | Bundle 页载入 | 一次。 |
| `arrival_bundle_buy_clicked` | Bundle Payhip CTA | 一次。 |
| `affiliate_link_clicked` | Travel Tools 联盟 CTA | 一次；不带目标 URL token。 |
| `whatsapp_contact_clicked` | Contact 页 WhatsApp CTA | 一次；未发送聊天内容。 |
| `itinerary_review_started` | Custom Itinerary 首次聚焦 | 一次。 |
| `itinerary_review_submitted` | Custom Itinerary 保存成功 | 一次；无表单正文或联系信息。 |

390px 移动端另完成并在 Tag Assistant 事件列表中复核 7 个核心事件：`readiness_checker_started`、`readiness_checker_completed`、`readiness_result_email_submitted`、`payment_guide_viewed`、`payment_guide_buy_clicked`、`arrival_bundle_viewed`、`arrival_bundle_buy_clicked`。没有向 GA4 发送邮箱、姓名、电话、WhatsApp 内容、Brevo 标识或表单正文。

### 未完成：稳定的 GA4 DebugView 取证

登录的正确 GA4 媒体资源曾短暂显示 Preview 的 `page_view`、Checker 与 Bundle 事件；但重新载入后 DebugView 又显示 `0` 个调试设备及空事件面板，未能稳定保留或展示本轮全部 13 个桌面与 7 个移动端事件。因此 Tag Assistant 的已发送命中是强外部等价证据，但**不替代本阶段明确要求的 GA4 DebugView 最终截图/参数清单**。

**结果：P0。** 需解决 GA4 DebugView 的设备识别/展示不一致后，在同一 Preview 会话中重新截图并逐项登记实际参数、次数、桌面/移动结果和 PII 复核结论。

## 8. 回归、构建与视口

| 门禁 | 最新结果 |
| --- | --- |
| `npm test` | 通过，72/72。 |
| `npm run lint` | 通过。 |
| `npm run typecheck` | 通过。 |
| 标准 production build | 通过，74 条应用路由。 |
| 缺失关键环境变量 build | 通过；缺少 Payhip、GA、Brevo、Supabase 时安全失败。 |
| 新工具浏览器回归 | `tests/phase5/arrival-readiness.spec.ts` Chromium Desktop 通过；覆盖完整 lead-flow mock、SEO/PII 与 390/768/1440/1920px。 |
| 既有关键回归 | `tests/live/phase5-regression.spec.ts` Chromium Desktop 通过。 |
| Preview 页面健康 | Readiness、Store、Bundle、Contact/Custom Itinerary 均渲染；未见应用自身 console error。 |
| Lighthouse | 尚未在受保护 Preview 重跑和记录分数；P1。 |

## 9. P0 / P1 / P2 与已知问题

### P0 — 阻止上线

1. **Brevo 五封自动化未完成。** Preview 工作流编辑器的第一方错误阻止动作保存和五封实际测试；工作流保持未启用。
2. **GA4 DebugView 不稳定。** Tag Assistant 已验证真实 13 桌面 / 7 移动事件及无 PII，但 GA4 DebugView 未能稳定显示同一会话，缺少要求的最终证据。

### P1 — 生产授权前应补齐

1. 在 Brevo 联系人 UI 中逐项复核三来源的 `LEAD_SOURCE`、`LEAD_MAGNET`、`READINESS_SCORE`、`READINESS_RISK_LEVEL`、`LANDING_PAGE` 与 UTM 值。
2. 对 Vercel Preview 重跑 Lighthouse（性能、无障碍、最佳实践、SEO），并记录路由与分数。
3. 对 Preview 全页面执行最终内部链接/404 检查并记录结果。

### P2 — 后续优化

1. 等待 Brevo 对已提交的工作流编辑器错误支持请求作出回复；在修复前不启用或伪造自动化。
2. 外部平台稳定后，比较 Preview 与本地 Lighthouse 差异。

### Release Candidate Gate — 唯一延期付款门禁

**真实 $19 支付测试：Deferred to Release Candidate due to unavailable controlled buyer account.**

进入 Release Candidate 后，从 Preview/RC 页面开始，使用不同于卖家收款账户的受控买家邮箱和付款方式，复核 CTA 事件、结账、成功页、订单记录、交付邮件、PDF 下载与文件内容。到最终付款按钮时，必须重新取得账户持有人的单次明确扣款授权；不得自动提交。订单产生后是否退款由账户持有人按 Payhip 政策决定。

## 10. 回滚方案

1. 保持功能分支未合并；不得以 promote 或 production deploy 处理当前 Preview。
2. 如需撤回本次应用仓库改动，回滚目标为 `9f609b8f223c1f8360b627e5bbf30b6952b7fc44`，然后只创建新的 Preview 验证，不重写历史。
3. 本次数据库迁移是最小、加性且已有真实提交记录；不建议在没有数据保留决策时删除表或测试记录。任何数据库回退须单独审批并以可恢复方式执行。
4. 如需撤销 Preview，只删除该 Preview deployment 与其 Preview 专用变量绑定；不改变 Production 域名、DNS、别名或 Production 变量。
5. 真实付款测试产生订单后，是否退款由账户持有人决定，并按 Payhip 政策处理；不得把订单或买方数据写入本报告。

## 11. 最终生产建议

**不建议进入生产部署。**

本轮已关闭 Supabase/Custom Itinerary 持久化 P0，确认 Payhip 三个产品入口和零金额交付，完成真实 Preview 事件触发的 Tag Assistant 证据，并通过所有本地质量门禁。当前仅 Brevo 五封自动化与 GA4 DebugView 稳定取证为 P0；真实 $19 付款已明确延期至 Release Candidate。

若 Brevo 与 GA4 P0 全部关闭，结论只能是“进入 Release Candidate 付款门禁”，而不是部署 Production。等待 Brevo 平台修复、GA4 DebugView 复现及 Release Candidate 的逐次付款确认。不得自动合并 `main`、部署 Production、修改正式域名或开始 Phase 6。
