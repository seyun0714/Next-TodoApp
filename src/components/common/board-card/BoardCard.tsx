"use client";
// component
import MDEditor from "@uiw/react-md-editor";
import { ChevronUp } from "lucide-react";
import {
  Button,
  LabelDatePicker,
  Checkbox,
  Separator,
  Card,
} from "@/components/ui";
import { MarkdownDialog } from "@/components/common";

// type
import { Task, Board } from "@/types";

interface Props {
  board: Board;
}

function BoardCard({ board }: Props) {
  return (
    <Card className="w-full flex flex-col items-center p-5 gap-3">
      {/* 게시물 카드 제목 영역 */}
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-start gap-2">
          <Checkbox className="w-5 h-5" checked={board.isCompleted} />
          <input
            type="text"
            placeholder="등록된 제목이 없습니다."
            className="w-full text-xl outline-none bg-transparent"
            disabled={true}
            value={board.title}
          />
        </div>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronUp className="text-[#6d6d6d]" />
        </Button>
      </div>
      <div className="w-full flex items-center justify-between">
        {/* 캘린더 박스 */}
        <div className="flex items-center gap-5">
          <LabelDatePicker label="From" value={board.startDate} />
          <LabelDatePicker label="To" value={board.endDate} />
        </div>
        {/* 버튼 박스 */}
        <div className="flex items-center">
          <Button variant={"ghost"} className="font-normal text-[#6d6d6d]">
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-rose-600 hover:text-rose-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-3" />
      <MarkdownDialog board={board}>
        <Button variant={"ghost"} className="font-normal text-[#6d6d6d]">
          {board.title ? "Update Content" : "Add Contents"}
        </Button>
      </MarkdownDialog>
    </Card>
  );
}

export { BoardCard };
