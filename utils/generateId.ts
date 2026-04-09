
const generateId = () => {
    const chars = "0123456789ABCDEFabcdef";
    let id = ""
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        id += chars[randomIndex]
    }
    return id
}

export { generateId };

