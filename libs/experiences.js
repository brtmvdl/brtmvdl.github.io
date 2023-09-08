
const TYPES = {
  JOB: "job",
  EDUCATION: "education",
}

const npmPackages = [
  'frontend',
  'backend',
  'database',
  'logger',
  'uuid',
]

export default [
  {
    "title": "Calc",
    "image": "/img/calc.png",
    "link": "/projects/calc/",
  },
  {
    "title": "Clock (3D)",
    "image": "/img/clock.png",
    "link": "/projects/clock/",
  },
  {
    "title": "Piano (3D)",
    "image": "/img/piano.png",
    "link": "https://piano-brtmvdl.surge.sh/",
  },
  {
    "title": "Nume",
    "image": "/img/nume.png",
    "link": "https://nume-brtmvdl.surge.sh/",
  },
  ...npmPackages.map((pack) => ({
    "title": `@brtmvdl/${pack}`,
    "image": `/img/brtmvdl-${pack}.png`,
    "link": `https://www.npmjs.com/package/@brtmvdl/${pack}`,
  })),
  {
    "title": "Visual Studio Code Front-End Extension Pack",
    "image": "/img/frontend-extension-pack-vsce.png",
    "link": "https://marketplace.visualstudio.com/items?itemName=tmvdl.frontend-extension-pack-vsce",
  },
  {
    "title": "Youtube Download (Docker)",
    "image": "/img/yt-dl.png",
    "link": "https://hub.docker.com/r/tmvdl/yt-dl",
  },
  {
    "title": "Alpine (Docker)",
    "image": "/img/docker-alpine.png",
    "link": "https://hub.docker.com/r/tmvdl/alpine",
  },
  {
    "title": "Android (Docker)",
    "image": "/img/docker-android.png",
    "link": "https://hub.docker.com/r/tmvdl/android",
  },
  {
    "title": "Dart (Docker)",
    "image": "/img/docker-dart.png",
    "link": "https://hub.docker.com/r/tmvdl/dart",
  },
  {
    "title": ".Net (Docker)",
    "image": "/img/docker-dotnet.png",
    "link": "https://hub.docker.com/r/tmvdl/dotnet",
  },
  {
    "title": "Go (Docker)",
    "image": "/img/docker-go.png",
    "link": "https://hub.docker.com/r/tmvdl/go",
  },
  {
    "title": "Java (Docker)",
    "image": "/img/docker-java.png",
    "link": "https://hub.docker.com/r/tmvdl/java",
  },
  {
    "title": "Kotlin (Docker)",
    "image": "/img/docker-kotlin.png",
    "link": "https://hub.docker.com/r/tmvdl/kotlin",
  },
  {
    "title": "Node.js (Docker)",
    "image": "/img/docker-node.png",
    "link": "https://hub.docker.com/r/tmvdl/node",
  },
  {
    "title": "PHP (Docker)",
    "image": "/img/docker-php.png",
    "link": "https://hub.docker.com/r/tmvdl/php",
  },
  {
    "title": "Python (Docker)",
    "image": "/img/docker-python.png",
    "link": "https://hub.docker.com/r/tmvdl/python",
  },
  {
    "title": "Ruby (Docker)",
    "image": "/img/docker-ruby.png",
    "link": "https://hub.docker.com/r/tmvdl/ruby",
  },
  // {
  //   "title": "Chalkboard",
  //   "image": "/img/chalkboard.png",
  //   "link": "https://chalkboard-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Airplane (3D)",
  //   "image": "/img/airplane.png",
  //   "link": "https://airplane-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "QR Code Scanner",
  //   "image": "/img/qrcodescanner.png",
  //   "link": "https://qrcodescanner-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "nAmazon",
  //   "image": "/img/namazon.png",
  //   "link": "https://namazon-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Calendario",
  //   "image": "/img/calendario.png",
  //   "link": "https://brtmvdl-calendario.surge.sh/",
  // },
  // {
  //   "title": "You Chat",
  //   "image": "/img/youchat.png",
  //   "link": "https://youchat-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Vestibular",
  //   "image": "/img/vestibular.png",
  //   "link": "https://vestibular-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Study",
  //   "image": "/img/study.png",
  //   "link": "https://study-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Stroll",
  //   "image": "/img/stroll.png",
  //   "link": "https://stroll-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "School",
  //   "image": "/img/school.png",
  //   "link": "https://school-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Raining",
  //   "image": "/img/raining.png",
  //   "link": "https://raining-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Projeto",
  //   "image": "/img/projeto.png",
  //   "link": "https://projeto-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Pomodoro",
  //   "image": "/img/pomodoro.png",
  //   "link": "https://pomodoro-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Numbers",
  //   "image": "/img/numbers.png",
  //   "link": "https://numbers-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "nContext",
  //   "image": "/img/ncontext.png",
  //   "link": "https://ncontext-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Metronomo",
  //   "image": "/img/metronomo.png",
  //   "link": "https://metronomo-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Market",
  //   "image": "/img/market.png",
  //   "link": "https://market-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Mapping",
  //   "image": "/img/mapping.png",
  //   "link": "https://mapping-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Just Eat",
  //   "image": "/img/justeat.png",
  //   "link": "https://justeat-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "JSON",
  //   "image": "/img/json.png",
  //   "link": "https://json-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Jornal",
  //   "image": "/img/jornal.png",
  //   "link": "https://jornal-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Jobs Sender",
  //   "image": "/img/jobssender.png",
  //   "link": "https://jobssender-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Hours",
  //   "image": "/img/hours.png",
  //   "link": "https://hours-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Graceful Temper",
  //   "image": "/img/graceful-temper.png",
  //   "link": "graceful-temper.surge.sh/",
  // },
  // {
  //   "title": "Games",
  //   "image": "/img/games.png",
  //   "link": "https://games-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Drawer",
  //   "image": "/img/drawer.png",
  //   "link": "https://drawer-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Debian",
  //   "image": "/img/debian.png",
  //   "link": "https://debian-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Curriculus",
  //   "image": "/img/curriculus.png",
  //   "link": "https://curriculus-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Chess",
  //   "image": "/img/chess.png",
  //   "link": "https://chess-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Cento",
  //   "image": "/img/cento.png",
  //   "link": "https://cento-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Calendar",
  //   "image": "/img/calendar.png",
  //   "link": "https://calendar-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Absent Book",
  //   "image": "/img/absent-book.png",
  //   "link": "absent-book.surge.sh/",
  // },
  // {
  //   "title": "Ball",
  //   "image": "/img/ball.png",
  //   "link": "https://ball-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "Apply",
  //   "image": "/img/apply.png",
  //   "link": "https://apply-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "App",
  //   "image": "/img/app.png",
  //   "link": "https://app-brtmvdl.surge.sh/",
  // },
  // {
  //   "title": "nelement",
  //   "image": "/img/nelement.png",
  //   "link": "https://nelement-brtmvdl.surge.sh/",
  // },
]
