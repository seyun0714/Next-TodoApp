"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
// scss
import styles from "./page.module.scss";
// component
import { BoardCard } from "@/components/common";
import { LabelDatePicker, Progress, Button, Input } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
// type
import { Task, Board } from "@/types/index";
// hook
import { useCreateBoard, useGetTask } from "@/hooks/apis";
import Image from "next/image";

function TaskPage() {
  const router = useRouter();
  const { id } = useParams();

  const { task } = useGetTask(Number(id));

  const createBoard = useCreateBoard();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStartDate(task.start_date ? new Date(task.start_date) : undefined);
      setEndDate(task.end_date ? new Date(task.end_date) : undefined);
      setBoards(task.boards);
    }
  }, [task]);

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

  const handleSave = () => {};

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
            <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">
              삭제
            </Button>
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
              1/10 Completed
            </small>
            <Progress className="w-60 g-[10px]" value={10}></Progress>
          </div>
        </div>
        <div className={styles.header__bottom}>
          {/* 캘린더 + add new board 버튼 섹션 */}
          <div className="flex items-center gap-5">
            <LabelDatePicker label="From" value={startDate} />
            <LabelDatePicker label="To" value={endDate} />
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
