export const boardConfigs = {
  level0: { name: '레벨 0 (3x3)', width: 3, height: 3, disabled: [], prime: 2 },
  level1: { name: '레벨 1 (4x4)', width: 4, height: 4, disabled: [], prime: 3 },
  level2: { name: '레벨 2 (5x5)', width: 5, height: 5, disabled: [], prime: 5 },
  level3: { name: '레벨 3 (6x6)', width: 6, height: 6, disabled: [], prime: 7 },
  level4: { name: '레벨 4 (7x7)', width: 7, height: 7, disabled: [], prime: 11 },
  level5: { name: '레벨 5 (8x8)', width: 8, height: 8, disabled: [], prime: 13 },
  rectangle: { name: '직사각형 (8x5)', width: 8, height: 5, disabled: [], prime: 17 },
  custom: {
    name: '십자가 모양',
    width: 7,
    height: 7,
    disabled: [
      0, 1, 5, 6, // top corners
      7, 13,
      14, 20,
      21, 27,
      28, 34,
      35, 41,
      42, 43, 47, 48 // bottom corners
    ],
    prime: 19,
  },
};