async function makeIssue() {
    const token = process.env.GH_TOKEN; // 주의! 일치해야함 (env와 일치해야함)
    const OWNER = "dochmai382"; // github 계정 이름
    const REPO = "github_workflows_ex"; // 현재 리포지터리 이름
    
    // 명언을 가져오는 부분
    const apiUrl = "https://zenquotes.io/api/quotes/";
    const quoteResponse = await fetch(apiUrl);
    let quoteText = "명언을 가져오는 데 실패했습니다."; // 기본 값

    if (quoteResponse.ok) {
        const quoteData = await quoteResponse.json();
        quoteText = `"${quoteData[0].q}" - ${quoteData[0].a}`;
    }

    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: "오늘의 명언", // 이슈 제목
            body: quoteText, // 명언을 이슈 본문에 넣기
        })
    });

    if (response.ok) {
        console.log("이슈가 성공적으로 생성되었습니다.");
    } else {
        console.log("이슈 생성에 실패했습니다.");
    }
}

makeIssue();
