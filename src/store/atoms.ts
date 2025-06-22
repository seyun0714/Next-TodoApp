import { Task } from "@/types";
import { atom } from "jotai";

// 전체 태스크 목록 조회
export const tasksAtom = atom<Task[]>([]);

// 단일 태스크 조회
export const taskAtom = atom<Task | null>(null);
