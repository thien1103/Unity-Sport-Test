const readline = require('readline');       //thư viên cho user nhập input

const inOut = readline.createInterface({     //config thư viện
    input: process.stdin,
    output: process.stdout
});
function isPalindrome(s) {
    let left = 0            //biến left bắt đầu từ vị trí đầu tiên của chuỗi (vị trí 0).
    let right = s.length - 1     //biến right bắt đầu từ vị trí cuối cùng của chuỗi (vị trí của độ dài chuỗi - 1).

    while (left < right) {           //vòng lặp duyệt cho tới khi con trỏ left duyệt hết qua right. Vòng lặp while được sử dụng để duyệt chuỗi từ hai đầu về giữa. Khi left >= right tức là đã so sánh xong.
        if (s[left] !== s[right]) {    //kiểm tra kí tự giống nhau với vị trí hiện tại của 2 biến
            return false;       //nếu không giống là trả về false ngay lập tức
        }
        left++;         
        right--;        //sau mỗi lần thành công thì tăng biến left lên 1 và giảm biến right đi 1
    }
    return true;
}

inOut.question('Nhập chuỗi để kiểm tra đối xứng: ', (input) => {
    console.log(isPalindrome(input));       //gọi hàm xử lí và in ra kết quả với param là input của user
    inOut.close();
});
