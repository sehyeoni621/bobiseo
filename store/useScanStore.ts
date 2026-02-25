import { create } from "zustand";
import { KcdCode, DocType } from "@/types/kcd";
import { mockKcdResults } from "@/data/mock-kcd-codes";

interface ScanState {
  selectedDocType: DocType | null;
  kcdResults: KcdCode[];
  isScanning: boolean;
  setDocType: (type: DocType | null) => void;
  setKcdResults: (results: KcdCode[]) => void;
  setScanning: (value: boolean) => void;
  loadMockData: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  selectedDocType: null,
  kcdResults: [],
  isScanning: false,
  setDocType: (type) => set({ selectedDocType: type }),
  setKcdResults: (results) => set({ kcdResults: results }),
  setScanning: (value) => set({ isScanning: value }),
  loadMockData: () => set({ kcdResults: mockKcdResults }),
}));
