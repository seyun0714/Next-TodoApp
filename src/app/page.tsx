"use client";

import { useRouter } from "next/navigation";
// scss
import styles from "./page.module.scss";
// supabase
import { supabase } from "@/utils/supabase";
// shadcn UI
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Home() {
  const router = useRouter();

  // 페이지 생성 및 Supabase 연동
  const onCreate = async () => {
    const { data, error, status } = await supabase
      .from("todos")
      .insert([
        {
          title: "",
          start_date: new Date(),
          end_date: new Date(),
          contents: [],
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    if (status === 201) {
      toast("페이지 생성 완료");
      if (data) {
        router.push(`/create/${data[data.length - 1].id}`);
      } else {
        return;
      }
    }
  };

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
          onClick={onCreate}
        >
          Add New Page
        </Button>
      </div>
    </div>
  );
}

export default Home;
