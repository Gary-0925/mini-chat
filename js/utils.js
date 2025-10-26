let supabaseClient = null;
function getClient() {
    if (!supabaseClient) {
        const supabaseUrl = 'https://xagbayhoblnpfropmrdi.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ2JheWhvYmxucGZyb3BtcmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTY4NzYsImV4cCI6MjA3NjM5Mjg3Nn0.jDRu8MZdEyc0jJDuYXXJ3_LzBM_rwqmjGyvegqVCqO0';
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    }
    return supabaseClient;
}
function getArgs(key) {
    const args = {};
    for (const [k, v] of new URLSearchParams(window.location.search).entries()) {
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, '.js');
    if (!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
function sign_out() {
    localStorage.removeItem("name");
    localStorage.removeItem("priKey");
    window.location.reload();
}
function change_theme() {
    if (localStorage.getItem("theme") == 'light') localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");
    window.location.reload();
}
if (!window.location.href.includes('sign'))
    document.write(`
        <link rel="stylesheet" href="/mini-chat/css/style_dark.css">
        <ul>
            <li><a href="https://www.luogu.com.cn/user/1202669">Gary0</a></li>
            <li><a href="/mini-chat/message.html">聊天</a></li>
            <li><a href="/mini-chat/article.html">文章</a></li>
            <li><a href="/mini-chat/prikey.html">我的</a></li>
            <div style="position: fixed; right: 0;">
                <li style="position: float;"><a href="javascript:change_theme()">主题</a></li>
                <li style="position: float;"><a href="javascript:sign_out()" style="color: red;">登出</a></li>
            </div>
        </ul>
        <br>
    `)
if (localStorage.getItem("theme") == 'light') document.write(`<link rel="stylesheet" href="/mini-chat/css/style_light.css">`);
else document.write(`<link rel="stylesheet" href="/mini-chat/css/style_dark.css">`);