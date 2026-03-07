import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  resolve: ((value: boolean) => void) | null;
}

interface ConfirmStore extends ConfirmState {
  confirm: (title: string, message: string) => Promise<boolean>;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  isOpen: false,
  title: '',
  message: '',
  resolve: null,
  confirm: (title, message) =>
    new Promise<boolean>((resolve) => {
      set({ isOpen: true, title, message, resolve });
    }),
  handleConfirm: () => {
    get().resolve?.(true);
    set({ isOpen: false, resolve: null });
  },
  handleCancel: () => {
    get().resolve?.(false);
    set({ isOpen: false, resolve: null });
  },
}));
