class HashMap {
    constructor(initialSize = 16) {
        this.size = initialSize;
        this.map = new Array(this.size);
    }

    // 해시 함수: 키를 인덱스로 변환
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    // 키-값 쌍 추가
    set(key, value) {
        const index = this.hash(key);
        if (!this.map[index]) {
            this.map[index] = [];
        }

        // 이미 키가 존재하는 경우, 값을 업데이트
        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                this.map[index][i][1] = value; // 값 업데이트
                return;
            }
        }

        // 새로운 키-값 쌍 추가
        this.map[index].push([key, value]);
    }

    // 키로 값 찾기
    get(key) {
        const index = this.hash(key);
        if (!this.map[index]) return undefined;

        // 해당 버킷에서 키를 찾고 값을 반환
        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                return this.map[index][i][1];
            }
        }

        return undefined; // 키를 찾지 못한 경우
    }

    // 키가 해시맵에 존재하는지 확인
    has(key) {
        const index = this.hash(key);
        if (!this.map[index]) return false;

        // 해당 버킷에서 키를 찾고, 존재 여부 반환
        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                return true;
            }
        }

        return false; // 키를 찾지 못한 경우
    }

    // 키-값 쌍 삭제
    delete(key) {
        const index = this.hash(key);
        if (!this.map[index]) return false;

        // 해당 버킷에서 키를 찾아 삭제
        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                this.map[index].splice(i, 1); // 삭제
                return true;
            }
        }

        return false; // 키를 찾지 못한 경우
    }

    print() {
        this.map.forEach((item) => {
            console.log(item[0]);
        });
    }
}

const hashMap = new HashMap();

hashMap.set("name", "Alice");
hashMap.set("name", "update Alice");
hashMap.set("country", "USA");

console.log(hashMap.get("name"));
console.log(hashMap.get("age"));
console.log(hashMap.get("country"));
hashMap.print();
