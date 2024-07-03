document.addEventListener("DOMContentLoaded", function() {
    // Form seach
    const formSearch = document.querySelector("#form-search");
    if (formSearch) {
      formSearch.addEventListener("submit", function(event) {
        event.preventDefault();
        let url = new URL(window.location.href);
        const keyword = formSearch.querySelector("input[name='keyword']").value;
        if (keyword) {
          url.searchParams.set("keyword", keyword);
        } else {
          url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
      });
    }
  
    // Xử lý các nút bộ lọc
    const buttonsStatus = document.querySelectorAll("[databutton-status]");
    if (buttonsStatus.length > 0) {
      let url = new URL(window.location.href);
      buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
          const status = button.getAttribute("databutton-status");
          if (status) {
            url.searchParams.set("status", status);
          } else {
            url.searchParams.delete("status");
          }
          window.location.href = url.href;
        });
      });
    }
  });
  