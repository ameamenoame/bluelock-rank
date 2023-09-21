
const button = document.getElementById("submit");
const idInput = document.getElementById("id-input");
const wInput = document.getElementById("w-input");
const hInput = document.getElementById("h-input");
const clipboard = document.getElementById("clipboard");
const header = document.getElementById("header");

const showButton = document.getElementById("show");

showButton.addEventListener("click", (e) => {
    e.preventDefault();
    let val = Number(idInput.value);
    if (!val) return;

    window.location.href = `./rank.html?playerId=${val}`;
});

button.addEventListener("click", (e) => {
    e.preventDefault();

    let val = Number(idInput.value);
    if (!val) return;

    let w = Number(wInput.value);
    let h = Number(hInput.value);

    clipboard.value = `
    <script type='text/javascript' charset='utf-8'>     
        var iframe = document.createElement('iframe');       
        document.body.appendChild(iframe);

        iframe.src = 'https://ameamenoame.github.io/bluelock-rank/rank.html?playerId=${val}';       
        iframe.width = '${w}';
        iframe.height = '${h}';
    </script>
    `;
    clipboard.select();
    clipboard.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(clipboard.value);
    alert("Embed code copied.");
});
