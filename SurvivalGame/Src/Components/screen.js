const test = () => {
    readKeys();
};
const readKeys = () => {
    const validKeys = new Map([["w", ""], ["a", ""], ["s", ""], ["d", ""]]);
    document.addEventListener('keypress', event => {
        if (validKeys.has(event.key)) {
            console.log(event.key);
        }
    });
};
export default { test };
