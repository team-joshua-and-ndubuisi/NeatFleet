/**
 * Calculates the number of full years since the given date.
 *
 * Returns a rounded-down value:
 * - 0.9 years is considered 0 years
 * - 1.4 years is considered 1 year
 * - 2.2 years is considered 2 years
 *
 * This does NOT round up — only full years count.
 */
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
