"use client";

import { taskAtom } from "@/store/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { useGetTask } from "./useGetTask";
import { Board } from "@/types";

function useDeleteBoard(taskId: number, boardId: string) {
  const { getTask } = useGetTask(taskId);
  const [task] = useAtom(taskAtom);
  const deleteBoard = async () => {
    const { status, error } = await supabase
      .from("tasks")
      .update({
        boards: task?.boards.filter((board: Board) => board.id !== boardId),
      })
      .eq("id", taskId);

    if (status === 204) {
      toast.success("Board 삭제 완료");
      getTask();
    }
    if (error) {
      toast.error("Board 삭제 실패");
      console.error(error.message);
    }
    try {
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };
  return deleteBoard;
}

export { useDeleteBoard };
