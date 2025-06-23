"use client";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useDeleteTask() {
  const router = useRouter();
  const deleteTask = async (taskId: number) => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId);

      if (status === 204) {
        toast.success("선택한 Task가 삭제되었습니다.");
        router.push("/"); // 초기 페이지로 이동
      }
      if (error) {
        toast.error("Task 삭제 실패");
        console.error(error.message);
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };

  return { deleteTask };
}

export { useDeleteTask };
