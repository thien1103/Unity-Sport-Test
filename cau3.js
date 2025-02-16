const fs = require('fs'); //đây là module có sẵn của javascript giúp đọc nội dung file để truyền vào code, không hề xử lí minify, thiếu thư viên này thì không read được data

const keyMapping = {    // chuyển đổi các field thành các key ngắn hơn để tối ưu dữ liệu
    "id": "a",
    "season_id": "b",
    "stage_id": "c",
    "group_num": "d",
    "round_num": "e",
    "start_time": "f",
    "start_timestamp": "g",
    "sport_event_status": "h",
    "status_id": "i",
    "updated_at": "j",
    "record_updated_at": "k",
    "home_team_id": "l",
    "away_team_id": "m",
    "competition_id": "n",
    "lineup": "o",
    "venue_id": "p",
    "referee_id": "q",
    "related_id": "r",
    "agg_score": "s"
};
const topLevelKeyMapping = {    //nếu key của query (key cao nhất) cũng quá dài, key sẽ được chuyển đổi
    "select * from sport_events se where se.start_timestamp >= 1729875600 and se.start_timestamp <= 1729962000": "q"
};
function compressKeys(obj) {    // hàm đệ quy để thay đổi các field thành các key
    if (Array.isArray(obj)) {
        return obj.map(compressKeys);
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newKey = keyMapping.hasOwnProperty(key) ? keyMapping[key] : key; //nếu key có trong mapping, thay thế bằng key ngắn hơn
                newObj[newKey] = compressKeys(obj[key]);
            }
        }
        return newObj;
    } else {
        return obj;
    }
}
const rawData = fs.readFileSync('data.json', 'utf8');       // đọc nội dung file data.json
const jsonObject = JSON.parse(rawData);
const compressedObject = {};     //nếu file JSON có key cấp cao nhất cần thay thế (ví dụ là query dài)
for (let key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
        let newKey = topLevelKeyMapping.hasOwnProperty(key) ? topLevelKeyMapping[key] : key;
        compressedObject[newKey] = compressKeys(jsonObject[key]);
    }
}
const optimizedJson = JSON.stringify(compressedObject);     //minify kết quả JSON sau khi đã thay thế key
fs.writeFileSync('data.optimized.json', optimizedJson, 'utf8');     //ghi file ra file mới
console.log('File đã được tối ưu và minify thành công: data.optimized.json');

