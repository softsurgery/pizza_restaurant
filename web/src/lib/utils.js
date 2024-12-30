export const pconsole = {
    log: (...props) => {
        props.forEach((item) => {
            console.log(JSON.parse(JSON.stringify(item)));
        });
    },
};
