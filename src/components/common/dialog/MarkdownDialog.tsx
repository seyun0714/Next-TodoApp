"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import styles from "./MarkdownDialog.module.scss";
// shadcn UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui";
import { Separator } from "@/components/ui";
// component
import LabelCalendar from "../calendar/LabelCalendar";

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
  startDate: string | Date;
  endDate: string | Date;
  content: string;
}

interface Props {
  data: BoardContent;
  updateBoards: () => void;
}

function MarkdownDialog({ data, updateBoards }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | string | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = useState<Date | string | undefined>(new Date());
  const [content, setContent] = useState<string | undefined>(
    "**Hello, World!**"
  );

  // ==================================================================================

  // useEffect(() => {
  //   if (data) {
  //     setTitle(data.title);
  //     setStartDate(data.startDate);
  //     setEndDate(data.endDate);
  //     setContent(data.content);
  //     setIsCompleted(data.isCompleted);
  //   }
  // }, []);

  // supabase에 저장
  const onSubmit = async (id: string | number) => {
    console.log(id);
    if (!title || !startDate || !endDate || !content) {
      toast.error("기입되지 않은 항목이 있습니다.");
      return;
    } else {
      // supabase 데이터베이스에 연동
      let { data: todos } = await supabase.from("todos").select("*");
      if (todos !== null) {
        todos.forEach(async (item: Todo) => {
          if (item.id === Number(pathname.split("/")[2])) {
            item.contents.forEach((element: BoardContent) => {
              if (element.boardId === id) {
                element.title = title;
                element.startDate = startDate;
                element.endDate = endDate;
                element.content = content;
              } else {
                return;
              }
            });
          }
          const { data, error, status } = await supabase
            .from("todos")
            .update([{ contents: item.contents }])
            .eq("id", pathname.split("/")[2]);
          if (error) {
            console.error(error);
            toast.error("오류 발생");
          }
          if (status === 204) {
            toast.success("수정 완료");

            // 등록 후 조건 초기화
            setOpen(false);
            updateBoards();
          }
        });
      } else return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {data.title ? (
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            Update Contents
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            Add Contents
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board."
                className={styles.dialog__titleBox__title}
                defaultValue={data.title ? data.title : title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label="From" handleDate={setStartDate} />
            <LabelCalendar label="To" handleDate={setEndDate} />
          </div>
          <Separator />
          <div className={styles.dialog__markdown} data-color-mode="light">
            <MDEditor
              height={100 + "%"}
              defaultValue={data.content ? data.content : content}
              value={content}
              onChange={setContent}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog__buttonBox}>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500 "
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
              onClick={() => onSubmit(data.boardId)}
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
