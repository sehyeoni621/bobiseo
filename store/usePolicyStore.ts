import { create } from "zustand";
import { Policy } from "@/types/insurance";
import { mockPolicies } from "@/data/mock-policies";

interface PolicyState {
  policies: Policy[];
  selectedPolicy: Policy | null;
  isAnalyzing: boolean;
  setPolicies: (policies: Policy[]) => void;
  addPolicy: (policy: Policy) => void;
  selectPolicy: (policy: Policy | null) => void;
  setAnalyzing: (value: boolean) => void;
  loadMockData: () => void;
}

export const usePolicyStore = create<PolicyState>((set) => ({
  policies: [],
  selectedPolicy: null,
  isAnalyzing: false,
  setPolicies: (policies) => set({ policies }),
  addPolicy: (policy) =>
    set((state) => ({ policies: [...state.policies, policy] })),
  selectPolicy: (policy) => set({ selectedPolicy: policy }),
  setAnalyzing: (value) => set({ isAnalyzing: value }),
  loadMockData: () => set({ policies: mockPolicies }),
}));
