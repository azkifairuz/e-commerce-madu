export function calculateAge(birthDate) {
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = new Date().getFullYear();

  const age = currentYear - birthYear;

  // Check if birthday has occurred this year
  const birthMonth = new Date(birthDate).getMonth();
  const currentMonth = new Date().getMonth();
  const birthDay = new Date(birthDate).getDate();
  const currentDay = new Date().getDate();
  
  if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)) {
    return age - 1;
  } else {
    return age;
  }
}
