"use client";

// hook
import { useCreateTask } from "@/hooks/apis";
// component
import { Button } from "@/components/ui";

function InitPage() {
  // 페이지 생성 및 Supabase 연동
  const handleCreateTask = useCreateTask();

  return (
    <div className="w-[70%] h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          How To Start
        </h3>
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-normal leading-none">
            1. Create a page
          </span>
          <span className="text-sm font-normal leading-none">
            2. Add boards to page
          </span>
        </div>
        <Button
          className="text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] w-[180px]"
          onClick={handleCreateTask}
        >
          Add New Page
        </Button>
      </div>
    </div>
  );
}

export default InitPage;
