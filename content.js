const selectNumbers = (numbersV) => {
    const element = document.querySelector(`#${numbersV}`);

    if(!element) return;
    const nodename = element.nodeName;
    if(nodename.toUpperCase()==="SPAN"){
        alert("이미 예약 되어 있습니다.");
        chrome.storage.local.clear();
    }
    else if(nodename.toUpperCase()==="INPUT") {
        element.checked = true;
        document.querySelector("#btn_reservation").click();
    }
}

(()=> {
    const documentURL = document.URL;
    if(documentURL.indexOf("reservation") > -1) {
        chrome.storage.local.get(["numbersV"], ({numbersV}) => {
            if(numbersV) selectNumbers(numbersV);
        });
    } else if(documentURL.indexOf("inputform") > -1) {
        chrome.storage.local.get(({ group_count, playname, reason, auto}) => {
            console.log(group_count, playname, reason, auto)
            document.querySelector(`#group_count`).value = group_count;
            document.querySelector(`#playname`).value = playname;
            document.querySelector(`#reason`).value = reason;
            document.querySelector("#agree_1").checked = true;
            document.querySelector("#agree_2").checked = true;

            if(auto) 
                //alert("예약합니다");
                document.querySelector("#btn_reservation").click();
            else 
                alert("테스트 였습니다.");

            chrome.storage.local.clear();
        });
    }
})()

