const path = require("path");

module.exports = {
  // entry와 output은 필수조건
  entry: "./src/client/js/main.js", // 변경하고자 하는 파일
  mode: "development", // mode는 production(압축하여 한줄로 표현한 코드)과 development(알아보기 쉽게 코멘트 추가) 두가지가 있습니다.
  output: {
    filename: "main.js", // 변환된 파일명
    path: path.resolve(__dirname, "assets", "js"), // 변환된 파일 저장 경로(반드시 절대 경로)
    // __dirname은 자바스크립트의 기본 변수로 현재 폴더의 절대 경로를 출력해줍니다.
    // path.resolve는 내부의 변수들을 이어 하나의 경로로 만들어줍니다.
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 모든 자바스크립트 파일 지정(규칙을 적용할 파일)
        use: {
          // 규칙을 적용할 때 이용할 로더
          loader: "babel-loader",
          options: {
            // 옵션의 경우에는 로더마다 다름
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
