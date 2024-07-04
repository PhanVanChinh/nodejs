// document.addEventListener("DOMContentLoaded", function() {
  // Form search
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

  // Phân trang
  const buttonsPagination = document.querySelectorAll("[button-pagination]");
  if (buttonsPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
      button.addEventListener("click", () => {
        const page = button.getAttribute("button-pagination");
        url.searchParams.set("page", page);
        window.location.href = url.href;
      });
    });
  }


  //check box multi
  const checkboxMulti= document.querySelector("[checkbox-multi]");
  if(checkboxMulti){
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']");
    
    inputCheckAll.addEventListener("click",()=>{
      if(inputCheckAll.checked){
        inputsId.forEach(input =>{
          input.checked= true;
        });      
      }else {
        inputsId.forEach(input =>{
          input.checked= false;
      });
    }
  });
  inputsId.forEach(input =>{
    input.addEventListener("click",()=>{
      const countChecked=checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      
      if(countChecked== inputsId.length){
        inputCheckAll.checked=true;
      }else{
        inputCheckAll.checked=false;
      }
    });
  });
  }

  //form change multi
  const formChangeMulti=document.querySelector("[form-change-multi]");
  if(formChangeMulti){
   formChangeMulti.addEventListener("submit",(e)=>{
    e.preventDefault();

    const checkboxMulti=document.querySelector("[checkbox-multi]");
    const inputsChecked=checkboxMulti.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;
    if(typeChange == "delete-all") {
      const isConfirm= confirm("Xóa thật nha BRO");

      if(!isConfirm){
        return;
      }
    }
    if(inputsChecked.length>0){
      let ids=[];
      const inputIds=formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input=>{
        const id=input.value;
        ids.push(id);
      });
      inputIds.value=ids.join(",");
      formChangeMulti.submit();
    }
    else{
      alert("Đã chọn đâu BRO ?");
    }
  });
  }
