export type AppointmentStatus = "قيد الانتظار" | "مقبول" | "مكتمل" | "ملغي";

export type Patient = {
  id: string;
  name: string;
  phone: string;
  age: number;
  lastVisit: string;
  treatment: string;
  balance: number;
  notes: number;
  images: number;
};

export type Appointment = {
  id: string;
  patient: string;
  time: string;
  date: string;
  reason: string;
  status: AppointmentStatus;
  color: string;
};

export const clinicSettings = {
  name: "العيادة الشاملة",
  currency: "ل.س",
  doctor: "د. أحمد الشامي",
};

export const appointments: Appointment[] = [
  { id: "a1", patient: "سارة محمد", time: "09:00", date: "اليوم، 25 تشرين الثاني", reason: "مراجعة دورية", status: "مقبول", color: "#0F766E" },
  { id: "a2", patient: "عمر خالد", time: "10:30", date: "اليوم، 25 تشرين الثاني", reason: "استشارة أولية", status: "قيد الانتظار", color: "#D97706" },
  { id: "a3", patient: "ليان حسن", time: "12:00", date: "اليوم، 25 تشرين الثاني", reason: "متابعة العلاج", status: "مقبول", color: "#0F766E" },
  { id: "a4", patient: "رامي يوسف", time: "14:30", date: "اليوم، 25 تشرين الثاني", reason: "تنظيف وفحص", status: "مكتمل", color: "#64748B" },
];

export const patients: Patient[] = [
  { id: "p1", name: "سارة محمد", phone: "09 123 4567", age: 29, lastVisit: "20 تشرين الثاني", treatment: "متابعة علاج الأسنان", balance: 85000, notes: 4, images: 3 },
  { id: "p2", name: "عمر خالد", phone: "09 234 5678", age: 41, lastVisit: "12 تشرين الثاني", treatment: "استشارة أولية", balance: 120000, notes: 2, images: 1 },
  { id: "p3", name: "ليان حسن", phone: "09 345 6789", age: 34, lastVisit: "05 تشرين الثاني", treatment: "تقويم ومراجعة", balance: 0, notes: 6, images: 8 },
  { id: "p4", name: "رامي يوسف", phone: "09 456 7890", age: 26, lastVisit: "25 تشرين الثاني", treatment: "فحص دوري", balance: 0, notes: 1, images: 0 },
];

export const expenses = [
  { id: "e1", title: "مستلزمات طبية", category: "مشتريات", amount: 320000, date: "25 تشرين الثاني" },
  { id: "e2", title: "فاتورة الكهرباء", category: "تشغيل", amount: 85000, date: "24 تشرين الثاني" },
  { id: "e3", title: "صيانة جهاز الأشعة", category: "صيانة", amount: 150000, date: "20 تشرين الثاني" },
];

export const formatMoney = (amount: number) => `${amount.toLocaleString("en-US")} ${clinicSettings.currency}`;
