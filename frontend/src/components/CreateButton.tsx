function CreateButton() {
    const handleClick = () => {
        alert("Oh Hi");
    }

    return <>
        <button className="bg-white text-black hover:cursor-pointer hover:bg-gray-100 font-bold rounded w-1/5 select-none" onClick={handleClick}>Create 🛠️</button>
    </>
}

export default CreateButton;
