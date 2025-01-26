async function makeIssue() {
    const token = process.env.GH_TOKEN; // 주의! 일치해야함 (env와 일치해야함)
    const OWNER = "dochmai382"; // github 계정 이름
    const REPO = "github_workflows_ex"; // 현재 리포지터리 이름
    
    // 명언을 가져오는 부분
    const apiUrl = "https://zenquotes.io/api/quotes/";
    const quoteResponse = await fetch(apiUrl);
    let quoteText = "명언을 가져오는 데 실패했습니다."; // 기본 값
    let quoteData;  // quoteData 변수 선언

    if (quoteResponse.ok) {
        quoteData = await quoteResponse.json();  // quoteData에 API 응답을 저장
        quoteText = `"${quoteData[0].q}"`;  // 명언 가져오기
    }
  
    // Markdown을 사용하여 이슈 본문 꾸미기
    const markdownBody = `
# 오늘의 명언

> **${quoteText}**  
> _- ${quoteData[0].a}_

`;

    // GitHub 이슈 생성
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: "오늘의 명언", // 이슈 제목
            body: markdownBody, // Markdown으로 꾸민 본문
        })
    });

    if (response.ok) {
        console.log("이슈가 성공적으로 생성되었습니다.");
    } else {
        console.log("이슈 생성에 실패했습니다.");
    }
}

makeIssue();
