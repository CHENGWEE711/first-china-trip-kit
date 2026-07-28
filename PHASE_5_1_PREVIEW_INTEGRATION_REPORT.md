# Phase 5.1D — External Platform Waiver Assessment & Release Candidate Preparation（未获生产授权）

**项目：** First China Trip Kit<br>
**验收日期：** 2026-07-28<br>
**评估代码 Commit：** `cedb4bbc7b5c741ae07be0adc4b6c9ccdd5f9e25` — `fix: clarify inactive email automation delivery`<br>
**当前结论：** **“Phase 5.1功能和技术门禁通过，允许进入Release Candidate最终验收；尚未授权生产部署。”** 不得合并 `main`，不得部署 Production。

本报告仅记录实际观察与可重复的验证结果；不包含环境变量值、密钥、Token、测试邮箱、订单号、优惠码、支付链接或自由文本表单内容。

## 1. 版本与 Preview 部署

| 项目 | 证据 |
| --- | --- |
| 功能分支 | `feat/v3-phase4b-growth-platform-architecture` |
| 当前分支 Commit | `cedb4bbc7b5c741ae07be0adc4b6c9ccdd5f9e25` — `fix: clarify inactive email automation delivery` |
| Preview 运行代码 Commit | `89853128e471181fc8fd3aa38647e88028f54d96` — `fix: fall back to Brevo when subscriber store is unavailable` |
| 推送状态 | 当前功能分支已推送；本 Phase 5.1D 报告提交前，代码/测试基线为干净工作树。 |
| Vercel 项目 | 既有项目 `chengwee711-4164s-projects/china-travel-kit`；未创建新项目。 |
| Preview URL | `https://china-travel-5co6kcyhi-chengwee711-4164s-projects.vercel.app` |
| Deployment ID | `dpl_FxtmvEYAqog1qDatNB8QqrtS5KdC` |
| 部署目标与状态 | `preview`，Vercel `Ready`；未使用 `--prod`、promote、alias、DNS 或正式域名变更。 |

`5854f68` 只新增可审计的 Supabase 迁移与测试，不改变 Next.js 运行时代码、依赖、配置或 Vercel 变量。因此没有把它当作新的应用部署；现有 Preview 仍在验证正确的 Phase 5.1 运行代码，外部数据库状态已按该迁移补齐。

`cedb4bb` 仅修正未启用 Brevo Workflow 时的用户可见交付措辞，并同步更新浏览器/单元测试；没有增加功能、改变外部环境变量，或创建新的 Preview / Production 部署。该提交已在本地生产构建和浏览器流中验证，进入 Release Candidate 时须作为待部署的候选版本复核。

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

Preview QA 自动化保持未启用。2026-07-28 登录复验仍可见同一个 Preview 工作流、正确的名单触发器和一个首封邮件节点，但该节点仍标为“需要定义并保存”。当打开其编辑操作时，Brevo 工作流前端再次稳定出现第一方 `TypeError: f?.map is not a function`；因此不能可靠编辑、保存、添加后续等待/邮件，或执行测试。

已在 2026-07-27T22:28:44Z 向 Brevo Help Center 提交去敏支持请求；提交页未返回可记录的支持单号。为避免误发、重复发送或污染名单，未启用该自动化，也没有伪造发送、移动端、退订、回复地址或 UTM 送达证据。

| 邮件 | 配置/送达验收 |
| --- | --- |
| 立即：结果或免费清单 | 节点草稿存在，但无法定义并保存。 |
| 测试延时 1：支付设置 | 未完成。 |
| 测试延时 2：APP 与网络 | 未完成。 |
| 测试延时 3：行程与交通 | 未完成。 |
| 测试延时 4：$19 Bundle | 未完成。 |

**平台自动化结果：P1（书面豁免）。** 编辑器错误仍阻止五封实际送达验收，Workflow 保持 Inactive；但经以下核心交付依赖与页面承诺检查，它不再阻断用户在页面获得承诺的核心内容。支持工单仍处于等待状态，且没有获得支持单号。

### Brevo 核心交付依赖与页面承诺核查（2026-07-28）

| 路径 | 提交与数据保存证据 | 页面即时核心交付 | 是否依赖 Workflow | 页面承诺与失败处理 | 结论 |
| --- | --- | --- | --- | --- | --- |
| China Arrival Readiness Checker | Preview 已真实成功提交至 `/api/newsletter` 并写入 Brevo；重复联系人路径更新同一联系人。 | 12 题完成后，分数、红黄绿风险与待办直接显示；成功保存邮箱后页面直接显示 PDF 下载。 | 不依赖。结果在提交邮箱前已生成；PDF 为静态站内文件，不由五封 Workflow 交付。 | `cedb4bb` 已删除 “Check your inbox / follow-up sequence”；改为结果留在页面、立即下载 PDF、后续更新“when available”。Brevo/API 失败显示明确可重试错误，结果不消失。 | 通过。 |
| Free Checklist | Preview Newsletter 成功与 Brevo 联系人写入已验证；Free Checklist Payhip 入口和零金额交付已验收。 | 成功后转至 `/thank-you`，其中直接显示免费清单；Payhip 的免费入口可独立获得清单。 | 不依赖。清单不是由 Workflow 邮件发放。 | 表单仅承诺清单在下一页打开；Provider 失败不跳转且显示安全失败信息。 | 通过。 |
| Custom Itinerary Review | Preview 已从真实 UI 成功持久化至受 RLS 保护的 Supabase 表；可选订阅走服务端 Brevo 写入。 | 行程审核核心承诺是提交和保存，而非数字文件；保存成功后页面即时确认。 | 不依赖。核心提交先持久化，订阅是可选项。 | `cedb4bb` 将“email sequence is confirmed”改为记录“future travel updates”偏好；偏好写入失败时仍明确说明该偏好未保存，不把它伪装成成功。保留同意、隐私与每封邮件退订说明。 | 通过。 |

降级条件逐项结论：Readiness 结果直接可见；Free Checklist 可从现有页面或 Payhip 获得；Itinerary 可真实持久化；没有核心产品依赖五封 Workflow；三页都没有承诺已发送邮件或必然收到五封邮件；联系人 API 仍可写入/更新 Brevo；失败状态与防重复提交已由代码和测试覆盖；2026-07-27T22:28:44Z 的去敏 Brevo 支持请求已记录；Workflow 继续 Inactive，未尝试启用。

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

2026-07-28 已以全新的 Tag Assistant / Preview / GA4 会话再次复现：

- Preview 向 GA 收集端点实际发送 `readiness_checker_started` 命中；命中含 `_dbg=1` 与 `debug_mode=true`，并包含预期的非 PII 参数。
- Tag Assistant 识别的衡量 ID 与当前 GA4 网站数据流一致；数据流采集状态为已启用。
- GA4 当前仅有 Internal Traffic 排除过滤器，状态为 Testing；未发现 Active 的开发者流量排除过滤器。
- 但同一正确媒体资源的 DebugView 仍显示“等待调试事件 / 0 个调试设备”，网站数据流也显示近期未收到数据。

这说明 Tag Assistant 的已发送命中不仅是应用数据层事件，而是带调试标记的真实 GA 收集请求；但它仍**不替代本阶段明确要求的 GA4 DebugView 最终截图/参数清单**。现有证据指向 GA4 平台摄取或 DebugView 展示不一致，而非网站未发出事件。

**结果：P1（替代验收豁免）。** DebugView 不是事件派发、参数、PII 或去重检查的唯一证据，且它是唯一未通过的界面。以下替代证据包满足本阶段的事件派发验收；不将其表述为 DebugView 通过。

### GA4 替代验收证据索引（2026-07-28）

| 索引 | 证据与结论 |
| --- | --- |
| 1 | Tag Assistant 桌面端证据：上表全部 13 个事件从真实 Preview UI 各触发一次。 |
| 2 | Tag Assistant 390px 移动端证据：`readiness_checker_started`、`readiness_checker_completed`、`readiness_result_email_submitted`、`payment_guide_viewed`、`payment_guide_buy_clicked`、`arrival_bundle_viewed`、`arrival_bundle_buy_clicked` 各验证。 |
| 3 | 直接收集请求证据：真实 `g/collect` 请求已发送，非仅数据层推送。 |
| 4 | 调试标记证据：同一请求带 `_dbg=1` 与 `debug_mode=true`。 |
| 5 | 数据流匹配：Tag Assistant 中的 Measurement ID 与目标 GA4 网站数据流一致（不在报告写入该值）。 |
| 6 | 数据流状态：目标数据流采集已启用。 |
| 7 | 过滤器状态：仅发现处于 Testing 的 Internal Traffic 过滤器；没有 Active 的 Developer Traffic 排除过滤器。 |
| 8 | 参数清单：桌面端各事件的 `source_page`、分数/状态/未解决数及批准的非 PII 业务参数已在 Tag Assistant 请求详情核对；完整事件名、触发动作与次数见本报告第 7 节表格。 |
| 9 | 重复检查：13 个桌面事件及 7 个移动事件的受控动作均为一次触发；未发现明显重复。 |
| 10 | PII 审计：请求和 Tag Assistant 参数不含邮箱、姓名、电话、WhatsApp 正文、行程自由文本、Brevo 标识或其他可识别信息。 |
| 11 | DebugView 反证：2026-07-28 同一受控会话的 DebugView 持续显示“0 debug devices / 等待调试事件”；该截图及时间已在本次受控浏览器验收中保存。 |
| 12 | 不一致说明：带有效调试标记的真实收集请求已命中正确数据流，但 DebugView 和数据流近期接收展示仍为空，指向 GA4 平台摄取/展示不一致，而非网站未派发命中。 |

> “GA4 event dispatch was verified through Tag Assistant and direct collection-request evidence. DebugView device ingestion/display remained inconsistent despite valid debug-marked hits. This is accepted as a P1 observability limitation and must be rechecked through Realtime and standard event reports after controlled production deployment.”

## 8. 回归、构建与视口

| 门禁 | 最新结果 |
| --- | --- |
| `npm test` | 通过，73/73（包含 Workflow Inactive 时不承诺即时或序列邮件交付的防回归测试）。 |
| `npm run lint` | 通过。 |
| `npm run typecheck` | 通过。 |
| 标准 production build | 通过，74 条应用路由。 |
| 缺失关键环境变量 build | 通过；缺少 Payhip、GA、Brevo、Supabase 时安全失败。 |
| 新工具浏览器回归 | `tests/phase5/arrival-readiness.spec.ts` Chromium Desktop 7/7 通过；覆盖完整 lead-flow mock、SEO/PII 与 390/768/1440/1920px。 |
| 既有关键回归 | `tests/live/phase5-regression.spec.ts` Chromium Desktop 通过。 |
| Preview 页面健康 | Readiness、Store、Bundle、Contact/Custom Itinerary 均渲染；未见应用自身 console error。 |
| Lighthouse | 尚未在受保护 Preview 重跑和记录分数；P1。 |

## 9. P0 / P1 / P2 与已知问题

### P0 — 当前 Phase 5.1 豁免范围内无阻塞项

Brevo 五封 Workflow 与 GA4 DebugView 已按第 6、7 节的限定理由从 P0 调整为 P1。真实 $19 付款仍是 **Release Candidate Gate**，不是 Production 部署授权；本阶段没有获得发布授权。

### P1 — 受控生产前必须跟踪或复核

1. **Brevo Workflow 平台错误。** 工作流继续 Inactive；等待已提交的支持请求恢复编辑/保存能力后，使用短延时补做五封送达、移动端、退订、回复地址和 UTM 验收。它不阻断当前页面核心交付。
2. **GA4 DebugView 可观察性限制。** 不能宣称 DebugView 通过；受控生产部署后，必须在 Realtime 和标准事件报告再次核对摄取与参数。
3. 在 Brevo 联系人 UI 中逐项复核三来源的 `LEAD_SOURCE`、`LEAD_MAGNET`、`READINESS_SCORE`、`READINESS_RISK_LEVEL`、`LANDING_PAGE` 与 UTM 值。
4. 对承载 `cedb4bb` 的 Release Candidate Preview 重跑 Lighthouse（性能、无障碍、最佳实践、SEO）并记录路由与分数。
5. 对该 Release Candidate Preview 全页面执行最终内部链接/404、sitemap、robots、canonical 与 response-header 检查并记录结果。

### P2 — 后续优化

1. 外部平台稳定后，比较 Release Candidate Preview 与本地 Lighthouse 差异。

## 10. Release Candidate Gate — 唯一剩余付款门禁

**真实 $19 支付测试：Deferred to Release Candidate due to unavailable controlled buyer account.**

进入 Release Candidate 后，依序完成且仅在获得单次明确扣款授权后才提交付款：

1. 从部署了 `cedb4bb` 的受控 RC 页面开始，使用不同于卖家收款账户的受控买家邮箱与付款方式。
2. 完成一次真实 $19 Bundle 支付，验证 CTA 事件、结账、成功页、订单记录、支付状态、交付邮件、PDF 下载和文件内容。
3. 按测试方案及 Payhip 政策决定并执行退款；不得在报告保存买方或订单个人数据。
4. 重新执行最终生产回归、确认回滚 Commit，并取得单独的 Production 授权。

该 Gate 没有被删除、自动批准或提前执行。完成它也不等于自动部署 Production。

## 11. 回滚方案

1. 保持功能分支未合并；不得以 promote 或 production deploy 处理当前 Preview。
2. 如需撤回本 Phase 5.1D 的最小文案与测试改动，回滚目标为 `724a89912c722d635bc85474bb9e16a4cc597f5c`，然后只创建新的 Preview / RC 验证，不重写历史。
3. 本次数据库迁移是最小、加性且已有真实提交记录；不建议在没有数据保留决策时删除表或测试记录。任何数据库回退须单独审批并以可恢复方式执行。
4. 如需撤销 Preview，只删除该 Preview deployment 与其 Preview 专用变量绑定；不改变 Production 域名、DNS、别名或 Production 变量。
5. 真实付款测试产生订单后，是否退款由账户持有人决定，并按 Payhip 政策处理；不得把订单或买方数据写入本报告。

## 12. 当前生产建议

**允许进入 Release Candidate 最终验收；尚未授权生产部署。**

本轮已关闭 Supabase/Custom Itinerary 持久化 P0，确认 Payhip 三个产品入口和零金额交付，完成真实 Preview 事件触发的 Tag Assistant 证据，并通过所有本地质量门禁。Brevo 五封自动化不影响三条页面核心交付，且页面现已移除无法兑现的即时/序列邮件承诺；GA4 已有真实 Tag Assistant 与收集请求替代验收包，但 DebugView 仍是 P1 可观察性限制。

因此当前结论为：**“Phase 5.1功能和技术门禁通过，允许进入Release Candidate最终验收；尚未授权生产部署。”** Release Candidate 仍必须完成真实 $19 付款、退款决策/执行、最终回归和单独授权。不得自动合并 `main`、部署 Production、修改正式域名或开始 Phase 6。
