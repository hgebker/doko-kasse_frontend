const LIST_OPTIONS = [
  {
    id: 'ws1819',
    label: 'Wintersemester 18/19'
  },
  {
    id: 'ss19',
    label: 'Sommersemester 19'
  },
  {
    id: 'ws1920',
    label: 'Wintersemester 19/20'
  },
  {
    id: 'ss20',
    label: 'Sommersemester 20'
  },
  {
    id: 'ws2021',
    label: 'Wintersemester 20/21'
  },
  {
    id: 'ss21',
    label: 'Sommersemester 21'
  },
  {
    id: 'ws2122',
    label: 'Wintersemester 21/22'
  }
];

const SEMESTER_OPTIONS = [
  {
    id: 'semester',
    label: 'Semester',
    items: LIST_OPTIONS
  }
];

const SEMESTER_LABEL = {
  ws1819: 'Wintersemester 18/19',
  ss19: 'Sommersemester 19',
  ws1920: 'Wintersemester 19/20',
  ss20: 'Sommersemester 20',
  ws2021: 'Wintersemester 20/21',
  ss21: 'Sommersemester 21',
  ws2122: 'Wintersemester 21/22'
};

export { LIST_OPTIONS, SEMESTER_OPTIONS, SEMESTER_LABEL };
