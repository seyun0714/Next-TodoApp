"use client";

import { Board } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

function useCreateBoard() {
  const createBoard = async (
    taskId: number,
    column: string,
    newvalue: Board[] | undefined
  ) => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .update({
          [column]: newvalue,
        })
        .eq("id", taskId)
        .select();
      console.log(status);
      if (data && status === 200) {
        toast.success("Board 생성됨");
      }
      if (error) {
        toast.error("Board 생성 실패");
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };
  return createBoard;
}

export { useCreateBoard };
