# First China Trip Kit V3.0 商业化升级主控文档

更新时间：2026-07-18
项目：firstchinatripkit.com
主目标：把网站从“旅行攻略站”升级为“China Travel Operating System”。

---

## 一、总体商业定位

网站不只回答“中国哪里好玩”，而是帮助第一次来中国的国际游客完成：

1. 判断能否免签或过境；
2. 设置支付、App和网络；
3. 选择目的地和旅行主题；
4. 生成可执行的行程；
5. 获得抵达当天的备用方案；
6. 下载免费清单；
7. 购买付费指南；
8. 点击可信联盟产品；
9. 订阅后续内容；
10. 最终使用AI行程规划和高客单服务。

核心转化路径：

社媒热点 → 专用落地页 → 实用Hub/工具 → 免费Checklist → 邮件订阅 → $7 Guide → 联盟产品 → AI Planner/高客单服务

---

## 二、全程执行纪律

1. 一次只实施一个阶段。
2. 当前阶段验收通过后，才进入下一阶段。
3. 不允许以“本地Build成功”代替正式线上验收。
4. 不允许同时重做全部页面。
5. 每阶段必须提交：
   - 阶段报告；
   - 前后截图；
   - 测试结果；
   - Git Commit；
   - 遗留问题；
   - 是否部署说明。
6. 所有新增图片必须：
   - 来自Pexels、Unsplash或Pixabay；
   - 下载到项目本地；
   - 有来源台账；
   - 不使用AI生成旅行照片；
   - 不使用第三方热链接。
7. 不破坏：
   - SEO；
   - Payhip；
   - Newsletter；
   - Contact；
   - WhatsApp；
   - Klook；
   - GA4；
   - Metricool；
   - 现有有效URL。
8. 每完成两个阶段，重新复制本主控文档到：
   - `docs/V3_MASTER_ROADMAP_SNAPSHOT.md`
9. 每次阶段报告顶部必须写：
   - 当前阶段；
   - 已完成阶段；
   - 下一阶段；
   - 禁止提前实施的内容。
10. 若上下文变长，以本主控文档为唯一阶段依据。

---

## 三、阶段总览

| 阶段 | 名称 | 核心目标 | 状态 |
|---|---|---|---|
| 1 | Homepage 3.0 | 首页从栏目展示页变成商业导航首页 | 已验收 |
| 2 | Payment & Apps Hub | 建立支付、App、网络的核心转化中心 | 完成，待验收 |
| 3 | Visa-Free Transit Hub | 建立免签、过境和资格判断中心 | 未开始 |
| 4 | Social Landing System | 为社媒热点建立专用落地页系统 | 未开始 |
| 5 | Hot Destinations & Experiences | 建立重庆、张家界等热点专题与体验入口 | 未开始 |
| 6 | SEO Topic Clusters | 建立主题集群和内链体系 | 未开始 |
| 7 | User Retention System | 收藏、下载记录、邮件与再营销 | 未开始 |
| 8 | AI Trip Planner & Full Funnel | AI规划器及完整商业闭环 | 未开始 |

---

# 阶段1：Homepage 3.0

## 目标

让新用户在5秒内知道：

- 网站能帮助第一次来中国；
- 可以查免签；
- 可以设置支付；
- 可以规划路线；
- 可以获取免费清单或购买指南。

## 页面结构

1. 新Hero：视觉吸引 + 实用承诺；
2. 四个任务入口：
   - Can I Enter Visa-Free?
   - Set Up Payments & Apps
   - Choose My First Cities
   - Build My Itinerary
3. Popular Right Now；
4. Trending in China；
5. Before You Fly三步或四步流程；
6. Explore by Experience；
7. $7 Guide产品区；
8. Featured Guides；
9. Newsletter；
10. Footer。

## 本阶段必须完成

- 首页信息架构；
- 首页桌面/移动设计；
- 真实高清Hero；
- 热门内容模块；
- 任务入口；
- 产品展示升级；
- UTM入口保留；
- 首页关键事件；
- Playwright视觉回归；
- 不生产部署，除非阶段验收通过。

## 本阶段禁止

- 创建Payment Hub；
- 创建Visa Hub；
- 批量新增城市；
- 创建AI Planner；
- 大规模重做Guide正文；
- 改动Store业务逻辑。

## 验收门槛

- 375、390、430、768、1024、1440无横向滚动；
- 首页只有一个H1；
- 首屏主CTA明确；
- 四个任务入口可用；
- 产品区链接正常；
- GA4/Metricool未破坏；
- Lint、TypeScript、Tests、Build、Playwright通过；
- 提交阶段报告与截图；
- 未执行Production部署。

---

# 阶段2：Payment & Apps Hub

## 目标

把支付、支付宝、微信支付、App、eSIM、离线备份和$7 Guide整合为一个高转化中心。

## 核心结构

- Before Arrival；
- Arrival Day；
- If Something Fails；
- 支付四层备用方案；
- App优先级；
- 网络方案；
- 免费Checklist；
- $7 Guide；
- 相关Guide；
- FAQ；
- 官方信息更新时间。

## 验收重点

- Hub内容不重复堆砌；
- 支付、App、eSIM页面形成清晰内链；
- 付费产品CTA自然；
- 相关事件跟踪完整。

---

# 阶段3：Visa-Free Transit Hub

## 目标

整合240小时免签、资格判断、口岸、可停留区域、A→China→B逻辑和推荐路线。

## 核心结构

- Eligibility Checker；
- A→China→B图示；
- Eligible passports；
- Eligible ports；
- Permitted stay areas；
- 3/5/10日路线；
- 常见错误；
- 官方核查入口；
- 最后更新时间。

## 验收重点

- 高风险政策内容有明确日期和官方来源；
- 不把工具结果写成法律保证；
- SEO与转化兼顾。

---

# 阶段4：Social Landing System

## 目标

不再让TikTok、Instagram、YouTube Shorts、Threads和Pinterest全部回到首页。

## 首批落地页

- `/social/china-looks-unreal`
- `/social/first-payment-test`
- `/social/shanghai-arrival-plan`
- `/social/chongqing`
- `/social/zhangjiajie`
- `/social/wuhan-1234`

## 每页结构

1. 与社媒一致的标题和封面；
2. 30秒摘要；
3. 对应城市或工具；
4. 一个主CTA；
5. 免费资源；
6. 相关Guide；
7. UTM与事件。

---

# 阶段5：Hot Destinations & Experiences

## 目标

把流量热点从单一城市目录升级为“城市 + 体验”双入口。

## 优先专题

- Chongqing；
- Zhangjiajie；
- Dali；
- Changsha；
- Wuhan；
- Luoyang/Zhengzhou组合。

## 体验入口

- Futuristic China；
- Ancient China；
- Nature & Mountains；
- Food & Street Markets；
- High-Speed Rail Journeys；
- China After Dark；
- Slow China；
- Visa-Free Stopover。

---

# 阶段6：SEO Topic Clusters

## 目标

从零散文章升级为主题集群。

## 核心集群

- Payment；
- Visa-Free Transit；
- Apps & Internet；
- High-Speed Rail；
- First Arrival；
- City Planning；
- Itinerary Planning。

## 验收重点

- Hub与子文章内链；
- Breadcrumb；
- Canonical；
- Schema；
- 更新时间；
- 避免关键词互相竞争。

---

# 阶段7：User Retention System

## 目标

让用户不是看完即走。

## 功能方向

- 收藏Guide；
- 保存路线；
- 下载记录；
- Newsletter偏好；
- 邮件自动化；
- 再营销事件；
- 免费清单后的邮件序列。

## 原则

先使用轻量方案验证需求，不立即开发复杂账号系统。

---

# 阶段8：AI Trip Planner & Full Funnel

## 目标

建立网站未来核心竞争力和高客单产品入口。

## 输入示例

- 国籍；
- 天数；
- 预算；
- 城市偏好；
- 兴趣；
- 交通偏好；
- 是否免签；
- 是否带孩子。

## 输出

- 推荐城市；
- 每日路线；
- 城际交通；
- 酒店区域；
- 预算；
- 支付和App；
- 抵达当天方案；
- PDF导出；
- 相关产品与联盟入口。

## 商业路径

免费基础计划 → 邮件收集 → 高级PDF → 人工定制 → 联盟产品

---

## 四、数据驱动原则

当前数据基线：

- 首页是最大入口；
- Store和支付Guide是最强二级页面；
- 免签与经典路线有明确兴趣；
- 社媒引流仍弱；
- TikTok视觉类内容比纯政策内容更容易获得初始曝光；
- Threads更适合简短可执行清单；
- 多数流量仍被识别为Direct；
- TikTok存在素材分辨率不合规问题。

因此各阶段都必须围绕：

- 视觉吸引；
- 实用任务；
- 专用落地；
- 统一UTM；
- 转化事件；
- 移动端优先。

---

## 五、统一数据规范

所有社媒链接统一使用：

- `utm_source`
- `utm_medium=organic_social`
- `utm_campaign`
- `utm_content`

建议关键事件：

- `social_landing_view`
- `hero_primary_cta_clicked`
- `visa_checker_started`
- `visa_checker_completed`
- `payment_hub_viewed`
- `payment_guide_viewed`
- `payment_guide_buy_clicked`
- `checklist_opened`
- `checklist_completed`
- `city_card_clicked`
- `itinerary_started`
- `payhip_outbound_clicked`

保存首次进入时：

- source；
- campaign；
- content；
- landing page。

---

## 六、视觉资产规范

标准尺寸：

- TikTok/Reels/Shorts：1080×1920；
- Instagram Feed/Carousel：1080×1350；
- Pinterest：1000×1500；
- Threads/Bluesky：1200×675；
- Open Graph：1200×630。

上传前自动检查：

- 最大尺寸；
- 长宽比；
- 文件体积；
- 视频分辨率；
- 图片格式；
- 是否存在授权记录。

---

## 七、阶段进度记录

### 当前状态

- Penpot设计系统：已完成；
- Guide视觉系统：已实施；
- 全局设计系统与首页基础：阶段1已验收；
- V3商业化升级：阶段2已完成，等待验收。

### 当前进行阶段

阶段2：Payment & Apps Hub

### 下一阶段

阶段3：Visa-Free Transit Hub（阶段2验收后才可开始）

### 当前禁止提前实施

- Visa Hub；
- Social Landing；
- 热门城市批量扩展；
- AI Planner；
- 用户账户系统。

---

## 八、阶段结束快照模板

每阶段完成后，在本文件底部追加：

```text
阶段：
开始Commit：
结束Commit：
Penpot Frame：
修改页面：
测试结果：
部署状态：
遗留问题：
验收结论：
下一阶段：
```

每完成两个阶段，复制为：

`docs/V3_MASTER_ROADMAP_SNAPSHOT.md`

---

## 九、阶段2结束记录

```text
阶段：2 — Payment & Apps Hub
开始Commit：b2ccf5b859d576e2339711bf04a149b8acbd3393
结束Commit：见 V3_PHASE_2_PAYMENT_HUB_REPORT.md 与阶段2 Git提交
Penpot Frame：当前环境无Penpot写入连接器；未伪造ID；项目内保存两张概念参考
修改页面：/payments-and-apps，以及现有支付主题Cluster与高意图站内入口
测试结果：Lint、TypeScript、49个单元测试、Build、全量Playwright、定向Playwright、图片/SEO/可访问性审计通过
部署状态：未部署Preview或Production；未修改Vercel、域名或环境变量
遗留问题：Penpot写回；已配置Payhip Preview真实跳转验收；上线后定期复核官方规则
验收结论：完成，等待阶段2验收
下一阶段：阶段3 — Visa-Free Transit Hub（验收后才可开始）
```
