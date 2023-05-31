const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  // entry와 output은 필수조건
  entry: {
    // 변경하고자 하는 파일
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  },
  mode: "development", // mode는 production(압축하여 한줄로 표현한 코드)과 development(알아보기 쉽게 코멘트 추가) 두가지가 있습니다.
  watch: true, // file들이 변경될 때 마다 자동으로 확인하여 최신화 시켜줌 like nodemon
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  output: {
    filename: "js/[name].js", // 변환된 파일명 [name]으로 입력 할 경우 entry의 이름을 가져옵니다.
    path: path.resolve(__dirname, "assets"), // 변환된 파일 저장 경로(반드시 절대 경로)
    // __dirname은 자바스크립트의 기본 변수로 현재 폴더의 절대 경로를 출력해줍니다.
    // path.resolve는 내부의 변수들을 이어 하나의 경로로 만들어줍니다.
    clean: true, // webpack을 재시작 할때 마다 바뀐 폴더, 파일이 있다면 삭제 및 변경 해줍니다.
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // 웹팩은 가장 뒤에있는 loader 부터 실행
      },
    ],
  },
};
