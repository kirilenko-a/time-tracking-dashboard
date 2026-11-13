const url = `${import.meta.env.BASE_URL}data.json`;
const periodBtns = document.querySelectorAll(".filter-btn");
const activitiesTime = document.querySelectorAll(".activity-card-time");
const prevActivities = document.querySelectorAll(
  ".activity-card-previous-week",
);

const getActivitiesData = async () => {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(data.status);
  }

  const activities = await data.json();

  return activities;
};

const showInfo = async (button) => {
  try {
    const activitiesData = await getActivitiesData();

    activitiesData.forEach((activity, index) => {
      const current = activity.timeframes[button].current;
      const previous = activity.timeframes[button].previous;

      activitiesTime[index].textContent = `${current}hrs`;

      switch (button) {
        case "daily":
          prevActivities[index].textContent = `Yesterday - ${previous}hrs`;
          break;
        case "weekly":
          prevActivities[index].textContent = `Last Week - ${previous}hrs`;
          break;
        case "monthly":
          prevActivities[index].textContent = `Last Month - ${previous}hrs`;
      }
    });
  } catch (error) {
    alert(error);
  }
};

showInfo("weekly");

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
