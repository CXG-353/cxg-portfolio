const projects = {
  atlas: {
    index: "01 / PROJECT",
    year: "2026",
    title: "Atlas",
    lead: "把阅读、记录与下一步行动放进同一条信息流。",
    role: "产品 / 全栈",
    scope: "Web App",
    status: "持续迭代",
    body: "Atlas 不是另一个收藏夹，而是一套强调回收与关联的个人知识系统。项目重点处理快速录入、全文检索、双向关系和周期回顾，让信息在需要的时候重新出现。",
  },
  relay: {
    index: "02 / PROJECT",
    year: "2025",
    title: "Relay",
    lead: "为个人服务提供一条稳定、可观察、可撤回的公网路径。",
    role: "架构 / 工程",
    scope: "Infra Tool",
    status: "内部使用",
    body: "Relay 将域名、TLS、反向代理、健康检查和容器部署组织在一起。它面向小型自托管服务，目标是减少重复配置，同时保留明确的故障边界和回滚路径。",
  },
  pulse: {
    index: "03 / PROJECT",
    year: "2024",
    title: "Pulse",
    lead: "把持续变化的数据，压缩成一眼可以采取行动的状态。",
    role: "设计 / 前端",
    scope: "Dashboard",
    status: "已交付",
    body: "Pulse 聚合来自多个接口的运行指标，用层级、节奏和异常提示替代密集图表。设计重点是让使用者在几秒内确认系统是否正常，以及下一步应该检查哪里。",
  },
};

const body = document.body;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const dialog = document.querySelector("[data-project-dialog]");
const dialogClose = document.querySelector("[data-dialog-close]");
const cursorGlow = document.querySelector(".cursor-glow");
const heroImage = document.querySelector("[data-hero-image]");

const setMenuState = (open) => {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  mobileMenu.classList.toggle("is-open", open);
  body.classList.toggle("menu-open", open);
};

menuButton.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 24),
  { passive: true },
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll("[data-nav]").forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === entry.target.dataset.section);
      });
    });
  },
  { rootMargin: "-30% 0px -60%", threshold: 0 },
);

document.querySelectorAll("[data-section]").forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));

const openProject = (projectId) => {
  const project = projects[projectId];
  if (!project) return;

  Object.entries(project).forEach(([key, value]) => {
    const target = dialog.querySelector(`[data-dialog-${key}]`);
    if (target) target.textContent = value;
  });

  dialog.showModal();
  body.classList.add("dialog-open");
};

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

const closeDialog = () => {
  dialog.close();
  body.classList.remove("dialog-open");
};

dialogClose.addEventListener("click", closeDialog);
dialog.querySelector("[data-dialog-contact]").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) closeDialog();
});
dialog.addEventListener("close", () => body.classList.remove("dialog-open"));

const email = "hello@cxg.bot.cd";
const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "已复制";
  } catch {
    copyStatus.textContent = email;
  }
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
});

const timeNode = document.querySelector("[data-time]");
const updateTime = () => {
  const time = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  timeNode.textContent = `${time} CST`;
};

updateTime();
window.setInterval(updateTime, 30_000);

const finePointer = window.matchMedia("(pointer: fine)");
if (finePointer.matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

    if (window.scrollY < window.innerHeight) {
      const x = (event.clientX / window.innerWidth - 0.5) * -8;
      const y = (event.clientY / window.innerHeight - 0.5) * -5;
      heroImage.style.transform = `scale(1.045) translate3d(${x}px, ${y}px, 0)`;
    }
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}
