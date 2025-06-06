"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { nanoid } from "nanoid";
// scss
import styles from "./page.module.scss";
// shadcn UI
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// component
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import BasicBoard from "@/components/common/board/BasicBoard";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  start_date: string | Date;
  end_date: string | Date;
  contents: BoardContent[];
}

interface BoardContent {
  boardId: string | number;
  isCompleted: boolean;
  title: string;
  startDate: string;
  endDate: string;
  content: string;
}

function page() {
  const router = useRouter();
  const pathname = usePathname();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [boards, setBoards] = useState<Todo>();

  // ================================================================================================
  const insertRowData = async (contents: BoardContent[]) => {
    // supabase 데이터베이스 연동
    const { data, error, status } = await supabase
      .from("todos")
      .update({
        contents: contents,
      })
      .eq("id", pathname.split("/")[2]);

    console.log(status);
    if (error) {
      toast.error("오류 발생");
      console.error(error);
    }
    if (status === 204) {
      toast.success("추가 완료");
      getData();
    }
  };
  // ================================================================================================

  // Add new board 버튼 클릭 시
  const createBoard = () => {
    let newContents: BoardContent[] = [];
    const BoardContent = {
      boardId: nanoid(),
      isCompleted: false,
      title: "",
      startDate: "",
      endDate: "",
      content: "",
    };
    if (boards && boards.contents.length > 0) {
      newContents = [...boards.contents];
      newContents.push(BoardContent);
      insertRowData(newContents);
    } else if (boards && boards.contents.length === 0) {
      newContents.push(BoardContent);
      insertRowData(newContents);
    }
  };

  // ================================================================================================
  // Supabase에 기존에 생성된 보드가 있는지 체크
  const getData = async () => {
    let {
      data: todos,
      error,
      status,
    } = await supabase.from("todos").select("*");

    if (todos !== null) {
      todos.forEach((item: Todo) => {
        if (item.id === Number(pathname.split("/")[2])) {
          setBoards(item);
        }
      });
    }
  };

  const handleSave = () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className="absolute top-6 left-7 flex items-center gap-2">
        <Button variant={"outline"} size={"icon"} onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <Button variant={"outline"} onClick={handleSave}>
          저장
        </Button>
      </div>
      <header className={styles.container__header}>
        <div className={styles.container__header__contents}>
          <input
            type="text"
            placeholder="Enter Title Here"
            className={styles.input}
          />
          <div className={styles.progressBar}>
            <span className={styles.progressBar__status}>0/10 Completed</span>
            <Progress
              value={33}
              className="w-[30%] h-2"
              indicatorColor="bg-green-500"
            />
          </div>
          <div className={styles.calendarBox}>
            <div className={styles.calendarBox__calendar}>
              <LabelCalendar label="From" handleDate={setStartDate} />
              <LabelCalendar label="To" handleDate={setEndDate} />
            </div>
            <Button
              variant={"outline"}
              className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white cursor-pointer"
              onClick={createBoard}
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.container__body}>
        {boards?.contents.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className={styles.container__body__infoBox}>
              <span className={styles.title}>There is no board yet.</span>
              <span className={styles.subtitle}>
                Click the button and start flashing!
              </span>
              <button className={styles.button}>
                <Image
                  src={"/assets/images/round-button.svg"}
                  alt="round-button"
                  width={50}
                  height={50}
                  color="bg-orange-500"
                  onClick={createBoard}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full h-full gap-4 overflow-y-auto">
            {boards?.contents.map((board: BoardContent) => {
              return (
                <BasicBoard
                  key={board.boardId}
                  data={board}
                  handleBoards={setBoards}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default page;
