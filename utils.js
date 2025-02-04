
export const fetchMails = async () => {
    console.time("Data fetching");

    return await fetch("/meow/graph-mail/data.json")
        .then(response => response.json())
        .then(data => {
            console.timeEnd("Data fetching");
            return data.addresses
        });
}


export const getDomains = (mails) => {
    const domains = {};

    mails.map((mail) => {
        const domain = mail.split("@")[1];
        domains[domain] ? domains[domain]++ : domains[domain] = 1;
    });

    Object.entries(domains).map(([key, value]) => {
        if (value <= 3) {
            domains["Others"] ? domains["Others"] += value : domains["Others"] = value;
            delete domains[key]
        }
    });

    return domains;
}


export const sortMailsByValue = (mails, value) => {
    return mails.filter((item) => {
        return item.includes(value);
    });
}


export const sortMailsByAsc = (mails) => {
    return mails.sort((a, b) => {
        return a > b
    });
}


export const sortMailsByDesc = (mails) => {
    return mails.sort((a, b) => {
        return a < b
    });
}
