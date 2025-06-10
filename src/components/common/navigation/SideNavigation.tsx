"use client";

import React from "react";
// hook
import { useCreateTask } from "@/hooks/apis";
// component
import { Button, SearchBar } from "@/components/ui";

function SideNavigation() {
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
            <li className="bg-[#f5f5f5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
              <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
              등록된 Task가 없습니다.
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideNavigation;
