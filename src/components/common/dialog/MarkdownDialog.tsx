"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import MDEditor from "@uiw/react-md-editor";
import LabelCalendar from "../calendar/LabelCalendar";
import styles from "./MarkdownDialog.module.scss";
import { useState } from "react";

function MarkdownDialog() {
  const [contents, setContents] = useState<string | undefined>(
    "**Hello, World!**"
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          Add Contents
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board."
                className={styles.dialog__titleBox__title}
              />
            </div>
          </DialogTitle>
          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label="From" />
            <LabelCalendar label="To" />
          </div>
          <Separator />
          <div className={styles.dialog__markdown} data-color-mode="light">
            <MDEditor
              height={100 + "%"}
              value={contents}
              onChange={setContents}
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
              className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white "
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
