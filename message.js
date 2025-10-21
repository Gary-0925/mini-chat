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
    let pageHTML = `
        <div style="text-align:center">
            <button onclick="window.scrollTo(0, document.body.scrollHeight);">⬇滚动到底部以发送消息</button>
        </div>
        <table border="1" style="width: 70%; border-collapse: collapse; margin: 0 auto;">
            <thead>
                <tr>
                    <th>用户</th>
                    <th>内容</th>
                </tr>
            </thead>
            <tbody>
    `;
    messages.forEach(message => {
        pageHTML += `
            <tr>
                <td>${message.name}</td>
                <td>${message.info}</td>
            </tr>
        `;
    });
    pageHTML += `
            </tbody>
        </table>
    `;
    if (localStorage.getItem("default_name") != null)
        pageHTML += `
            <div style="text-align: center;">
                <textarea id="name_text" rows="2" cols="20" placeholder="昵称" spellcheck=false>${localStorage.getItem("default_name")}</textarea>
                <textarea id="message_text" rows="10" cols="50" placeholder="发布一条友好的发言吧"></textarea>
                <button onclick="send_message()">发送</button>
            </div>
        `
    else
        pageHTML += `
            <div style="text-align: center;">
                <textarea id="name_text" rows="2" cols="20" placeholder="昵称" spellcheck=false></textarea>
                <textarea id="message_text" rows="10" cols="50" placeholder="发布一条友好的发言吧"></textarea>
                <button onclick="send_message()">发送</button>
            </div>
        `
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