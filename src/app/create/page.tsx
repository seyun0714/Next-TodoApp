import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import styles from "./page.module.scss";
import LabelCalendar from "@/components/common/calendar/LabelCalendar";

function page() {
  return (
    <div className={styles.container}>
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
              <LabelCalendar label="From" readonly={false} />
              <LabelCalendar label="To" readonly={false} />
            </div>
            <Button
              variant={"outline"}
              className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.container__body}>
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
            />
          </button>
        </div>
      </main>
    </div>
  );
}

export default page;
