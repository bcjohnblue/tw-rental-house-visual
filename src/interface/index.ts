export type ValueOf<T> = T[keyof T];

/** 物件類型 */
export type PropertyType =
  /** 整層住家 */
  | 0
  /** 獨立套房 */
  | 1
  /** 分租套房 */
  | 2
  /** 雅房 */
  | 3
  /** 車位 */
  | 4
  /** 其他 */
  | 5
  /** 倉庫 */
  | 6
  /** 場地 */
  | 7
  /** 不明 */
  | 65535;

/** Key of Data */
export type KeyOfData = keyof Data;

/** d3 圖表資料型態 */
export type GraphData = Partial<Data>;

/** JSON 資料型態 */
export interface Data {
  additional_fee_cable_tv: boolean;
  additional_fee_eletricity: boolean;
  additional_fee_gas: boolean;
  additional_fee_internet: boolean;
  additional_fee_water: boolean;
  agent_org: null;
  allow_pet: boolean;
  apt_feature_code: null;
  building_type: number;
  can_cook: boolean;
  contact: number;
  /** 押金 (大部分為兩個月) */
  deposit: number;
  deposit_type: number;
  dist_to_highest_floor: number;
  facilities_冰箱: boolean;
  facilities_冷氣: boolean;
  facilities_天然瓦斯: boolean;
  facilities_床: boolean;
  facilities_桌子: boolean;
  facilities_椅子: boolean;
  facilities_沙發: boolean;
  facilities_洗衣機: boolean;
  facilities_熱水器: boolean;
  facilities_第四台: boolean;
  facilities_網路: boolean;
  facilities_衣櫃: boolean;
  facilities_電視: boolean;
  floor: number;
  /** 坪數 */
  floor_ping: number;
  gender_restriction: number;
  has_dealt: number;
  has_gender_restriction: boolean;
  has_parking: boolean;
  has_perperty_registration: boolean;
  has_tenant_restriction: boolean;
  is_require_management_fee: null;
  is_require_parking_fee: null;
  is_rooftop: boolean;
  living_functions_conv_store: boolean;
  living_functions_dept_store: boolean;
  living_functions_hospital: boolean;
  living_functions_night_mkt: boolean;
  living_functions_park: boolean;
  living_functions_school: boolean;
  living_functions_traditional_mkt: boolean;
  max_author_id: string;
  max_created: string;
  max_deal_time: null;
  max_house_id: string;
  max_n_day_deal: null;
  min_created: string;
  min_house_id: string;
  monthly_management_fee: null;
  monthly_parking_fee: null;
  /** 每月租金 */
  monthly_price: number;
  n_balcony: null;
  n_bath_room: null;
  n_bed_room: null;
  n_duplicate: 1;
  n_living_room: null;
  n_month_deposit: number;
  per_ping_price: number;
  /** 物件類型 */
  property_type: PropertyType;
  rough_coordinate_bb: number[];
  /** 行政區 (中山區、松山區) */
  sub_region: number;
  top_region: number;
  total_floor: number;
  transportation_bus: string;
  transportation_hsr: string;
  transportation_public_bike: string;
  transportation_subway: string;
  transportation_train: string;
  vendor: string;
}
