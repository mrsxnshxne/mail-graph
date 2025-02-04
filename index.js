import {fetchMails, getDomains, sortMailsByAsc, sortMailsByDesc, sortMailsByValue} from "./utils.js";


const mailList = document.querySelector('#mail-list');
const domainList = document.querySelector('#domain-list');

const searchInput = document.querySelector('#search');
const ascButton = document.querySelector('#sort-asc');
const descButton = document.querySelector('#sort-desc');


let mails = undefined;
let selectedDomains = [];


const renderMailRows = async (mails) => {
    console.time("Mail rendering");

    mailList.innerHTML = "";

    mails.forEach(mail => {
        if (!selectedDomains.includes(mail.split("@")[1]) && !selectedDomains.includes("Others")) {
            return;
        }

        const row = document.createElement('li');
        row.innerText = mail;
        mailList.append(row);
    });

    console.timeEnd("Mail rendering")
}


const renderDomainChart = (domains) => {
    console.time("Domain chart rendering");

    let ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.entries(domains).map(([key, _]) => key),
            datasets: [
                {
                    label: "Ventes",
                    data: Object.entries(domains).map(([_, value]) => value), // Données
                    backgroundColor: ["#3674B5", "#578FCA", "#A1E3F9", "#D1F8EF",],
                    borderColor: "black",
                    borderWidth: 1,
                },
            ],
        },
    });

    console.timeEnd("Domain chart rendering");
}


const renderDomainRows = async (mails) => {
    console.time("Domain rows rendering");

    domainList.innerHTML = "";
    const domains = getDomains(mails);

    console.timeEnd("Domain rows rendering");
    renderDomainChart(domains);
}


// EVENTS LISTENERS


searchInput.addEventListener('input', (event) => {
    renderMailRows(sortMailsByValue(mails, event.target.value));
});


ascButton.addEventListener('click', () => {
    renderMailRows(sortMailsByAsc(mails));
});


descButton.addEventListener('click', () => {
    renderMailRows(sortMailsByDesc(mails));
});


// MAIN PROCESS

async function main() {
    mails = await fetchMails();
    selectedDomains = Object.entries(getDomains(mails)).map((domain) => domain[0]);

    renderMailRows(mails);
    renderDomainRows(mails);
}

main();