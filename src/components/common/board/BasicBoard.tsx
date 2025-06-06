import { supabase } from "@/utils/supabase";
import { usePathname } from "next/navigation";
import MarkdownDialog from "../dialog/MarkdownDialog";

// shadcn UI
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { ChevronUp } from "lucide-react";

import styles from "./BasicBoard.module.scss";
import LabelCalendar from "../calendar/LabelCalendar";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Card } from "@/components/ui/card";

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

interface Props {
  data: BoardContent;
  handleBoards: (data: Todo) => void;
}

function BasicBoard({ data, handleBoards }: Props) {
  const pathname = usePathname();

  // 삭제 버튼 누를 때 실행
  const handleDelete = async (id: string | number) => {
    let { data: todos } = await supabase.from("todos").select("*");

    if (todos !== null) {
      todos.forEach(async (item: Todo) => {
        if (item.id === Number(pathname.split("/")[2])) {
          console.log(item);
          let newContents = item.contents.filter(
            (element: BoardContent) => element.boardId !== id
          );

          const { data, error, status } = await supabase
            .from("todos")
            .update({ contents: newContents })
            .eq("id", pathname.split("/")[2]);

          if (error) {
            console.error(error);
            toast.error("에러 발생");
          }

          if (status === 204) {
            toast("삭제 완료");
            getData();
          } else {
            return;
          }
        }
      });
    }
  };

  const getData = async () => {
    let { data: todos } = await supabase.from("todos").select("*");

    if (todos !== null) {
      todos.forEach((item: Todo) => {
        if (item.id === Number(pathname.split("/")[2])) {
          handleBoards(item);
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <div className={styles.container__header__titleBox}>
          <Checkbox className="w-5 h-5" />
          {data.title !== "" ? (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {data.title}
            </h3>
          ) : (
            <span className={styles.title}>
              Please Enter Title for the board
            </span>
          )}
        </div>
        <Button variant={"ghost"}>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </Button>
      </div>

      <div className={styles.container__body}>
        <div className={styles.container__body__calendarBox}>
          <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">From</span>
            <Input
              value={
                data.startDate !== ""
                  ? data.startDate.split("T")[0]
                  : "Pick a date"
              }
              disabled
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">To</span>
            <Input
              value={
                data.endDate !== "" ? data.endDate.split("T")[0] : "Pick a date"
              }
              disabled
            />
          </div>
        </div>
        <div className={styles.container__body__buttonBox}>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-green-50 hover:text-green-500 "
          >
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-red-50 hover:text-red-500 "
            onClick={() => handleDelete(data.boardId)}
          >
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {data.content && (
        <Card className="w-full p-4 mb-3">
          <MDEditor value={data.content} height={100 + "%"} />
        </Card>
      )}
      <div className={styles.container__footer}>
        <MarkdownDialog data={data} />
      </div>
    </div>
  );
}

export default BasicBoard;
