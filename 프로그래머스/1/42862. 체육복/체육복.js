function solution(n, lost, reserve) {
 // 1. 여벌 있고 도난당한 학생 제외
    let realLost = lost.filter(l => !reserve.includes(l));
    let realReserve = reserve.filter(r => !lost.includes(r));

    // 2. 정렬 (빌려줄 때 앞번호부터 탐색하기 위함)
    realLost.sort((a, b) => a - b);
    realReserve.sort((a, b) => a - b);

    // 3. 여벌 가진 학생이 도난당한 학생에게 빌려줌
    for (let i = 0; i < realReserve.length; i++) {
        const idx = realLost.findIndex(l => Math.abs(l - realReserve[i]) === 1);
        if (idx !== -1) {
            realLost.splice(idx, 1); // 빌려주기 완료
        }
    }

    // 4. 전체 학생 수 - 아직도 체육복 없는 학생 수
    return n - realLost.length;
}