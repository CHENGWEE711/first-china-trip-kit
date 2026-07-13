# First China Trip Kit — Phase C Content Overlap Audit

核验日期：2026-07-13  
范围：14 篇公开 Guide，以及与 Guide 搜索意图直接相邻的 240-hour itinerary。  
决策边界：本阶段不删除、不合并、不改 slug；严重合并决策留给阶段 E。

## 结论

没有发现必须立即合并或 canonical 到另一篇文章的公开 Guide。主要风险不是逐字重复，而是支付、App、准备清单和 240 小时政策之间的搜索意图边界不够显眼。阶段 C 通过 Hero/Card 主题、Quick Answer、重要提示和 Related Guides 内链强化了这些边界。

所有 Guide 继续使用自引用 canonical。互相设置 canonical 会错误地隐藏各自独立的搜索意图，因此本阶段不建议这样做。

## 1. China payment cluster

### 页面与搜索意图

| 页面 | 独立搜索意图 | 角色 |
| --- | --- | --- |
| `/guides/how-to-pay-in-china-as-a-foreigner` | 外国游客在中国整体如何支付；钱包、实体卡、现金和失败备用层 | **主页面 / payment hub** |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | 只解决 Alipay 的准备、两种 QR 流程、测试和失败处理 | 辅助操作页 |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | 只解决 WeChat Pay、mini programs、账户摩擦和备用钱包定位 | 辅助操作页 |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | 两个钱包的快速对照与共同准备流程 | 辅助比较页 |

### 重叠判断

- 重叠程度：中等。共同出现 card linking、QR flows、cash backup 是必要背景，不是自动合并理由。
- 主页面应拥有 “how to pay in China as a foreigner” 和 payment backup plan。
- Alipay、WeChat Pay 页面应分别拥有单钱包操作意图；不应复制整体支付栈的全部说明。
- 双钱包页面应聚焦比较与先后顺序，不与三个页面竞争完整的单钱包教程。

### 内链和结构建议

- 主页面链接到 Alipay、WeChat Pay 和 Best Apps。
- 双钱包比较页链接到主页面和两个单钱包页面。
- 两个单钱包页互链，并共同返回主页面。
- Canonical：全部自引用。
- 合并：现阶段不建议。
- 阶段 E 候选：如果 Search Console 显示双钱包页与主页面长期互相抢同一查询，再评估把双钱包页收缩为比较页或合并；不要凭文本相似度先删 URL。

## 2. Apps, payment setup and connectivity cluster

| 页面 | 独立搜索意图 | 角色 |
| --- | --- | --- |
| `/guides/best-apps-for-traveling-in-china` | 第一次来华需要哪些 App；跨支付、地图、翻译、打车、铁路 | **主页面 / app stack hub** |
| `/guides/china-esim-guide-for-tourists` | 如何在落地前准备移动数据、eSIM/roaming 与离线备份 | 网络辅助页 |
| `/guides/how-to-pay-in-china-as-a-foreigner` | 支付工具和备用支付，不负责完整 App 推荐 | 支付辅助页 |
| `/store#inside-the-guide` | 付费打印产品的内容与购买意图，不是公开 Guide | 商业转化页 |

### 判断与建议

- 重叠程度：低至中等。Best Apps 可以提到支付和网络，但详细设置必须内链到专页。
- eSIM 页不承诺特定 VPN、漫游或外国服务一定可用；本阶段已增加核验提示。
- 付费 Payment & Apps Setup Guide 只作为可选打印工作流，不伪装成中立编辑结论，也不应替代公开 Guide。
- Canonical：公开 Guide 均自引用；Store 不参与 Guide canonical。
- 合并：不建议。

## 3. China high-speed rail and passport travel intent

当前只有 `/guides/how-to-book-high-speed-trains-in-china` 承担中国高铁搜索意图；不存在另一个公开的 “Passport and Train Travel Guide” URL。

- 主意图：外国护照实名购票、选站、12306、进站安检、候车和改签风险。
- Best Apps 只介绍 12306/booking support 在 App stack 中的位置。
- Checklist 只提醒保存车次和护照，不扩写购票教程。
- Canonical：高铁页自引用。
- 合并：无对象，不建议创建重复文章。

## 4. Entry, visa and 240-hour transit cluster

| 页面 | 独立搜索意图 | 角色 |
| --- | --- | --- |
| `/guides/can-americans-travel-to-china-in-2026` | 美国护照 2026 年普通旅行、签证与官方核验入口 | 美国护照专页 |
| `/guides/china-240-hour-visa-free-transit-guide` | 240 小时政策资格、第三国/地区、口岸、活动区域和计时 | **政策主页面** |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | 符合政策前提后的沪杭苏示例路线 | 行程辅助页 |

### 判断与建议

- 重叠程度：中等，但搜索意图明确不同。
- 政策 Guide 是 240 小时事实与核验主页面；行程页必须把用户送回政策核验，而不能成为资格证明。
- 美国页已明确 U.S. passport 不在 2026-02 官方 50 国单方面 30 日免签名单，并说明普通旅游与 240 小时过境是不同路径。
- Canonical：三页自引用。
- 合并：不建议。政策页与 itinerary 合并会混淆资格判断和路线灵感。

## 5. Packing and pre-flight checklist cluster

| 页面 | 独立搜索意图 | 角色 |
| --- | --- | --- |
| `/guides/china-travel-packing-list` | 带什么、如何控制行李和准备物品 | **packing 主页面** |
| `/guides/china-travel-checklist-before-you-fly` | 起飞前最后核对文件、支付、App、酒店地址和离线备份 | 执行清单页 |
| `/thank-you` | 下载免费打印清单 | 转化/下载页 |

- 重叠程度：中等。
- Packing 页按物品和行李管理组织；pre-flight checklist 按离境前动作和完成状态组织。
- 免费下载 CTA 可以自然出现，但不应在每个章节重复。
- Canonical：两篇 Guide 自引用，下载页保留自身用途。
- 合并：不建议。

## 6. Shanghai Guide and itinerary cluster

| 页面 | 独立搜索意图 | 角色 |
| --- | --- | --- |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | 三天上海第一次怎么玩；编辑型概览 | 城市 Guide |
| `/itinerary-kits/3-days-in-shanghai` | 可执行的逐日路线与行程产品入口 | 行程页 |

- 重叠程度：中等。
- Guide 保留搜索问题、取舍和第一访建议；itinerary 保留逐日执行结构。
- 两页应互链，但不互设 canonical。
- 合并：阶段 C 不建议；阶段 E 可结合真实搜索与转化数据再判断。

## 7. Related Guides 调整

- Best Apps → Payment、eSIM、High-Speed Rail。
- High-Speed Rail → Best Apps、Pre-flight Checklist、Payment。
- Alipay + WeChat comparison → Payment hub、Alipay、WeChat Pay。
- Shanghai 3-day Guide → 240-hour transit、Best Apps、High-Speed Rail。

这些关系按用户下一步而不是相同分类机械推荐，Related Guides 的图片直接读取目标 Guide Card 数据，不再使用统一兜底图。

## 阶段 E 决策清单

1. 用 Search Console 查询和落地页数据确认 payment hub 与双钱包比较页是否存在真实关键词内耗。
2. 用索引/转化数据判断 Shanghai Guide 与 3-day itinerary 是否需要更强内容边界。
3. 在任何合并前保存排名、外链、内部链接和转化数据；不凭 AI 文本相似度删除 URL。
4. 如未来合并，使用 301 与更新后的 sitemap/internal links；canonical 不能替代真正的 URL 迁移方案。

