import setText, { appendText } from "./results.mjs";

export function timeout() {
    const timeout = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout")
        }, 1000)
    })
    timeout.then((txt) => setText(txt))
}

export function interval() {
    let counter = 0;
    const timeout = new Promise((resolve) => {
        setInterval(() => {
            console.log("Interval");
            resolve(`Timeout ${++counter}`);
        }, 1000)
    })
    timeout.then((txt) => setText(txt))
       .finally(() => appendText(`Done ${counter}`))
}

export function clearIntervalChain() {
    let counter = 0;
    let interval;
    const timeout = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log("Interval");
            resolve(`Timeout ${++counter}`);
        }, 1000)
    })
    timeout.then((txt) => setText(txt))
       .finally(() => clearInterval(interval))
}

export function xhr() {
    let req = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            }
            else {
                reject(xhr.statusText)
            }
          
        }
        xhr.onerror = () => reject("Request Failure");
        xhr.send();
    })

    req.then(res => setText(res))
        .catch(err => setText(err))
}

export function allPromises() {
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let users = axios.get("http://localhost:3000/userTypes");
    let address = axios.get("http://localhost:3000/addressTypes");

    Promise.all([categories, statuses, users, address])
        .then(([cat, status, users, add]) => {
            setText("");
            appendText(JSON.stringify(cat.data));
            appendText(JSON.stringify(status.data));
            appendText(JSON.stringify(users.data));
            appendText(JSON.stringify(add.data));
        })
        .catch(err => setText(err))
}

export function allSettled() {
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let users = axios.get("http://localhost:3000/userTypes");
    let address = axios.get("http://localhost:3000/addressTypes");

    Promise.allSettled([categories, statuses, users, address])
        .then((values) => {
            let res = values.map(v => {
                if (v.status === 'fulfilled') {
                    return `Fulfilled : ${JSON.stringify(v.value.data[0])}`
                }
                else {
                    return `Rejected : ${v.reason.message}`
                }
            })
            setText(res);
        })
        .catch(err => setText(err))
}

export function race() {
    let users = axios.get("http://localhost:3000/users");
    let usersbckp = axios.get("http://localhost:3001/users");

    Promise.race([users, usersbckp])
        .then((users) => {
            setText(JSON.stringify(users.data)) })
        .catch((err) => {setText(err) })
}

