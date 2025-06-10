"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

function useCreateTask() {
  const router = useRouter();
  const createTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: null,
            start_date: null,
            end_date: null,
            boards: [],
          },
        ])
        .select();

      if (data && status === 201) {
        toast.success("Task 생성됨");
        router.push(`/task/${data[0].id}`);
      }
      if (error) {
        toast.error("Task 생성 실패");
        console.error(error.message);
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };
  return createTask;
}

export { useCreateTask };
