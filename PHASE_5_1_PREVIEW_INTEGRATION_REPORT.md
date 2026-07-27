# Phase 5.1B — Full External Integration Automation

**项目：** First China Trip Kit<br>
**验收日期：** 2026-07-27<br>
**结论：** **不得合并 `main`，不得部署 Production。**

本报告只记录已实际观察到的结果。它不包含环境变量值、密钥、Token、测试邮箱、订单号、优惠码或任何自由文本表单内容。

## 1. 版本与 Preview 部署

| 项目 | 证据 |
| --- | --- |
| 功能分支 | `feat/v3-phase4b-growth-platform-architecture` |
| 最终 Commit | `89853128e471181fc8fd3aa38647e88028f54d96` — `fix: fall back to Brevo when subscriber store is unavailable` |
| 推送状态 | 已推送到同名远程功能分支；工作树在提交后保持干净。 |
| Vercel 项目 | 既有项目 `chengwee711-4164s-projects/china-travel-kit`；未创建新项目。 |
| Preview URL | `https://china-travel-5co6kcyhi-chengwee711-4164s-projects.vercel.app` |
| Deployment ID | `dpl_FxtmvEYAqog1qDatNB8QqrtS5KdC` |
| 部署目标与状态 | `preview`，Vercel `Ready`；创建时间 2026-07-27 23:13:38（Asia/Shanghai）。 |
| Build 结果 | Ready；Vercel inspection 显示 603 个构建输出项。 |

此部署通过 `vercel deploy --force --yes` 创建，未使用 `--prod`、promote、alias、DNS 或正式域名变更命令。

### 本次最小可靠性修复

Preview 的实际 Readiness 提交曾暴露一个可靠性缺口：当可选的 Supabase 订阅存储不可用时，服务会在调用已配置的 Brevo 前提前返回。现已在 [`lib/services/newsletter.ts`](lib/services/newsletter.ts) 增加服务端 Brevo 回退，并在 [`tests/phase5-1-preview-integration.test.mjs`](tests/phase5-1-preview-integration.test.mjs) 增加回归测试。它不暴露凭据、不改变前端 API，也沿用 Brevo 的幂等更新逻辑。

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

- 三个 Payhip URL、Preview GA 调试开关和 Preview 专用 Brevo list 配置均在功能分支的 Preview 作用域中使用；未修改 Production 环境变量。
- `BREVO_API_KEY` 仅由 API 路由的服务端代码读取；没有 `NEXT_PUBLIC_BREVO_*` 变量，也没有将该 Key 打包到客户端。
- `.gitignore` 覆盖 `.env*`（保留 `.env.example`）、`.vercel`、构建目录和临时报告目录；本次 diff 与已跟踪文件检查未发现密钥、Token 或本地环境文件。
- 已在全部 Payhip、GA、Brevo 与 Supabase 关键变量置空的本地构建中确认安全失败构建通过。

## 3. Preview 索引与 SEO 门禁

| 检查项 | 真实 Preview 证据 | 结果 |
| --- | --- | --- |
| 全站 Preview noindex | 工具页 DOM `robots` meta 为 `noindex, nofollow`。 | 通过 |
| 响应头 | 工具页返回 `X-Robots-Tag: noindex, nofollow, noarchive`。 | 通过 |
| `/robots.txt` | 返回 `User-Agent: *` 与 `Disallow: /`。 | 通过 |
| Canonical | Readiness 工具 canonical 为正式规范 URL，未改为 Preview hostname。 | 通过 |
| Sitemap | 包含 Readiness 工具和 Bundle；`growth-dashboard` 不在 sitemap。 | 通过 |
| 页面元数据 | 工具、Bundle 和九篇指南的唯一 metadata、OG、结构化数据、面包屑和内部链接由现有回归测试覆盖。 | 通过（代码与浏览器回归） |

## 4. Payhip 端到端验收

| 产品 | Preview CTA 与事件 | Payhip 端验证 | 结论 |
| --- | --- | --- | --- |
| Free Checklist | Store CTA 触发一次 `checklist_download_clicked`，并打开对应 Payhip 产品。 | 产品目标与其它两个产品分离。 | 入口通过 |
| Payment & Apps Guide — $7 | Store 页面触发 `payment_guide_viewed`；一次 CTA 点击触发一次 `payment_guide_buy_clicked`，并打开正确 $7 产品。 | 名称与价格同页面展示一致。 | 入口通过 |
| China Arrival Setup Bundle — $19 | Bundle 页面载入触发一次 `arrival_bundle_viewed`；一次 CTA 点击触发一次 `arrival_bundle_buy_clicked`，并打开正确 Bundle 产品。 | 公共产品页验证名称、$19 价格、封面、PDF Preview、购买控件和无库存异常提示。 | 入口通过 |

Bundle 已完成一次 100% 折扣的零金额测试订单。已验证：从 Preview CTA 到结账、完成页、Payhip 客户订单记录、交付通知，以及下载链接返回 `200`、`application/pdf`、正确文件名和有效 PDF 签名。PDF 内容对应当前 Bundle 文件。测试订单没有使用真实付款方式。

**真实支付处理测试尚未执行。** 依据本阶段约束，提交真实 $19 付款前仍需要账户持有人在该操作当下给予明确确认；本报告不把零金额测试替代为真实支付证据。

## 5. Brevo 联系人与表单验收

### 已完成的真实写入

- 创建了独立的 `China First Trip Kit - Preview QA` 测试名单，未将测试数据写入既有生产名单。
- 已配置/核对所需联系人字段：`EMAIL`、`FIRSTNAME`、`LEAD_SOURCE`、`LEAD_MAGNET`、`READINESS_SCORE`、`READINESS_RISK_LEVEL`、`UTM_SOURCE`、`UTM_MEDIUM`、`UTM_CAMPAIGN`、`LANDING_PAGE`、`CONSENT_TIMESTAMP`。
- 通过受保护 Preview 的真实 `/api/newsletter` 调用，Readiness Checker 与 Free Checklist 两个独立的非个人测试地址均返回 `ok: true`、`provider: brevo`、`delivery_status: active`。
- Readiness 地址第二次提交返回同样的 active 结果；Brevo 联系人档案显示为 Preview QA 名单中的单一联系人，符合更新而非重复创建的预期。
- Brevo 联系人档案已实际显示 lead magnet、UTM、signup page、consent timestamp 和名单归属。Readiness score/risk/source/landing page 的独立 UI 可见性尚未完成复核，见 P1。
- Vercel 运行日志仅显示请求方法与路径；应用代码没有记录完整邮箱、自由文本或其他敏感表单内容。

### 未通过：Custom Itinerary Review

对 Preview `/api/contact` 发出的有效、非个人、无敏感内容的测试请求返回安全的不可用提示，而不是成功。原因是 `saveContactMessage` 的 Supabase 写入失败，导致路由在启动 Newsletter/Brevo 订阅前安全退出。

这证明错误提示和“不误报成功”行为正确，但**不能**作为 Itinerary Review 已保存或 Brevo `itinerary_review` 已写入的证据。它是 P0。

### 表单安全与可靠性

| 要求 | 证据 | 结果 |
| --- | --- | --- |
| 客户端与服务端校验 | API 字段长度、格式、枚举和必填项均有服务端限制；组件有对应客户端限制。 | 通过（代码/测试） |
| 恶意 HTML 过滤 | `sanitizePlainText` 移除标签与控制字符；回归测试通过。 | 通过 |
| 蜜罐与限长 | Newsletter/Contact 均有 `website` 蜜罐与请求/字段上限。 | 通过 |
| 重复提交控制 | UI pending 状态禁用按钮；Brevo 实际第二次提交更新同一联系人。 | 通过（Newsletter） |
| 超时与安全失败 | 客户端请求 10 秒，供应商调用 8 秒；失败显示可重试的安全消息。 | 通过 |
| 刷新安全 | 没有邮箱进入成功 URL，也没有刷新后自动重提。 | 通过（代码/回归） |
| API 失败不误报 | Itinerary Preview 真实失败响应未返回成功。 | 通过 |
| Itinerary 数据持久化 | Supabase 真实写入未成功。 | **失败 / P0** |

## 6. Brevo 五封自动化

已创建 Preview 专用自动化草稿并配置为由 Preview QA 名单加入触发。应用内邮件文案、退订入口、回复地址和统一 UTM 规范保留在 [`docs/brevo-welcome-funnel.md`](docs/brevo-welcome-funnel.md)。

但 Brevo Workflow 编辑器在保存首封邮件设计时出现平台运行时错误，刷新后工作流编辑页保持空白。该错误在 Brevo 自身工作流资源中复现，联系人列表页面仍可正常使用。为避免误发、重复发送或污染生产名单，未启用该草稿，也没有伪造五封送达证据。

| 邮件 | 发送、移动端、UTM、退订与回复地址验收 |
| --- | --- |
| 立即交付 | 未完成 |
| 测试延时 1：支付设置 | 未完成 |
| 测试延时 2：APP 与网络 | 未完成 |
| 测试延时 3：行程与交通 | 未完成 |
| 测试延时 4：$19 Bundle | 未完成 |

**结果：P0。** 需要在 Brevo 编辑器恢复后，使用受控可接收邮箱完成短延时测试；之后再恢复第 0、2、4、7、10 天节奏。

## 7. GA4 DebugView 与事件验收

Preview 页面加载了 GA 脚本并启用了 Preview 调试配置；应用的 Preview analytics console 记录显示以下事件在桌面 Preview UI 中各一次：

- `readiness_checker_started`
- `readiness_checker_completed`（100 分、`ready`、未解决项为 0）
- `payment_guide_viewed`
- `payment_guide_buy_clicked`
- `arrival_bundle_viewed`
- `arrival_bundle_buy_clicked`
- `checklist_download_clicked`

Bundle、Guide 和 Checklist 的单次 CTA 重新验证均未发现应用侧重复触发。工具答案与表单邮箱没有被传入事件参数；现有允许参数白名单与 PII 排除回归测试仍通过。

已在登录的正确 GA4 媒体资源中打开 DebugView。实际结果是 **0 个调试设备**，因此尚无任何事件的 DebugView 收件证据，且以下项目未完成：

- `readiness_result_email_submitted` 与 `newsletter_subscribed` 的真实 UI 成功触发；
- `affiliate_link_clicked`、`whatsapp_contact_clicked`、`itinerary_review_started`、`itinerary_review_submitted` 的 Preview DebugView 证据；
- 全部 13 个事件的实际参数、次数、桌面/移动端 DebugView 复核。

**结果：P0。** Preview console/数据层等价证据不替代 GA4 DebugView。DebugView 未识别该 Preview 调试会话前，不得声称 GA4 外部集成验收通过。

## 8. 回归、构建与视口

| 门禁 | 最新结果 |
| --- | --- |
| `npm test` | 通过，71/71。 |
| `npm run lint` | 通过。 |
| `npm run typecheck` | 通过。 |
| 标准 production build | 通过，74 条应用路由。 |
| 缺失关键环境变量 build | 通过；不配置 Payhip、GA、Brevo、Supabase 时安全构建。 |
| 新工具浏览器回归 | `tests/phase5/arrival-readiness.spec.ts` Chromium Desktop 已执行；覆盖完整 lead-flow mock、SEO/PII 与 390/768/1440/1920px。 |
| 既有关键回归 | `tests/live/phase5-regression.spec.ts` Chromium Desktop 已执行。 |
| Preview 页面健康 | Readiness、Store、Bundle 均渲染为非空内容；未见应用自身 console error。浏览器扩展日志不计为应用错误。 |
| Lighthouse | 尚未对新的受保护 Vercel Preview 重跑；见 P1。 |

Browser 连接可正常完成页面载入、答题、CTA 与事件验证，但在受控邮箱输入表单上未发出原生 API 请求。项目 Playwright 回归以原生浏览器提交同一表单并通过；服务端真实 API 已通过 Vercel 受保护 Preview 通道完成 Brevo 验证。因此该浏览器自动化差异不被归因为产品成功或失败，也不替代邮件/UI 成功状态证据。

## 9. P0 / P1 / P2 与已知问题

### P0 — 阻止上线

1. **Custom Itinerary Review 的 Supabase 写入失败。** 真实 Preview API 安全失败，阻止行程表单持久化及其可选 Brevo 订阅。Supabase Dashboard 当前还要求登录，因此尚不能只读核对 Preview 表、RLS 或服务角色连接配置。
2. **Brevo 五封自动化未完成。** Preview 工作流编辑器发生平台错误；没有五封真实邮件、移动端、退订、回复地址与 UTM 送达证据。
3. **GA4 DebugView 未接收到 Preview 调试设备。** 13 个事件的 DebugView、参数、去重和移动端证据均不完整。
4. **真实 $19 支付处理测试未执行。** 只能在账户持有人明确确认该次真实扣款后执行；零金额订单不能替代它。

### P1 — 生产授权前应补齐

1. 在 Brevo 联系人 UI 中逐项复核 `LEAD_SOURCE`、`READINESS_SCORE`、`READINESS_RISK_LEVEL` 与 `LANDING_PAGE` 的实际持久化值。
2. 对 Vercel Preview 重跑 Lighthouse（性能、无障碍、最佳实践、SEO），并记录路由与分数。
3. 用受控可接收邮箱完成 Free Checklist、Readiness、Itinerary 三来源的最终 UI 成功态与邮件证据；现有真实 Brevo 写入使用了非个人专用 QA 地址，不能作为收件箱交付验收。
4. 在 Preview 全页面执行最终内部链接/404 检查，并记录结果。

### P2 — 后续优化

1. 记录并向 Brevo 支持反馈其 Workflow 编辑器运行时错误，附去敏后的时间、浏览器和 workflow 草稿信息。
2. 当外部脚本与 Preview 配置稳定后，比较 Preview 与本地 Lighthouse 差异。

## 10. 回滚方案

1. 继续保持该分支未合并；不得以 promote 或 production deploy 方式处理当前 Preview。
2. 如需撤回本次可靠性修复，回滚目标为前一功能分支提交 `94bedc54e89acd6f56dfbea7c21800e8291ac27a`，然后仅创建新的 Preview 验证，不重写历史。
3. 如需撤销 Preview，仅删除该 Preview deployment 与其 Preview 专用变量绑定；不变更 Production 域名、DNS、别名或 Production 变量。
4. 任何真实付款测试产生的订单，应在 Payhip 后台按卖方退款政策处理；不得把订单号或买方数据写入本报告。

## 11. 最终生产建议

**不建议进入生产部署。**

已经完成 Preview 创建、noindex 防护、三商品入口、Bundle 零金额交付、Readiness/Checklist 的真实 Brevo 写入、代码质量门禁与核心浏览器回归；但 P0 的 Supabase、Brevo 自动化、GA4 DebugView 与真实支付测试仍未关闭。

本阶段在此停止，等待人工审查、外部平台问题修复，以及（仅在需要真实支付测试时）账户持有人的逐次付款确认。不得自动合并 `main`、部署 Production、修改正式域名或开始 Phase 6。
