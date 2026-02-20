import CreateButton from './components/CreateButton';
import TaskDiv from './components/TaskDiv';

function App() {
    return <>
        <div className="bg-gray-800 text-white flex min-h-screen w-dvw justify-center items-center">
            <div className="flex justify-center h-lvh flex-col w-full max-w-127.5 gap-4">
                <div>
                    <p className="font-rnro text-2xl select-none">
                        タスクアプリ
                    </p>
                    <p className="font-mono opacity-75 select-none">
                        made with ❤️.
                    </p>
                </div>
                <div className="flex justify-end-safe h-[2.5em]">
                    <CreateButton />
                </div>
                <TaskDiv />
            </div>
        </div>
    </>;
}

export default App;
