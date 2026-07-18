import {
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_LAST_VERIFIED_AT,
} from "./official-sources";

export type PermittedStayAreaGroup = {
  id: string;
  displayName: string;
  provinceLevelRegions: string[];
  cities?: string[];
  restrictions?: string[];
  entryPortIds: string[];
  exitPortIds: string[];
  exitViaAnyOpenPortInProvince?: boolean;
  officialSourceUrl: string;
  lastVerifiedAt: string;
};

type PermittedStayAreaRecord = Omit<
  PermittedStayAreaGroup,
  "officialSourceUrl" | "lastVerifiedAt"
>;

function createPermittedStayArea(
  record: PermittedStayAreaRecord,
): PermittedStayAreaGroup {
  return {
    ...record,
    officialSourceUrl: VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  };
}

const PARTIAL_AREA_RESTRICTION =
  "Only the listed cities or prefecture-level areas are within the published permitted stay area for this province-level region.";

export const PERMITTED_STAY_AREA_GROUPS: PermittedStayAreaGroup[] = [
  createPermittedStayArea({
    id: "beijing-municipality",
    displayName: "Beijing Municipality",
    provinceLevelRegions: ["Beijing"],
    entryPortIds: ["beijing-capital", "beijing-daxing"],
    exitPortIds: ["beijing-capital", "beijing-daxing"],
  }),
  createPermittedStayArea({
    id: "tianjin-municipality",
    displayName: "Tianjin Municipality",
    provinceLevelRegions: ["Tianjin"],
    entryPortIds: ["tianjin-binhai", "tianjin-port-passenger"],
    exitPortIds: ["tianjin-binhai", "tianjin-port-passenger"],
  }),
  createPermittedStayArea({
    id: "hebei-province",
    displayName: "Hebei Province",
    provinceLevelRegions: ["Hebei"],
    entryPortIds: ["shijiazhuang-zhengding", "qinhuangdao-port-passenger"],
    exitPortIds: ["shijiazhuang-zhengding", "qinhuangdao-port-passenger"],
  }),
  createPermittedStayArea({
    id: "liaoning-province",
    displayName: "Liaoning Province",
    provinceLevelRegions: ["Liaoning"],
    entryPortIds: [
      "shenyang-taoxian",
      "dalian-zhoushuizi",
      "dalian-port-passenger",
    ],
    exitPortIds: [
      "shenyang-taoxian",
      "dalian-zhoushuizi",
      "dalian-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "shanghai-municipality",
    displayName: "Shanghai Municipality",
    provinceLevelRegions: ["Shanghai"],
    entryPortIds: [
      "shanghai-hongqiao",
      "shanghai-pudong",
      "shanghai-port-passenger",
    ],
    exitPortIds: [
      "shanghai-hongqiao",
      "shanghai-pudong",
      "shanghai-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "jiangsu-province",
    displayName: "Jiangsu Province",
    provinceLevelRegions: ["Jiangsu"],
    entryPortIds: [
      "nanjing-lukou",
      "sunan-shuofang",
      "yangzhou-taizhou",
      "lianyungang-port-passenger",
    ],
    exitPortIds: [
      "nanjing-lukou",
      "sunan-shuofang",
      "yangzhou-taizhou",
      "lianyungang-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "zhejiang-province",
    displayName: "Zhejiang Province",
    provinceLevelRegions: ["Zhejiang"],
    entryPortIds: [
      "hangzhou-xiaoshan",
      "ningbo-lishe",
      "wenzhou-longwan",
      "yiwu-airport",
      "wenzhou-port-passenger",
      "zhoushan-port-passenger",
    ],
    exitPortIds: [
      "hangzhou-xiaoshan",
      "ningbo-lishe",
      "wenzhou-longwan",
      "yiwu-airport",
      "wenzhou-port-passenger",
      "zhoushan-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "anhui-province",
    displayName: "Anhui Province",
    provinceLevelRegions: ["Anhui"],
    entryPortIds: ["hefei-xinqiao", "huangshan-tunxi"],
    exitPortIds: ["hefei-xinqiao", "huangshan-tunxi"],
  }),
  createPermittedStayArea({
    id: "fujian-province",
    displayName: "Fujian Province",
    provinceLevelRegions: ["Fujian"],
    entryPortIds: [
      "fuzhou-changle",
      "xiamen-gaoqi",
      "quanzhou-jinjiang",
      "wuyishan-airport",
      "xiamen-port-passenger",
    ],
    exitPortIds: [
      "fuzhou-changle",
      "xiamen-gaoqi",
      "quanzhou-jinjiang",
      "wuyishan-airport",
      "xiamen-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "shandong-province",
    displayName: "Shandong Province",
    provinceLevelRegions: ["Shandong"],
    entryPortIds: [
      "jinan-yaoqiang",
      "qingdao-jiaodong",
      "yantai-penglai",
      "weihai-dashuipo",
      "qingdao-port-passenger",
    ],
    exitPortIds: [
      "jinan-yaoqiang",
      "qingdao-jiaodong",
      "yantai-penglai",
      "weihai-dashuipo",
      "qingdao-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "henan-province",
    displayName: "Henan Province",
    provinceLevelRegions: ["Henan"],
    entryPortIds: ["zhengzhou-xinzheng"],
    exitPortIds: ["zhengzhou-xinzheng"],
  }),
  createPermittedStayArea({
    id: "hubei-province",
    displayName: "Hubei Province",
    provinceLevelRegions: ["Hubei"],
    entryPortIds: ["wuhan-tianhe"],
    exitPortIds: ["wuhan-tianhe"],
  }),
  createPermittedStayArea({
    id: "hunan-province",
    displayName: "Hunan Province",
    provinceLevelRegions: ["Hunan"],
    entryPortIds: ["changsha-huanghua", "zhangjiajie-hehua"],
    exitPortIds: ["changsha-huanghua", "zhangjiajie-hehua"],
  }),
  createPermittedStayArea({
    id: "guangdong-province",
    displayName: "Guangdong Province",
    provinceLevelRegions: ["Guangdong"],
    restrictions: [
      "The current annex permits stays throughout Guangdong Province.",
      "The annex notes that exit is available at all open ports across Guangdong; confirm the exact operating service and border arrangements before travel.",
    ],
    entryPortIds: [
      "guangzhou-baiyun",
      "shenzhen-baoan",
      "jieyang-chaoshan",
      "nansha-port-passenger",
      "shekou-port-passenger",
      "guangzhou-pazhou-ferry-terminal",
      "zhongshan-port-passenger",
      "hengqin-port",
      "hong-kong-zhuhai-macao-bridge-port",
      "west-kowloon-station-port",
    ],
    exitPortIds: [
      "guangzhou-baiyun",
      "shenzhen-baoan",
      "jieyang-chaoshan",
      "nansha-port-passenger",
      "shekou-port-passenger",
      "guangzhou-pazhou-ferry-terminal",
      "zhongshan-port-passenger",
      "hengqin-port",
      "hong-kong-zhuhai-macao-bridge-port",
      "west-kowloon-station-port",
    ],
    exitViaAnyOpenPortInProvince: true,
  }),
  createPermittedStayArea({
    id: "hainan-province",
    displayName: "Hainan Province",
    provinceLevelRegions: ["Hainan"],
    entryPortIds: ["haikou-meilan", "sanya-phoenix"],
    exitPortIds: ["haikou-meilan", "sanya-phoenix"],
  }),
  createPermittedStayArea({
    id: "chongqing-municipality",
    displayName: "Chongqing Municipality",
    provinceLevelRegions: ["Chongqing"],
    entryPortIds: ["chongqing-jiangbei"],
    exitPortIds: ["chongqing-jiangbei"],
  }),
  createPermittedStayArea({
    id: "guizhou-province",
    displayName: "Guizhou Province",
    provinceLevelRegions: ["Guizhou"],
    entryPortIds: ["guiyang-longdongbao"],
    exitPortIds: ["guiyang-longdongbao"],
  }),
  createPermittedStayArea({
    id: "shaanxi-province",
    displayName: "Shaanxi Province",
    provinceLevelRegions: ["Shaanxi"],
    entryPortIds: ["xian-xianyang"],
    exitPortIds: ["xian-xianyang"],
  }),
  createPermittedStayArea({
    id: "shanxi-taiyuan-datong",
    displayName: "Taiyuan and Datong, Shanxi",
    provinceLevelRegions: ["Shanxi"],
    cities: ["Taiyuan", "Datong"],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: ["taiyuan-wusu"],
    exitPortIds: ["taiyuan-wusu"],
  }),
  createPermittedStayArea({
    id: "heilongjiang-harbin",
    displayName: "Harbin, Heilongjiang",
    provinceLevelRegions: ["Heilongjiang"],
    cities: ["Harbin"],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: ["harbin-taiping"],
    exitPortIds: ["harbin-taiping"],
  }),
  createPermittedStayArea({
    id: "jiangxi-nanchang-jingdezhen",
    displayName: "Nanchang and Jingdezhen, Jiangxi",
    provinceLevelRegions: ["Jiangxi"],
    cities: ["Nanchang", "Jingdezhen"],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: ["nanchang-changbei"],
    exitPortIds: ["nanchang-changbei"],
  }),
  createPermittedStayArea({
    id: "guangxi-12-cities",
    displayName: "12 permitted cities in Guangxi",
    provinceLevelRegions: ["Guangxi Zhuang Autonomous Region"],
    cities: [
      "Nanning",
      "Liuzhou",
      "Guilin",
      "Wuzhou",
      "Beihai",
      "Fangchenggang",
      "Qinzhou",
      "Guigang",
      "Yulin",
      "Hezhou",
      "Hechi",
      "Laibin",
    ],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: [
      "nanning-wuxu",
      "guilin-liangjiang",
      "beihai-fucheng",
      "beihai-port-passenger",
    ],
    exitPortIds: [
      "nanning-wuxu",
      "guilin-liangjiang",
      "beihai-fucheng",
      "beihai-port-passenger",
    ],
  }),
  createPermittedStayArea({
    id: "sichuan-11-cities",
    displayName: "11 permitted cities in Sichuan",
    provinceLevelRegions: ["Sichuan"],
    cities: [
      "Chengdu",
      "Zigong",
      "Luzhou",
      "Deyang",
      "Suining",
      "Neijiang",
      "Leshan",
      "Yibin",
      "Ya'an",
      "Meishan",
      "Ziyang",
    ],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: ["chengdu-shuangliu", "chengdu-tianfu"],
    exitPortIds: ["chengdu-shuangliu", "chengdu-tianfu"],
  }),
  createPermittedStayArea({
    id: "yunnan-9-prefectures",
    displayName: "9 permitted cities and prefectures in Yunnan",
    provinceLevelRegions: ["Yunnan"],
    cities: [
      "Kunming",
      "Yuxi",
      "Chuxiong",
      "Honghe",
      "Wenshan",
      "Pu'er",
      "Xishuangbanna",
      "Dali",
      "Lijiang",
    ],
    restrictions: [PARTIAL_AREA_RESTRICTION],
    entryPortIds: [
      "kunming-changshui",
      "lijiang-sanyi",
      "mohan-railway-port",
    ],
    exitPortIds: [
      "kunming-changshui",
      "lijiang-sanyi",
      "mohan-railway-port",
    ],
  }),
];

export const PERMITTED_STAY_AREA_GROUP_IDS = PERMITTED_STAY_AREA_GROUPS.map(
  (area) => area.id,
);

export const TRANSIT_PERMITTED_AREA_NOTICE =
  "You must remain within the permitted stay areas authorized for your route and temporary entry permit. An eligible port does not mean nationwide travel.";

export const TRANSIT_CROSS_REGION_NOTICE =
  "The NIA policy permits cross-region travel only within the published permitted parts of the 24 province-level regions. Follow the area and departure deadline shown on your temporary entry permit.";

if (PERMITTED_STAY_AREA_GROUPS.length !== 24) {
  throw new Error("Permitted stay area dataset count mismatch");
}

if (new Set(PERMITTED_STAY_AREA_GROUP_IDS).size !== 24) {
  throw new Error("Permitted stay area dataset contains duplicate IDs");
}
