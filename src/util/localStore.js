export const luuXuongLocal = (ten, data) => {
  const newData = JSON.stringify(data);
  localStorage.setItem(ten, newData);
};
export const layDuLieuLocal = (ten) => {
  const value = localStorage.getItem(ten);
  //   khi parse xong có 2 trường hợp xảy ra, một là có dữ liệu, hai sẽ là null nếu như ko có dữ liệu
  //   if (JSON.parse(value)) {
  //     return JSON.parse(value);
  //   } else {
  //     return {};
  //   }
  return JSON.parse(value) ? JSON.parse(value) : null;
};
