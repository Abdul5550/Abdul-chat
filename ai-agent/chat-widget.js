(function () {
  // If your site and backend are on the same Vercel domain, leave this empty.
  // If the portfolio is hosted elsewhere (e.g. GitHub Pages), set it to your Vercel URL,
  // e.g. "https://abdul-agent.vercel.app"
  var API_BASE = "";
  var API_URL = API_BASE + "/api/chat";

  var STARTERS = [
    "What projects has Abdul built?",
    "What's his tech stack?",
    "Is he available for hire?",
    "How can I contact him?"
  ];

  var css = "\n" +
    "#am-chat-btn{position:fixed;right:1.5rem;bottom:1.5rem;z-index:500;display:flex;align-items:center;gap:.6rem;background:var(--accent,#7c6dfa);color:#fff;border:none;border-radius:999px;padding:.85rem 1.2rem;font-family:var(--font-head,'Syne',sans-serif);font-weight:700;font-size:.85rem;cursor:pointer;box-shadow:0 12px 30px rgba(124,109,250,.4);transition:transform .2s,background .2s}\n" +
    "#am-chat-btn:hover{transform:translateY(-2px);background:#9580ff}\n" +
    "#am-chat{position:fixed;right:1.5rem;bottom:5.5rem;z-index:500;width:380px;max-width:calc(100vw - 2rem);height:560px;max-height:calc(100vh - 7.5rem);background:var(--surface,#1e1e2a);border:1px solid var(--border2,rgba(255,255,255,.12));border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:var(--font-head,'Syne',sans-serif);cursor:auto}\n" +
    "#am-chat.open{display:flex}\n" +
    "#am-chat *{cursor:auto}#am-chat button{cursor:pointer}\n" +
    ".am-head{padding:1rem 1.2rem;border-bottom:1px solid var(--border,rgba(255,255,255,.07));display:flex;justify-content:space-between;align-items:center;background:var(--bg3,#1a1a24)}\n" +
    ".am-head-title{font-weight:700;font-size:.9rem;color:var(--text,#f0f0f8)}\n" +
    ".am-head-sub{font-family:var(--font-mono,'DM Mono',monospace);font-size:.62rem;color:var(--accent2,#5af0c0);letter-spacing:.08em;text-transform:uppercase}\n" +
    ".am-close{background:none;border:none;color:var(--text2,#9090aa);font-size:1.3rem;line-height:1}\n" +
    ".am-close:hover{color:var(--text,#f0f0f8)}\n" +
    "#am-msgs{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem}\n" +
    ".am-msg{max-width:86%;padding:.65rem .9rem;border-radius:12px;font-size:.85rem;line-height:1.55;white-space:pre-wrap;word-wrap:break-word}\n" +
    ".am-msg.bot{align-self:flex-start;background:var(--surface2,#252535);color:var(--text,#f0f0f8);border:1px solid var(--border,rgba(255,255,255,.07));border-bottom-left-radius:3px}\n" +
    ".am-msg.user{align-self:flex-end;background:var(--accent,#7c6dfa);color:#fff;border-bottom-right-radius:3px}\n" +
    ".am-msg a{color:var(--accent2,#5af0c0)}\n" +
    ".am-starters{display:flex;flex-wrap:wrap;gap:.4rem;padding:0 1rem .8rem}\n" +
    ".am-starter{font-family:var(--font-mono,'DM Mono',monospace);font-size:.68rem;color:var(--accent,#7c6dfa);background:rgba(124,109,250,.07);border:1px solid rgba(124,109,250,.3);border-radius:999px;padding:.35rem .7rem}\n" +
    ".am-starter:hover{background:rgba(124,109,250,.18);color:var(--text,#f0f0f8)}\n" +
    ".am-form{display:flex;gap:.5rem;padding:.8rem;border-top:1px solid var(--border,rgba(255,255,255,.07));background:var(--bg3,#1a1a24)}\n" +
    ".am-input{flex:1;background:var(--surface,#1e1e2a);border:1px solid var(--border2,rgba(255,255,255,.12));border-radius:8px;color:var(--text,#f0f0f8);padding:.6rem .8rem;font-size:.85rem;font-family:inherit;outline:none}\n" +
    ".am-input:focus{border-color:var(--accent,#7c6dfa)}\n" +
    ".am-send{background:var(--accent,#7c6dfa);color:#fff;border:none;border-radius:8px;padding:0 1rem;font-weight:700;font-size:.8rem}\n" +
    ".am-send:disabled{opacity:.5}\n" +
    ".am-typing{display:inline-flex;gap:4px}.am-typing span{width:6px;height:6px;border-radius:50%;background:var(--text3,#606078);animation:amb 1s infinite}.am-typing span:nth-child(2){animation-delay:.15s}.am-typing span:nth-child(3){animation-delay:.3s}\n" +
    "@keyframes amb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}\n" +
    "@media(max-width:600px){#am-chat{right:.5rem;left:.5rem;width:auto;max-width:none;bottom:5rem}#am-chat-btn{right:1rem;bottom:1rem}}\n";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement("div");
  root.innerHTML =
    '<button id="am-chat-btn" aria-label="Chat with Abdul\'s AI assistant">💬 Ask my AI</button>' +
    '<div id="am-chat" role="dialog" aria-label="Chat with Abdul\'s AI assistant">' +
    '<div class="am-head"><div><div class="am-head-title">Abdul\'s AI Assistant</div><div class="am-head-sub">Ask about my work &amp; resume</div></div><button class="am-close" aria-label="Close chat">×</button></div>' +
    '<div id="am-msgs"></div>' +
    '<div class="am-starters" id="am-starters"></div>' +
    '<form class="am-form" id="am-form"><input class="am-input" id="am-input" maxlength="500" placeholder="Ask anything about Abdul..." autocomplete="off"><button class="am-send" id="am-send" type="submit">Send</button></form>' +
    "</div>";
  document.body.appendChild(root);

  var btn = document.getElementById("am-chat-btn");
  var box = document.getElementById("am-chat");
  var msgsEl = document.getElementById("am-msgs");
  var startersEl = document.getElementById("am-starters");
  var form = document.getElementById("am-form");
  var input = document.getElementById("am-input");
  var sendBtn = document.getElementById("am-send");
  var messages = [];
  var busy = false;

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function linkify(s) {
    return escapeHtml(s).replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }
  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "am-msg " + who;
    if (who === "bot") d.innerHTML = linkify(text);
    else d.textContent = text;
    msgsEl.appendChild(d);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return d;
  }

  addMsg("Hi! I'm Abdul's AI assistant. Ask me about his projects, skills, education or availability.", "bot");
  STARTERS.forEach(function (q) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "am-starter";
    b.textContent = q;
    b.onclick = function () { send(q); };
    startersEl.appendChild(b);
  });

  function toggle(open) {
    box.classList.toggle("open", open);
    if (open) input.focus();
  }
  btn.onclick = function () { toggle(!box.classList.contains("open")); };
  box.querySelector(".am-close").onclick = function () { toggle(false); };

  async function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    startersEl.style.display = "none";
    input.value = "";
    addMsg(text, "user");
    messages.push({ role: "user", content: text });

    var typing = addMsg("", "bot");
    typing.innerHTML = '<span class="am-typing"><span></span><span></span><span></span></span>';

    try {
      var r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages })
      });
      var data = await r.json();
      var reply = data.reply || "Sorry, something went wrong.";
      typing.innerHTML = linkify(reply);
      messages.push({ role: "assistant", content: reply });
    } catch (e) {
      typing.innerHTML = linkify("Couldn't reach the assistant. Please email Abdul at abdulmohaiman555@gmail.com.");
      messages.pop();
    }
    busy = false;
    sendBtn.disabled = false;
    msgsEl.scrollTop = msgsEl.scrollHeight;
    input.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(input.value);
  });
})();
