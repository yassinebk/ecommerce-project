import create from "zustand";

type SidebarStoreType = {
  expanded: boolean;
  toggle: () => void;
  onClose: () => void;
  onOpen: () => void;
};
const useSidebarStore = create<SidebarStoreType>((set) => ({
  expanded: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
  onClose: () => set((_) => ({ expanded: false })),
  onOpen: () => set((_) => ({ expanded: true })),
}));

export default useSidebarStore;
