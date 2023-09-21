
const button = document.getElementById("submit");
const idInput = document.getElementById("id-input");
const wInput = document.getElementById("w-input");
const hInput = document.getElementById("h-input");
const clipboard = document.getElementById("clipboard");
const header = document.getElementById("header");
const link = document.getElementById("permalink");

button.addEventListener("click", (e) => {
    e.preventDefault();

    let val = Number(idInput.value);
    console.log("ID = " + val);


    if (!val) return;

    let w = Number(wInput.value);
    let h = Number(hInput.value);




    clipboard.value = `
    <script type='text/javascript' charset='utf-8'>     
        var iframe = document.createElement('iframe');       
        document.body.appendChild(iframe);

        iframe.src = 'https://ameamenoame.github.io/bluelock-rank/?playerId=${val}';       
        iframe.width = '${w}';
        iframe.height = '${h}';
    </script>
    `;
    clipboard.select();
    clipboard.setSelectionRange(0, 99999);

    link.href = `./rank.html?playerId=${val}`;
    navigator.clipboard.writeText(clipboard.value)
    alert("Copied!");
});
