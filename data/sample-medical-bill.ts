export interface MedicalBillItem {
  category: string;
  description: string;
  amount: number;
  insuranceCovered: number;
  patientPay: number;
}

export interface KcdDiagnosis {
  code: string;
  name: string;
  department: string;
}

export interface SampleMedicalBill {
  hospital: string;
  patient: string;
  visitDate: string;
  treatmentPeriod: string;
  treatmentType: "inpatient" | "outpatient";
  daysAdmitted: number;
  diagnoses: KcdDiagnosis[];
  items: MedicalBillItem[];
  totalAmount: number;
  insuranceCovered: number;
  patientTotal: number;
}

// Realistic sample medical bill for simulation
export const sampleMedicalBill: SampleMedicalBill = {
  hospital: "제주대학교병원",
  patient: "김보비",
  visitDate: "2026-02-20",
  treatmentPeriod: "2026-02-18 ~ 2026-02-20",
  treatmentType: "inpatient",
  daysAdmitted: 3,
  diagnoses: [
    { code: "M51.1", name: "요추 및 기타 추간판장애의 신경근병증", department: "정형외과" },
    { code: "M54.5", name: "요통", department: "정형외과" },
    { code: "G55.1", name: "추간판장애에서의 신경근 압박", department: "신경외과" },
  ],
  items: [
    { category: "진찰료", description: "입원 진찰료", amount: 45000, insuranceCovered: 31500, patientPay: 13500 },
    { category: "입원료", description: "일반병실 (3일)", amount: 180000, insuranceCovered: 126000, patientPay: 54000 },
    { category: "검사료", description: "MRI (요추부)", amount: 580000, insuranceCovered: 348000, patientPay: 232000 },
    { category: "검사료", description: "X-ray 촬영", amount: 45000, insuranceCovered: 31500, patientPay: 13500 },
    { category: "검사료", description: "혈액검사 일반", amount: 85000, insuranceCovered: 59500, patientPay: 25500 },
    { category: "투약료", description: "약제비 (소염진통제 외)", amount: 67000, insuranceCovered: 46900, patientPay: 20100 },
    { category: "주사료", description: "주사비 (진통제)", amount: 120000, insuranceCovered: 84000, patientPay: 36000 },
    { category: "처치료", description: "물리치료 (3회)", amount: 90000, insuranceCovered: 63000, patientPay: 27000 },
    { category: "마취료", description: "경막외 신경차단술", amount: 350000, insuranceCovered: 245000, patientPay: 105000 },
  ],
  totalAmount: 1562000,
  insuranceCovered: 1035400,
  patientTotal: 526600,
};

// Group items by category for display
export function groupBillItems(items: MedicalBillItem[]): Record<string, MedicalBillItem[]> {
  return items.reduce<Record<string, MedicalBillItem[]>>((acc, item) => {
    return {
      ...acc,
      [item.category]: [...(acc[item.category] || []), item],
    };
  }, {});
}
