"use client";

import { tasksAtom } from "@/store/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "sonner";

function useSearch() {
  const [, setTasks] = useAtom(tasksAtom);
  const search = async (searchTerm: string) => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .select("*")
        .ilike("title", `%${searchTerm}%`);

      if (data && status === 200) {
        setTasks(data); // jotai 상태 값 업데이트
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };
  return { search };
}
export { useSearch };
