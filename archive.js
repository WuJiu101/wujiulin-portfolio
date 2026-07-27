const root = document.documentElement;
const body = document.body;
const orbit = document.querySelector(".cursor-orbit");
const magneticItems = document.querySelectorAll(".magnetic");
const revealItems = document.querySelectorAll(".reveal");
const skipIntro = document.querySelector(".intro-skip");
const contactButtons = document.querySelectorAll("[data-contact]");
const contactLabel = document.querySelector("#contact-label");
const contactValue = document.querySelector("#contact-value");
const introSeenKey = "wjlIntroSeenWhite";

const contactData = {
  email: {
    label: "邮箱",
    value: "1169155828@qq.com",
  },
  wechat: {
    label: "微信",
    value: "wu1169155828",
  },
  phone: {
    label: "电话",
    value: "18282725022",
  },
};

const finishIntro = () => {
  body.classList.remove("is-intro-playing");
  body.classList.add("intro-finished");
  sessionStorage.setItem(introSeenKey, "1");
};

if (body.classList.contains("is-intro-playing")) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldSkipIntro =
    prefersReducedMotion ||
    document.documentElement.classList.contains("skip-intro") ||
    Boolean(window.location.hash) ||
    sessionStorage.getItem(introSeenKey) === "1";

  if (shouldSkipIntro) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 5100);
  }
}

skipIntro?.addEventListener("click", finishIntro);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

requestAnimationFrame(() => {
  revealItems.forEach((item) => {
    const box = item.getBoundingClientRect();
    if (box.top < window.innerHeight * 1.25) {
      item.classList.add("is-visible");
    }
  });
});

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--pointer-x", `${event.clientX}px`);
  root.style.setProperty("--pointer-y", `${event.clientY}px`);
});

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const box = item.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    item.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
    if (orbit) {
      orbit.style.width = "5.5rem";
      orbit.style.height = "5.5rem";
      orbit.style.opacity = "0.9";
    }
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
    if (orbit) {
      orbit.style.width = "";
      orbit.style.height = "";
      orbit.style.opacity = "";
    }
  });
});

contactButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-contact");
    const item = contactData[key];
    if (!item || !contactLabel || !contactValue) return;

    contactButtons.forEach((candidate) => candidate.classList.remove("is-active"));
    button.classList.add("is-active");
    contactLabel.textContent = item.label;
    contactValue.textContent = item.value;
  });
});

const detailTitle = document.querySelector("[data-detail-title]");
const detailCategory = document.querySelector("[data-detail-category]");
const detailSummary = document.querySelector("[data-detail-summary]");
const detailDescription = document.querySelector("[data-detail-description]");
const detailShowcase = document.querySelector("[data-detail-showcase]");
const detailGrid = detailShowcase?.closest(".detail-grid");
const detailFacts = document.querySelector("[data-detail-facts]");

const projectData = {
  brand: {
    "01": {
      title: "远望集团品牌设计",
      summary: "围绕气象雷达、探测装备与应用服务业务，将原有蓝橙标识延展为一套覆盖品牌识别、办公物料、企业空间和业务现场的视觉系统。",
      description:
        "项目保留 Invant Future 原有蓝橙圆环标识，以雷达扫描、风场线、等高线和数据节点作为辅助语言。页面先呈现简化后的识别基础，再进入名片、文具、员工用品、画册和报告等实体应用，最后通过总部、园区、展厅、展会、产品发布与气象指挥现场，展示品牌在真实业务环境中的完整落地。",
      facts: [
        { label: "项目", value: "远望集团品牌设计" },
        { label: "行业", value: "气象雷达、探测装备与应用服务" },
        { label: "范围", value: "品牌识别、办公物料、企业空间、展会展示与业务场景" },
        { label: "视觉", value: "蓝橙标识、雷达扫描、风场线、等高线与数据节点" },
      ],
      showcase: [
        { heading: "品牌识别基础", note: "保留原有标识的识别资产，用更克制的规则建立后续延展所需的色彩、图形和行业符号。" },
        {
          src: "../assets/yuanwang-group-brand-design/00-primary-logo.png",
          alt: "Invant Future 远望集团品牌主标志",
          label: "品牌标志",
          title: "主标志",
          copy: "蓝橙圆环与 Invant Future 字标构成品牌最核心的识别资产，作为整套延展的视觉起点。",
          layout: "hero",
          fit: "logo",
        },
        {
          src: "../assets/yuanwang-group-brand-design/01-logo-basic-usage.png",
          alt: "远望集团标志基础应用规范",
          label: "标志应用",
          title: "标志基础应用",
          copy: "横版、竖版与单色应用集中展示标志在常用版式中的基本关系，避免强制反白和复杂效果。",
          layout: "wide",
        },
        {
          src: "../assets/yuanwang-group-brand-design/02-brand-color-usage.png",
          alt: "远望集团品牌色彩应用",
          label: "品牌色彩",
          title: "蓝橙色彩系统",
          copy: "深蓝传达专业与稳定，橙色承担连接和提示功能，白色为主要展示底色。",
          layout: "wide",
        },
        {
          src: "../assets/yuanwang-group-brand-design/03-core-support-graphics.png",
          alt: "远望集团核心辅助图形",
          label: "辅助图形",
          title: "雷达、风场与等高线",
          copy: "从气象探测业务中提取三类简化图形，用于报告、展板和空间中的信息组织。",
          layout: "wide",
        },
        {
          src: "../assets/yuanwang-group-brand-design/04-simplified-industry-icons.png",
          alt: "远望集团简化行业图标",
          label: "行业图标",
          title: "简化业务图标",
          copy: "统一线宽和结构的图标覆盖雷达探测、气象观测、数据服务、工程保障与设备运维。",
          layout: "wide",
        },
        { heading: "办公与印刷物料", note: "让品牌进入每天被触摸和使用的实体物件，以成品摄影检验标识、色彩和辅助图形的实际表现。" },
        {
          src: "../assets/yuanwang-group-brand-design/05-printed-business-cards.png",
          alt: "远望集团商务名片印刷成品",
          label: "商务名片",
          title: "名片印刷成品",
          copy: "厚白卡纸、蓝橙标识和压凹雷达线形成克制、专业的商务触点。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/06-office-stationery-photo.png",
          alt: "远望集团办公文具套装",
          label: "办公文具",
          title: "基础文具套装",
          copy: "信纸、信封、文件夹和便笺保持充足留白，辅助图形只用于信息分区与识别。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/07-office-daily-items-photo.png",
          alt: "远望集团日常办公用品",
          label: "日常用品",
          title: "高频办公触点",
          copy: "笔记本、水杯、证件和桌面用品以统一比例使用标志，形成真实办公环境中的连续识别。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/08-employee-engineering-items.png",
          alt: "远望集团员工与工程用品",
          label: "员工用品",
          title: "工程服务装备",
          copy: "工装、头盔、工具包和证件回应技术团队的现场工作属性，强调清晰与耐用。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/09-corporate-brochure-photo.png",
          alt: "远望集团企业画册实体摄影",
          label: "企业画册",
          title: "画册印刷成品",
          copy: "封面、书脊和展开内页共同呈现品牌在正式企业资料中的版式节奏。",
          layout: "wide",
        },
        {
          src: "../assets/yuanwang-group-brand-design/10-product-manual-report-photo.png",
          alt: "远望集团产品手册与技术报告",
          label: "技术资料",
          title: "产品手册与报告",
          copy: "产品参数册、技术报告和资料夹建立适合工程信息与气象数据的专业阅读体系。",
          layout: "wide",
        },
        { heading: "企业空间与展示", note: "从总部到展会，将蓝橙识别、雷达弧线和产品设备放进可被真实建造与使用的空间节点。" },
        {
          src: "../assets/yuanwang-group-brand-design/11-headquarters-facade.png",
          alt: "远望集团总部建筑形象",
          label: "总部形象",
          title: "总部建筑外立面",
          copy: "楼体标识、入口识别线与幕墙图形共同建立企业总部的到达感。",
          layout: "hero",
        },
        {
          src: "../assets/yuanwang-group-brand-design/12-campus-entrance-monument.png",
          alt: "远望集团园区入口标识",
          label: "园区入口",
          title: "入口精神堡垒",
          copy: "低矮横向体量结合蓝橙圆环，兼顾车辆视距和访客到达时的品牌识别。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/13-campus-wayfinding.png",
          alt: "远望集团园区导视系统",
          label: "园区导视",
          title: "园区信息系统",
          copy: "访客中心、研发中心、雷达实验区和停车区域使用同一套中文信息层级。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/14-reception-brand-wall.png",
          alt: "远望集团前台品牌墙",
          label: "前台空间",
          title: "接待区品牌墙",
          copy: "发光标志、弧形背景和设备展示把企业形象与技术业务放在同一视线中。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/15-corporate-showroom.png",
          alt: "远望集团企业展厅",
          label: "企业展厅",
          title: "产品与发展展示",
          copy: "雷达设备、发展历程和数据屏幕构成参观动线，品牌图形用于串联不同内容区。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/16-exhibition-booth-wide.png",
          alt: "远望集团行业展会展台",
          label: "行业展会",
          title: "展会展台",
          copy: "开放式展台集中呈现设备、大屏和洽谈区域，保持远距离可识别的蓝橙结构。",
          layout: "wide",
        },
        { heading: "产品与业务现场", note: "最后把品牌带回核心业务：设备展示、产品发布、气象会商与户外工程服务。" },
        {
          src: "../assets/yuanwang-group-brand-design/17-radar-product-display.png",
          alt: "远望集团雷达产品展示",
          label: "产品展示",
          title: "雷达设备展示区",
          copy: "核心设备、参数牌和互动屏形成清楚的产品观看顺序，品牌作为专业信息的承托。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/18-product-launch-stage.png",
          alt: "远望集团产品发布会舞台",
          label: "产品发布",
          title: "行业发布会舞台",
          copy: "舞台大屏以雷达扫描图形组织标题和产品画面，适配论坛与新品发布场景。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/19-weather-command-center.png",
          alt: "远望集团气象指挥中心",
          label: "指挥中心",
          title: "气象数据会商",
          copy: "雷达回波、降水预报和站点信息进入多屏工作区，体现品牌服务真实业务的状态。",
          layout: "feature",
        },
        {
          src: "../assets/yuanwang-group-brand-design/20-outdoor-radar-service.png",
          alt: "远望集团户外雷达运维服务",
          label: "工程服务",
          title: "户外雷达运维",
          copy: "雷达站、工程车辆和技术人员共同呈现设备部署与运维服务的现场尺度。",
          layout: "feature",
        },
      ],
    },
    "02": {
      title: "盛泰金融画册设计",
      summary: "以深蓝与金色建立稳健的金融品牌气质，通过企业文化、团队人物与发展历程组织成一套完整画册。",
      description:
        "项目以盛泰团队的企业文化与成长历程为内容主线，使用深蓝、金色和清晰的信息层级建立专业、稳健的金融视觉。案例通过多种真实印刷视角呈现薄册封面、文化章节、团队人物与 2018—2024 年发展历程，集中展示画册从品牌气质到内容叙事的完整成册效果。",
      facts: [
        { label: "项目", value: "盛泰金融画册设计" },
        { label: "类型", value: "金融品牌 / 企业画册" },
        { label: "内容", value: "企业文化、团队人物、发展历程" },
        { label: "呈现", value: "A4 对折薄册与多视角印刷样机" },
      ],
      showcase: [
        { heading: "封面与品牌气质", note: "深蓝、金色与几何标识共同建立稳健的金融气质，并以薄册实拍视角呈现成品比例。" },
        {
          src: "../assets/shengtai-financial-brand/01-cover.png",
          alt: "盛泰金融品牌画册薄册封面样机",
          label: "Cover",
          title: "封面主视觉",
          copy: "深蓝封面配合金色标识与标题，在克制的暖灰摄影环境中突出品牌的专业感与成册质感。",
          layout: "hero",
        },
        {
          src: "../assets/shengtai-financial-brand/02-culture-city.png",
          alt: "盛泰金融画册企业文化城市跨页样机",
          label: "Culture",
          title: "盛泰文化",
          copy: "城市全景跨越装订中缝，以大尺度影像和标题建立企业文化章节的开篇气势。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/03-contents.png",
          alt: "盛泰金融品牌画册目录跨页样机",
          label: "Contents",
          title: "目录跨页",
          copy: "帆船影像与留白目录形成动静对照，清晰串联文化、团队和发展历程。",
          layout: "feature",
        },
        {
          src: "../assets/shengtai-financial-brand/04-introduction.png",
          alt: "盛泰金融品牌画册企业介绍跨页样机",
          label: "Introduction",
          title: "走进盛泰",
          copy: "建筑影像、品牌蓝与正文网格共同组织企业介绍，保持轻盈而专业的阅读节奏。",
          layout: "feature",
        },
        { heading: "理念与团队", note: "由品牌理念、企业愿景进入核心人物与团队成员，让抽象价值观逐步落到真实组织。" },
        {
          src: "../assets/shengtai-financial-brand/05-concept-spirit.png",
          alt: "盛泰金融画册理念与精神跨页样机",
          label: "Concept",
          title: "理念与精神",
          copy: "深蓝、金色和品牌辅助图形构成左右呼应的理念版式，强化一致的企业识别。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/06-vision.png",
          alt: "盛泰金融画册企业愿景跨页样机",
          label: "Vision",
          title: "盛泰愿景",
          copy: "地球弧线与深空背景形成面向未来的视觉尺度，承接企业愿景的核心表达。",
          layout: "feature",
        },
        {
          src: "../assets/shengtai-financial-brand/07-pioneering-figure.png",
          alt: "盛泰金融画册领军人物跨页样机",
          label: "Leadership",
          title: "领军人物",
          copy: "深色章节页与人物履历页形成明确对照，突出创始人的专业背景与组织角色。",
          layout: "feature",
        },
        {
          src: "../assets/shengtai-financial-brand/08-team-one.png",
          alt: "盛泰金融画册团队成员介绍跨页样机一",
          label: "Team",
          title: "核心团队（一）",
          copy: "人物肖像、职务信息与职责说明通过统一网格展开，建立稳定清楚的团队信息层级。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/09-team-two.png",
          alt: "盛泰金融画册团队成员介绍跨页样机二",
          label: "Team",
          title: "核心团队（二）",
          copy: "第二组团队成员延续统一的人物版式，在真实纸张弧度中呈现连续的阅读体验。",
          layout: "wide",
        },
        { heading: "时光机与发展历程", note: "从章节转场进入年度时间线，再以连续跨页梳理盛泰团队 2018—2024 年的成长轨迹。" },
        {
          src: "../assets/shengtai-financial-brand/10-history-divider.png",
          alt: "盛泰金融画册时光机章节页样机",
          label: "Timeline",
          title: "时光机章节页",
          copy: "大字号金色标题在深蓝页面上完成章节转场，为后续年度内容建立清晰入口。",
          layout: "feature",
        },
        {
          src: "../assets/shengtai-financial-brand/11-development-timeline.png",
          alt: "盛泰金融画册2018至2024发展时间线样机",
          label: "Development",
          title: "发展历程总览",
          copy: "金色时间轴串联 2018 至 2024 年关键节点，以克制的信息密度概括团队成长。",
          layout: "hero",
        },
        {
          src: "../assets/shengtai-financial-brand/12-history-2018-2019.png",
          alt: "盛泰金融画册2018至2019发展历程跨页样机",
          label: "2018—2019",
          title: "成立与探索",
          copy: "从团队成立到前瞻性投资，以年度标题、图片和分栏文字记录早期发展阶段。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/13-history-2020-2021.png",
          alt: "盛泰金融画册2020至2021发展历程跨页样机",
          label: "2020—2021",
          title: "责任与多元探索",
          copy: "公益行动与新能源投资并置，呈现团队在社会责任和业务拓展上的双重推进。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/14-history-2022-2023.png",
          alt: "盛泰金融画册2022至2023发展历程跨页样机",
          label: "2022—2023",
          title: "公益与区块链投资",
          copy: "公益活动与区块链领域投资构成新的年度重点，延续清晰的双页信息结构。",
          layout: "wide",
        },
        {
          src: "../assets/shengtai-financial-brand/15-history-2024.png",
          alt: "盛泰金融画册2024发展历程跨页样机",
          label: "2024",
          title: "聚焦行业前沿",
          copy: "蓝色城市背景与人物远景收束时间线，以创新与未来发展完成整套画册结尾。",
          layout: "feature",
        },
      ],
    },
    "03": {
      title: "龙泉驿区品牌文创设计",
      summary: "围绕龙泉驿区城市文化、汽车城记忆与 2026 新年礼赠场景，建立一组可用于节庆、商务与随行物料的品牌文创系统。",
      description:
        "项目以“山水龙泉驿 · 活力汽车城”为核心气质，将区域建筑、山水线条、汽车产业符号与新年马年语汇转译为礼盒、手账本、钢笔书签徽章、春联门贴与包装纸筒、伞具、移动电源和车载挂件等文创产品。页面按礼赠套装、节庆物料、日常文具和随行物件分组，让观看者先看到完整系统，再进入单件产品细节。",
      facts: [
        { label: "项目", value: "龙泉驿区品牌文创设计" },
        { label: "主题", value: "山水龙泉驿 · 活力汽车城" },
        { label: "年份", value: "2026 新年文创" },
        { label: "范围", value: "礼盒、文具、节庆门贴与包装、伞具、移动电源、车载挂件" },
      ],
      showcase: [
        { heading: "礼赠系统主视觉", note: "先用完整套装建立项目气质：红金礼盒、文具与徽章构成商务礼赠的第一印象。" },
        {
          src: "../assets/longquanyi-cultural-creative/gift-box.jpg",
          alt: "龙泉驿区品牌文创礼盒套装",
          label: "Gift system",
          title: "新年礼盒套装",
          copy: "红金礼盒、书签、钢笔、徽章与手账本共同建立商务礼赠的第一印象。",
          layout: "hero",
        },
        {
          src: "../assets/longquanyi-cultural-creative/bookmark-pen-badge.jpg",
          alt: "龙泉驿区品牌文创书签钢笔徽章组合",
          label: "Stationery set",
          title: "书签、钢笔与徽章",
          copy: "建筑线稿、山水徽章和红金文具组成近距离礼品触点。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/gift-bag.jpg",
          alt: "龙泉驿区品牌文创礼品袋",
          label: "Packaging",
          title: "礼品袋",
          copy: "红色主体和金色标识让包装与内部物料保持统一。",
          layout: "landscape",
        },
        { heading: "新年节庆物料", note: "春联、福字、包装纸筒和冰箱贴用更直接的节日语气承接 2026 年新年场景。" },
        {
          src: "../assets/longquanyi-cultural-creative/spring-couplets.jpg",
          alt: "龙泉驿区 2026 新年春联门贴",
          label: "New year",
          title: "春联与福字门贴",
          copy: "门贴以“骥马当先”和“龙马精神”等新年语汇结合马年图形，适合家庭、园区和活动赠礼场景。",
          layout: "square",
        },
        {
          src: "../assets/longquanyi-cultural-creative/thermos-16x9.jpg",
          alt: "龙泉驿区 2026 新年春联包装纸筒",
          label: "Packaging",
          title: "春联包装纸筒",
          copy: "圆筒包装用于收纳成套春联，以红金配色、马年图形和区域徽记延续节庆礼赠系统。",
          layout: "feature-wide",
        },
        {
          src: "../assets/longquanyi-cultural-creative/fridge-door-set.jpg",
          alt: "龙泉驿区品牌文创冰箱贴门贴套装",
          label: "Fridge magnet",
          title: "冰箱贴套装应用",
          copy: "春联结构被转化成家居场景中的轻量化节庆物件。",
          layout: "wide",
        },
        {
          src: "../assets/longquanyi-cultural-creative/fridge-packaging.jpg",
          alt: "龙泉驿区品牌文创冰箱贴包装",
          label: "Packaging",
          title: "套装包装",
          copy: "浅米色纹样承托红色门贴，让产品适合成套陈列。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/fridge-five.jpg",
          alt: "龙泉驿区五福图冰箱贴",
          label: "Series",
          title: "五福图冰箱贴",
          copy: "五枚福字磁贴形成可拆分、可组合的小系列。",
          layout: "landscape",
        },
        { heading: "办公与日常文创", note: "手账本、台历等高频物件，让城市品牌进入每天都会被触摸到的场景。" },
        {
          src: "../assets/longquanyi-cultural-creative/notebook-cover.jpg",
          alt: "龙泉驿区品牌文创红色手账本封面",
          label: "Notebook",
          title: "手账本封面",
          copy: "红色皮质质感、线描建筑和金色题字形成稳重的办公礼品气质。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/notebooks-duo.jpg",
          alt: "龙泉驿区品牌文创双款手账本",
          label: "Notebook",
          title: "双款手账本",
          copy: "两款封面分别强调区域建筑与汽车城符号。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/notebook-open.jpg",
          alt: "龙泉驿区品牌文创手账本内页",
          label: "Inner pages",
          title: "手账本内页",
          copy: "内页保持克制留白，适合书写、会议记录和长期使用。",
          layout: "wide",
        },
        {
          src: "../assets/longquanyi-cultural-creative/calendar-cover.jpg",
          alt: "龙泉驿区品牌文创 2026 台历封面",
          label: "Calendar",
          title: "2026 台历封面",
          copy: "新年马形、红色底座和品牌标语强化桌面物料识别度。",
          layout: "square",
        },
        {
          src: "../assets/longquanyi-cultural-creative/calendar-month.jpg",
          alt: "龙泉驿区品牌文创 2026 台历月页",
          label: "Calendar",
          title: "台历月页",
          copy: "月页用日程书写场景展示实际使用方式。",
          layout: "square",
        },
        {
          src: "../assets/longquanyi-cultural-creative/calendar-daily.jpg",
          alt: "龙泉驿区品牌文创 2026 台历日程页",
          label: "Calendar",
          title: "日程页",
          copy: "日程页展示日常记录功能，和封面、月页形成完整台历组。",
          layout: "square",
        },
        { heading: "随行与出行物件", note: "把区域符号放到车载、雨具、移动电源这些出行场景中，回应“活力汽车城”的项目语境。" },
        {
          src: "../assets/longquanyi-cultural-creative/power-bank-set.jpg",
          alt: "龙泉驿区品牌文创移动电源",
          label: "Power bank",
          title: "移动电源",
          copy: "浅金底承载建筑与体育场馆图形，把城市地标转化成随身科技产品。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/umbrella-open.jpg",
          alt: "龙泉驿区品牌文创黑金伞面",
          label: "Umbrella",
          title: "黑金伞面",
          copy: "黑金线条和山水边界让出行物件更沉稳。",
          layout: "landscape",
        },
        {
          src: "../assets/longquanyi-cultural-creative/umbrella-box.jpg",
          alt: "龙泉驿区品牌文创伞具包装",
          label: "Umbrella",
          title: "伞具包装",
          copy: "伞盒延续黑金系统，让出行物件也拥有完整包装呈现。",
          layout: "wide",
        },
        {
          src: "../assets/longquanyi-cultural-creative/car-hanger-horizontal.jpg",
          alt: "龙泉驿区品牌文创车载挂件横向款",
          label: "Car accessory",
          title: "车载挂件横向款",
          copy: "横向挂件把平安祝福、马形符号和路线文字压缩到车内近景中，贴合汽车城语境。",
          layout: "square",
        },
        {
          src: "../assets/longquanyi-cultural-creative/car-hanger-tower.jpg",
          alt: "龙泉驿区品牌文创车载挂件塔楼款",
          label: "Car accessory",
          title: "车载挂件塔楼款",
          copy: "塔楼轮廓款更强调地域建筑识别，适合作为系列中的文化符号款。",
          layout: "square",
        },
        {
          src: "../assets/longquanyi-cultural-creative/car-hanger-red.jpg",
          alt: "龙泉驿区品牌文创车载挂件红色款",
          label: "Car accessory",
          title: "车载挂件红色款",
          copy: "红色款承接新年色彩，让车载场景和节庆礼品形成同一套语气。",
          layout: "square",
        },
      ],
    },
    "04": {
      title: "中链智云品牌设计",
      presentation: "portfolio",
      summary: "科技企业品牌全案，从标识系统、色彩字体规范，到商务物料、数字平台和办公空间的完整品牌延展。",
      description:
        "中链智云是一家云计算与数据智能企业。项目以「云服务与云连接」为核心概念，覆盖品牌标识系统（主标识、制图规范、概念说明、应用规则）、色彩与字体规范、云链辅助图形与服务图标、商务物料（名片、信纸与员工用品）、企业画册与技术报告、官网首页与云控制台，以及前台背景墙、办公导视、展会展位、发布会舞台和数据中心运营等空间应用。整体以品牌深蓝、连接青和大面积留白建立专业、稳定的科技气质。",
      facts: [
        { label: "项目", value: "中链智云品牌全案设计" },
        { label: "类型", value: "云计算与数据智能企业" },
        { label: "范围", value: "标识系统、品牌规范、商务物料、数字产品、企业空间" },
        { label: "视觉", value: "品牌深蓝、连接青、云形轮廓与数据节点" },
      ],
      showcase: [
        { heading: "品牌核心识别", note: "以深蓝科技感和几何云链图形建立云计算企业的品牌识别基础。" },
        {
          src: "../assets/zhongyunzhilian/01-primary-logo-white.jpg",
          alt: "中链智云品牌主标识",
          label: "Primary logo",
          title: "品牌主标识",
          copy: "白色背景下深蓝色几何云链图形与中英文字标，建立科技企业简洁、专业的第一识别。",
          layout: "hero",
          fit: "contain",
          cleanCrop: true,
          hideCaption: true,
        },
        {
          src: "../assets/zhongyunzhilian/02-logo-construction.jpg",
          alt: "中链智云标志标准制图",
          label: "Logo construction",
          title: "标志标准制图",
          copy: "以圆形几何、节点尺寸和文字基线控制标志结构，让图形与中英文字标保持稳定比例。",
          layout: "landscape",
          fit: "contain",
          cleanCrop: true,
          hideCaption: true,
        },
        {
          src: "../assets/zhongyunzhilian/03-logo-concept.jpg",
          alt: "中链智云品牌标识概念",
          label: "Logo concept",
          title: "标识概念说明",
          copy: "将承载企业算力与数据的云服务，与连接算力、数据和服务的云链路合并为品牌符号。",
          layout: "landscape",
          fit: "contain",
          cleanCrop: true,
          hideCaption: true,
        },
        {
          src: "../assets/zhongyunzhilian/04-logo-usage.jpg",
          alt: "中链智云标志组合与最小尺寸规范",
          label: "Logo usage",
          title: "标志组合与使用规范",
          copy: "完整标志、图形标志与小尺寸组合共同覆盖不同媒介，并明确禁止拉伸、改色和附加效果。",
          layout: "landscape",
          fit: "contain",
          cleanCrop: true,
          hideCaption: true,
        },
        {
          src: "../assets/zhongyunzhilian/05-color-typography.jpg",
          alt: "中链智云色彩与字体规范",
          label: "Brand system",
          title: "色彩与字体规范",
          copy: "以深蓝为主色、科技蓝为辅助的色彩系统，配合中英文字体层级建立品牌规范基础。",
          layout: "landscape",
          fit: "contain",
          cleanCrop: true,
          hideCaption: true,
        },
        { heading: "商务物料与数字平台", note: "从名片、信纸到官网和云控制台，品牌在印刷和数字媒介上的统一落地。" },
        {
          src: "../assets/zhongyunzhilian/08-business-cards.jpg",
          alt: "中链智云名片设计",
          label: "Business cards",
          title: "名片系统",
          copy: "简洁白底配深蓝标识的名片设计，传递科技企业的专业与可信赖感。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/09-stationery-suite.jpg",
          alt: "中链智云信纸与办公用品",
          label: "Stationery",
          title: "信纸与办公用品",
          copy: "信纸、信封、文件夹等办公物料的统一视觉系统，保持品牌在所有商务触点上的一致。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/10-employee-items.jpg",
          alt: "中链智云员工用品",
          label: "Employee items",
          title: "员工用品系统",
          copy: "工牌、门禁卡、笔记本等员工日常用品的品牌化设计，将品牌融入组织内部文化。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/11-corporate-brochure.jpg",
          alt: "中链智云企业画册",
          label: "Brochure",
          title: "企业画册",
          copy: "企业宣传画册的封面与内页版式设计，以深蓝和留白呈现科技企业的专业叙事。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/12-technical-report.jpg",
          alt: "中链智云技术报告",
          label: "Report",
          title: "技术报告",
          copy: "技术白皮书与行业报告的版式设计，在严谨的信息层级中保持品牌识别的一致性。",
          layout: "landscape",
          fit: "contain",
        },
        { heading: "企业空间与品牌现场", note: "品牌从平面进入三维——导视、展位、舞台和数据中心的完整空间呈现。" },
        {
          src: "../assets/zhongyunzhilian/17-office-wayfinding.jpg",
          alt: "中链智云办公导视系统",
          label: "Wayfinding",
          title: "办公导视",
          copy: "办公区域的导视系统设计，将品牌色彩和图形延伸到空间导航中。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/18-exhibition-booth.jpg",
          alt: "中链智云展会展位设计",
          label: "Exhibition",
          title: "展会展位",
          copy: "行业展会的品牌展位设计，在大型空间中建立具有辨识度和吸引力的品牌体验。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/19-launch-stage.jpg",
          alt: "中链智云发布会舞台",
          label: "Launch stage",
          title: "发布会舞台",
          copy: "产品发布会的舞台视觉设计，大屏幕与灯光环境中的品牌主视觉呈现。",
          layout: "landscape",
          fit: "contain",
        },
        {
          src: "../assets/zhongyunzhilian/20-data-center-operations.jpg",
          alt: "中链智云数据中心运营",
          label: "Data center",
          title: "数据中心运营",
          copy: "数据中心运维场景的品牌化设计，将品牌识别延伸到核心技术设施空间。",
          layout: "landscape",
          fit: "contain",
        },
      ],
    },
    "05": {
      title: "鸡凰府品牌设计",
      summary: "餐饮品牌全案设计，从品牌VI系统、包装物料、广告推广到数字体验和门店空间的完整视觉体系。",
      description:
        "鸡凰府是一个以「鸡有本味·食味知鲜」为核心理念的餐饮品牌。项目覆盖品牌视觉识别系统（VIS）、手提袋与礼盒包装、名片与商务物料、易拉宝广告与招聘海报、手机点餐APP界面，以及日间/夜间门店外立面、收银点餐区、堂食区和打卡墙等空间设计。整体以绿色自然和红色活力为品牌主调。",
      facts: [
        { label: "项目", value: "鸡凰府品牌全案设计" },
        { label: "类型", value: "餐饮品牌 · 鸡有本味" },
        { label: "范围", value: "VIS系统、包装物料、广告推广、APP界面、门店空间" },
      ],
      showcase: [
        { heading: "品牌识别基础", note: "「鸡有本味·食味知鲜」——以绿色自然和红色公鸡图案建立餐饮品牌的核心识别。" },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-01.jpg",
          alt: "鸡凰府品牌视觉识别系统封面",
          label: "VIS Cover",
          title: "品牌视觉识别系统",
          copy: "鸡凰府企业视觉识别系统封面，绿色背景配红色公鸡图案，建立「鸡有本味·食味知鲜」的品牌基调。",
          layout: "hero",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-02.jpg",
          alt: "鸡凰府品牌视觉系统概览",
          label: "Brand system",
          title: "视觉系统概览",
          copy: "品牌标志、色彩系统和核心视觉元素的统一呈现，构建完整的品牌识别框架。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-04.jpg",
          alt: "鸡凰府品牌卖点展示",
          label: "Brand values",
          title: "品牌卖点展示",
          copy: "「生态散养」「山林放养」等品牌核心卖点的视觉化呈现，传递产品品质和品牌承诺。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-05.jpg",
          alt: "鸡凰府品牌元素综合展示",
          label: "Brand elements",
          title: "品牌元素综合",
          copy: "标志、色彩、辅助图形和品牌口号的综合展示，为后续物料延展建立统一的视觉语言。",
          layout: "wide",
        },
        { heading: "包装与推广物料", note: "从手提袋、礼盒到易拉宝广告和招聘海报，品牌在各类物料上的统一落地。" },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-16.jpg",
          alt: "鸡凰府品牌手提袋",
          label: "Shopping bag",
          title: "品牌手提袋",
          copy: "清新绿色手提袋承载品牌标志与口号，将品牌识别延伸到顾客离店后的日常场景。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-18.jpg",
          alt: "鸡凰府品牌纸巾盒",
          label: "Tissue box",
          title: "品牌纸巾盒",
          copy: "绿色系纸巾盒将品牌标志、核心口号和辅助图形融入餐桌服务物料，延续门店中的品牌识别。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-20.jpg",
          alt: "鸡凰府餐饮订餐卡",
          label: "Order card",
          title: "餐饮订餐卡",
          copy: "正反两面的餐饮订餐卡设计，整合品牌口号、订餐信息和二维码，方便顾客快速了解与下单。",
          layout: "wide",
        },
        {
          src: "../assets/jihuangfu/rollup-banners.jpg",
          alt: "鸡凰府易拉宝广告组合",
          label: "Ad campaign",
          title: "广告组合展示",
          copy: "多款易拉宝广告的组合呈现，展示品牌在不同产品和促销场景下的视觉一致性。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/鸡凰府vi001-41.jpg",
          alt: "鸡凰府诚聘英才招聘广告",
          label: "Recruitment",
          title: "招聘广告",
          copy: "夜景中的「诚聘英才」招聘广告牌，将品牌视觉延伸到人才招募场景。",
          layout: "landscape",
        },
        { heading: "数字与空间落地", note: "从手机点餐到门店空间，品牌从平面进入数字和三维场景的完整呈现。" },
        {
          src: "../assets/jihuangfu/app-ui.jpg",
          alt: "鸡凰府外卖APP界面组合",
          label: "App screens",
          title: "APP界面组合",
          copy: "多个APP界面屏幕的组合展示，呈现从浏览、点餐到支付的完整数字体验流程。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/空间01_日间门店外立面.jpg",
          alt: "鸡凰府日间门店外立面",
          label: "Day exterior",
          title: "日间门店外立面",
          copy: "日光下的门店外观，品牌标志和绿色元素在街面环境中建立清晰的品牌识别。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/空间02_夜间门店外立面.jpg",
          alt: "鸡凰府夜间门店外立面",
          label: "Night exterior",
          title: "夜间门店外立面",
          copy: "灯光下的门店外观，暖色照明与品牌绿色形成日夜不同的空间氛围。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/空间03_收银点餐区.jpg",
          alt: "鸡凰府收银点餐区",
          label: "Counter",
          title: "收银点餐区",
          copy: "收银和点餐区域的空间设计，品牌色彩与菜单展示在服务触点上强化品牌体验。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/空间04_堂食区全景.jpg",
          alt: "鸡凰府堂食区全景",
          label: "Dining area",
          title: "堂食区全景",
          copy: "堂食区域的整体空间氛围，绿色元素与木质家具营造自然舒适的用餐环境。",
          layout: "landscape",
        },
        {
          src: "../assets/jihuangfu/空间05_取餐等候与打卡墙.jpg",
          alt: "鸡凰府取餐等候与打卡墙",
          label: "Photo wall",
          title: "取餐等候与打卡墙",
          copy: "取餐等候区与品牌打卡墙的设计，将等候时间转化为品牌传播和社交分享的机会。",
          layout: "wide",
        },
      ],
    },
    "06": {
      title: "瑜沐馆品牌设计",
      summary: "健康养生品牌全案设计，从品牌标识、色彩字体规范，到店面空间、包装物料和导视系统的完整视觉体系。",
      description:
        "瑜沐馆（Octo Wellness）是一个健康养生品牌。项目覆盖品牌标识设计、色彩与字体规范系统、图形图案延展、商务物料（名片/信纸）、产品包装（礼盒/瓶器）、店面空间（外观/接待区/体验空间）、以及手提袋、导视等周边物料。整体以自然、温润的木质与植物元素传达品牌调性。",
      facts: [
        { label: "项目", value: "瑜沐馆 Octo Wellness 品牌全案设计" },
        { label: "类型", value: "健康养生品牌" },
        { label: "范围", value: "品牌标识、规范系统、商务物料、包装、空间、导视、周边" },
      ],
      showcase: [
        { heading: "品牌核心识别", note: "品牌标识融合树叶与文字，以自然温润的基调建立健康养生的视觉基因。" },
        {
          src: "../assets/yumuguan/main-brand.jpg",
          alt: "瑜沐馆品牌主标识",
          label: "Brand mark",
          title: "品牌主标识",
          copy: "「瑜沐馆 Octo Wellness」标识以树叶剪影与中英文字标组合，浅色背景上呈现自然、温润的品牌气质。",
          layout: "hero",
        },
        {
          src: "../assets/yumuguan/logo-mark.jpg",
          alt: "瑜沐馆品牌标志",
          label: "Logo",
          title: "品牌标志",
          copy: "两个相连圆形图案与中英文名称构成品牌核心符号，适用于各种尺度和媒介的品牌识别。",
          layout: "square",
        },
        {
          src: "../assets/yumuguan/logo-mark-alt.jpg",
          alt: "瑜沐馆品牌标志变体",
          label: "Logo alt",
          title: "标志变体",
          copy: "品牌标志的抽象图形版本，以更简洁的视觉语言适配小尺寸和辅助场景的应用需求。",
          layout: "square",
        },
        {
          src: "../assets/yumuguan/logo-mark-v3.jpg",
          alt: "瑜沐馆品牌标志组合",
          label: "Logo combo",
          title: "标志组合",
          copy: "图形标志与中英文名称的标准组合方式，建立品牌在各类物料上的统一视觉签名。",
          layout: "square",
        },
        { heading: "品牌规范系统", note: "色彩和图形图案构成品牌识别的基础规则，保证所有延展的一致性。" },
        {
          src: "../assets/yumuguan/palette.jpg",
          alt: "瑜沐馆品牌色彩系统",
          label: "Color",
          title: "色彩规范",
          copy: "以木质暖棕、草本绿和米白为核心色板，延伸出品牌在印刷、空间和数字场景的用色规则。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/graphic-motif.jpg",
          alt: "瑜沐馆品牌图形系统",
          label: "Motif",
          title: "图形图案系统",
          copy: "从树叶元素提炼的辅助图形与连续图案，用于包装、空间和物料上的品牌氛围延伸。",
          layout: "feature",
        },
        { heading: "品牌应用延展", note: "从店面招牌到商务物料和产品包装，看品牌系统在真实场景中的落地效果。" },
        {
          src: "../assets/yumuguan/storefront.jpg",
          alt: "瑜沐馆店面招牌",
          label: "Storefront",
          title: "店面招牌",
          copy: "白色招牌上呈现品牌标识与中英文名称，安装在建筑外立面窗户旁，简洁现代的店面第一印象。",
          layout: "wide",
        },
        {
          src: "../assets/yumuguan/business-card.jpg",
          alt: "瑜沐馆名片设计",
          label: "Stationery",
          title: "名片",
          copy: "名片延续品牌色彩与字体系统，通过纸张质感和信息层级传递专业与温润的品牌感受。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/letterhead.jpg",
          alt: "瑜沐馆信纸设计",
          label: "Letterhead",
          title: "信纸",
          copy: "信纸版式以品牌标识和辅助图形为元素，在正式商务沟通中保持品牌识别的一致性。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/packaging.jpg",
          alt: "瑜沐馆产品包装",
          label: "Packaging",
          title: "产品包装",
          copy: "产品包装以木质和自然色调为主，瓶器与盒体设计统一在品牌视觉系统内。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/gift-box-system.jpg",
          alt: "瑜沐馆礼盒系统",
          label: "Gift",
          title: "礼盒系统",
          copy: "木质礼盒上呈现品牌标识与图案，作为品牌高端礼品和顾客触点的重要载体。",
          layout: "feature",
        },
        { heading: "空间与物料落地", note: "品牌从平面进入三维空间——店面外观、室内体验区和周边物料的完整呈现。" },
        {
          src: "../assets/yumuguan/storefront-exterior.jpg",
          alt: "瑜沐馆店面外观效果",
          label: "Exterior",
          title: "店面外观",
          copy: "品牌标识、色彩和材质在建筑外立面上的整体呈现，建立街面识别和入店引导。",
          layout: "wide",
        },
        {
          src: "../assets/yumuguan/reception-desk.jpg",
          alt: "瑜沐馆接待区",
          label: "Reception",
          title: "接待区",
          copy: "接待台以木质和暖光为主调，品牌标识与空间材质融合，营造自然舒适的入店体验。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/experiential-space.jpg",
          alt: "瑜沐馆核心体验空间",
          label: "Experience",
          title: "核心体验空间",
          copy: "体验空间将品牌色彩、材质和图形延伸到墙面、家具和灯光，形成沉浸式的品牌氛围。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/tote-bag.jpg",
          alt: "瑜沐馆手提袋",
          label: "Merch",
          title: "手提袋",
          copy: "手提袋以品牌标识和辅助图形为视觉中心，将品牌延伸到顾客日常使用的移动场景。",
          layout: "feature",
        },
        {
          src: "../assets/yumuguan/directional-signage.jpg",
          alt: "瑜沐馆导视系统",
          label: "Signage",
          title: "导视系统",
          copy: "室内导视牌延续品牌色彩和字体规范，在空间中提供清晰的方向指引和品牌触点。",
          layout: "feature",
        },
      ],
    },
  },
  event: {
    "01": {
      title: "2025 沃尔沃 S90 新车发布会（大庆工厂）",
      summary: "围绕沃尔沃全新 S90 上市发布会，建立从主舞台到宾客动线的现场视觉系统。",
      description:
        "项目地点为中国 · 大庆工厂（成都线上进行设计）。项目覆盖发布会主屏与侧屏、签到接待、午晚餐导视、餐券、房卡套、签到台卡和邀请函信封。整体以克制的白灰空间、车型主视觉和清晰信息层级串联嘉宾抵达、签到、会场、用餐与邀请触点。",
      facts: [
        { label: "项目", value: "沃尔沃全新 S90 全国上市发布会" },
        { label: "地点", value: "中国 · 大庆工厂（成都线上进行设计）" },
        { label: "年份", value: "2025" },
        { label: "范围", value: "主会场 LED、接待签到、午晚餐导视、餐券、房卡套、邀请函信封" },
      ],
      showcase: [
        { heading: "发布现场", note: "先用大画幅建立现场尺度，再把接待与动线导视拆成清楚的观看节奏。" },
        {
          src: "../assets/volvo-s90-launch/stage-led-real-event.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会主舞台 LED 屏幕",
          label: "Main stage",
          title: "主会场 LED 视觉",
          copy: "主屏与侧屏以车型图和发布会标题建立现场核心画面，保留足够留白给灯光、摄影和会场尺度。",
          layout: "hero",
        },
        {
          src: "../assets/volvo-s90-launch/registration-desk-event.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会签到接待台",
          label: "Reception",
          title: "签到接待背景",
          copy: "接待区延续主视觉，形成嘉宾进入发布会后的第一处品牌识别点。",
          layout: "feature",
        },
        {
          src: "../assets/volvo-s90-launch/wayfinding-lunch-lobby.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会午餐导视立牌",
          label: "Lunch",
          title: "午餐导视",
          copy: "午餐导视以极少信息完成方向提示，与酒店空间的石材、木饰面和暖光保持统一。",
          layout: "portrait-slim",
        },
        {
          src: "../assets/volvo-s90-launch/wayfinding-dinner-lobby.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会晚餐导视立牌",
          label: "Dinner",
          title: "晚餐导视",
          copy: "晚餐立牌沿用同一版式系统，通过醒目的中文信息保证嘉宾动线清楚。",
          layout: "portrait-slim",
        },
        { heading: "宾客触点物料", note: "把签到、餐饮、入住等近距离物料放成一组，看统一性，也看细节。" },
        {
          src: "../assets/volvo-s90-launch/stationery-suite-counter.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会餐券与房卡套等物料组合",
          label: "Touchpoints",
          title: "现场物料组合",
          copy: "餐券、桌牌与房卡套放在同一画面中，呈现发布会完整触点的统一性。",
          layout: "wide",
        },
        {
          src: "../assets/volvo-s90-launch/signin-book-counter.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会签到台卡",
          label: "Sign-in",
          title: "签到台卡",
          copy: "签到台卡承接发布会标题与车型图，作为接待台上的近距离识别物。",
          layout: "portrait",
        },
        {
          src: "../assets/volvo-s90-launch/meal-voucher-closeup.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会餐券近景",
          label: "Voucher",
          title: "餐券",
          copy: "餐券用横向构图容纳车型、日期和餐别信息，便于领取与核对。",
          layout: "square",
        },
        {
          src: "../assets/volvo-s90-launch/keycard-sleeve-closeup.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会酒店房卡套",
          label: "Keycard",
          title: "酒店房卡套",
          copy: "房卡套把活动识别延伸到入住场景，让嘉宾在会场外仍能感知项目氛围。",
          layout: "square",
        },
        { heading: "邀请函信封", note: "用启动键、工厂线描、前脸格栅和展开结构，把邀请动作做成一个小仪式。" },
        {
          src: "../assets/volvo-s90-launch/invitation-start-button.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函信封启动键封面",
          label: "Envelope",
          title: "启动键封面",
          copy: "封面用启动键建立汽车语义，将打开邀请函的动作转化为启动体验。",
          layout: "square",
        },
        {
          src: "../assets/volvo-s90-launch/invitation-factory-line.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函信封工厂线描内页",
          label: "Factory",
          title: "大庆工厂线描",
          copy: "内页用工厂轮廓回应发布会地点，把制造基地作为邀请故事的一部分。",
          layout: "square",
        },
        {
          src: "../assets/volvo-s90-launch/invitation-front-tease.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函信封前脸露出结构",
          label: "Reveal",
          title: "车头露出",
          copy: "开合时先露出 S90 前脸局部，形成由标识到产品的逐步揭示。",
          layout: "square",
        },
        {
          src: "../assets/volvo-s90-launch/invitation-front-open.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函信封前脸完整展开",
          label: "Grille",
          title: "前脸完整展开",
          copy: "格栅与大灯被作为结构主体，强化车型识别和新车发布的主角感。",
          layout: "feature-wide",
        },
        {
          src: "../assets/volvo-s90-launch/invitation-front-layer.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函信封多层展开",
          label: "Layer",
          title: "层叠展开",
          copy: "多层纸张结构模拟车辆前脸与邀请信息的打开过程，增加实体物料记忆点。",
          layout: "square",
        },
        {
          src: "../assets/volvo-s90-launch/invitation-copywriting-open.jpg",
          alt: "沃尔沃全新 S90 全国上市发布会邀请函完整内页文案",
          label: "Invitation",
          title: "邀请函完整内页",
          copy: "最终展开页承载发布会说明、品牌语气和车辆画面，完成从机关到信息的转场。",
          layout: "wide",
        },
      ],
    },
    "02": {
      title: "湖畔音浪挑战赛活动设计",
      summary: "以湖畔、音乐、花船和世园场景为核心，建立一套明亮、轻快的户外音乐挑战赛视觉系统。",
      description:
        "项目围绕 2025 湖畔音浪挑战赛展开，视觉以绿色标题字、湖面、花船、花卉、音符和园区建筑形成记忆点。延展覆盖主 KV、舞台背景、导视系统、打卡装置、入口拱门、花船打卡点、湖畔舞台和园区导视等应用场景。",
      facts: [
        { label: "项目", value: "湖畔音浪挑战赛" },
        { label: "地点", value: "成都世界园艺博览园" },
        { label: "年份", value: "2025" },
        { label: "范围", value: "主 KV、舞台背景、导视系统、打卡装置、入口拱门、花船打卡点、园区导视" },
      ],
      showcase: [
        { heading: "活动核心识别", note: "主 KV 是整套视觉的基因——先建立画面记忆，再展开到完整的平面系统。" },
        {
          src: "../assets/lakeside-soundwave/main-kv.jpg",
          alt: "湖畔音浪挑战赛主 KV",
          label: "Core identity",
          title: "活动主 KV",
          copy: "绿色标题字、湖面倒影、花船音符和世园建筑共同构成活动的核心识别画面。保留活动年份与园区信息，是后续所有延展的视觉起点。",
          layout: "hero",
        },
        {
          src: "../assets/lakeside-soundwave/visual-extension-overview.png",
          alt: "湖畔音浪挑战赛平面延展总览",
          label: "System overview",
          title: "平面延展总览",
          copy: "海报、横幅、腕带、证件、导向牌与贴纸——同一套湖畔花园语汇在不同媒介和尺度上的完整展开。",
          layout: "wide",
        },
        { heading: "平面物料系统", note: "舞台背景、导视与打卡装置——把主 KV 的识别基因放到具体物料尺度里检验统一性。" },
        {
          src: "../assets/lakeside-soundwave/stage-backdrop-artwork.png",
          alt: "湖畔音浪挑战赛舞台背景平面稿",
          label: "Stage",
          title: "舞台背景平面稿",
          copy: "以湖面、花船、音乐角和园区建筑组织主画面，信息层级适配舞台大屏的观看距离与现场灯光环境。",
          layout: "wide",
        },
        {
          src: "../assets/lakeside-soundwave/wayfinding-system-artwork.png",
          alt: "湖畔音浪挑战赛导视系统平面稿",
          label: "Wayfinding",
          title: "导视系统",
          copy: "入口方向牌、舞台箭头、签到指示、道旗和地贴形成完整的园区动线语言——信息清楚、视觉统一。",
          layout: "feature",
        },
        {
          src: "../assets/lakeside-soundwave/checkin-installation-artwork.png",
          alt: "湖畔音浪挑战赛打卡装置平面稿",
          label: "Photo zone",
          title: "打卡装置",
          copy: "花船、音浪拱门和音乐角组成拍照节点，让活动传播从现场体验自然延伸到社交平台。",
          layout: "feature",
        },
        { heading: "空间场景落地", note: "平面回到现场——看视觉系统在湖畔、入口、舞台和园区动线中如何成立。" },
        {
          src: "../assets/lakeside-soundwave/entrance-arch-render.png",
          alt: "湖畔音浪挑战赛入口拱门环境效果图",
          label: "Arrival",
          title: "入口拱门",
          copy: "入园第一视觉节点——大标题与蓝色音浪桥建立活动抵达感，同时也是游客的第一张拍照背景。",
          layout: "wide",
        },
        {
          src: "../assets/lakeside-soundwave/lakeside-stage-render.png",
          alt: "湖畔音浪挑战赛湖畔舞台环境效果图",
          label: "Main stage",
          title: "湖畔舞台",
          copy: "舞台背景融入湖畔草地与观众席，花卉装饰和湖面远景让演出氛围轻松自然。",
          layout: "feature",
        },
        {
          src: "../assets/lakeside-soundwave/flower-boat-checkin-render.png",
          alt: "湖畔音浪挑战赛花船打卡点环境效果图",
          label: "Photo spot",
          title: "花船打卡点",
          copy: "花卉、吉他、帐篷与湖面背景组合成花园里的音乐角落，是园区内传播率最高的拍照装置。",
          layout: "feature",
        },
        {
          src: "../assets/lakeside-soundwave/park-wayfinding-render.png",
          alt: "湖畔音浪挑战赛园区导视环境效果图",
          label: "Park flow",
          title: "园区导视",
          copy: "道旗、方向牌和地贴把导视系统延伸到园区各条路径，让观众在活动区域内自然流动。",
          layout: "wide",
        },
      ],
    },
    "03": {
      title: "成都中医药大学70周年\u201c太极杯\u201dIP形象设计",
      summary: "成都中医药大学建校70周年\u201c太极杯\u201d文创设计大赛视觉设计类参赛作品，以\u201c七秩岐黄·本草流芳\u201d为主题进行IP形象设计，获优秀创意奖。",
      description:
        "围绕成都中医药大学建校70周年与中医药文化当代表达进行IP形象设计。以\u201c岐黄\u201d文化为内核，提取姜根、叶片与草药等视觉符号，融合现代卡通造型语言，设计出兼具传统韵味与亲和力的吉祥物IP形象。项目采用原创设定与AI辅助视觉设计相结合的方式完成角色呈现及后续应用探索。该作品获大赛优秀创意奖，并作为唯二非成都中医药大学参赛主体的获奖作品之一。",
      facts: [
        { label: "项目", value: "成都中医药大学70周年\u201c太极杯\u201dIP形象设计" },
        { label: "主题", value: "七秩岐黄 · 本草流芳" },
        { label: "类型", value: "IP形象设计 / 文创设计大赛参赛作品" },
        { label: "创作方式", value: "原创设定 / AI辅助视觉设计" },
        { label: "荣誉", value: "优秀创意奖（唯二非本校参赛主体获奖作品）" },
      ],
      showcase: [
        { heading: "封面与设计概述", note: "以'七秩岐黄·本草流芳'为主题，融合传承、创新、济世、卓越四大理念。以下为全套设计稿原件方案。" },
        {
          src: "../assets/taiji-cup-ip/page-01.png",
          alt: "太极杯IP设计封面——七秩岐黄·本草流芳",
          label: "Cover",
          title: "封面主视觉",
          copy: "以'七秩岐黄·本草流芳'为主题标题，姜根、叶片和传统纹样构成项目封面。",
          layout: "hero",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-02.png",
          alt: "太极杯IP设计主题阐述",
          label: "Concept",
          title: "设计主题阐述",
          copy: "围绕传承、创新、济世、卓越四大理念展开设计主题说明。",
          layout: "wide",
          fit: "contain",
        },
        { heading: "IP角色设定", note: "以中医药文化符号为原型，设计吉祥物IP形象的三视图、色彩方案和表情动作系统。" },
        {
          src: "../assets/taiji-cup-ip/page-03.png",
          alt: "太极杯IP卡通吉祥物设计主视图",
          label: "Mascot",
          title: "卡通吉祥物设计",
          copy: "以中医药文化元素为原型的吉祥物主形象，融合姜根、叶片等中医药符号。",
          layout: "hero",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-04.png",
          alt: "太极杯IP吉祥物设计稿",
          label: "Design",
          title: "吉祥物设计稿",
          copy: "吉祥物形象的正面、侧面和背面三视图，完整呈现角色造型结构。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-05.png",
          alt: "太极杯IP吉祥物多角度展示",
          label: "Views",
          title: "多角度视图",
          copy: "吉祥物正面、侧面和背面视图，完整展示IP角色的立体造型。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-06.png",
          alt: "太极杯IP设计元素拆解",
          label: "Elements",
          title: "设计元素拆解",
          copy: "从中医药文化中提取的核心视觉元素——草药、叶片、传统纹样的设计演化过程。",
          layout: "wide",
          fit: "contain",
        },
        { heading: "表情与动作延展", note: "为IP角色设计丰富的表情变化与肢体动作，覆盖多场景应用需求。" },
        {
          src: "../assets/taiji-cup-ip/page-07.png",
          alt: "太极杯IP角色表情设计",
          label: "Expressions",
          title: "角色表情设计",
          copy: "多种情绪状态下的面部表情变化，赋予IP角色更丰富的情感表达。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-08.png",
          alt: "太极杯IP角色动作设计",
          label: "Actions",
          title: "角色动作延展",
          copy: "涵盖阅读、冥想、玩耍等多种姿态，拓展IP在不同场景中的应用可能。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-09.png",
          alt: "太极杯IP角色姿态设计",
          label: "Poses",
          title: "多姿态展示",
          copy: "加油、敬礼、冥想、阅读等多种生动动作，丰富IP角色的表现力。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-10.png",
          alt: "太极杯IP角色动作延展设计",
          label: "Actions",
          title: "动作延展设计",
          copy: "更多场景化的角色动作设计，展示IP在不同传播载体中的适配性。",
          layout: "wide",
          fit: "contain",
        },
        { heading: "色彩方案与立体呈现", note: "为IP角色开发多种配色方案，并以立体模型展示不同材质的呈现效果。" },
        {
          src: "../assets/taiji-cup-ip/page-11.png",
          alt: "太极杯IP色彩方案一",
          label: "Color",
          title: "色彩方案一",
          copy: "以米色、绿色和棕色为主调的色彩方案，传递中医药文化的自然与温润气质。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-12.png",
          alt: "太极杯IP色彩方案二",
          label: "Color",
          title: "色彩方案二",
          copy: "第二套色彩方案，探索IP角色在不同视觉系统中的适配。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-13.png",
          alt: "太极杯IP色彩方案三",
          label: "Color",
          title: "色彩方案三",
          copy: "第三套色彩方案，以金色、白色和绿色探索不同氛围。",
          layout: "wide",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-14.png",
          alt: "太极杯IP立体模型展示",
          label: "3D",
          title: "立体模型展示一",
          copy: "IP角色的立体化呈现，展示从平面到三维的视觉转化效果。",
          layout: "hero",
          fit: "contain",
        },
        {
          src: "../assets/taiji-cup-ip/page-15.png",
          alt: "太极杯IP立体模型三色方案",
          label: "3D",
          title: "立体模型三色方案",
          copy: "金色、白色和绿色三款立体模型，置于相应底座上呈现完整IP产品化方案。",
          layout: "hero",
          fit: "contain",
        },
      ],
    },
  },
  product: {
    "01": {
      title: "清远农业银行画册设计",
      summary: "以清远农业银行的绿色品牌语言为核心，将机构简介、业务数据、助农实践与公益责任组织为一套清晰完整的企业画册。",
      description:
        "项目围绕银行画册的阅读节奏与信息层级展开：封面以总部建筑和绿色曲线建立识别，内页通过章节编号、数据图形、业务图片和大面积留白维持专业而轻盈的阅读体验。案例使用多种真实印刷视角呈现薄册封面、目录及全部核心跨页，集中展示版式系统在成册状态下的视觉表现。",
      facts: [
        { label: "项目", value: "清远农业银行画册设计" },
        { label: "类型", value: "企业画册 / 银行内容物料" },
        { label: "内容", value: "封面、目录、机构简介、业务与责任章节" },
        { label: "呈现", value: "A4 对折薄册与多视角印刷样机" },
      ],
      showcase: [
        { heading: "封面与成册形态", note: "以总部建筑、银行绿色和流动曲线构成封面识别，并通过薄册样机呈现实际印刷比例。" },
        {
          src: "../assets/qingyuan-bank-brochure/01-cover-hero.png",
          alt: "清远农业银行画册薄册封面主视觉样机",
          label: "Cover",
          title: "封面主视觉",
          copy: "A4 竖版薄册采用克制的纸张厚度和暖灰摄影环境，突出建筑形象、品牌绿与标题层级。",
          layout: "hero",
        },
        {
          src: "../assets/qingyuan-bank-brochure/07-cover-back-composition.png",
          alt: "清远农业银行画册封面封底组合样机",
          label: "Cover system",
          title: "封面与封底",
          copy: "正反封面并置展示视觉延续关系，以及二维码、品牌标识和留白在成品中的实际位置。",
          layout: "wide",
        },
        { heading: "内容结构与品牌叙事", note: "不同机位的跨页样机呈现目录、机构发展、业务服务、助农创新与公益责任等完整内容层次。" },
        {
          src: "../assets/qingyuan-bank-brochure/02-contents-spread.png",
          alt: "清远农业银行画册目录跨页样机",
          label: "Contents",
          title: "目录跨页",
          copy: "家庭场景与深绿色目录页形成情绪和信息的对照，为后续章节建立清晰入口。",
          layout: "feature",
        },
        {
          src: "../assets/qingyuan-bank-brochure/03-introduction-spread.png",
          alt: "清远农业银行画册机构简介跨页样机",
          label: "Introduction",
          title: "机构简介",
          copy: "发展文字、增长数据和清远地域景观共同构成机构叙事的首个核心跨页。",
          layout: "feature",
        },
        {
          src: "../assets/qingyuan-bank-brochure/04-service-farming-spread.png",
          alt: "清远农业银行画册服务架构与助农跨页样机",
          label: "Service",
          title: "服务架构与助农实践",
          copy: "以图标、关键数字、业务文字和现场图片组织高密度信息，同时保持明确的阅读路径。",
          layout: "wide",
        },
        {
          src: "../assets/qingyuan-bank-brochure/05-small-business-innovation-spread.png",
          alt: "清远农业银行画册支小与创新跨页样机",
          label: "Innovation",
          title: "支小与创新",
          copy: "章节数字、统计信息和轻快人物视觉共同表现银行面向小微企业与创新业务的服务能力。",
          layout: "feature",
        },
        {
          src: "../assets/qingyuan-bank-brochure/06-public-welfare-conclusion-spread.png",
          alt: "清远农业银行画册公益与结语跨页样机",
          label: "Responsibility",
          title: "公益责任与结语",
          copy: "公益行动、团队会议和结语内容完成画册叙事收束，强化品牌的责任感与可信度。",
          layout: "feature",
        },
      ],
    },
    "02": {
      title: "极客车网画册设计",
      summary: "以品牌红、汽车黑与清晰的信息图表组织企业介绍、数字化服务、全球业务及海外团队，形成一套具有汽车科技气质的国际画册。",
      description:
        "项目围绕极客车网与 X-MOTORS 的国际汽车服务业务展开，通过中英双语信息、品牌红色系统、汽车影像、业务流程图和真实团队照片，梳理企业背景、核心业务、数字化仓储、全球布局、授权经销体系与人才培养。案例使用金属工作台、碳纤维、汽车展厅和技术网格等不同摄影场景呈现 A4 对折薄册，在保持真实成册比例的同时强化汽车科技行业气质。",
      facts: [
        { label: "项目", value: "极客车网画册设计" },
        { label: "品牌", value: "极客车网 / X-MOTORS" },
        { label: "类型", value: "国际汽车服务企业画册" },
        { label: "呈现", value: "A4 对折薄册 / 汽车科技多视角样机" },
      ],
      showcase: [
        { heading: "封面与品牌识别", note: "以品牌红和双标识建立国际汽车服务画册的第一印象，并通过工业金属场景突出汽车科技属性。" },
        {
          src: "../assets/jizhicar-brochure/01-cover.png",
          alt: "极客车网与X-MOTORS国际手册A4竖版封面样机",
          label: "Cover",
          title: "国际手册封面",
          copy: "正确的 A4 竖版薄册比例配合红色渐变、双品牌标识和穿孔金属工作台，形成鲜明的工业感。",
          layout: "hero",
        },
        {
          src: "../assets/jizhicar-brochure/02-contents.png",
          alt: "极客车网国际手册目录跨页样机",
          label: "Contents",
          title: "目录跨页",
          copy: "双栏中英目录以清晰数字组织业务结构，红色页面与汽车橡胶纹理背景形成材质对照。",
          layout: "wide",
        },
        {
          src: "../assets/jizhicar-brochure/03-about-us.png",
          alt: "极客车网关于我们中英双语跨页样机",
          label: "About us",
          title: "关于我们",
          copy: "中英双语企业介绍采用对称跨页结构，在拉丝金属与深色台面之间呈现专业的国际化表达。",
          layout: "feature",
        },
        {
          src: "../assets/jizhicar-brochure/04-shareholders-clients.png",
          alt: "极客车网主要股东与汽车客户跨页样机",
          label: "Network",
          title: "股东与客户体系",
          copy: "股东机构与汽车品牌客户通过两页分区集中呈现，快速建立企业资源网络与行业可信度。",
          layout: "feature",
        },
        { heading: "业务与数字能力", note: "从三项核心业务进入数字化仓储服务，以汽车影像、业务场景和数据信息展示平台能力。" },
        {
          src: "../assets/jizhicar-brochure/05-core-business.png",
          alt: "极客车网核心业务跨页样机",
          label: "Core business",
          title: "核心业务",
          copy: "全流程落地、信息化系统与数字化信息安全服务，以三组图像和图标形成清晰业务入口。",
          layout: "wide",
        },
        {
          src: "../assets/jizhicar-brochure/06-digital-warehouse.png",
          alt: "极客车网数字化仓储信息系统跨页样机",
          label: "Digital service",
          title: "数字化仓储服务",
          copy: "仓储现场、红色数据层和服务流程共同表现车主信息存储、管理及增值挖掘能力。",
          layout: "feature",
        },
        { heading: "X-MOTORS 全球业务", note: "深色汽车主视觉完成品牌转场，随后以全球地图和经销体系图展示海外业务结构。" },
        {
          src: "../assets/jizhicar-brochure/07-x-motors.png",
          alt: "X-MOTORS汽车产业链海外服务章节主视觉样机",
          label: "X-MOTORS",
          title: "章节主视觉",
          copy: "黑色汽车影像、白色品牌标识和红色定位语建立强烈的章节转场与汽车行业识别。",
          layout: "hero",
        },
        {
          src: "../assets/jizhicar-brochure/08-global-layout.png",
          alt: "X-MOTORS全球布局规划地图跨页样机",
          label: "Global layout",
          title: "全球布局",
          copy: "中亚、东南亚和欧洲市场通过地图与双语标签展开，形成直观的海外业务版图。",
          layout: "wide",
        },
        {
          src: "../assets/jizhicar-brochure/09-authorized-dealers.png",
          alt: "X-MOTORS官方授权经销体系跨页样机",
          label: "Dealer system",
          title: "授权经销体系",
          copy: "授权、采购与销售服务关系通过箭头和模块化信息图呈现，强调完整的海外服务链路。",
          layout: "feature",
        },
        { heading: "人才与海外团队", note: "由极致学院的人才培养进入真实海外团队和招聘流程，以人物与现场内容完成画册收束。" },
        {
          src: "../assets/jizhicar-brochure/10-extreme-academy.png",
          alt: "极客车网极致学院培训体系跨页样机",
          label: "Academy",
          title: "极致学院",
          copy: "培训现场、课程模块和学院空间共同展示人才培养、实战学习及组织能力建设。",
          layout: "wide",
        },
        {
          src: "../assets/jizhicar-brochure/11-overseas-team.png",
          alt: "X-MOTORS海外团队与展厅现场跨页样机",
          label: "Overseas team",
          title: "海外团队",
          copy: "不同国家和展厅场景中的团队合影，以真实人物与汽车空间强化海外业务的落地感。",
          layout: "wide",
        },
        {
          src: "../assets/jizhicar-brochure/12-recruitment-closing.png",
          alt: "极客车网团队活动与招聘流程结尾跨页样机",
          label: "Recruitment",
          title: "招聘与团队活动",
          copy: "团队活动主图与招聘流程图结合，在轻快的人物氛围中完成整套国际手册结尾。",
          layout: "feature",
        },
      ],
    },
  },
  display: {
    "01": {
      title: "2025 成都世运会\n射箭场馆氛围营造",
      summary: "以赛事蓝色视觉体系贯穿射箭场馆入口、比赛空间、服务节点与观众互动装置，形成完整统一的现场氛围。",
      description:
        "项目围绕成都世运会射箭场馆的空间动线展开，从入口主题形象、建筑外立面和赛场围挡，到观众服务、媒体咨询、特许商品与互动拍照节点，建立连续而清晰的赛事体验。页面集中呈现经过筛选的项目成果图，展示视觉系统在不同空间尺度与功能场景中的落地效果。",
      facts: [
        { label: "项目", value: "2025 成都世运会射箭场馆氛围营造设计" },
        { label: "地点", value: "成都 · 青龙湖射箭场馆" },
        { label: "内容", value: "场馆氛围、建筑包装、服务节点、互动装置" },
        { label: "呈现", value: "项目成果图与现场视觉整理" },
      ],
      showcase: [
        { heading: "场馆形象与空间总览", note: "入口主题画面、赛场纵深与建筑包装共同建立项目的整体尺度和赛事识别。" },
        {
          src: "../assets/world-games-archery/entrance-theme-wall.png",
          alt: "成都世运会射箭场馆入口主题背景墙",
          label: "Entrance identity",
          title: "入口主题背景墙",
          copy: "以赛事蓝色为主基调，将项目图形、射箭符号与合作伙伴信息集中于场馆第一视觉触点。",
          layout: "hero",
        },
        {
          src: "../assets/world-games-archery/archery-field-overview.png",
          alt: "成都世运会射箭比赛场地全景",
          label: "Venue overview",
          title: "射箭赛场全景",
          copy: "蓝色围挡、观众看台、比赛草坪和功能建筑沿场地轴线展开，形成清晰统一的比赛空间。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-archery/venue-main-entrance.png",
          alt: "青龙湖射箭场馆主入口赛事标识",
          label: "Main entrance",
          title: "场馆主入口",
          copy: "在既有建筑入口上嵌入赛事信息，以克制的尺度衔接场馆建筑语言与赛事视觉。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-archery/venue-facade-overview.png",
          alt: "成都世运会射箭场馆建筑外立面整体包装",
          label: "Facade system",
          title: "建筑外立面系统",
          copy: "连续的蓝色檐口视觉带连接模块化建筑，形成从入口延伸至功能区的统一识别。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-archery/venue-facade-detail.png",
          alt: "成都世运会射箭场馆建筑外立面细节",
          label: "Facade detail",
          title: "建筑包装细节",
          copy: "赛事口号、合作伙伴信息和功能标识在建筑转角与入口节点形成清晰的信息层级。",
          layout: "wide",
        },
        { heading: "功能服务节点", note: "不同功能空间沿用统一色彩和图形语汇，并根据服务场景调整信息密度与观看距离。" },
        {
          src: "../assets/world-games-archery/spectator-information-desk.png",
          alt: "成都世运会射箭场馆观众服务信息台",
          label: "Spectator service",
          title: "观众服务信息台",
          copy: "帐篷檐口、背景画面与服务柜台形成完整的信息服务节点，兼顾远距离识别和近距离咨询。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-archery/event-service-desk.png",
          alt: "成都世运会射箭场馆赛事服务台",
          label: "Event service",
          title: "赛事服务台",
          copy: "渐变色柜台与几何背景构成紧凑的室内服务空间，延续场馆整体视觉语言。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-archery/licensed-product-stall.png",
          alt: "成都世运会射箭场馆特许商品服务点",
          label: "Licensed products",
          title: "特许商品服务点",
          copy: "熊猫意象被转化为几何背景结构，与渐变柜台共同形成具有成都识别度的服务场景。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-archery/media-help-desk.png",
          alt: "成都世运会射箭场馆媒体咨询台",
          label: "Media service",
          title: "媒体咨询台",
          copy: "红、白、蓝弧形图形在室内墙面与柜台之间形成前后层次，强化媒体服务区的空间识别。",
          layout: "wide",
        },
        { heading: "观众互动与赛事传播", note: "互动装置和合作伙伴背景墙共同拓展观众停留、拍摄与赛事传播场景。" },
        {
          src: "../assets/world-games-archery/audience-photo-installation.png",
          alt: "成都世运会射箭场馆观众互动拍照装置",
          label: "Photo installation",
          title: "城市地标互动装置",
          copy: "以成都城市建筑、山水轮廓和坐凳组合成可停留、可拍摄的赛事互动节点。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-archery/partner-background-wall.png",
          alt: "成都世运会射箭场馆合作伙伴背景墙",
          label: "Partner wall",
          title: "合作伙伴背景墙",
          copy: "通过稳定的网格与信息分级集中呈现赛事合作伙伴体系，并保持与场馆主视觉一致。",
          layout: "wide",
        },
      ],
    },
    "02": {
      title: "2025 成都世运会\n龙泉驿赛区氛围营造",
      summary: "围绕成都世运会龙泉驿赛区公共空间，将赛事项目、城市文化与区域识别转化为玻璃围栏视觉、体育主题装置和城市打卡节点。",
      description:
        "项目以龙泉驿赛区的公共空间为载体，将世运会赛事识别、体育项目图形、城市地标和“运动无限 气象万千”主题语汇融入现场氛围。页面先呈现真实落地的赛事主题装置与城市文化打卡节点，再展示基于现场照片完成的玻璃围栏视觉效果预演，形成从空间设想到落地成果的完整观看路径。",
      facts: [
        { label: "项目", value: "2025 成都世运会龙泉驿赛区氛围营造设计" },
        { label: "地点", value: "成都 · 龙泉驿赛区" },
        { label: "内容", value: "公共空间视觉、赛事主题装置、城市打卡装置" },
        { label: "呈现", value: "现场落地 + 基于现场照片的效果预演" },
      ],
      showcase: [
        { heading: "落地总览", note: "真实装置先建立项目尺度：区域名称、世运会识别、城市地标与吉祥物共同构成龙泉驿赛区的第一视觉触点。" },
        {
          src: "../assets/world-games-longquanyi/landmark-longquanyi.jpg",
          alt: "2025 成都世运会龙泉驿城市主题装置现场落地",
          label: "Site installation",
          title: "龙泉驿城市主题装置",
          copy: "以 LONGQUANYI 字样、城市建筑剪影和赛事吉祥物形成可停留、可拍摄的赛区识别节点。",
          layout: "hero",
        },
        { heading: "赛事主题装置", note: "以各比赛项目的动作符号为核心，统一渐变色彩、赛事口号、双语名称与吉祥物，形成分布于不同节点的装置系列。" },
        {
          src: "../assets/world-games-longquanyi/installation-korfball.jpg",
          alt: "2025 成都世运会荷球主题装置现场落地",
          label: "Site installation",
          title: "荷球主题装置",
          copy: "现场人物提供真实尺度参照，项目图形、双语名称和赛事吉祥物共同强化荷球项目识别。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/installation-tug-of-war.jpg",
          alt: "2025 成都世运会拔河主题装置现场落地",
          label: "Site installation",
          title: "拔河主题装置",
          copy: "对抗动作被概括为具有张力的线性图形，与蓝紫渐变底形成清晰的远距离识别。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/installation-drone.jpg",
          alt: "2025 成都世运会无人机主题装置现场落地",
          label: "Site installation",
          title: "无人机主题装置",
          copy: "透明亚克力轮廓与飞行器图形叠合，在绿地背景中保持轻盈而具有科技感。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/installation-archery.jpg",
          alt: "2025 成都世运会射箭主题装置现场落地",
          label: "Site installation",
          title: "射箭主题装置",
          copy: "运动员剪影与靶心共同构成直接的项目符号，适合在开阔场地形成清楚的视觉锚点。",
          layout: "feature",
        },
        { heading: "城市文化打卡节点", note: "赛事项目与龙泉驿城市符号进一步结合，让氛围装置同时承担赛区识别、文化展示与公众打卡功能。" },
        {
          src: "../assets/world-games-longquanyi/landmark-korfball.jpg",
          alt: "2025 成都世运会荷球城市文化装置现场落地",
          label: "Site installation",
          title: "荷球城市文化装置",
          copy: "LQY 字母、体育动作和城市天际线组合成具有地域识别的荷球主题打卡点。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/landmark-xingfu-longquanyi.jpg",
          alt: "2025 成都世运会幸福活力龙泉驿城市装置现场落地",
          label: "Site installation",
          title: "幸福活力龙泉驿装置",
          copy: "中文主题字、体操动作与多彩图形共同构成更具城市宣传属性的赛事景观节点。",
          layout: "feature",
        },
        { heading: "公共空间视觉预演", note: "以下画面均为基于现场照片制作的效果预演，用于验证玻璃围栏在不同距离、转角和环境背景中的视觉节奏。" },
        {
          src: "../assets/world-games-longquanyi/railing-champions.png",
          alt: "成都世运会龙泉驿赛区冠军人物玻璃围栏视觉效果图",
          label: "Visual preview",
          title: "冠军人物主题围栏",
          copy: "利用连续玻璃界面串联人物信息、赛事标识和渐变色带，让行进过程形成完整叙事。",
          layout: "hero",
        },
        {
          src: "../assets/world-games-longquanyi/railing-tech-robot.jpg",
          alt: "成都世运会龙泉驿赛区机器人区域玻璃围栏视觉效果图",
          label: "Visual preview",
          title: "科技装置区域",
          copy: "电路纹样与新能源汽车发展信息回应现场机器人装置和龙泉驿汽车产业语境。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/railing-auto-history.jpg",
          alt: "成都世运会龙泉驿赛区汽车工业发展史玻璃围栏视觉效果图",
          label: "Visual preview",
          title: "汽车工业发展史",
          copy: "沿湖玻璃界面被转化为线性时间轴，把车型演进和区域产业记忆嵌入步行路径。",
          layout: "feature",
        },
        {
          src: "../assets/world-games-longquanyi/railing-sports-icons.jpg",
          alt: "成都世运会龙泉驿赛区体育项目玻璃围栏视觉效果图",
          label: "Visual preview",
          title: "体育项目图形长廊",
          copy: "无人机等项目图形以连续单元分布在长距离栏杆上，建立统一而轻量的赛事识别。",
          layout: "wide",
        },
        {
          src: "../assets/world-games-longquanyi/railing-immersive-corridor.jpg",
          alt: "成都世运会龙泉驿赛区环形玻璃围栏视觉效果图",
          label: "Visual preview",
          title: "环形步道视觉系统",
          copy: "转角两侧以赛事口号、冠军人物与运动项目形成对景，让空间本身成为连续的观看动线。",
          layout: "wide",
        },
      ],
    },
    "03": {
      title: "2025 泸州医药健康产业专题对接活动",
      summary: "以大会蓝色视觉体系贯穿园区导入、会场空间、导视系统、舞台呈现与会议物料，形成完整统一的医药健康产业对接活动体验。",
      description:
        "项目服务于2025中国产业转移发展对接活动（四川）医药健康产业专题对接活动。从园区道路与酒店入口开始，视觉系统依次进入签到、主题装置、走廊导视和主会场，并延展至证件、会议手册、议程单、司仪台、话筒套及席位标识等高频接触物料。页面以经过筛选和整理的项目成果图，呈现蓝色大会识别在空间与细节中的连续落地。",
      facts: [
        { label: "项目", value: "2025 泸州医药健康产业专题对接活动" },
        { label: "地点", value: "泸州 · 会议酒店及产业园区" },
        { label: "内容", value: "空间氛围、会场舞台、导视系统、会议物料" },
        { label: "呈现", value: "完整项目成果图整理" },
      ],
      showcase: [
        { heading: "到达与空间识别", note: "从园区道路、酒店入口到签到区域，以连续的蓝色识别建立参会者的到达路径和大会第一印象。" },
        {
          src: "../assets/luzhou-health-conference/01-park-flags.png",
          alt: "泸州医药健康产业专题对接活动园区道路道旗",
          label: "Arrival system",
          title: "园区道路导入",
          copy: "连续道旗沿园区道路形成到达序列，在建筑、绿地和车行动线之间建立清晰的大会识别。",
          layout: "hero",
        },
        {
          src: "../assets/luzhou-health-conference/02-entrance-backdrop.png",
          alt: "泸州医药健康产业专题对接活动入口主背景",
          label: "Entrance identity",
          title: "入口活动主背景",
          copy: "大面积蓝色主题画面嵌入酒店玻璃入口，集中呈现活动名称并强化第一视觉触点。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/03-registration-area.png",
          alt: "泸州医药健康产业专题对接活动签到区域",
          label: "Registration",
          title: "签到区域",
          copy: "主题背景与签到台以统一渐变色连接，在保持信息清晰的同时形成完整的接待节点。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/04-health-installation.png",
          alt: "泸州医药健康产业专题对接活动医药健康主题装置",
          label: "Theme installation",
          title: "医药健康主题装置",
          copy: "DNA双螺旋、医药健康文字与立体几何结构共同构成具有行业属性的空间记忆点。",
          layout: "wide",
        },
        { heading: "会场与导视系统", note: "主舞台承担大会核心传播，走廊和大堂导视则把同一套视觉语言延伸至会场外围与转向节点。" },
        {
          src: "../assets/luzhou-health-conference/05-main-stage.png",
          alt: "泸州医药健康产业专题对接活动主会场全景",
          label: "Main venue",
          title: "主会场全景",
          copy: "超宽LED主屏、蓝色舞台前沿与整齐席位共同构成大会核心场景，突出活动名称和整体规模。",
          layout: "hero",
        },
        {
          src: "../assets/luzhou-health-conference/06-lobby-wayfinding.png",
          alt: "泸州医药健康产业专题对接活动大堂单体导视",
          label: "Wayfinding",
          title: "大堂单体导视",
          copy: "立式电子导视在石材大堂中保持高对比度，明确标注主会场方向与楼层信息。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/07-dual-wayfinding.png",
          alt: "泸州医药健康产业专题对接活动双向导视",
          label: "Wayfinding junction",
          title: "会场双向导视",
          copy: "双向导视组合对应不同空间入口，在复杂酒店动线中建立快速、直观的方向判断。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/08-corridor-branding.png",
          alt: "泸州医药健康产业专题对接活动会场长廊氛围",
          label: "Corridor branding",
          title: "会场长廊氛围",
          copy: "连续品牌画面沿木饰面与落地窗之间展开，将参会动线转化为具有节奏的视觉长廊。",
          layout: "wide",
        },
        {
          src: "../assets/luzhou-health-conference/09-stage-closeup.png",
          alt: "泸州医药健康产业专题对接活动主舞台近景",
          label: "Stage detail",
          title: "主舞台近景",
          copy: "舞台近景集中呈现LED主题画面、透明司仪台和前沿口号，强化核心信息与制作细节。",
          layout: "wide",
        },
        {
          src: "../assets/luzhou-health-conference/15-directional-totem.png",
          alt: "泸州医药健康产业专题对接活动区域立屏导视",
          label: "Directional totem",
          title: "区域立屏导视",
          copy: "轻量化落地立屏补充临时转向节点，以清楚箭头和稳定结构回应实际会务需求。",
          layout: "wide",
        },
        {
          src: "../assets/luzhou-health-conference/16-signing-stage.png",
          alt: "泸州医药健康产业专题对接活动签约环节舞台",
          label: "Signing session",
          title: "签约环节舞台",
          copy: "八组签约台与LED信息分区共同形成签约环节的秩序感，并延续主会场整体视觉。",
          layout: "hero",
        },
        { heading: "会议物料与触点", note: "证件、手册、议程、司仪台、话筒套和席位标识共同完成从宏观空间到手持物料的统一识别。" },
        {
          src: "../assets/luzhou-health-conference/10-badges-and-handbooks.png",
          alt: "泸州医药健康产业专题对接活动证件与会议手册",
          label: "Credentials",
          title: "证件与会议手册",
          copy: "蓝、红证件区分工作人员与嘉宾，会议手册延续同一渐变系统和信息层级。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/11-agenda.png",
          alt: "泸州医药健康产业专题对接活动会议议程单",
          label: "Agenda",
          title: "会议议程单",
          copy: "折页封面突出议程功能，内页以浅蓝底色组织主持人与活动流程信息。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/12-lectern-detail.png",
          alt: "泸州医药健康产业专题对接活动司仪台",
          label: "Lectern",
          title: "司仪台细节",
          copy: "蓝色渐变包覆与双话筒结构把舞台视觉落到主持人发言的核心使用节点。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/13-microphone-detail.png",
          alt: "泸州医药健康产业专题对接活动话筒套",
          label: "Microphone flag",
          title: "话筒套细节",
          copy: "按照实际折叠方向设置的立方体话筒套，让活动识别在发言与媒体拍摄中保持正确朝向。",
          layout: "feature",
        },
        {
          src: "../assets/luzhou-health-conference/14-seating-signage.png",
          alt: "泸州医药健康产业专题对接活动桌牌与椅背贴",
          label: "Seating system",
          title: "桌牌与椅背贴",
          copy: "桌牌、媒体席和排号标识采用统一蓝色系统，在大规模席位中保持快速识别。",
          layout: "wide",
        },
      ],
    },
    "04": {
      title: "爱宠计划｜萌宠运动会视觉设计",
      summary: "以高识别度的荧光绿、亮黄与宠物插画建立活动传播形象，并从公众号内容延展到户外商业街草坪活动现场。",
      description:
        "项目从微信公众号活动预告与规则长图出发，以粗黑标题、爪印符号、宠物插画和不规则白框建立轻松直接的视觉语言；在线下部分继续完成入口门头、签到墙、舞台背景、导视系统、宠物号码牌与互动打卡装置，使线上传播与现场体验保持统一。",
      presentation: "portfolio",
      facts: [
        { label: "项目类型", value: "萌宠主题活动整合视觉" },
        { label: "场景", value: "微信公众号传播 / 户外商业街花谷草坪" },
        { label: "设计范围", value: "主视觉、长图、空间物料、导视与互动装置" },
        { label: "视觉关键词", value: "荧光绿、亮黄、粗黑字体、爪印与宠物插画" },
      ],
      showcase: [
        {
          src: "../assets/pet-sports-wechat/extensions/08-online-visual-overview.png",
          alt: "爱宠计划线上视觉系统总览",
          label: "Campaign overview",
          title: "线上视觉系统总览",
          copy: "横幅与两组公众号长图保持同一信息层级，让活动主题、日期、场地和参与板块形成清晰的传播入口。",
          layout: "hero",
        },
        {
          heading: "线上传播",
          note: "以公众号阅读节奏组织活动信息，让高饱和主视觉在手机端仍保持快速识别。",
        },
        {
          src: "../assets/pet-sports-wechat/01-campaign-banner.jpg",
          alt: "爱宠计划活动横幅设计",
          label: "Campaign banner",
          title: "活动横幅",
          copy: "用荧光绿与亮黄建立第一视觉冲击，并集中呈现活动日期、地点和四个核心板块。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/07-single-phone-wechat.png",
          alt: "爱宠计划微信公众号长图手机展示",
          label: "Mobile experience",
          title: "公众号阅读场景",
          copy: "长图内容被完整约束在手机屏幕中，呈现实际传播载体中的阅读比例与视觉效果。",
          layout: "feature",
        },
        {
          src: "../assets/pet-sports-wechat/02-wechat-long-part1.jpg",
          alt: "爱宠计划公众号长图开篇与爱宠大舞台",
          label: "WeChat long image 01",
          title: "活动开篇与爱宠大舞台",
          copy: "从活动总览进入首个互动板块，以宠物群像、规则信息和现场照片串联连续阅读节奏。",
          layout: "feature",
        },
        {
          src: "../assets/pet-sports-wechat/03-wechat-long-part4-5.jpg",
          alt: "爱宠计划公众号长图爱心领养与爱宠试吃",
          label: "WeChat long image 02",
          title: "爱心领养与爱宠试吃",
          copy: "用统一标题组件与不规则白框组织公益领养和宠物试吃内容，兼顾信息密度与板块区分。",
          layout: "feature",
        },
        {
          heading: "线下体验延展",
          note: "将线上图形语言转译为真实可搭建的空间结构，统一户外商业街与花谷草坪中的活动触点。",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/01-entrance-arch.png",
          alt: "爱宠计划户外活动入口门头",
          label: "Entrance arch",
          title: "入口门头",
          copy: "以大尺度标题、爪印和宠物群像形成第一到场印象，同时保留清晰、宽敞的入场动线。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/02-checkin-wall.png",
          alt: "爱宠计划活动签到墙",
          label: "Check-in wall",
          title: "签到与合影背景",
          copy: "中央留出完整签名与合影区域，两侧以插画角色和信息模块保持活动识别。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/03-pet-stage.png",
          alt: "爱宠计划活动主舞台背景",
          label: "Main stage",
          title: "主舞台背景",
          copy: "主标题成为舞台视觉中心，落地宠物立牌、爪印和花境共同形成可拍摄的现场层次。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/04-wayfinding-system.png",
          alt: "爱宠计划活动导视系统",
          label: "Wayfinding",
          title: "场地导视系统",
          copy: "总导览与方向箭头覆盖主舞台、签到、领养、互动和试吃区域，建立连续的现场导航语言。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/05-pet-number-tags.png",
          alt: "爱宠计划宠物参赛号码牌",
          label: "Pet number tags",
          title: "宠物号码牌",
          copy: "不同轮廓的号码牌延续爪印和宠物插画，并通过安全的颈带与胸背带适配参赛宠物。",
          layout: "wide",
        },
        {
          src: "../assets/pet-sports-wechat/extensions/06-photo-installation.png",
          alt: "爱宠计划宠物互动打卡装置",
          label: "Photo installation",
          title: "互动打卡装置",
          copy: "放大的不规则相框与落地插画围合出主人和宠物共同参与的拍照空间，成为活动传播的现场节点。",
          layout: "hero",
        },
      ],
    },
    "05": {
      title: "假日唤醒计划视觉设计",
      summary: "以橙、黄、黑高对比色与城市市集插画建立五一活动视觉，从公众号长图和社交平台轮播延展到线下导视与活动物料。",
      description:
        "项目以“假日唤醒”为核心概念，将躺平发呆、快速回血、持续唤醒等活动章节组织成连续的假日内容体验。视觉采用超粗黑体、橙色强调条、纸张肌理和花朵、太阳、云朵与城市市集插画，在公众号、小红书式图文传播和多设备展示中保持鲜明识别，并进一步延展至商业街灯箱、现场签到导视和桌面福利物料。",
      presentation: "portfolio",
      facts: [
        { label: "项目类型", value: "五一主题活动整合视觉" },
        { label: "传播场景", value: "公众号长图 / 社交平台轮播 / 多设备展示" },
        { label: "延展场景", value: "商业街灯箱、活动导视、福利物料" },
        { label: "视觉关键词", value: "橙黄黑、粗黑标题、纸张拼贴、城市市集插画" },
      ],
      showcase: [
        {
          src: "../assets/holiday-awakening/01-wechat-horizontal-cover.png",
          alt: "假日唤醒计划公众号横版主视觉",
          label: "Campaign key visual",
          title: "公众号横版主视觉",
          copy: "将原有竖版视觉转译为横向传播入口，以超粗标题和城市市集插画建立明确的五一活动识别。",
          layout: "hero",
        },
        {
          heading: "线上传播系统",
          note: "围绕手机端阅读与滑动浏览组织信息，让活动章节、现场照片和福利内容在不同线上载体中保持统一节奏。",
        },
        {
          src: "../assets/holiday-awakening/02-social-carousel-real-designs.png",
          alt: "假日唤醒计划社交平台图文轮播实际设计展示",
          label: "Social carousel",
          title: "图文轮播实际设计",
          copy: "手机主封面与四张实际活动页面并置，完整呈现 Part 1、Part 2、Part 3 和收官页的连续传播结构。",
          layout: "wide",
        },
        {
          src: "../assets/holiday-awakening/03-wechat-long-scroll.png",
          alt: "假日唤醒计划公众号长图连续阅读展示",
          label: "WeChat long scroll",
          title: "公众号长图阅读场景",
          copy: "以手机首屏和向下展开的长卷同时表现文章入口与完整内容，让长图的阅读节奏一目了然。",
          layout: "wide",
        },
        {
          src: "../assets/holiday-awakening/04-mobile-campaign-system.png",
          alt: "假日唤醒计划手机多屏传播组合",
          label: "Mobile campaign",
          title: "手机多屏传播组合",
          copy: "主视觉、躺平发呆、快速回血与持续唤醒分布在不同屏幕中，形成清晰的活动章节系统。",
          layout: "feature",
        },
        {
          src: "../assets/holiday-awakening/05-digital-campaign-overview.png",
          alt: "假日唤醒计划线上传播全案总览",
          label: "Digital overview",
          title: "线上传播全案总览",
          copy: "桌面、平板、手机和内容卡片共同展示视觉系统在不同屏幕比例与阅读场景中的适配。",
          layout: "feature",
        },
        {
          heading: "线下触点延展",
          note: "把线上形成的标题、色彩与插画资产放大到商业空间和活动现场，使传播视觉继续服务到场体验。",
        },
        {
          src: "../assets/holiday-awakening/06-outdoor-lightbox.png",
          alt: "假日唤醒计划商场户外灯箱效果",
          label: "Outdoor lightbox",
          title: "商业街户外灯箱",
          copy: "高对比主标题与橙色城市市集插画在夜间商业街环境中保持强识别度和节日氛围。",
          layout: "wide",
        },
        {
          src: "../assets/holiday-awakening/07-event-wayfinding.png",
          alt: "假日唤醒计划活动签到与导视系统",
          label: "Event wayfinding",
          title: "活动签到与导视系统",
          copy: "签到台、导视塔、活动指南牌和布旗沿用同一视觉语言，建立完整的现场到达与行动指引。",
          layout: "wide",
        },
        {
          src: "../assets/holiday-awakening/08-tabletop-collateral.png",
          alt: "假日唤醒计划桌面福利物料组合",
          label: "Campaign collateral",
          title: "桌面福利物料组合",
          copy: "帆布袋、咖啡杯、票券、贴纸、徽章、折页与工作人员证件共同构成可带走的活动记忆。",
          layout: "hero",
        },
      ],
    },
  },
};

const renderFacts = (facts) => {
  if (!detailFacts || !facts?.length) return;

  detailFacts.replaceChildren();
  facts.forEach((fact) => {
    const item = document.createElement("li");
    const label = document.createElement("strong");
    label.textContent = `${fact.label}：`;
    item.append(label, fact.value);
    detailFacts.append(item);
  });
};

const renderShowcase = (items, presentation, minimalCaptions) => {
  if (!detailShowcase || !items?.length) return;

  detailGrid?.classList.add("is-rich-case-grid");
  detailShowcase.classList.add("is-rich-case");
  detailGrid?.classList.add("is-portfolio-case-grid");
  detailShowcase.classList.add("is-portfolio-case");
  detailShowcase.replaceChildren();

  const isHalfLayout = (item) => ["portrait", "portrait-slim", "square"].includes(item?.layout);

  items.forEach((item) => {
    if (item.heading) {
      const heading = document.createElement("div");
      heading.className = "case-subhead";

      const title = document.createElement("h2");
      title.textContent = item.heading;
      heading.append(title);

      if (item.note) {
        const note = document.createElement("p");
        note.textContent = item.note;
        heading.append(note);
      }

      detailShowcase.append(heading);
      return;
    }

    const figure = document.createElement("figure");
    const isWide = !isHalfLayout(item);
    const layoutClass =
      item.layout && item.layout !== "wide" && !(isWide && isHalfLayout(item))
        ? ` case-shot-${item.layout}`
        : "";
    const fitClass =
      item.fit === "logo"
        ? " case-shot-logo"
        : item.fit === "contain"
          ? " case-shot-contain"
          : "";
    const cropClass = item.cleanCrop ? " case-shot-clean-crop" : "";
    const logoSizeClass = item.smallLogo ? " case-shot-small-logo" : "";
    figure.className = `case-shot has-image${isWide ? " case-shot-wide" : ""}${layoutClass}${fitClass}${cropClass}${logoSizeClass}`;

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    if (item.position) {
      image.style.objectPosition = item.position;
    }
    figure.append(image);

    if (!item.hideCaption && !minimalCaptions) {
      const caption = document.createElement("figcaption");
      const label = document.createElement("span");
      label.textContent = item.label;
      const title = document.createElement("strong");
      title.textContent = item.title;
      const copy = document.createElement("p");
      copy.textContent = item.copy;
      caption.append(label, title, copy);
      figure.append(caption);
    }

    detailShowcase.append(figure);
  });
};

if (detailTitle) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "brand";
  const work = params.get("work") || "01";
  if (category === "brand" && work === "04") {
    window.location.replace("../prototype-monolog-home/#work");
  }
  const names = {
    brand: "企业品牌视觉",
    event: "活动视觉",
    product: "产品推广",
    display: "展陈与线上视觉",
  };
  const unifiedOrder = [
    ["event", "01"], ["display", "01"], ["display", "02"], ["brand", "01"],
    ["event", "03"], ["display", "03"], ["brand", "03"], ["product", "02"],
    ["brand", "02"], ["display", "04"], ["brand", "05"],
    ["event", "02"], ["brand", "06"], ["product", "01"], ["display", "05"],
  ];
  const project = projectData[category]?.[work];
  const unifiedIndex = unifiedOrder.findIndex(([itemCategory, itemWork]) => itemCategory === category && itemWork === work);

  if (detailCategory) {
    detailCategory.textContent = unifiedIndex >= 0 ? `SELECTED WORKS · ${String(unifiedIndex + 1).padStart(2, "0")} / 15` : "SELECTED WORKS";
  }
  detailTitle.textContent = project?.title || `${names[category] || "作品"} · 项目 ${work}`;
  if (detailSummary && project?.summary) {
    detailSummary.textContent = project.summary;
  }
  if (detailDescription && project?.description) {
    detailDescription.textContent = project.description;
  }
  renderFacts(project?.facts);
  let showcaseItems = project?.showcase;
  if (showcaseItems) {
    showcaseItems = showcaseItems.map((item) => ({ ...item }));

    if (category === "event" && work === "02") {
      showcaseItems = showcaseItems.filter((item) => item.title !== "舞台背景平面稿");
    }

    if (category === "display" && work === "02") {
      showcaseItems = showcaseItems.filter((item) => item.title !== "环形步道视觉系统");
    }

    if (category === "display" && work === "03") {
      showcaseItems = showcaseItems.map((item) =>
        item.title === "园区道路导入"
          ? {
              ...item,
              alt: "泸州医药健康产业专题对接活动酒店外部到达视觉",
              title: "酒店外部到达视觉",
              copy: "酒店外部道路与建筑界面中的连续道旗形成到达序列，建立大会在住宿与会议场景之间的第一识别。",
            }
          : item,
      );
      showcaseItems = showcaseItems.map((item) =>
        item.heading === "到达与空间识别"
          ? { ...item, note: "从酒店外部到达、酒店内部会议场景延伸至大会装置，建立连续而明确的空间识别。" }
          : item,
      );
    }

    if (category === "brand" && work === "01") {
      showcaseItems = showcaseItems.map((item) =>
        item.title === "主标志" ? { ...item, smallLogo: true } : item,
      );
    }

    if (category === "brand" && work === "03") {
      showcaseItems = showcaseItems.filter((item) => item.title !== "双款手账本");
      const notebookItems = showcaseItems.filter((item) => item.title === "手账本封面" || item.title === "手账本内页");
      showcaseItems = showcaseItems.filter((item) => item.title !== "手账本封面" && item.title !== "手账本内页");
      const giftIndex = showcaseItems.findIndex((item) => item.title === "新年礼盒套装");
      if (giftIndex >= 0) showcaseItems.splice(giftIndex + 1, 0, ...notebookItems);
    }

    if ((category === "product" && work === "02") || (category === "brand" && work === "02")) {
      showcaseItems = showcaseItems.filter((item) => !item.heading);
    }

    if (category === "event" && work === "03") {
      showcaseItems = showcaseItems
        .filter((item) => item.src !== "../assets/taiji-cup-ip/page-11.png")
        .map((item) => {
          if (item.heading === "色彩方案与立体呈现") {
            return { heading: "表情包与立体延展", note: "从表情包、玩偶到立体模型，展示IP形象在不同应用媒介中的延展。" };
          }
          if (item.src === "../assets/taiji-cup-ip/page-12.png") {
            return { ...item, alt: "太极杯IP表情包设计", label: "Stickers", title: "表情包设计", copy: "以角色表情和动作建立可用于社交传播的表情包系统。" };
          }
          if (item.src === "../assets/taiji-cup-ip/page-13.png") {
            return { ...item, alt: "太极杯IP吉祥物玩偶延展", label: "Plush extension", title: "吉祥物玩偶延展", copy: "将角色比例、色彩和材质转化为可生产的吉祥物玩偶形态。" };
          }
          if (item.src === "../assets/taiji-cup-ip/page-14.png") {
            return { ...item, title: "吉祥物立体模型", copy: "IP角色从平面设定转化为立体模型，验证造型、材质与空间关系。" };
          }
          if (item.src === "../assets/taiji-cup-ip/page-15.png") {
            return { ...item, title: "立体模型延展", copy: "围绕立体模型继续拓展不同姿态与呈现方式。" };
          }
          if (item.src === "../assets/taiji-cup-ip/page-09.png") {
            return {
              ...item,
              alt: "太极杯IP望闻问切四个动作设计",
              label: "Four diagnostics",
              title: "望闻问切四个动作",
              copy: "围绕中医四诊中的望、闻、问、切，为吉祥物分别设计观察、辨识、问询与切脉动作。",
            };
          }
          return item;
        });
      showcaseItems.push(
        { heading: "文创与传播应用", note: "将IP形象继续延展到手提袋、三伏贴产品和校庆主题海报。" },
        { src: "../assets/taiji-cup-ip/application-four-seasons-tote.png", alt: "太极杯IP四季小鹿手提袋设计", label: "Cultural product", title: "四季小鹿手提袋", copy: "以春夏秋冬四季场景建立系列化文创手提袋应用。", layout: "portrait" },
        { src: "../assets/taiji-cup-ip/application-sanfu-patch.png", alt: "太极杯IP三伏贴中医药宣传设计", label: "TCM campaign", title: "三伏贴宣传应用", copy: "将IP形象用于中医药健康产品与宣传场景。", layout: "feature" },
        { src: "../assets/taiji-cup-ip/poster-traditional-wisdom.png", alt: "成都中医药大学传统智慧与健康主题海报", label: "Poster", title: "国医养生主题海报", copy: "以IP形象连接传统养生文化与校园主题传播。", layout: "portrait" },
        { src: "../assets/taiji-cup-ip/poster-70th-anniversary.png", alt: "成都中医药大学70周年主题海报", label: "Poster", title: "七秩芳华主题海报", copy: "围绕建校70周年主题进行IP海报延展。", layout: "portrait" },
      );
    }

  }
  renderShowcase(showcaseItems, project?.presentation, false);

  /* --- 所有详情页统一返回整合后的首页作品区 --- */
  const backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.href = "../prototype-monolog-home/#work";
    backLink.textContent = "← 返回全部作品";
  }

  /* --- 上一篇 / 下一篇按首页统一顺序跨类别切换 --- */
  const detailNav = document.querySelector("[data-detail-nav]");
  if (detailNav && unifiedIndex >= 0) {
    const createNavLink = (label, targetPair, cls) => {
      if (!targetPair) return document.createElement("span");
      const [targetCategory, targetWork] = targetPair;
      const target = projectData[targetCategory][targetWork];
      const a = document.createElement("a");
      a.href = `?category=${targetCategory}&work=${targetWork}`;
      a.className = cls;
      a.innerHTML = `<span>${label}</span><strong>${target.title}</strong>`;
      return a;
    };

    const prevKey = unifiedIndex > 0 ? unifiedOrder[unifiedIndex - 1] : null;
    const nextKey = unifiedIndex < unifiedOrder.length - 1 ? unifiedOrder[unifiedIndex + 1] : null;

    if (prevKey || nextKey) {
      detailNav.append(
        createNavLink("← 上一篇", prevKey, "project-nav-prev"),
        createNavLink("下一篇 →", nextKey, "project-nav-next"),
      );
    }
  }
}
