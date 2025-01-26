async function makeIssue() {
    const token = process.env.GH_TOKEN; // 주의! 일치해야함 (env와 일치해야함)
    const OWNER = "dochmai382"; // github 계정 이름
    const REPO = "github_workflows_ex"; // 현재 리포지터리 이름
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            // 수정
            title: "행운의 숫자", 
            body: `${Math.floor(Math.random() * 100) + 1}`,
        })
    });
    if (response.ok) {
        console.log("성공");
    } else {
        console.log("실패");
    }
}

makeIssue();