/**
 * Common IATA search aliases for airport records in the official transit-port
 * dataset. These values are a search convenience only: the eligibility rules
 * always use the NIA port ID and never infer eligibility from an airport code.
 */
export const TRANSIT_PORT_SEARCH_CODES: Readonly<Record<string, string>> = {
  "beijing-capital": "PEK",
  "beijing-daxing": "PKX",
  "tianjin-binhai": "TSN",
  "shijiazhuang-zhengding": "SJW",
  "shenyang-taoxian": "SHE",
  "dalian-zhoushuizi": "DLC",
  "shanghai-hongqiao": "SHA",
  "shanghai-pudong": "PVG",
  "nanjing-lukou": "NKG",
  "sunan-shuofang": "WUX",
  "yangzhou-taizhou": "YTY",
  "hangzhou-xiaoshan": "HGH",
  "ningbo-lishe": "NGB",
  "wenzhou-longwan": "WNZ",
  "yiwu-airport": "YIW",
  "hefei-xinqiao": "HFE",
  "huangshan-tunxi": "TXN",
  "fuzhou-changle": "FOC",
  "xiamen-gaoqi": "XMN",
  "quanzhou-jinjiang": "JJN",
  "wuyishan-airport": "WUS",
  "jinan-yaoqiang": "TNA",
  "qingdao-jiaodong": "TAO",
  "yantai-penglai": "YNT",
  "weihai-dashuipo": "WEH",
  "zhengzhou-xinzheng": "CGO",
  "wuhan-tianhe": "WUH",
  "changsha-huanghua": "CSX",
  "zhangjiajie-hehua": "DYG",
  "guangzhou-baiyun": "CAN",
  "shenzhen-baoan": "SZX",
  "jieyang-chaoshan": "SWA",
  "haikou-meilan": "HAK",
  "sanya-phoenix": "SYX",
  "chongqing-jiangbei": "CKG",
  "guiyang-longdongbao": "KWE",
  "xian-xianyang": "XIY",
  "taiyuan-wusu": "TYN",
  "harbin-taiping": "HRB",
  "nanchang-changbei": "KHN",
  "nanning-wuxu": "NNG",
  "guilin-liangjiang": "KWL",
  "beihai-fucheng": "BHY",
  "chengdu-shuangliu": "CTU",
  "chengdu-tianfu": "TFU",
  "kunming-changshui": "KMG",
  "lijiang-sanyi": "LJG",
};

if (Object.keys(TRANSIT_PORT_SEARCH_CODES).length !== 47) {
  throw new Error("Transit airport search alias count mismatch");
}
