// 캐시 제목과 캐시할 파일 선언
const sCacheName = "hello-pwa";
const aFileToCache = [
    "./", "./index.html", "./manifest.json", "./images/hello-pwa.png"
];

const sVersion = "v7";

// 오프라인 페이지 설정
const offlineFallbackPage = "offline.html";

// 서비스 워커 설치하고 캐시 파일 저장
self.addEventListener("install", function (pEvent) {
    console.log("서비스 워커 설치함!", sVersion);
    pEvent.waitUntil(
        caches.open(sCacheName).then(function (pCache) {
            console.log("파일을 캐시에 저장함!", sVersion);
            return pCache.addAll(aFileToCache);
        })
    );
});

// 고유 번호를 할당받은 서비스 워커 작동
self.addEventListener("activate", function (pEvent) {
    console.log("서비스 워커 동작 시작!", sVersion);
    console.log(pEvent);
});

// 데이터 요청을 받으면 네트워크 또는 캐시에서 찾아 반환
self.addEventListener("fetch", function (pEvent) {
    pEvent.respondWith(
        caches.match(pEvent.request).then(function (response) {
            if(!response) {
                console.log("네트워크에서 데이터 요청!", pEvent.request)
                return fetch(pEvent.request);
            }
            console.log("캐시에서 데이터 요청!", pEvent.request);
            return response;
        }).catch(function (err) {
            console.log(err)
        })
    );
});