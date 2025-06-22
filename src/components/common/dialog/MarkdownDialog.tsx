"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { taskAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
// component
import MDEditor from "@uiw/react-md-editor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Button,
  Checkbox,
  Separator,
} from "@/components/ui";
// type
import { Task, Board } from "@/types";
// hook
import { useCreateBoard, useGetTask } from "@/hooks/apis";

interface Props {
  children: React.ReactNode;
  board: Board;
}

function MarkdownDialog({ board, children }: Props) {
  const { id } = useParams();
  const updateBoard = useCreateBoard();
  const task = useAtomValue(taskAtom);

  // 해당 컴포넌트 내에서 사용되는 상태값
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [content, setContent] = useState<string | undefined>(
    "**Hello, World!**"
  );

  const initState = () => {
    setIsCompleted(board.isCompleted || false);
    setTitle(board.title || "");
    setStartDate(board.startDate ? new Date(board.startDate) : undefined);
    setEndDate(board.endDate ? new Date(board.endDate) : undefined);
    setContent(board.content || "**Hello, World!**");
  };

  useEffect(() => {
    initState();
  }, [board]);

  // 다이얼로그 닫기
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    initState();
  };

  // 등록 버튼 클릭 시
  const handleSubmit = async (boardId: string) => {
    if (!title || !content) {
      toast.error("제목과 콘텐트는 필수값 입니다.");
      return;
    }
    try {
      // boards에서 선택한 board를 찾고 수정된 값으로 업데이트
      const newBoards = task?.boards.map((board: Board) => {
        if (board.id === boardId) {
          return {
            ...board,
            isCompleted,
            title,
            startDate,
            endDate,
            content,
          };
        }
        return board;
      });
      await updateBoard(Number(id), "boards", newBoards);
      handleCloseDialog();
    } catch (error) {
      toast.error("네트워크 오류");
      console.error(error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <Checkbox
                className="w-5 min-w-5 h-5"
                checked={isCompleted}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") setIsCompleted(checked);
                }}
              />
              <input
                type="text"
                placeholder="게시물의 제목을 입력하세요."
                className="w-full text-xl outline-none bg-transparent"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            마크다운 에디터를 사용하여 Task Board를 꾸며보세요.
          </DialogDescription>
        </DialogHeader>
        {/* 캘린더 박스 */}
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label="From"
            value={startDate}
            onChange={setStartDate}
          />
          <LabelDatePicker label="To" value={endDate} onChange={setEndDate} />
        </div>
        <Separator />
        {/* 마크다운 에디터 영역 */}
        <MDEditor height={320 + "px"} value={content} onChange={setContent} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>취소</Button>
          </DialogClose>
          <Button
            type="submit"
            className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
            onClick={() => handleSubmit(board.id)}
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { MarkdownDialog };
