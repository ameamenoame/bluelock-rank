const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNDA4MTUxNzAtYjQ0NS00MWU1LWFkY2MtNWE1Mjk5NjM0ZTgxIiwiU3RlYW1JZCI6IjE0MTY4NTE5NyIsIm5iZiI6MTY5NTMwNjU5MywiZXhwIjoxNzI2ODQyNTkzLCJpYXQiOjE2OTUzMDY1OTMsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.dPxtiybyXB7dLPrTFkUBSgHJ_D39CMk8HYrRG4dIfRc";
const urlBase = "https://api.stratz.com/api/v1";

const PLAYER_INFO_URL = "/Player/";

const rank_number = document.getElementById("rank-number");
const rank_id = document.getElementById("rank-id");

let playerId;
{
    const urlp = new URLSearchParams(window.location.search);
    const param =  urlp.get("playerId");
    playerId = param;
}
let fullUrl = `${urlBase}${PLAYER_INFO_URL}${playerId}`;

let current_rank;

if (playerId === null) {
    notFound();
} else {
    fetch(fullUrl, {
        headers: new Headers({
            "Authorization": "Bearer " + token
        })
    }).then((res) => {
        res.json().then((data) => {
            let rank = data.steamAccount.seasonLeaderboardRank;
            updateRank(rank);
            let pid = data.steamAccount.name;
            rank_id.innerText = pid;

            setInterval(updateRankLoop, 1000 * 60 * 5);
        }).catch((e) => {
            notFound();
        });
    }).catch((err) => {
        notFound();
    });
}

function updateRankLoop() {
    console.log("update loop");
    fetch(fullUrl, {
        headers: new Headers({
            "Authorization": "Bearer " + token
        })
    }).then((res) => {
        res.json().then((data) => {
            let rank = data.steamAccount.seasonLeaderboardRank;
            if (rank !== current_rank) updateRank(rank);
        });
    })
}

function updateRank(rank) {
    let amount = 1;
    if (rank > 1000) amount = 11;
    let start = 1;
    const id = setInterval(() => {
        if (start >= rank) {
            rank_number.innerText = rank;
            clearInterval(id);
        }
        start += amount;
        rank_number.innerText = start;
    }, 10);
    current_rank = rank;
}

function notFound() {
    rank_number.innerText = 404;
    rank_id.innerText = "NOT FOUND";
}
