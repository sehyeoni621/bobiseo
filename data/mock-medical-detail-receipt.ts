// Mock detailed medical receipt (세부진료확인서) with EDI procedure codes
// Based on realistic Korean hospital billing format

export interface MedicalProcedureItem {
  date: string;
  ediCode: string;
  procedureName: string;
  unit: string;
  quantity: number;
  days: number;
  totalAmount: number;
  insurancePay: number;
  patientCopay: number;
  patientFull: number;
  nonCovered: number;
}

export interface MedicalReceiptCategory {
  category: string;
  categoryCode: string;
  items: MedicalProcedureItem[];
  subtotal: {
    totalAmount: number;
    insurancePay: number;
    patientCopay: number;
    patientFull: number;
    nonCovered: number;
  };
}

export interface DetailedMedicalReceipt {
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone: string;
  licenseNumber: string;
  patientName: string;
  patientBirthDate: string;
  patientId: string;
  department: string;
  attendingDoctor: string;
  treatmentType: "inpatient" | "outpatient";
  admissionDate: string;
  dischargeDate: string;
  totalDays: number;
  diagnoses: Array<{
    kcdCode: string;
    name: string;
    isPrimary: boolean;
  }>;
  categories: MedicalReceiptCategory[];
  grandTotal: {
    totalAmount: number;
    insurancePay: number;
    patientCopay: number;
    patientFull: number;
    nonCovered: number;
    patientTotal: number;
  };
  issueDate: string;
  receiptNumber: string;
}

export const mockDetailedReceipt: DetailedMedicalReceipt = {
  hospitalName: "제주대학교병원",
  hospitalAddress: "제주특별자치도 제주시 아란13길 15",
  hospitalPhone: "064-717-1234",
  licenseNumber: "제주-의-12345",
  patientName: "김보비",
  patientBirthDate: "1995-03-15",
  patientId: "P-2026-00384",
  department: "정형외과",
  attendingDoctor: "박정민",
  treatmentType: "inpatient",
  admissionDate: "2026-02-18",
  dischargeDate: "2026-02-20",
  totalDays: 3,
  diagnoses: [
    { kcdCode: "M51.1", name: "요추 및 기타 추간판장애에서의 신경근병증", isPrimary: true },
    { kcdCode: "M54.5", name: "요통", isPrimary: false },
    { kcdCode: "G55.1", name: "추간판장애에서의 신경근 압박", isPrimary: false },
  ],
  categories: [
    {
      category: "진찰료",
      categoryCode: "01",
      items: [
        {
          date: "2026-02-18",
          ediCode: "AA157",
          procedureName: "입원 초진 진찰료",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 25200,
          insurancePay: 17640,
          patientCopay: 7560,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-19",
          ediCode: "AA254",
          procedureName: "입원 재진 진찰료",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 10800,
          insurancePay: 7560,
          patientCopay: 3240,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-20",
          ediCode: "AA254",
          procedureName: "입원 재진 진찰료",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 10800,
          insurancePay: 7560,
          patientCopay: 3240,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 46800,
        insurancePay: 32760,
        patientCopay: 14040,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "입원료",
      categoryCode: "02",
      items: [
        {
          date: "2026-02-18",
          ediCode: "AH100",
          procedureName: "일반병실 입원료 (6인실)",
          unit: "일",
          quantity: 1,
          days: 3,
          totalAmount: 189000,
          insurancePay: 132300,
          patientCopay: 56700,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 189000,
        insurancePay: 132300,
        patientCopay: 56700,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "투약 및 조제료",
      categoryCode: "03",
      items: [
        {
          date: "2026-02-18",
          ediCode: "641600020",
          procedureName: "셀레콕시브 200mg (소염진통제)",
          unit: "정",
          quantity: 2,
          days: 3,
          totalAmount: 5400,
          insurancePay: 3780,
          patientCopay: 1620,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "642900150",
          procedureName: "가바펜틴 300mg (신경통 완화)",
          unit: "캡슐",
          quantity: 3,
          days: 3,
          totalAmount: 8100,
          insurancePay: 5670,
          patientCopay: 2430,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "653400070",
          procedureName: "에소메프라졸 20mg (위장보호)",
          unit: "정",
          quantity: 1,
          days: 3,
          totalAmount: 4500,
          insurancePay: 3150,
          patientCopay: 1350,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "BF101",
          procedureName: "조제료 (입원)",
          unit: "일",
          quantity: 1,
          days: 3,
          totalAmount: 12600,
          insurancePay: 8820,
          patientCopay: 3780,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 30600,
        insurancePay: 21420,
        patientCopay: 9180,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "주사료",
      categoryCode: "04",
      items: [
        {
          date: "2026-02-18",
          ediCode: "644001870",
          procedureName: "케토로락 30mg 주사 (진통제)",
          unit: "바이알",
          quantity: 1,
          days: 2,
          totalAmount: 9600,
          insurancePay: 6720,
          patientCopay: 2880,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "650800230",
          procedureName: "덱사메타손 5mg 주사 (항염증)",
          unit: "앰플",
          quantity: 1,
          days: 1,
          totalAmount: 3200,
          insurancePay: 2240,
          patientCopay: 960,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "KK101",
          procedureName: "정맥주사 (수액 요법)",
          unit: "회",
          quantity: 1,
          days: 3,
          totalAmount: 45000,
          insurancePay: 31500,
          patientCopay: 13500,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 57800,
        insurancePay: 40460,
        patientCopay: 17340,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "영상진단 및 방사선",
      categoryCode: "05",
      items: [
        {
          date: "2026-02-18",
          ediCode: "HE545",
          procedureName: "MRI - 요추부 (조영제 포함)",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 580000,
          insurancePay: 348000,
          patientCopay: 174000,
          patientFull: 58000,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "GY401",
          procedureName: "X-ray 요추부 (AP/LAT)",
          unit: "매",
          quantity: 2,
          days: 1,
          totalAmount: 28000,
          insurancePay: 19600,
          patientCopay: 8400,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 608000,
        insurancePay: 367600,
        patientCopay: 182400,
        patientFull: 58000,
        nonCovered: 0,
      },
    },
    {
      category: "검사료",
      categoryCode: "06",
      items: [
        {
          date: "2026-02-18",
          ediCode: "CZ394",
          procedureName: "일반혈액검사 (CBC)",
          unit: "종",
          quantity: 1,
          days: 1,
          totalAmount: 8900,
          insurancePay: 6230,
          patientCopay: 2670,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "CZ271",
          procedureName: "간기능검사 (LFT)",
          unit: "종",
          quantity: 1,
          days: 1,
          totalAmount: 12400,
          insurancePay: 8680,
          patientCopay: 3720,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "CZ245",
          procedureName: "신기능검사 (BUN/Cr)",
          unit: "종",
          quantity: 1,
          days: 1,
          totalAmount: 7800,
          insurancePay: 5460,
          patientCopay: 2340,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "CZ186",
          procedureName: "CRP (C-반응성단백)",
          unit: "종",
          quantity: 1,
          days: 1,
          totalAmount: 6200,
          insurancePay: 4340,
          patientCopay: 1860,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-18",
          ediCode: "CZ164",
          procedureName: "ESR (적혈구침강속도)",
          unit: "종",
          quantity: 1,
          days: 1,
          totalAmount: 3200,
          insurancePay: 2240,
          patientCopay: 960,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 38500,
        insurancePay: 26950,
        patientCopay: 11550,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "처치 및 수술료",
      categoryCode: "07",
      items: [
        {
          date: "2026-02-19",
          ediCode: "SZ084",
          procedureName: "경막외 신경차단술 (요추부)",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 350000,
          insurancePay: 245000,
          patientCopay: 70000,
          patientFull: 35000,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 350000,
        insurancePay: 245000,
        patientCopay: 70000,
        patientFull: 35000,
        nonCovered: 0,
      },
    },
    {
      category: "마취료",
      categoryCode: "08",
      items: [
        {
          date: "2026-02-19",
          ediCode: "LA322",
          procedureName: "국소마취 (리도카인)",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 45000,
          insurancePay: 31500,
          patientCopay: 13500,
          patientFull: 0,
          nonCovered: 0,
        },
      ],
      subtotal: {
        totalAmount: 45000,
        insurancePay: 31500,
        patientCopay: 13500,
        patientFull: 0,
        nonCovered: 0,
      },
    },
    {
      category: "재활 및 물리치료",
      categoryCode: "09",
      items: [
        {
          date: "2026-02-19",
          ediCode: "MX032",
          procedureName: "심층열 치료 (극초단파)",
          unit: "부위",
          quantity: 1,
          days: 2,
          totalAmount: 24000,
          insurancePay: 16800,
          patientCopay: 7200,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-19",
          ediCode: "MX121",
          procedureName: "경피적 전기신경자극(TENS)",
          unit: "부위",
          quantity: 1,
          days: 2,
          totalAmount: 18000,
          insurancePay: 12600,
          patientCopay: 5400,
          patientFull: 0,
          nonCovered: 0,
        },
        {
          date: "2026-02-20",
          ediCode: "MX145",
          procedureName: "도수치료 (30분)",
          unit: "회",
          quantity: 1,
          days: 1,
          totalAmount: 80000,
          insurancePay: 0,
          patientCopay: 0,
          patientFull: 0,
          nonCovered: 80000,
        },
      ],
      subtotal: {
        totalAmount: 122000,
        insurancePay: 29400,
        patientCopay: 12600,
        patientFull: 0,
        nonCovered: 80000,
      },
    },
  ],
  grandTotal: {
    totalAmount: 1487700,
    insurancePay: 927390,
    patientCopay: 387310,
    patientFull: 93000,
    nonCovered: 80000,
    patientTotal: 560310,
  },
  issueDate: "2026-02-20",
  receiptNumber: "R-2026-02-00384",
};

// Utility to format currency
export function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR");
}
