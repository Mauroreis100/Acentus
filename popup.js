document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const char = button.getAttribute('data-char');
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: insertChar,
          args: [char]
        });
      });
    });
  });
  
  function insertChar(char) {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
      const start = active.selectionStart;
      const end = active.selectionEnd;
      const text = active.value;
      active.value = text.slice(0, start) + char + text.slice(end);
      active.selectionStart = active.selectionEnd = start + char.length;
      active.focus();
    }
  }
  