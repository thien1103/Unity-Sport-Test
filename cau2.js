const readline = require('readline');

// Tạo interface để đọc dữ liệu từ người dùng
const inOut = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hàm twoSum giữ nguyên
function twoSum(nums, target) {
    const result = [];
    const numIndices = {};  //lưu trữ các chỉ số của từng số đã duyệt qua

    for (let j = 0; j < nums.length; j++) {
        const num = nums[j];
        const complement = target - num;
        if (numIndices.hasOwnProperty(complement)) {            //kiểm tra xem complement có tổn tại trong numIndices không
            for (const i of numIndices[complement]) {      // thêm tất cả các cặp (i, j) vào kết quả
                result.push([i, j]);
            }
        }
        if (!numIndices[num]) {             //thêm chỉ số hiện tại vào numIndices
            numIndices[num] = [];
        }
        numIndices[num].push(j);
    }
    return result;
}

// Hỏi người dùng nhập mảng nums
inOut.question('Nhập mảng nums (ví dụ: [2, 7, 11, 15]): ', (numsInput) => {
    // Hỏi người dùng nhập target
    inOut.question('Nhập target (ví dụ: 9): ', (targetInput) => {
        const nums = JSON.parse(numsInput);                   //chuyển đổi input thành mảng và số nguyên
        const target = parseInt(targetInput, 10);

        const result = twoSum(nums, target);                    //gọi hàm twoSum và in kết quả
        console.log('Kết quả:', JSON.stringify(result));

        inOut.close();
    });
});