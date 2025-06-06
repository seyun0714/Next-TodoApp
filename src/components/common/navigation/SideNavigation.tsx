"use client";
import { Button } from "@/components/ui/button";
import styles from "./SideNavigation.module.scss";
import { Dot, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { SearchBar } from "@/components/ui/search-bar";

function SideNavigation() {
  const router = useRouter();
  const [todos, setTodos] = useState<any>([]);

  const onCreate = async () => {
    // supabase 새로운 row 데이터 생성
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
        getTodos();
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // 기존의 Supabase에 등록된 데이터 체크
  const getTodos = async () => {
    let {
      data: todos,
      error,
      status,
    } = await supabase.from("todos").select("*");
    if (status === 200) {
      setTodos(todos);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__searchBox}>
        <SearchBar placeholder="검색어를 입력해주세요." />
      </div>
      <div className={styles.container__buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
          onClick={onCreate}
        >
          Add New Page
        </Button>
      </div>
      <div className={styles.container__todos}>
        <div className={styles.container__todos__label}>Your To Do</div>
        {/* Is Todos */}
        <div className={styles.container__todos__list}>
          {todos &&
            todos.map((item: any) => {
              return (
                <div
                  className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer"
                  key={item.id}
                >
                  <Dot className="mr-1 text-green-400"></Dot>
                  <span className="text-sm">
                    {item.title === "" ? "제목 없음" : item.title}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
