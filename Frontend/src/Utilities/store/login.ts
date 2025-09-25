import { create } from "zustand";

interface User {
    id: number;
    name: string;
    role: string | null;
}

export const useLoginStore = create<{
    user: User | null;
    setUser: (user: User | null) => void;
}>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));