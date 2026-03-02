import { useQueryClient } from '@tanstack/react-query';
import { postTask } from '../api/create';
import { Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function CreateTaskModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void}) {
    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [isNothing, setError] = useState(false);
    const queryClient = useQueryClient();

    const validate = (value: string): boolean => {
        setInputName(value);
        if (!value.trim()) {
            setError(true);
            return false;
        }
        setError(false);
        return true;
    }

    const createTask = async (received: { name: string, description: string }) => {
        if (!validate(received.name)) {
            return;
        }
        try {
          await postTask(received);
          await queryClient.invalidateQueries({ queryKey: ['data'] });
          toast.success("作成しました");
        } catch (e) {
            toast.error(`作成できませんでした: ${e}`)
        }
        setInputName("");
        setInputDesc("");
        onClose();
    }

    return <>
        <Dialog open={isOpen} onClose={onClose} transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0">
            <DialogPanel className="max-w-lg space-y-4 bg-gray-700 text-white p-12 rounded-2xl">
                <DialogTitle className="font-bold text-2xl select-none">To-Do を作る</DialogTitle>
                <Field>
                    <Label className="text-sm/6 font-medium text-white select-none">タスクの名前 <span className="text-red-400">*</span></Label>
                    <Input onChange={(e) => validate(e.target.value)} className="bg-gray-800 rounded-lg w-full mt-3 text-white px-3 py-1.5 focus:outline-2 focus:outline-gray-300" required placeholder='入力してください'/>
                    { isNothing && <p className="text-red-400">入力されていません</p>}
                </Field>
                <Field>
                    <Label className="text-sm/6 font-medium text-white select-none">タスクの説明</Label>
                    <Input onChange={(e) => setInputDesc(e.target.value)} className="bg-gray-800 rounded-lg w-full mt-3 text-white px-3 py-1.5 focus:outline-2 focus:outline-gray-300" />
                </Field>
                <button onClick={() => createTask({ name: inputName, description: inputDesc })} className="bg-white text-black hover:cursor-pointer hover:bg-gray-100 font-bold rounded w-1/4 select-none h-[2.5em]">作る</button>
            </DialogPanel>
        </Dialog>
    </>
}

export default CreateTaskModal;
