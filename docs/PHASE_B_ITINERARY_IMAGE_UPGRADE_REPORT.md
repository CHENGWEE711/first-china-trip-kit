# First China Trip Kit — 阶段 B 行程图片与时效信息整改报告

生成日期：2026-07-13  
仓库：`CHENGWEE711/first-china-trip-kit`  
施工分支：`audit/full-site-content-image-upgrade`  
阶段 A 基线：`6f08ad4a5f323821c08f2d53a2e619ccc02749c7`  
生产基线：`bf41908596635695cd85a24cef6c7d6f6d71db0e`

> 范围锁定：本阶段只整改四个重点行程、其图片在行程列表/推荐/Related/OG/JSON-LD 中的引用，以及 240 小时过境免签行程和直接相关 Guide 的官方政策依据。没有进入城市页、首页设计、Store、其他 Guide 或全站设计整改；没有合并 `main`，也没有触发生产部署。

## 1. 验收结论

阶段 B 三项核心目标均已达到：

1. **每天用对图**：26/26 个逐日位置都与实际 `dayByDayPlan` 语义相符；明显错配由 15 降至 0，部分匹配由 6 降至 0。
2. **四个行程一眼可区分**：四套 Card 和 Hero 均使用不同文件与不同视觉主体；北京四日、北京＋西安、沪杭苏、240 小时过境分别以故宫水面、兵马俑、苏州园林、护照/机场建立识别锚点。
3. **高清化未拖慢页面**：四张 Hero 均为 2400×1600 WebP，单张 286.9–378.4KB；全部目标 Card/Daily ≥1400px、Hero ≥2000px，目标图片均 ≤700KB。Hero 只使用 `priority`，日程图保持懒加载，稳定宽高比容器与响应式 `sizes` 已保留；自动化浏览器测试测得 CLS <0.1。

## 2. 修改范围与原问题

| 行程 | 原问题 | 阶段 B 结果 |
| --- | --- | --- |
| `/itinerary-kits/4-days-in-beijing` | 4 天仅循环 3 张图；故宫、胡同、长城和第 4 天场景错位；Hero 仅 1800px | 4 天显式映射 4 张不同图片；独立故宫 Card、天坛 Hero；4/4 语义匹配 |
| `/itinerary-kits/5-days-beijing-and-xian` | 5 天仅 4 张图；长城日出现西安城墙，兵马俑日回到北京故宫 | 5 天显式映射 5 张不同图片；独立兵马俑 Card、西安钟楼 Hero；5/5 语义匹配 |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | 7 天仅 4 张图；上海、杭州、苏州图片跨城市循环 | 7 天显式映射 7 张不同图片；独立苏州园林 Card、西湖 Hero；7/7 语义匹配 |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | 10 天仅 4 张图；护照/机场语境缺失；上海、杭州、苏州及离境日错配；政策来源过时 | 10 天显式映射 10 张不同图片；独立护照 Card、浦东机场 Hero；10/10 语义匹配；官方政策来源与核验日期已刷新 |

## 3. 每日图片对应关系

### 3.1 4 Days in Beijing

| Day | 实际重点 | 阶段 B 图片 |
| ---: | --- | --- |
| 1 | 抵达、胡同/北京初印象 | `/images/cities/details/beijing-hutong-street.webp` |
| 2 | 故宫、景山、北京历史核心区 | `/images/cities/beijing-forbidden-city-courtyard.webp` |
| 3 | 长城 | `/images/itineraries/classic-china/day-3-great-wall.webp` |
| 4 | 颐和园/弹性北京日 | `/images/itineraries/4-days-beijing/day-4-summer-palace.webp` |

Card：`/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp`  
Hero：`/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp`

### 3.2 5 Days Beijing and Xi'an

| Day | 实际重点 | 阶段 B 图片 |
| ---: | --- | --- |
| 1 | 抵达北京、胡同 | `/images/cities/details/beijing-hutong-market.webp` |
| 2 | 故宫核心日 | `/images/cities/beijing-forbidden-city-courtyard.webp` |
| 3 | 长城 | `/images/itineraries/classic-china/day-3-great-wall.webp` |
| 4 | 北京至西安高铁/抵达西安 | `/images/guides/high-speed-train-china.webp` |
| 5 | 兵马俑 | `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp` |

Card：`/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp`  
Hero：`/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp`

### 3.3 7 Days Shanghai, Hangzhou and Suzhou

| Day | 实际重点 | 阶段 B 图片 |
| ---: | --- | --- |
| 1 | 抵达上海、外滩初印象 | `/images/cities/shanghai-bund-skyline.webp` |
| 2 | 上海老城、豫园 | `/images/itineraries/eastern-china/yu-garden-shanghai.webp` |
| 3 | 上海街区与现代文化 | `/images/guides/shanghai-three-days-street.webp` |
| 4 | 上海至杭州高铁 | `/images/guides/high-speed-train-china.webp` |
| 5 | 龙井茶田、灵隐文化 | `/images/itineraries/eastern-china/longjing-tea-fields.webp` |
| 6 | 苏州抵达、园林 | `/images/cities/suzhou-lingering-garden.webp` |
| 7 | 苏州园林、返程 | `/images/travel/china-railway-station-interior.webp` |

Card：`/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp`  
Hero：`/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp`

### 3.4 240-Hour Visa-Free China Itinerary

| Day | 实际重点 | 阶段 B 图片 |
| ---: | --- | --- |
| 1 | 国际抵达上海 | `/images/guides/americans-china-airport-arrivals.webp` |
| 2 | 上海核心景点 | `/images/cities/shanghai-bund-skyline.webp` |
| 3 | 法租界与本地生活 | `/images/guides/shanghai-three-days-street.webp` |
| 4 | 上海至杭州高铁 | `/images/guides/high-speed-train-china.webp` |
| 5 | 杭州茶田与寺庙 | `/images/itineraries/eastern-china/longjing-tea-fields.webp` |
| 6 | 西湖慢行、返回上海 | `/images/itineraries/240-hour-transit/day-6-west-lake.webp` |
| 7 | 苏州一日游 | `/images/cities/details/suzhou-canal-lanterns.webp` |
| 8 | 现代上海/浦东 | `/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp` |
| 9 | 缓冲日、朱家角水乡 | `/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp` |
| 10 | 离境至第三国或地区 | `/images/itineraries/classic-china/day-10-airport-departure.webp` |

Card：`/images/itineraries/240-hour-transit/card-passport-luggage.webp`  
Hero：`/images/itineraries/240-hour-transit/hero-pudong-airport.webp`

## 4. 新增图片来源与授权

以下 15 张为本阶段新增本地 WebP。具体 `creditId`、下载日期、用途、授权名称和授权 URL 已写入 `data/image-credits.json`；没有热链、Google 图片、带水印或来源不明图片。

| 本地文件 | 来源/作者 | 具体来源页 | 授权 |
| --- | --- | --- | --- |
| `4-days-beijing/hero-temple-of-heaven.webp` | Unsplash / Hongjin Wang | [Temple of Heaven](https://unsplash.com/photos/temple-of-heaven-in-beijing-under-a-cloudy-sky-mWU4hw9SHko) | Unsplash License |
| `4-days-beijing/card-forbidden-city-moat.webp` | Unsplash / Allan N | [Forbidden City moat](https://unsplash.com/photos/the-forbidden-city-in-beijing-with-a-moat-and-bridge-J1Eyj_0G474) | Unsplash License |
| `4-days-beijing/day-4-summer-palace.webp` | Wikimedia / xiquinhosilva | [Longevity Hill of the Summer Palace](https://commons.wikimedia.org/wiki/File:Longevity_Hill_of_the_Summer_Palace.jpg) | CC BY 2.0 |
| `5-days-beijing-xian/hero-xian-bell-tower.webp` | Unsplash / Jun Huang | [Xi'an Bell Tower](https://unsplash.com/photos/bell-tower-of-xian-with-a-large-roof-yiKNbPqEWDU) | Unsplash License |
| `5-days-beijing-xian/card-terracotta-army.webp` | Wikimedia / xiquinhosilva | [Terracotta Army](https://commons.wikimedia.org/wiki/File:Terracotta_Army_(54082561381).jpg) | CC BY 2.0 |
| `5-days-beijing-xian/day-5-terracotta-pit.webp` | Wikimedia / Will Clayton | [Terracotta Warriors excavation pit](https://commons.wikimedia.org/wiki/File:Terracotta_Warriors_-_Xi%27an_(4535488885).jpg) | CC BY 2.0 |
| `7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp` | Wikimedia / Wanderingchina | [West Lake sunset panorama](https://commons.wikimedia.org/wiki/File:Aerial_panorama_of_West_Lake_sunset_and_its_lakeside_district._December_2023.jpg) | CC BY 4.0 |
| `7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Wikimedia / Jason Zhang | [Classical Gardens of Suzhou](https://commons.wikimedia.org/wiki/File:Classical_Gardens_of_Suzhou_pavilion,_August_2016.jpg) | CC0 1.0 |
| `eastern-china/longjing-tea-fields.webp` | Wikimedia / Peter K Burian | [Longjing tea field](https://commons.wikimedia.org/wiki/File:Longjing_Tea_field,_Dragon_Well_area,_Meijiawu_China.jpg) | CC BY-SA 4.0 |
| `eastern-china/yu-garden-shanghai.webp` | Wikimedia / Stefan Fussan | [Shanghai Yu Garden](https://commons.wikimedia.org/wiki/File:Shanghai_-_Yu_Garden_-_0034.jpg) | CC BY-SA 3.0 |
| `240-hour-transit/hero-pudong-airport.webp` | Unsplash / Declan Sun | [Modern airport terminal](https://unsplash.com/photos/modern-airport-terminal-with-seating-and-large-windows-wQ1nctYvfLM) | Unsplash License |
| `240-hour-transit/card-passport-luggage.webp` | Wikimedia / Aatu Dorochenko | [Passport and luggage](https://commons.wikimedia.org/wiki/File:E2A0423.jpg) | CC BY-SA 4.0 |
| `240-hour-transit/day-6-west-lake.webp` | Wikimedia / Bjoertvedt | [West Lake panorama](https://commons.wikimedia.org/wiki/File:West_Lake_IMG_8756_hangzhou_panorama.jpg) | CC BY-SA 4.0 |
| `240-hour-transit/day-8-pudong-skyline.webp` | Wikimedia / King of Hearts | [Pudong Shanghai](https://commons.wikimedia.org/wiki/File:Pudong_Shanghai_November_2017.jpg) | CC BY-SA 4.0 |
| `240-hour-transit/day-9-zhujiajiao.webp` | Wikimedia / Chensiyuan | [Zhujiajiao water town](https://commons.wikimedia.org/wiki/File:1_zhujiajiao_ancient_water_town_2023.jpg) | CC BY-SA 4.0 |

## 5. 清晰度与性能

### 5.1 Hero 规格

| 行程 | Hero | 分辨率 | 文件大小 |
| --- | --- | ---: | ---: |
| 4-day Beijing | `hero-temple-of-heaven.webp` | 2400×1600 | 334.0KB |
| 5-day Beijing + Xi'an | `hero-xian-bell-tower.webp` | 2400×1600 | 378.4KB |
| 7-day Eastern China | `hero-west-lake-sunset.webp` | 2400×1600 | 294.3KB |
| 240-hour transit | `hero-pudong-airport.webp` | 2400×1600 | 286.9KB |

### 5.2 图片处理与加载策略

- 目标 Hero 全部为 WebP、宽度 ≥2000px；Card/Daily 宽度全部 ≥1400px。
- 目标图片最大文件为 `yu-garden-shanghai.webp`，670.3KB，仍低于 700KB 限制。
- Hero 保留 `priority`，删除重复的 `loading="eager"`；非首屏日程图保持 lazy loading。
- `fill` 图片保留稳定宽高比父容器；Card、Hero、Daily 均可配置 `object-position`。
- 桌面与移动端均无横向溢出；自动化 CLS 检查小于 0.1。
- 240 小时移动端政策提示从 Hero 叠层下移至 Hero 后方，Hero 高度由 1047.5px 降至 701.5px，机场主体恢复可见，同时免责声明仍位于首屏内容区。

本阶段没有执行完整 Lighthouse 性能评分；当前结论来自文件阈值、Next Image 实现审查、布局稳定性测试和实际浏览器渲染验收。

## 6. 替换、删除与重复率

| 指标 | 阶段 A | 阶段 B |
| --- | ---: | ---: |
| 逐日图片位置 | 26 | 26 |
| 实际更换的逐日位置 | — | 23 |
| 四套 Card/Hero 更换位置 | — | 8 |
| 新增实体图片文件 | — | 15 |
| 删除实体图片文件 | — | 0 |
| 明显错配 | 15 | 0 |
| 部分匹配 | 6 | 0 |
| 完全匹配 | 5 | 26 |
| 四个行程内部唯一图片位置 | 15/26（57.7%） | 26/26（100%） |
| 四个行程内部重复率 | 42.3% | 0% |
| 跨四行程唯一文件 | 11/26（42.3%） | 19/26（73.1%） |

阶段 A 各行程内部唯一率分别为 75%、80%、57.1%、40%；阶段 B 均为 100%。跨行程仍有 7 个重复位置，是对同一实际地点/交通的有意复用，例如长城、高铁、上海外滩、上海街区和龙井茶田；同一行程内没有重复，因此没有为了“表面唯一”牺牲语义准确性。

旧图片删除数为 0，因为被替换的文件仍被其他页面或阶段使用。全站审计确认缺失文件为 0、不同文件名但内容完全相同的组为 0。没有越界删除共享资产。

## 7. 图片与元数据引用一致性

- `/itinerary-kits` 列表上的四个 Card 图片已独立，尺寸与裁切一致。
- 首页推荐、Related Itineraries 与共享 `ItineraryCard` 均读取同一组 Card 配置，不另存重复映射。
- `/itineraries/[slug]` 兼容路由、Open Graph、JSON-LD 和 SEO 图片引用已与新 Hero/Card 配置同步。
- 四个 canonical `/itinerary-kits/{slug}` 路由由 `app/sitemap.ts` 动态收录；阶段 A 记录的旧 `/itineraries/{slug}` 兼容路由未进入 sitemap，属于既有全站 SEO 问题，本阶段没有扩大范围处理。

## 8. 240 小时政策官方核验

核验日期：**2026-07-13**。

核心依据只使用国家移民管理局页面：

1. 中文公告：[关于实施支持扩大开放服务高质量发展10项创新举措的公告](https://www.nia.gov.cn/n897453/c1751080/content.html)，发布日期 2025-11-03。
2. 英文公告：[Announcement on Implementing 10 New Measures to Support the Expansion of Opening-up and Serve High-quality Development](https://en.nia.gov.cn/n147418/n147468/c187308/content.html)，发布日期 2025-11-03。
3. 当前政策汇总页：[过境免签政策](https://www.nia.gov.cn/n741440/n741577/c1731205/content.html)。

已核验并写入页面的当前快照：55 个适用国家、65 个适用口岸、24 个省级行政区；需持有效国际旅行证件和已确定日期/座位的前往第三国或地区联程客票，在允许区域内停留不超过 240 小时，时间自入境次日 00:00 起计算。页面同时明确这些数字与规则可能变化，不将其表述为保证入境。

行程页与相关 Guide 均显示 Last verified，并使用以下固定免责声明：

> Rules can change. Confirm your eligibility and entry port with China’s National Immigration Administration or your airline before travel.

旧 54 国/60 口岸数字与旧核心链接已从这两个目标页面移除；官方链接访问测试返回 200。

## 9. 自动化与人工验收

### 9.1 命令结果

| 检查 | 结果 |
| --- | --- |
| `npm install` | 通过；依赖已是最新，392 packages，0 vulnerabilities |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm test` | 通过；17/17 |
| `npm run build` | 通过；74 个构建页面/端点 |
| `npm run audit:images` | 通过；26 个目标日程位置，0 错配、0 部分匹配、0 缺失文件、0 断链 |
| Phase B Playwright | 通过；11 passed，1 个桌面已覆盖的重复检查有意 skip |

Playwright 覆盖：日程数量、每天单一主图、`naturalWidth > 0`、同一行程 src 唯一、alt 语义、Hero/Card 加载、无 modulo fallback、390px/1440px 无横向滚动、控制台无错误、移动裁切、旧政策数字/链接清理、官方来源返回 200，以及 CLS <0.1。

### 9.2 人工视觉验收

- 四套列表 Card 在 1440px 下主题可一眼区分。
- 四个 Hero 在 1440px 和 390px 下主体清晰、标题可读，无建筑主体异常裁断。
- 26 张日程图逐日核对，无错误城市、拉伸、模糊或破图。
- 7-day 移动端额外核对豫园 Day 2；240-hour 移动端额外核对 Day 5 与 Day 9。
- 各目标页均无横向溢出或浏览器控制台错误。

## 10. 截图证据

截图目录：`docs/screenshots/phase-b/`

| 页面 | 桌面证据 | 移动证据 |
| --- | --- | --- |
| 行程列表 | `itinerary-list-desktop.png` | Card 由各详情页移动截图补充验证 |
| 4-day Beijing | `4-days-in-beijing-desktop-hero.png`、`4-days-in-beijing-desktop-full.png` | `4-days-in-beijing-mobile-hero.png`、`4-days-in-beijing-mobile-full.png` |
| 5-day Beijing + Xi'an | `5-days-beijing-and-xian-desktop-hero.png`、`5-days-beijing-and-xian-desktop-full.png` | `5-days-beijing-and-xian-mobile-hero.png`、`5-days-beijing-and-xian-mobile-full.png` |
| 7-day Eastern China | `7-days-shanghai-hangzhou-suzhou-desktop-hero.png`、`7-days-shanghai-hangzhou-suzhou-desktop-full.png` | `7-days-shanghai-hangzhou-suzhou-mobile-hero.png`、`7-days-shanghai-hangzhou-suzhou-mobile-full.png`、`7-days-shanghai-hangzhou-suzhou-mobile-day-2.png` |
| 240-hour transit | `240-hour-visa-free-china-itinerary-desktop-hero.png`、`240-hour-visa-free-china-itinerary-desktop-full.png` | `240-hour-visa-free-china-itinerary-mobile-hero.png`、`240-hour-visa-free-china-itinerary-mobile-day-5.png`、`240-hour-visa-free-china-itinerary-mobile-day-9.png` |

240-hour 移动完整页高约 17,954px，单张全页截图超过截图后端限制，因此以 Hero、Day 5、Day 9 三张代表性移动截图替代；自动化测试仍完整遍历并检查了全部 10 天。

## 11. 提交列表

| Commit | 内容 |
| --- | --- |
| `8132adf` | Upgrade priority itinerary image systems |
| `4fa7a04` | Refresh 240-hour transit policy sources |
| `e995c0f` | Add itinerary image validation and regression tests |
| `2b0ba94` | Complete scoped itinerary image provenance |
| 本报告所在最终提交 | Document phase B audit results |

提交拆分遵守阶段 B 范围；北京、西安、沪杭苏的共享数据结构与组件变更集中在首个图片系统提交中，政策与测试分别独立提交。

## 12. 分支状态与阶段停止

- 当前分支：`audit/full-site-content-image-upgrade`
- 基线：阶段 A `6f08ad4a5f323821c08f2d53a2e619ccc02749c7`
- 目标：推送远程同名分支，确认本地与远程 SHA 一致
- `main`：保持 `bf41908596635695cd85a24cef6c7d6f6d71db0e`，不合并
- Vercel/生产：不触发部署
- 下一阶段：不进入阶段 C，等待阶段 B 验收

## 13. 尚未解决的问题（明确留在后续阶段）

1. 10-day Classic China 仍有 4 条 Unsplash credit 的 `sourcePage` 指向搜索页而非具体图片页：Day 1 Beijing hutong、Day 2 Forbidden City、Day 7 Yu Garden、Day 8 West Lake。本阶段目标四行程已不使用 Day 2/Day 7 文件；其余仅在语义准确的共享场景中使用，来源记录问题留待 Classic China 专项处理。
2. 全站仍有 17 个低于 2000px 的 Hero、7 个低于 1400px 的正文/Card/Daily、1 个大于 700KB 的非本阶段 PNG；目标四行程全部通过阈值。
3. 全站 23 个第一方资产尚未登记正式 provenance，主要是品牌、社交媒体和产品预览资产；本阶段新增第三方图片版权记录完整率为 100%。
4. 17 个旧式 indexable 路由未进入 sitemap，其中包含 `/itineraries/*` 兼容路由；canonical `/itinerary-kits/*` 路由已收录。该 SEO 决策应在后续全站阶段统一处理。
5. `components/GuideTemplate.tsx` 的通用 inline image `sizes` 仍有进一步按文章列宽优化的空间；相关 Guide 的政策来源本阶段已修复，但通用 Guide 图片性能不在本阶段范围。
6. 本阶段未运行生产环境 Lighthouse，也未部署生产。生产性能实测必须在未来获准部署后进行，不能用本地测试冒充生产结论。

## 14. 审计产物

- 人读审计：`docs/PHASE_B_ITINERARY_IMAGE_AUDIT.md`
- 机器可读审计：`docs/PHASE_B_ITINERARY_IMAGE_AUDIT.json`
- 本阶段整改报告：`docs/PHASE_B_ITINERARY_IMAGE_UPGRADE_REPORT.md`
- 截图：`docs/screenshots/phase-b/`

