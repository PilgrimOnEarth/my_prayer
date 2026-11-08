// 오프라인 지원: 앱 파일은 설치 때 저장하고, 글꼴은 처음 불러올 때 저장한다.
// 앱 내용을 고치면 VERSION 숫자를 올려야 이전 저장본이 지워진다.
const VERSION = 'v1';
const CACHE = 'my-prayer-' + VERSION;
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 화면(HTML): 온라인이면 최신본, 오프라인이면 저장본
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // 글꼴: 저장본을 먼저 쓰고 뒤에서 갱신
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then(c => c.match(req).then(hit => {
        const net = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
    return;
  }

  // 그 밖의 같은 사이트 파일: 저장본 우선
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
