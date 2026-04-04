export const METRIC_TYPES = {
  price: "ราคา",
  length: "ขนาดความยาว",
  floorHeight: "ความสูงใต้ท้อง",
  passengerVolume: "ปริมาตรห้องโดยสาร",
  accelTo100: "อัตราเร่ง 0-100",
  range: "ระยะทางต่อการชาร์จ WLTP",
};
export type MetricType = keyof typeof METRIC_TYPES;

export type Metrics = {
  [key in MetricType]?: MetricPoint[];
};

export type MetricPoint = {
  carFullname: string;
  value?: number;
  valuePerPrice?: number;
  trim: {
    carSlug: string;
    slug: string;
  };
};
