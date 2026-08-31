// ════════════════════════════════════
// 이 앱은 서비스워커 캐시를 더 이상 사용하지 않습니다.
// (예전 버전의 sw.js가 index.html을 캐시에 고정해버려서, GitHub에
//  새 코드를 올려도 사용자 화면에는 계속 옛날 버전이 뜨는 문제가 있었습니다.
//  — "문서함에서 불러오기만 했는데 자동저장된다"던 것도 실은 이미 고쳐진
//  옛날 자동저장 로직이 캐시에 갇혀서 계속 실행됐던 것입니다.)
//
// 아래 코드는 새로 설치되자마자 기존 캐시를 전부 지우고 스스로 등록을
// 해제하여, 이후로는 항상 네트워크에서 최신 index.html을 받아오게 합니다.
// ════════════════════════════════════
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clientsList = await self.clients.matchAll({ type: 'window' });
    clientsList.forEach(client => client.navigate(client.url));
  })());
});

// fetch 이벤트를 가로채지 않음 → 모든 요청은 항상 네트워크로 직행
