"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";

function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}>
          How To Start
        </span>
        <div className={styles.container__onBoarding__step}>
          <span>1. Create a page</span>
          <span>2. Add boards to page</span>
        </div>
        <Button
          variant={"outline"}
          className="w-full bg-transparent text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
          onClick={() => router.push("/create")}
        >
          Add New Page
        </Button>
      </div>
    </div>
  );
}

export default Home;
