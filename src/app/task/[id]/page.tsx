"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
// scss
import styles from "./page.module.scss";
// component
import { BoardCard, DeleteTaskPopup } from "@/components/common";
import { LabelDatePicker, Progress, Button, Input } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
// type
import { Task, Board } from "@/types/index";
// hook
import { useCreateBoard, useGetTask, useGetTasks } from "@/hooks/apis";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";

function TaskPage() {
  const router = useRouter();
  const { id } = useParams();

  const { task } = useGetTask(Number(id));
  const { getTasks } = useGetTasks();
  const createBoard = useCreateBoard();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [boards, setBoards] = useState<Board[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStartDate(task.start_date ? new Date(task.start_date) : undefined);
      setEndDate(task.end_date ? new Date(task.end_date) : undefined);
      setBoards(task.boards);
    }
  }, [task]);

  useEffect(() => {
    if (task?.boards) {
      const completedCount = task.boards.filter(
        (board: Board) => board.isCompleted
      ).length;
      setCount(completedCount);
    }
  }, [task?.boards]);

  // Add new board 버튼 클릭 시
  const handleAddBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      isCompleted: false,
      title: "",
      startDate: undefined,
      endDate: undefined,
      content: "",
    };
    const newBoards = [...boards, newBoard];
    setBoards(newBoards);
    createBoard(Number(id), "boards", newBoards);
  };

  const handleSave = async () => {
    if (!title || !startDate || !endDate) {
      toast.error("제목, 시작일, 종료일은 필수 입력 값입니다.");
      return;
    }

    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          start_date: startDate,
          end_date: endDate,
        })
        .eq("id", id)
        .select();
      if (data && status === 200) {
        toast.success("Task 저장 성공");
        // 서버에서 데이터 갱신 후 상태값 업데이트
        /*
         * SideNavigation 컴포넌트 리스트 정보를 실시간으로 업데이트 하기 위해서 getTask 훅 사용
         */
        getTasks();
      }
      if (error) {
        toast.error("Task 저장 실패");
        console.error(error.message);
      }
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => router.push("/")}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} onClick={handleSave}>
              저장
            </Button>
            <DeleteTaskPopup>
              <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">
                삭제
              </Button>
            </DeleteTaskPopup>
          </div>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 섹션 */}
          <input
            className={styles.header__top__input}
            type="text"
            defaultValue={task?.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title Here!"
          />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6d6d6d]">
              {count}/{task?.boards.length} Completed
            </small>
            <Progress
              className="w-60 g-[10px]"
              value={
                task && task.boards.length > 0
                  ? (count / task.boards.length) * 100
                  : 0
              }
            ></Progress>
          </div>
        </div>
        <div className={styles.header__bottom}>
          {/* 캘린더 + add new board 버튼 섹션 */}
          <div className="flex items-center gap-5">
            <LabelDatePicker
              label="From"
              value={startDate}
              onChange={setStartDate}
            />
            <LabelDatePicker label="To" value={endDate} onChange={setEndDate} />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E79057] hover:ring-1 hover:ring-[#E79057] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={handleAddBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {boards.length !== 0 ? (
          <div className={styles.body__isData}>
            {boards.map((board: Board) => {
              return <BoardCard key={board.id} board={board} />;
            })}
          </div>
        ) : (
          <div className={styles.body__noData}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              아직 Board가 없습니다.
            </h3>
            <small className="text-sm font-medium leading-none text-[#6d6d6d] mb-4">
              추가 버튼을 눌러 Board를 추가하세요!
            </small>
            <button>
              <Image
                src={"/assets/images/round-button.svg"}
                width={50}
                height={50}
                alt="rounded-button"
                onClick={handleAddBoard}
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskPage;
