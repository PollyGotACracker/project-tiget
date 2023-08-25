/* 공공데이터 한국천문연구원_특일 정보 */
/* tbl_holidays 테이블로 업데이트 */

import request from "request";
import DB from "../models/index.js";
import { OPENAPI_KEY, HOLI_URL } from "../config/openapi_config.js";
const Holiday = DB.models.holiday;

// 내년 국경일(공휴일 + 제헌절) 정보 업데이트
// let currentYear = new Date().getFullYear() + 1;
let currentYear = new Date().getFullYear();

let queryParams = `?${encodeURIComponent("serviceKey")}=${OPENAPI_KEY}`;
queryParams += `&${encodeURIComponent("solYear")}=${encodeURIComponent(
  currentYear
)}`;
//queryParams +=
//  `&${encodeURIComponent("solMonth")}=${encodeURIComponent("12")}`;
queryParams += `&${encodeURIComponent("numOfRows")}=${encodeURIComponent(
  "100"
)}`;
queryParams += `&${encodeURIComponent("_type")}=${encodeURIComponent("json")}`;

const option = {
  url: HOLI_URL + queryParams,
  method: "GET",
};

// cron 표현식, 초 분 시 일 월 년
// 매일 자정마다 scheduler 실행, 기본키 중복된 경우 update
export const updateHoliday = async () => {
  request(option, async (error, response, body) => {
    let holiData = {};

    let data = JSON.parse(body)["response"]["body"]["items"]["item"];
    for (let i of data) {
      let {
        dateName: h_dateName,
        isHoliday: h_isHoliday,
        locdate: h_locdate,
        seq: h_seq,
      } = i;
      if (h_dateName === "1월1일") h_dateName = "신정";
      if (h_dateName === "기독탄신일") h_dateName = "성탄절";
      holiData = { h_dateName, h_isHoliday, h_locdate, h_seq };
      console.log(holiData);
      try {
        await Holiday.create(holiData);
      } catch (error) {
        Holiday.update(holiData, { where: { h_locdate: holiData.h_locdate } });
      }
    }
  });
};
