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
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, '.js');
    if (!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
