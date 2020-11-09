document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("button");
    btn.addEventListener("click", (e) => {

        // 운동장
        const groundV = document.querySelector("[name='reservation_grounds']").value;
        // 날짜
        const dateV = document.querySelector("[name='reservation_date']").value;
        // 시간
        const numbersV = document.querySelector("[name='reservation_numbers']").value;
        // 인원수
        const group_count = document.querySelector("[name='reservation_group_count'").value;
        // 대회명
        const playname = document.querySelector("[name='reservation_playname']").value;
        // 이용목적
        const reason = document.querySelector("[name='reservation_reason']").value;
        // 자동 예약
        const auto = document.querySelector("[name='reservation_auto']").checked;

        const reservation_date = new Date(dateV);
        const year = reservation_date.getFullYear();
        const month = reservation_date.getMonth() < 9 ? "0"+reservation_date.getMonth() + 1 : reservation_date.getMonth() + 1;
        const date = reservation_date.getDate();

        const url = "https://sports.isdc.co.kr/rent/reservation/index"
                    + "/" + year
                    + "/" + month
                    + "/" + date
                    + "/1/SIMC02"
                    + "/" + groundV;

        const result = document.querySelector("[name='reservation_result']");
        result.innerHTML = url;

        chrome.tabs.query({
            currentWindow: true, active: true
        }, (tab) => {
            chrome.storage.local.set({
                numbersV,
                group_count,
                playname,
                reason,
                auto
            });
            chrome.tabs.update(tab.id, {
                url
            });
        } );

    })
})