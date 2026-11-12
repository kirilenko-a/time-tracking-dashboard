const url = "/data.json";
const periodBtns = document.querySelectorAll(".filter-btn");
const activitiesTime = document.querySelectorAll(".activity-card-time");
const prevActivities = document.querySelectorAll(
  ".activity-card-previous-week",
);
const cardTitles = document.querySelectorAll(".activity-card-title");
const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");

const getActivitiesData = async () => {
  try {
    const data = await fetch(url);

    const activities = await data.json();

    return activities;
  } catch (error) {
    throw new Error(error);
  }
};

const showInfo = async (button) => {
  const activitiesData = await getActivitiesData();

  const current = activitiesData.map((activity) => {
    return activity.timeframes[button].current;
  });

  const previus = activitiesData.map((activity) => {
    return activity.timeframes[button].previous;
  });
};

showInfo();

periodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    showInfo(btn.dataset.period);

    periodBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
      btn.ariaPressed = "false";
    });

    btn.classList.add("active-btn");
    btn.ariaPressed = "true";
  });
});
