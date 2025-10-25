const md = window.markdownit();
md.use(window.texmath.use(window.katex), {
    engine: window.katex,
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});

function ok() {
    window.location.replace("/mini-chat/message.html");
}

function load() {
    if (localStorage.getItem("name") == null) {
        window.location.replace("/mini-chat/signup.html");
    } else {
        document.getElementById("titler").innerHTML = "我的 priKey";
        document.getElementById("container").innerHTML = `
            <div style="text-align: center;">
                <p>请注意，账号注册后，如果登出，忘记 priKey 无法找回账号，或许可以找管理员把账号注销</p>
                <p>请务必保管好 priKey</p>
                <p>我的 priKey：</p>
                <textarea id="name_text" rows="20" placeholder="priKey" spellcheck=false style="text-align: center; width: 100%">${localStorage.getItem("priKey")}</textarea>
                <p></p>
                <button onclick="ok()">确定</button>
            </div>
        `;
    }
}

load();