"use client";

import { taskAtom } from "@/store/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { Task } from "@/types";
import { useEffect } from "react";

function useGetTask(taskId: number) {
  const [task, setTask] = useAtom(taskAtom);

  const getTask = async () => {
    if (!taskId) return;
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", taskId);
      if (data && status === 200) {
        setTask(data[0]);
      }
      if (error) {
        toast.error("Task 로드 실패");
        console.error(error.message);
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };

  useEffect(() => {
    if (taskId) getTask();
    console.log("실행됨");
  }, [taskId]);

  return { task, getTask };
}

export { useGetTask };
