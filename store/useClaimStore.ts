import { create } from "zustand";
import { ClaimableItem } from "@/types/claim";
import { mockClaimItems } from "@/data/mock-riders";

interface ClaimState {
  claimableItems: ClaimableItem[];
  currentStep: number; // 1-5 for claim process
  selectedClaimId: string | null;
  setClaimableItems: (items: ClaimableItem[]) => void;
  setCurrentStep: (step: number) => void;
  selectClaim: (id: string | null) => void;
  loadMockData: () => void;
}

export const useClaimStore = create<ClaimState>((set) => ({
  claimableItems: [],
  currentStep: 1,
  selectedClaimId: null,
  setClaimableItems: (items) => set({ claimableItems: items }),
  setCurrentStep: (step) => set({ currentStep: step }),
  selectClaim: (id) => set({ selectedClaimId: id }),
  loadMockData: () => set({ claimableItems: mockClaimItems }),
}));
