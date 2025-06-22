"use client";

import React, { useEffect } from "react";
// hook
import { useGetTasks, useCreateTask } from "@/hooks/apis";
// component
import { Button, SearchBar } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/types";

function SideNavigation() {
  const router = useRouter();
  const { tasks, getTasks } = useGetTasks();
  const { id } = useParams();

  // getTasks는 컴포넌트 렌더링 시 한번만 호출되어야 하므로 useEffect로 호출
  useEffect(() => {
    getTasks();
  }, [id]);

  // Task 생성
  const handleCreateTask = useCreateTask();

  return (
    <aside className="page__aside">
      <div className="flex flex-col h-full gap-3">
        {/* 검색창 UI */}
        <SearchBar placeholder="검색어를 입력하세요." />
        {/* Add New Page Button UI */}
        <Button
          className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#fff9f5]"
          onClick={handleCreateTask}
        >
          Add New Page
        </Button>
        {/* Task 목록 */}
        <div className="flex flex-col mt-2 gap-4">
          <small className="text-sm font-medium leading-none text-[#a6a6a6]">
            <span className="text-neutral-700">seyun0714</span>님의 TASK
          </small>
          <ul className="flex flex-col">
            {/* Supabase에서 우리가 생성한 DB가 없을 경우 뜸 */}
            {tasks.length === 0 ? (
              <li className="bg-[#f5f5f5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
                <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
                등록된 Task가 없습니다.
              </li>
            ) : (
              tasks.map((task: Task) => {
                return (
                  <li
                    key={task.id}
                    onClick={() => router.push(`/task/${task.id}`)}
                    className={`${
                      task.id === Number(id) && "bg-[#f5f5f5]"
                    } min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}
                  >
                    <div
                      className={`${
                        task.id === Number(id)
                          ? "bg-[#00f38d]"
                          : "bg-neutral-400"
                      } h-[6px] w-[6px] rounded-full`}
                    ></div>
                    <span
                      className={`${
                        task.id !== Number(id) && "text-neutral-400"
                      }`}
                    >
                      {task.title ? task.title : "등록된 제목이 없습니다."}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideNavigation;
