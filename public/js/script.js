const formSeach = doccument.querySelector("#form-Seach");
if (formSeach) {
    let url=new URL(window.location.href);
    formSeach.addEvenListener("submit",(e) => {
        e.preventDefault();
        const keyword = e.target.element.keyword.value;
    if (keyword){
        url.searchParams.set("keyword", keyword);

    }else{
        url.searchParams.delete("keyword");
    }
    window.location.href=url.href;
});}xs
