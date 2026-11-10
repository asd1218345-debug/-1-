import { ActionStatus, PriorityLevel } from '../types/radiation';

// System reference date based on local time
export const CURRENT_SYSTEM_DATE = '2026-11-06';

export function isItemOverdue(dueDate: string, status: ActionStatus): boolean {
  if (status === '최종 완료') return false;
  return dueDate < CURRENT_SYSTEM_DATE;
}

export function isItemImminent(dueDate: string, status: ActionStatus): boolean {
  if (status === '최종 완료') return false;
  if (isItemOverdue(dueDate, status)) return false;

  const due = new Date(dueDate).getTime();
  const current = new Date(CURRENT_SYSTEM_DATE).getTime();
  const diffDays = Math.ceil((due - current) / (1000 * 60 * 60 * 24));

  return diffDays >= 0 && diffDays <= 3;
}

export function getDaysRemainingText(dueDate: string, status: ActionStatus): string {
  if (status === '최종 완료') return '완료됨';
  const due = new Date(dueDate).getTime();
  const current = new Date(CURRENT_SYSTEM_DATE).getTime();
  const diffDays = Math.ceil((due - current) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)}일 지연 초과`;
  } else if (diffDays === 0) {
    return '오늘 마감';
  } else {
    return `D-${diffDays}`;
  }
}

export function getStatusStyle(status: ActionStatus): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (status) {
    case '미조치':
      // 중요한 미조치 항목은 경보 색상(Rose/Red)으로 강조
      return {
        bg: 'bg-rose-950/80 text-rose-300',
        text: 'text-rose-300',
        border: 'border-rose-500',
        label: '미조치',
      };
    case '조치 진행 중':
      // 진행 중 항목은 명확한 Amber 톤으로 구분
      return {
        bg: 'bg-amber-950/60 text-amber-300',
        text: 'text-amber-300',
        border: 'border-amber-500/60',
        label: '조치 진행 중',
      };
    case '관리자 확인 대기':
      // 관리자 확인 대기는 신뢰감 있는 Sky/Cyan 톤으로 구분
      return {
        bg: 'bg-sky-950/60 text-sky-300',
        text: 'text-sky-300',
        border: 'border-sky-500/60',
        label: '관리자 확인 대기',
      };
    case '최종 완료':
      // 최종 완료 항목은 시인성이 뛰어난 선명한 Emerald 톤으로 표현
      return {
        bg: 'bg-emerald-950/60 text-emerald-300',
        text: 'text-emerald-300',
        border: 'border-emerald-500/60',
        label: '최종 완료',
      };
  }
}

export function getPriorityStyle(priority: PriorityLevel): {
  bg: string;
  text: string;
  border: string;
} {
  switch (priority) {
    case '높음':
      return { bg: 'bg-rose-950/80 text-rose-300', text: 'text-rose-300 font-bold', border: 'border-rose-500' };
    case '보통':
      return { bg: 'bg-black text-white', text: 'text-white', border: 'border-white/40' };
    case '낮음':
      return { bg: 'bg-black text-slate-400', text: 'text-slate-400', border: 'border-white/20' };
  }
}
