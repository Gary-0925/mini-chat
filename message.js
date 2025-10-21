const md = window.markdownit();
md.use(window.texmath.use(window.katex), {
    engine: window.katex,
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});

async function load_message() {
    const supabase = getClient();
    const titlerEl = document.getElementById('titler');
    const containerEl = document.getElementById('container');
    const { data: messages, error } = await supabase
        .from('messages')
        .select('id, name, info')
        .order('id');
    if (error) {
        containerEl.innerHTML = `<p>消息加载失败...你可以尝试刷新页面，有时候数据库状态不太好，毕竟是免费的啦...</p>`;
        return;
    }
    titlerEl.innerHTML = "Gary0 的迷你聊天室";
    let pageHTML = ``;
    if (localStorage.getItem("default_name") != null)
        pageHTML += `
            <div class="card" style="width: 40%; position: fixed; right: 0; bottom: 0;">
                <textarea id="name_text" rows="2" cols="20" placeholder="昵称" spellcheck=false>${localStorage.getItem("default_name")}</textarea>
                <textarea id="message_text" rows="10" style="width: 95%" placeholder="发布一条友好的发言吧"></textarea>
                <button onclick="send_message()">发送</button>
            </div>
        `
    else
        pageHTML += `
            <div class="card" style="width: 40%; position: fixed; right: 0; bottom: 0;">
                <textarea id="name_text" rows="2" cols="20" placeholder="昵称" spellcheck=false></textarea>
                <textarea id="message_text" rows="10" style="width: 95%" placeholder="发布一条友好的发言吧"></textarea>
                <button onclick="send_message()">发送</button>
            </div>
        `
    pageHTML += `<div style="display: grid; place-items: center;">`;
    messages.forEach(message => {
        const info = md.render(message.info);
        pageHTML += `
            <div class="card" style="width: 70%;">
                <div class="card" style="width: 100px; text-align: center;">${message.name}</div>
                ${info}
            </div>
            <p></p>
        `;
    });
    pageHTML += `</div>`;
    containerEl.innerHTML = pageHTML;
}

async function send_message() {
    try {
        const supabase = getClient();
        const messageId = -Date.now();
        var userName = document.getElementById('name_text').value;
        const messageData = document.getElementById('message_text').value;
        if (userName != "gary20120925" && (userName.includes("Gary") || userName.includes("gary")))
            alert('错误：你没有用该名字发送的权限！！！');
        else if (userName == '') alert('错误：名字为空');
        else if (messageData == '') alert('错误：消息为空');
        else {
            localStorage.setItem("default_name", userName);
            if (userName === 'gary20120925') userName = 'Gary0';
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        id: messageId,
                        name: userName,
                        info: messageData
                    }
                ]);
            if (error) {
                alert('错误：' + error.message);
            } else {
                alert('发送成功')
            }
        }
        load_message();
    } catch (error) {
        alert('错误：' + error.message);
    }
}

load_message();