const generateRandomBgColor = () => {
    const chars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        color += chars[randomIndex];
    }

    return color;
};

export { generateRandomBgColor };
