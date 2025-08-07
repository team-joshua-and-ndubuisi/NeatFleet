const calculateYears = (createdAt: Date): number => {
  const now = new Date();

  let years = now.getFullYear() - createdAt.getFullYear();

  const monthDiff = now.getMonth() - createdAt.getMonth();
  const dayDiff = now.getDate() - createdAt.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }

  return years;
};

export { calculateYears };
