"use client";

import { tasksAtom } from "@/store/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "sonner";

function useGetTasks() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const getTasks = async () => {
    try {
      const { data, status, error } = await supabase.from("tasks").select("*");

      // 성공적으로 데이터가 반환될 때
      if (data && status === 200) {
        setTasks(data);
      }
      if (error) {
        toast.error("오류 발생");
        console.error(error.message);
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };
  return { getTasks, tasks };
}

export { useGetTasks };
