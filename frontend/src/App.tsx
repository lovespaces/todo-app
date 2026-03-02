import CreateButton from "./components/CreateButton";
import TaskDiv from "./components/TaskDiv";
import CreateTaskModal from "./components/CreateTaskModal";
import SelectButton from "./components/SelectButton";
import { deleteTask } from "./api/delete";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDatas } from "./api/fetch";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({queryKey: ['data'], queryFn: getDatas});
    const [openCreateModal, setCreateModal] = useState(false);
    const [clickedSelect, setSelectMode] = useState(false);
    const [deleteTodos, selectTodos] = useState<number[]>([]);

    const handleSelect = (item: number, isDelete: boolean) => {
        if (isDelete) {
            selectTodos([...deleteTodos, item]);
        } else {
            selectTodos((prev) =>
                prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
            );
        }
    };

    const handleSelectButton = async (isSelect: boolean) => {
        setSelectMode(isSelect);
        if (!isSelect) {
            try {
              await deleteTask(deleteTodos);
              await queryClient.invalidateQueries({ queryKey: ['data'] });
              toast.success(`${deleteTodos.length} 個のTo-Doを削除しました`);
            } catch (e) {
                toast.error(`削除できませんでした: ${e}`);
            }
            selectTodos([]);
        }
    }

    if (isLoading) return <div className="bg-gray-800 text-white">Loading ...</div>;
    if (error) {
        toast.error("データの読み込みに失敗しました");
        return <div className="bg-gray-800 text-white">ERROR</div>
    };

    return (
        <>
            <div className="bg-gray-800 text-white flex min-h-vh min-h-dvh w-full justify-center items-center font-noto">
                <div className="flex justify-center h-full flex-col w-full max-w-127.5 gap-4">
                    <div>
                        <p className="font-rnro text-2xl select-none">
                            タスクアプリ
                        </p>
                        <p className="font-mono opacity-75 select-none">
                            made with ❤️.
                        </p>
                    </div>
                    <div className="flex justify-end-safe h-[2.5em] gap-5">
                        <SelectButton onClick={async () => await handleSelectButton(!clickedSelect)} isSelected={clickedSelect} ></SelectButton>
                        <CreateButton onClick={() => setCreateModal(true)} />
                    </div>
                    <TaskDiv data={data ?? []} selectMode={clickedSelect} setSelect={handleSelect} />
                    <CreateTaskModal isOpen={openCreateModal} onClose={() => setCreateModal(false)} />
                </div>
            </div>
        </>
    );
}

export default App;
